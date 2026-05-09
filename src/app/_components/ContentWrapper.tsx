"use client";

import { usePathname } from "next/navigation";

export default function ContentWrapper({children} : {children: React.ReactNode}) {
  const pathname = usePathname();
  const isLogin = pathname.startsWith("/auth/login");

  return (
    <div className={`w-full flex-1 flex flex-col overflow-hidden ${isLogin? "" : "xl:pt-16"}`}>
      {children}
    </div>
  );
}