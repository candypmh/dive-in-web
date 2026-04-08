import { NextResponse } from "next/server";
import { z } from "zod";

const LoginKakaoSchema = z.object({
  accessToken: z.string(),
});

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    console.error("Invalid code");
    return NextResponse.redirect(`${origin}/auth/login?error=invalid_code`);
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/kakao`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    if (!res.ok) {
      console.error(await res.json());
      return NextResponse.redirect(`${origin}/auth/login?error=failed_to_login`);
    }

    const body = await res.json();
    const { accessToken } = LoginKakaoSchema.parse(body);

    return NextResponse.redirect(`${origin}`, {
      headers: [
        ["Set-Cookie", `accessToken=${accessToken}; Path=/; HttpOnly; SameSite=Strict`],
      ],
    });
  } catch (error) {
    console.error("카카오 로그인 에러:", error);
    return NextResponse.redirect(`${origin}/auth/login?error=failed_to_login`);
  }
}
