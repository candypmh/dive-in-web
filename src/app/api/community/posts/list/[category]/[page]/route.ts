import { buildCommunityList } from "@/lib/community/mockCommunityList";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { category: string; page: string } },
) {
  try {
    // const { category, page } = params;
    const category = params.category ?? "none";
    const page = Number(params.page ?? 0);

    const data = buildCommunityList(category, page);

    return NextResponse.json({ success: true, message: null, data });
  } catch (error) {
    console.error("[list route] error::", error);
    return NextResponse.json(
      { success: false, message: "Mock list error", data: null },
      { status: 500 },
    );
  }
}
