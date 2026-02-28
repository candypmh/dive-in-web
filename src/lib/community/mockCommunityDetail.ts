import { communityDetailSchema } from "@/schemas/communities";

export function buildCommunityDetail(postId: number) {
  const post = {
    postId: postId,
    // categoryName: String(category),
    title: `Mock title ${postId}`,
    content: `Mock content ${postId}`,
    images: [  
      { repImage: true,  imageUrl: `https://picsum.photos/seed/${postId}/600/400` },
      { repImage: false, imageUrl: `https://picsum.photos/seed/${postId + 1}/600/400` },],
    likesCnt: 0,
    viewCnt: 0,
    cmntCnt: 0,
    writer: "Mock Writer",
    writerProfile: null,
    createdAt: "2026-01-01 00:00:00",
    updatedAt: null,
    commentList: [
      {
        cmntId: 1,
        content: `Mock comment 1`,
        groupName: 1,
        orderNumber: 1,
        cmntClass: 0,
        writer: "Mock commenter",
        writerProfile: "https://picsum.photos/seed/commenter/100/100",
        likeCnt: 0,
        createdAt: "2026-01-01 00:00:00",
      },
    ],
    isLiked: false,
    isPopular: false,
  };

  const body = post;
  const parsed = communityDetailSchema.safeParse(body);
  if (!parsed.success) {
    // 여기서 터지면 mock 자체가 스키마와 불일치
    console.error("[buildCommunityDetail] ZodError:", parsed.error.flatten());
    throw new Error("Mock response schema mismatch");
  }

  return parsed.data; // { success, message, data: { posts, totalPosts, hasMore } }
}
