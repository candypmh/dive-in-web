"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 text-gray-700">
      <p className="text-lg font-semibold">문제가 발생했습니다.</p>
      <p className="text-sm text-gray-500">잠시 후 다시 시도해주세요.</p>
      <div className="flex gap-3">
        <button
          onClick={() => reset()}
          className="px-4 py-2 text-sm bg-blue-900 text-white rounded-lg"
        >
          다시 시도
        </button>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg"
        >
          뒤로 가기
        </button>
      </div>
    </div>
  );
}
