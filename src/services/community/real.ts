"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
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

export const createCommunity = async (formData: FormData, imageUrls: string[] = []) => {
  try {
    const accessToken = cookies().get("accessToken")?.value;
    const body = {
      category: formData.get("categoryType") as string,
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      images: imageUrls,
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

export const updateCommunity = async (
  postId: string,
  data: { title: string; content: string; images?: string[] }
) => {
  try {
    const accessToken = cookies().get("accessToken")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/community/posts/${postId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("게시글 수정 실패!");
    }

    const result = await response.json();
    revalidatePath("/community/posts/list");
    return result;
  } catch (error) {
    console.error("글 수정 실패:", error);
    throw error;
  }
};

export const deleteCommunity = async (id: string) => {
  try {
    const accessToken = cookies().get("accessToken")?.value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/community/posts/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
      }
    );

    if (!response.ok) {
      throw new Error("게시글 삭제 실패!");
    }
    revalidatePath("/community/posts/list");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// 댓글
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

export const addLikePost = async (postId: string) => {
  const accessToken = cookies().get("accessToken")?.value;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/community/posts/${postId}/like`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    }
  );

  if (!response.ok) {
    throw new Error("좋아요 실패!");
  }
  return await response.json();
};

export const deleteLikePost = async (postId: string) => {
  const accessToken = cookies().get("accessToken")?.value;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/community/posts/${postId}/like`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    }
  );

  if (!response.ok) {
    throw new Error("좋아요 취소 실패!");
  }
  return await response.json();
};

export const updateComment = async (postId: number, commentId: string, content: string) => {
  const accessToken = cookies().get("accessToken")?.value;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/community/posts/${postId}/comments/${commentId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: JSON.stringify({ content }),
    }
  );

  if (!response.ok) {
    throw new Error("댓글 수정 실패!");
  }
  const result = await response.json();
  return result.comment;
};

export const deleteComment = async (postId: number, commentId: string) => {
  const accessToken = cookies().get("accessToken")?.value;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/community/posts/${postId}/comments/${commentId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    }
  );

  if (!response.ok) {
    throw new Error("댓글 삭제 실패!");
  }
  return true;
};

