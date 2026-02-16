import { buildCommunityDetail } from "@/lib/community/mockCommunityDetail";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { postId: string } },
) {
  try {
    const postId = Number(params.postId);
    const result = buildCommunityDetail(postId);

    return NextResponse.json({
      success: true,
      message: null,
      data: result,
    });
  } catch (error) {
    console.error("[detail route] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Mock detail error",
        data: null,
      },
      { status: 500 },
    );
  }
}
