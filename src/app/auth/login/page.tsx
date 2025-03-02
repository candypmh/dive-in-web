"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  searchParams: Record<string, string>;
};

const LoginPage = ({ searchParams }: Props) => {
  const next = searchParams.next ?? "/";

  const handleKakaoLogin = async () => {
    const isInitialized = Kakao.isInitialized();

    if (!isInitialized) {
      console.error("Kakao SDK is not initialized.");
      return;
    }

    Kakao.Auth.authorize({
      redirectUri: `${window.location.origin}/api/auth/callback`,
      state: `next=${next}`,
      scope: "openid",
    });
  };
  
  return (
    <div className="flex-1 h-full flex flex-col bg-primary">
      <div className="flex-1 flex items-center justify-center">
        <Image alt="로고" src="/image/logo_b.png" width={160} height={160} />
      </div>

      <div className="flex flex-col gap-2 p-4">
        <button
          className="flex items-center justify-center gap-1 h-12 rounded-lg bg-[#FEE500]"
          onClick={handleKakaoLogin}
        >
          <Image
            alt="카카오톡 로그인"
            src="/icon/kakao_2.png"
            width={24}
            height={24}
          />
          <span className="text-body_sm text-gray-900">카카오톡 로그인</span>
        </button>
        <Link
          href="/"
          className="flex items-center justify-center gap-1 h-12 rounded-lg bg-primary-sub text-primary-foreground"
        >
          <span className="text-body_sm">게스트로 시작하기</span>
        </Link>
      </div>

      <div className="flex flex-col items-center gap-2 px-4 pt-4 pb-10">
        <span className="text-body_sr text-gray-500">
          로그인함으로서 다이브인의 정책 및 약관에 동의합니다.
        </span>
        <div className="flex gap-2 items-center">
          <Link
            href="https://pumped-nectarine-f16.notion.site/114b214c431780a99c94dfc758221271"
            target="_blank"
            className="text-body_sr text-gray-500"
          >
            개인보호정책
          </Link>
          <span className="text-body_sr text-gray-500">|</span>
          <Link
            href="https://pumped-nectarine-f16.notion.site/114b214c431780ff833dc6c281646b9b"
            target="_blank"
            className="text-body_sr text-gray-500"
          >
            서비스 약관
          </Link>
        </div>
      </div>
      {/* <div className="flex flex-col">
        <button
          className="h-14 flex items-center rounded-lg border pl-6 pr-4 bg-slate-50 hover:bg-slate-100"
          onClick={async () => {
            const isInitialized = Kakao.isInitialized();

            if (!isInitialized) {
              console.error("Kakao SDK is not initialized.");
              return;
            }

            Kakao.Auth.authorize({
              redirectUri: `${window.location.origin}/api/auth/callback`,
              state: `next=${next}`,
              scope: "openid",
            });
          }}
        >
          <span className="flex-1 text-left font-bold">
            카카오 아이디로 로그인
          </span>
          <ArrowRightIcon className="w-4 h-4 text-slate-700" />
        </button>
      </div> */}
    </div>
  );
};

export default LoginPage;
