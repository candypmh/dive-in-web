"use client";

import { createPost, ensureSeeded } from "@/lib/community/communityRepo.client";
import { CommunitiesProps, CommunityProps } from "@/types/community";

// export function formatKST(isoString: string) {
//   return new Date(isoString).toLocaleString("ko-KR", {
//     timeZone: "Asia/Seoul",
//   });
// }

export async function createCommunity(formData: FormData): Promise<number> {
  try {
    ensureSeeded();

    const postId = Date.now();
    const categoryType = String(formData.get("categoryType") ?? "COMMUNICATION");
    const title = String(formData.get("title") ?? "");
    const content = String(formData.get("content") ?? "");
    const memberId = String(formData.get("memberId") ?? "1");

    if (!title.trim()) throw new Error("제목이 비어있습니다.");
    if (!content.trim()) throw new Error("내용이 비어있습니다.");

    const newPost: CommunityProps = {
      postId,
      categoryName: categoryType,
      title,
      content,
      images: [],
      likesCnt: 0,
      viewCnt: 0,
      cmntCnt: 0,
      writer: `User ${memberId}`,
      writerProfile: null,
      createdAt: new Date().toISOString(),
      updatedAt: null,
      commentList: [],
      isLiked: false,
      isPopular: false,
    };

    return createPost(newPost);

  } catch (error) {
    console.log("글 작성 실패:", error);
    throw error;
  }
}
