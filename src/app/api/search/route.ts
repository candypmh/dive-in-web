import { NextRequest, NextResponse } from "next/server";
import { buildCommunityDetail } from "@/lib/community/mockCommunityDetail";
import { CATEGORY_NAMES, CATEGORYNAME_TO_LABEL } from "@/constants/categories";
import { Search } from "@/types/search";

const MOCK_POST_COUNT = 35;

function buildMockSearchResults(keyword: string): Search[] {
  const lower = keyword.toLowerCase();

  return Array.from({ length: MOCK_POST_COUNT }, (_, i) => {
    const post = buildCommunityDetail(i + 1);
    return post;
  })
    .filter(
      (post) =>
        post.title.toLowerCase().includes(lower) ||
        post.content.toLowerCase().includes(lower)
    )
    .map((post) => ({
      title: post.title,
      content: post.content,
      categoryName: CATEGORYNAME_TO_LABEL[post.categoryName as (typeof CATEGORY_NAMES)[number]] ?? post.categoryName,
      contentSummary: post.content.slice(0, 60),
      dataUrl: `/community/posts/${post.postId}`,
      createdAt: post.createdAt,
    }));
}

export async function GET(req: NextRequest) {
  const keyword = req.nextUrl.searchParams.get("keyword")?.trim();

  if (!keyword) {
    return NextResponse.json([]);
  }

  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";

  if (useMock) {
    const results = buildMockSearchResults(keyword);
    return NextResponse.json(results);
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseUrl}/home/search?keyword=${encodeURIComponent(keyword)}`);

    if (!response.ok) {
      return NextResponse.json([], { status: response.status });
    }

    const body = await response.json();
    return NextResponse.json(body.data ?? []);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
