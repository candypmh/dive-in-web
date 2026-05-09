"use client";

import { useRouter } from "next/navigation";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";

export default function BackButton() {
  const router = useRouter();
  return(
    <button onClick={() => router.back()} className="flex p-3">
      <ArrowLeftIcon className="w-6 h-6 text-gray-900" />
    </button>
  );
}
