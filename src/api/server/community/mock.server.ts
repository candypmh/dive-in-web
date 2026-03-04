import { buildCommunityDetail } from "@/lib/community/mockCommunityDetail";
import { buildCommunityList } from "@/lib/community/mockCommunityList";
import { CommunityProps, communityResponseDetailProps } from "@/types/community";

export const getCommunities = async( category: string = "none", page: string = "0" ): Promise<communityResponseDetailProps>  => {
  try {
    //Mock(route handler)
    // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    // const url = `${baseUrl}/api/community/posts/list/${category}/${page}`;
    const res =  buildCommunityList(category, Number(page));
    const body = res.data;
    console.log("[getCommunities] body keys::", Object.keys(body));

    return body;

  } catch (error) {
    console.error("[getCommunities] error::", error);
    throw error;
    // return { posts: [], totalPosts: 0, hasMore: false }; //아 여기 반환값 달라서 에러났던 거였음? 하...참나
  }
};

// export const getCommunity = async (postId: string): Promise<CommunityProps | null> => {
export const getCommunity = async (postId: string): Promise<CommunityProps|null> => {
  try {
    const res = buildCommunityDetail(Number(postId));
    console.log("API 응답 데이터:", res);

    return {
      ...res,
      commentList: res.commentList ?? [],
      images: res.images ?? [],
    };
  } catch (error) {
    console.error("[getCommunity] error::", error);
    return null;
  }
};

export const updateCommunity = async (postId: string, formData: FormData) => {
  try {
    console.warn("FormData 확인:", Array.from(formData.entries())); // 디버깅
    const response = await fetch(
      `https://api.dive-in.co.kr/community/posts/${postId}`,
      {
        method: "PUT",
        body: formData,
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response) {
      throw new Error("게시글 수정 실패!");
    }

    const result = await response.json();
    console.log("글 수정 성공:", result);
  } catch (error) {
    console.log("글 수정 실패:", error);
    throw error;
  }
};

export const deleteCommunity = async (id: string, memberId: string) => {
  try {
    const response = await fetch(
      `https://api.dive-in.co.kr/community/posts/${id}?memberId=${memberId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response) {
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

export const getOG = async (link: string) => {
  try {
    const response = await fetch("/api/shorten-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: link }),
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

export const getComments = async (postId: number) => {
  try {
    const response = await fetch(
      `https://api.dive-in.co.kr/community/comments/${postId}`
    );
    const body = await response.json();

    return body;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createComment = async (formData: FormData) => {
  try {
    const response = await fetch(
      "https://api.dive-in.co.kr/community/comments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response) {
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

export const addLikePost = async (postId: string, memberId: string) => {
  // const user = parseInt(memberId);
  try {
    const response = await fetch(
      `https://api.dive-in.co.kr/community/posts/${postId}/like?memberId=${memberId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache", //캐싱 방지
        },
      }
    );

    console.log("Response status:", response.status);
    // console.log("Response body:", await response.text());

    if (!response.ok) {
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

export const deleteLikePost = async (postId: string, memberId: string) => {
  // const user = parseInt(memberId);
  try {
    const response = await fetch(
      `https://api.dive-in.co.kr/community/posts/${postId}/like?memberId=${memberId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache", //캐싱 방지
        },
      }
    );

    console.log("Response status:", response.status);
    // console.log("Response body:", await response.text());

    if (!response.ok) {
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

export const openGraph = async (url: string) => {
  try {
    console.log(":::url이 서버로 넘어가는중:", url);

    const response = await fetch(
      `https://api.dive-in.co.kr/api/openGraph/fetch?url=${url}`
    );
    const body = await response.json();

    return body;
  } catch (error) {
    console.error(error);
    return [];
  }
};
