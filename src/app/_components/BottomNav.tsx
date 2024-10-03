"use client";
import ChatIcon from "@/components/icons/ChatIcon";
import PersonIcon from "@/components/icons/PersonIcon";
import PoolIcon from "@/components/icons/PoolIcon";
import SwimHatIcon from "@/components/icons/SwimHatIcon";
import { LogInIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = {
  home: "/lessons",
  pools: "/pools",
  community: "/community",
  login: "/auth/login",
  mypage: "/mypage",
};

type Props = {
  isLoggedIn: boolean;
};

const BottomNav = ({ isLoggedIn }: Props) => {
  const pathname = usePathname();

  const isLessons = pathname.startsWith(routes.home);
  const isPools = pathname.startsWith(routes.pools);
  const isCommunity = pathname.startsWith(routes.community);
  const isLogin = pathname.startsWith(routes.login);
  const isMypage = pathname.startsWith(routes.mypage);

  return (
    <nav className="flex-none h-14 flex items-center px-4 bg-gray-100 border-t border-slate-200">
      <Link
        href={routes.home}
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
        href={routes.community}
        className={`flex-1 h-full flex flex-col gap-0.5 items-center justify-center ${
          isCommunity ? "text-gray-900" : "text-gray-500 stroke-current"
        }`}
      >
        <ChatIcon className={`h-6 w-6`} />
        <span className="text-label_sb">소통해요</span>
      </Link>

      {!isLoggedIn && (
        <Link
          href={routes.login}
          className={`flex-1 h-full flex flex-col gap-0.5 items-center justify-center ${
            isLogin ? "text-gray-900" : "text-gray-500"
          }`}
        >
          <LogInIcon className={`h-6 w-6`} />
          <span className="text-label_sb">로그인</span>
        </Link>
      )}

      {isLoggedIn && (
        <Link
          href={routes.mypage}
          className={`flex-1 h-full flex flex-col gap-0.5 items-center justify-center ${
            isMypage ? "text-gray-900" : "text-gray-500"
          }`}
        >
          <PersonIcon className={`h-6 w-6`} />
          <span className="text-label_sb">마이</span>
        </Link>
      )}
    </nav>
  );
};

export default BottomNav;
