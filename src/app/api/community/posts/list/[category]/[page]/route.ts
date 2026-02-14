import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { category: string; page: string } }
) {
  const { category, page } = params;
  const p = Number(page ?? 0);
  const pageSize = 10;
  const totalPosts = 35;

  const posts = Array.from({ length: pageSize }, (_, i) => {
    const id = p * pageSize + i + 1;
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

  const hasMore = (p + 1) * pageSize < totalPosts;

  return NextResponse.json({
    success: true,
    message: null,
    data: { posts, totalPosts, hasMore },
  });
}
