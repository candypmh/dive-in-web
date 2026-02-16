import { buildCommunityList } from "@/lib/community/mockCommunityList.ts";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { category: string; page: string } },
) {
  const { category, page } = params;
  const p = Number(page ?? 0);

  const result = buildCommunityList(category, p);

  return NextResponse.json(result);
}
