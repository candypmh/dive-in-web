import { communityResponseSchema } from "@/schemas/communities";

// export function buildCommunityList(category: string, page: number) {
export function buildCommunityList(category: string, page: number) {
  const pageSize = 10;
  const totalPosts = 35;

  const posts = Array.from({ length: pageSize }, (_, i) => {
    const id = page * pageSize + i + 1;
    return {
      postId: id,
      categoryName: String(category),
      title: `Mock title ${id}`,
      content: `Mock content ${id}`,
      image: null,
      likesCnt: 0,
      cmntCnt: 0,
      viewCnt: 0,
      writer: "Mock Writer",
      writerProfile: null,
      createdAt: "2026-01-01 00:00:00",
      updatedAt: null,
      isPopular: false,
    };
  });

  const hasMore = (page + 1) * pageSize < totalPosts;

  // ✅ Route Handler와 Server Function 모두 동일한 스키마로 검증
  const body = {
    success: true,
    message: null,
    data: { posts, totalPosts, hasMore },
  };

  const parsed = communityResponseSchema.safeParse(body);
  if (!parsed.success) {
    // 여기서 터지면 mock 자체가 스키마와 불일치
    console.error("[buildCommunityList] ZodError:", parsed.error.flatten());
    throw new Error("Mock response schema mismatch");
  }

  return parsed.data; // { success, message, data: { posts, totalPosts, hasMore } }
}
