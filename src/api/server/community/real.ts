"use server";

import { cookies } from "next/headers";
import {
  communityDetailSchema,
  communityResponseSchema,
} from "@/schemas/communities";
import { CommunityProps, communityResponseDetailProps } from "@/types/community";

export const getCommunities = async( category: string = "", page: string = "0" ): Promise<communityResponseDetailProps>  => {
  try {
    const params = new URLSearchParams({ page });
    if (category) params.set("category", category);
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/community/posts?${params.toString()}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP에러 상태 코드: ${response.status}`);
    }
    const body = await response.json();

    const validateData = communityResponseSchema.parse(body);
    return validateData.data;

  } catch (error) {
    console.error("[getCommunities] error::", error);
    throw error;
    // return { posts: [], totalPosts: 0, hasMore: false }; //아 여기 반환값 달라서 에러났던 거였음? 하...참나
  }
};

export const getCommunity = async (postId: string): Promise<CommunityProps|null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/community/posts/${postId}`,
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache", //캐싱 방지
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP에러 상태 코드: ${response.status}`);
    }

    const body = await response.json();

    const validateData = communityDetailSchema.safeParse(body.data);
    if (!validateData.success) {
      console.error("zod 검증 실패::::", validateData.error);
    }

    // 이미지&댓글 처리
    const transformedData: CommunityProps = {
      ...body.data,
      commentList: body.data.commentList || [],
      images: body.data.images || [],
    };
    return transformedData;
  } catch (error) {
    console.error("[getCommunity] error::", error);
    return null;
  }
};

export const createCommunity = async (formData: FormData) => {
  try {
    const accessToken = cookies().get("accessToken")?.value;
    const body = {
      category: formData.get("categoryType") as string,
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      images: [],
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/community/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("게시글 작성 실패!");
    }

    const result = await response.json();
    if (result?.post?.id) {
      return result.post.id;
    } else {
      throw new Error("postId를 반환하지 않았습니다.");
    }
  } catch (error) {
    console.error("글 작성 실패:", error);
    throw error;
  }
};

export const updateCommunity = async (postId: string, formData: FormData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/community/posts/${postId}`,
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
    return result;
  } catch (error) {
    console.error("글 수정 실패:", error);
    throw error;
  }
};

export const deleteCommunity = async (id: string, memberId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/community/posts/${id}?memberId=${memberId}`,
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
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// 댓글
// export const getComments = async () => {
//   try {
//     const response = await fetch("${process.env.NEXT_PUBLIC_API_BASE_URL}/community/comments");
//     const body = await response.json();
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

export const getComments = async (postId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/community/posts/${postId}/comments`
    );
    const body = await response.json();

    return body;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createComment = async (postId: number, content: string) => {
  try {
    const accessToken = cookies().get("accessToken")?.value;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/community/posts/${postId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({ content }),
      }
    );

    if (!response.ok) {
      throw new Error("댓글 작성 실패!");
    }

    const result = await response.json();
    return result.comment;
  } catch (error) {
    console.error("댓글 작성 실패:", error);
    throw error;
  }
};

// export const updateComments = async() => {
//   try {
//     const response = await fetch("${process.env.NEXT_PUBLIC_API_BASE_URL}/community/comments");
//     const body = await response.json();
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

// export const deleteComments = async() => {
//   try {
//     const response = await fetch("${process.env.NEXT_PUBLIC_API_BASE_URL}/community/comments");
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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/community/posts/${postId}/like?memberId=${memberId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache", //캐싱 방지
        },
      }
    );

    if (!response.ok) {
      throw new Error("좋아요 실패!");
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const deleteLikePost = async (postId: string, memberId: string) => {
  // const user = parseInt(memberId);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/community/posts/${postId}/like?memberId=${memberId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache", //캐싱 방지
        },
      }
    );

    if (!response.ok) {
      const errorMessage = `좋아요 취소 실패: HTTP ${response.status}`;
      console.error(errorMessage);
      throw new Error("좋아요 취소 실패!");
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error(error);
    return [];
  }
};

