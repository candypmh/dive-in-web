import { NextResponse } from "next/server";
import { z } from "zod";

const LoginKakaoSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    console.error("Invalid code");
    return NextResponse.redirect(`${origin}/auth/login?error=invalid_code`);
  }

  try {
    // const url = new URL(`${origin}/api/auth/login`);
    const url = new URL(`https://api.dive-in.co.kr/login/kakao`);
    url.searchParams.append("code", code);
    url.searchParams.append("redirect_uri", `${origin}/api/auth/callback`);

    //추가
    // console.log("code:", code);
    // console.log("Request URL:", url.toString());


    const res = await fetch(url);

    if (!res.ok) {
      console.error(await res.json());
      return NextResponse.redirect(
        `${origin}/auth/login?error=failed_to_login`
      );
    }
    const body = await res.json();

    const { accessToken, refreshToken } = LoginKakaoSchema.parse(body.data);

    return NextResponse.redirect(`${origin}`, {
      headers: [
        [
          "Set-Cookie",
          `accessToken=${accessToken}; Path=/; HttpOnly; SameSite=Strict`,
        ],
        [
          "Set-Cookie",
          `refreshToken=${refreshToken}; Path=/; HttpOnly; SameSite=Strict`,
        ],
      ],
    });
  } catch (error) {
    let errorDetails: {
      message: string;
      code: string | null;
      port: number | null;
      address: string | null;
      syscall: string | null;
      errno: number | null;
    } = {
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
      code: null,
      port: null,
      address: null,
      syscall: null,
      errno: null,
    };

    // 타입 가드를 이용하여 에러 객체의 구조를 확인
    if (isFetchError(error)) {
      errorDetails = {
        message: String(error),
        code: error.cause.code || null,
        port: error.cause.port || null,
        address: error.cause.address || null,
        syscall: error.cause.syscall || null,
        errno: error.cause.errno || null,
      };
    }

    return NextResponse.json(
      {
        message: "인증 과정에서 에러가 발생했어요",
        error: errorDetails,
      },
      { status: 500 }
    );
  }
}

type FetchError = {
  cause: {
    errno: number;
    code: string;
    syscall: string;
    address: string;
    port: number;
  };
};

function isFetchError(error: unknown): error is FetchError {
  return (
    typeof error === "object" &&
    error !== null &&
    "cause" in error &&
    typeof error.cause === "object" &&
    error.cause !== null &&
    "errno" in error.cause &&
    "code" in error.cause &&
    "syscall" in error.cause &&
    "address" in error.cause &&
    "port" in error.cause
  );
}
