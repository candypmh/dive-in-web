"use client";

import ChatIcon from "@/components/icons/ChatIcon";
import PersonIcon from "@/components/icons/PersonIcon";
import PoolIcon from "@/components/icons/PoolIcon";
import SwimHatIcon from "@/components/icons/SwimHatIcon";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { GoHome } from "react-icons/go";

const routes = {
  home: "/",
  lessons: "/lessons",
  pools: "/pools",
  community: "/community/posts/list",
  mypage: "/mypage",
  login: "/auth/login",
};

const TopNav = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "none";
  const page = searchParams.get("page") || "0";

  const isHome = pathname === routes.home;
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
    <nav className="hidden xl:flex xl:fixed items-center xl:left-0 xl:top-0 xl:right-0 xl:h-16 px-8 bg-white z-50 gap-2 relative">
      <Image
        alt="로고"
        src="/image/logo_o.png"
        width={120}
        height={28}
        className="object-contain"
      />

      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-body_bb">
        <Link
          href={routes.home}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg ${isHome ? "text-gray-900" : "text-gray-500"}`}
        >
          <GoHome className={`h-6 w-6`} />
          <span className="text-body_bb">홈</span>
        </Link>
        <Link
          href={routes.lessons}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg ${isLessons ? "text-gray-900" : "text-gray-500"}`}
        >
          <SwimHatIcon className={`h-6 w-6`} />
          <span className="text-body_bb">수영클래스</span>
        </Link>
        <Link
          href={routes.pools}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg ${isPools ? "text-gray-900" : "text-gray-500"}`}
        >
          <PoolIcon className={`h-6 w-6`} />
          <span className="text-body_bb">수영장</span>
        </Link>
        <Link
          href={routes.community}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg ${isCommunity ? "text-gray-900" : "text-gray-500"}`}
        >
          <ChatIcon className={`h-6 w-6`} />
          <span className="text-body_bb">소통해요</span>
        </Link>
        <Link
          href={routes.mypage}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg ${isMypage ? "text-gray-900" : "text-gray-500"}`}
        >
          <PersonIcon className={`h-6 w-6`} />
          <span className="text-body_bb">마이페이지</span>
        </Link>
      </div>
    </nav>
  );
};

export default TopNav;
