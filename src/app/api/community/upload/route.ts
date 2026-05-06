import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const accessToken = request.cookies.get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "로그인이 필요합니다" }, { status: 401 });
  }

  const formData = await request.formData();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/community/upload`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: formData,
    }
  );

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    return NextResponse.json(
      { error: data?.detail || "업로드 실패" },
      { status: response.status }
    );
  }
  return NextResponse.json(data);
};
