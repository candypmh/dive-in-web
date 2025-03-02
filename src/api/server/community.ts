"use server";

import { communityDetailSchema, communityResponseSchema, communitySchema } from "@/schemas/communities";
import { CommunityProps } from "@/types/community";

export const getCommunities = async (category: string = "none", page: string = "0") => {
  try {
    const url = `https://api.dive-in.co.kr/community/posts/list/${category}/${page}`;
    const response = await fetch(url); 

    if(!response.ok){
      throw new Error(`HTTP에러 상태 코드: ${response.status}`);
    }

    const body = await response.json();
    // console.log("::::::::::Fetched Data:", body);

    const validateData = communityResponseSchema.parse(body);
    // console.log("::::::::::zod후 Data:", JSON.stringify(validateData, null, 2));
    // const validateData = communitySchema.array().parse(body.data);
    
    // console.log("::::::::::validateData.data는?:", validateData.data);
    return validateData.data;

  } catch (error) {
    console.error(error);
    // return [];
    return { posts: [], totalPosts: 0, hasMore: false }; //아 여기 반환값 달라서 에러났던 거였음? 하...참나
  }
};

// export const getCommunity = async (postId: string): Promise<CommunityProps | null> => {
export const getCommunity = async(postId: string) => {
  
  try {
    const response = await fetch(`https://api.dive-in.co.kr/community/posts/${postId}`, {
      method: "GET",
      headers: {
        "Cache-Control" : "no-cache", //캐싱 방지
        "Content-Type": "application/json",
      }
    });
    // console.warn("API 요청 URL:", `https://api.dive-in.co.kr/community/posts/${postId}`);
    // console.warn("response:", response);

    if(!response.ok){
      throw new Error(`HTTP에러 상태 코드: ${response.status}`);
    }
    
    const body = await response.json();
    console.log("API 응답 데이터:", body);
    console.log("commentList 데이터:::", body.data?.commentList);

    const validateData = communityDetailSchema.safeParse(body.data);

    if (!validateData.success) {
      console.error("zod 검증 실패::::", validateData.error);
    } else {
      console.log("zod 검증 성공::::", validateData.data);
    }


    console.log("zod 검증된 데이터:::", validateData);
    // return validateData;

    // 이미지&댓글 처리
    const transformedData: CommunityProps = {
      ...body.data,
      commentList: body.data.commentList || [],
      images: body.data.images || [],
    };

    return transformedData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createCommunity = async(formData: FormData) => {
  try {
    const response = await fetch("https://api.dive-in.co.kr/community/posts", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if(!response){
      throw new Error("게시글 작성 실패!");
    }
    
    const result = await response.json();
    console.log("글 작성 성공:", result);
    if(result?.success && result?.data?.postId) {
      return result.data.postId; 
    }else{
      throw new Error("postId를 반환하지 않았습니다.");
    }
  } catch (error) {
    console.log("글 작성 실패:", error);
    throw error;
  }
};

export const updateCommunity = async(postId: string, formData: FormData) => {
  try {
    console.warn("FormData 확인:", Array.from(formData.entries())); // 디버깅
    const response = await fetch(`https://api.dive-in.co.kr/community/posts/${postId}`,{
      method: "PUT",
      body: formData,
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
      }
    });

    if(!response){
      throw new Error("게시글 수정 실패!");
    }
    
    const result = await response.json();
    console.log("글 수정 성공:", result);
  } catch (error) {
    console.log("글 수정 실패:", error);
    throw error;
  }
};

export const deleteCommunity = async(id: string, memberId: string) => {
  try {
    const response = await fetch(`https://api.dive-in.co.kr/community/posts/${id}?memberId=${memberId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(!response){
      throw new Error("게시글 삭제 실패!");
    }
    // console.warn("API 요청 URL:", `https://api.dive-in.co.kr/community/posts/${id}`);
    console.log("게시글이 삭제 성공!");
    return true;
    
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getOG = async(link: string) => {
  try {
    const response = await fetch("/api/shorten-link", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({url: link}),
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// 댓글
// export const getComments = async () => {
//   try {
//     const response = await fetch("https://api.dive-in.co.kr/community/comments");
//     const body = await response.json();
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

export const getComments = async(postId: number) => {
  try {
    const response = await fetch(`https://api.dive-in.co.kr/community/comments/${postId}`);
    const body = await response.json();

    
    return body;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createComment = async(formData: FormData) => {
  try {
    const response = await fetch("https://api.dive-in.co.kr/community/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if(!response){
      throw new Error("게시글 작성 실패!");
    }

    const result = await response.json();
    console.log("댓글 작성 성공:", result);
  } catch (error) {
    console.log("댓글 작성 실패:", error);
    return [];
  }
};

// export const updateComments = async() => {
//   try {
//     const response = await fetch("https://api.dive-in.co.kr/community/comments");
//     const body = await response.json();
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

// export const deleteComments = async() => {
//   try {
//     const response = await fetch("https://api.dive-in.co.kr/community/comments");
//     const body = await response.json();
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

export const addLikePost = async(postId: string, memberId: string) => {
  // const user = parseInt(memberId);
  try {
    const response = await fetch(`https://api.dive-in.co.kr/community/posts/${postId}/like?memberId=${memberId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control" : "no-cache", //캐싱 방지
      },
    });

    console.log("Response status:", response.status);
    // console.log("Response body:", await response.text());

    if(!response.ok){
      throw new Error("좋아요 실패!");
    }
    const body = await response.json();
    console.log("좋아요 성공:", body);
    return body;

  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteLikePost = async(postId: string, memberId: string) => {
  // const user = parseInt(memberId);
  try {
    const response = await fetch(`https://api.dive-in.co.kr/community/posts/${postId}/like?memberId=${memberId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control" : "no-cache", //캐싱 방지
      },
    });
    
    console.log("Response status:", response.status);
    // console.log("Response body:", await response.text());

    if(!response.ok){
      const errorMessage = `좋아요 취소 실패: HTTP ${response.status}`;
      console.error(errorMessage);
      throw new Error("좋아요 취소 실패!");
    }
    const body = await response.json();
    console.log("좋아요 취소 성공:", body);
    return body;

  } catch (error) {
    console.log(error);
    return [];
  }
};