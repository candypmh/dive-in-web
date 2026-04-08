import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { origin } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  if (accessToken) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
    }
  }

  revalidatePath("/");

  return NextResponse.redirect(`${origin}`, {
    headers: [
      ["Set-Cookie", `accessToken=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`],
      ["Set-Cookie", `refreshToken=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`],
    ],
  });
};
