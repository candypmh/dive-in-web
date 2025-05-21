"use client";
import ChatIcon from "@/components/icons/ChatIcon";
import PersonIcon from "@/components/icons/PersonIcon";
import PoolIcon from "@/components/icons/PoolIcon";
import SwimHatIcon from "@/components/icons/SwimHatIcon";
import { GoHome } from "react-icons/go";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const routes = {
  home: "/",
  lessons: "/lessons",
  pools: "/pools",
  community: "/community/posts/list",
  mypage: "/mypage",
  login: "/auth/login",
};

const BottomNav = () => {
  const pathname = usePathname();
  //추가
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "none";
  const page = searchParams.get("page") || "0";
  // const [category, setCategory] = useState<string | null>("none");
  // const [page, setPage] = useState<string | null>("0");
  
  // useEffect(() => {
  //   setCategory(searchParams.get("category"));
  //   setPage(searchParams.get("page"));
  // }, []);

  const isHome = pathname === "/"; //홈일때만 활성화
  const isLessons = pathname.startsWith(routes.lessons);
  const isPools = pathname.startsWith(routes.pools);
  const isCommunity =
    pathname.startsWith(routes.community) &&
    category === "none" &&
    page === "0";
  const isMypage = pathname.startsWith(routes.mypage);
  const isLogin = pathname.startsWith(routes.login);

  if (isLogin) {
    return null;
  }

  return (
    <nav className="flex-none h-14 flex items-center px-4 bg-gray-100 border-t border-slate-200">
      <Link
        href={routes.home}
        className={`flex-1 h-full flex flex-col gap-0.5 items-center justify-center ${
          isHome ? "text-gray-900" : "text-gray-500"
        }`}
      >
        <GoHome className={`h-6 w-6`} />
        <span className={`text-label_sb`}>홈</span>
      </Link>
      <Link
        href={routes.lessons}
        className={`flex-1 h-full flex flex-col gap-0.5 items-center justify-center ${
          isLessons ? "text-gray-900" : "text-gray-500"
        }`}
      >
        <SwimHatIcon className={`h-6 w-6`} />
        <span className={`text-label_sb`}>수영클래스</span>
      </Link>
      <Link
        href={routes.pools}
        className={`flex-1 h-full flex flex-col gap-0.5 items-center justify-center ${
          isPools ? "text-gray-900" : "text-gray-500"
        }`}
      >
        <PoolIcon className={`h-6 w-6`} />
        <span className="text-label_sb">수영장</span>
      </Link>
      <Link
        // href={`${routes.community}?category=none&page=0`}
        href={routes.community}
        className={`flex-1 h-full flex flex-col gap-0.5 items-center justify-center ${
          isCommunity ? "text-gray-900" : "text-gray-500"
        }`}
      >
        <ChatIcon className={`h-6 w-6`} />
        <span className="text-label_sb">소통해요</span>
      </Link>

      <Link
        href={routes.mypage}
        className={`flex-1 h-full flex flex-col gap-0.5 items-center justify-center ${
          isMypage ? "text-gray-900" : "text-gray-500"
        }`}
      >
        <PersonIcon className={`h-6 w-6`} />
        <span className="text-label_sb">마이</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
