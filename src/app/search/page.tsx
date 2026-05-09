"use client";

import Link from "next/link";
import ChatIcon from "@/components/icons/ChatIcon";
import PoolIcon from "@/components/icons/PoolIcon";
import SwimHatIcon from "@/components/icons/SwimHatIcon";
import { useEffect } from "react";
import { getSearch } from "@/api/server/search";
import BackButton from "../_components/BackButton";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchStore } from "@/store/searchStore";
import { IoCloseOutline } from "react-icons/io5";
import { formatKST } from "@/utils";

export default function ClientSearch() {
  const {
    keyword,
    results: result,
    recentKeywords,
    setKeyword,
    setResults,
    addRecentKeyword,
    removeRecentKeyword,
    clearRecentKeywords,
  } = useSearchStore();
  const debounceKeyword = useDebounce(keyword, 300); //디바운싱 적용된 입력값

  useEffect(() => {
    const fetchSearch = async () => {
      if (!debounceKeyword.trim()) {
        setResults([]);
        return;
      }

      try {
        const data = await getSearch(debounceKeyword);
        if (data) {
          setResults(data);
          addRecentKeyword(debounceKeyword);
        }
      } catch (error) {
        console.error("검색 결과 에러:::", error);
      }
    };

    fetchSearch();
  }, [debounceKeyword]);

  return (
    <div className="flex flex-col">
      <div className="relative flex items-center justify-between py-1 px-1">
        <BackButton />
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold">
          통합검색
        </h1>
      </div>

      <div className="px-4">
        <form className="relative flex border rounded-md overflow-hidden">
          <input
            value={keyword}
            type="text"
            name="course-search"
            id="course-search"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
            placeholder="클래스명, 수영장, 커뮤니티 글을 검색해보세요"
            autoFocus
            onChange={(e) => setKeyword(e.target.value)}
          />
        </form>
      </div>

      {/* 최근 검색어 — 검색창이 비어있을 때만 표시 */}
      {!keyword.trim() && recentKeywords.length > 0 && (
        <div className="px-4 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-700">최근 검색어</span>
            <button
              onClick={clearRecentKeywords}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              전체 삭제
            </button>
          </div>
          <ul className="flex flex-col gap-1">
            {recentKeywords.map((kw) => (
              <li key={kw} className="flex items-center justify-between py-1">
                <button
                  className="text-sm text-gray-700 hover:text-blue-900 text-left"
                  onClick={() => setKeyword(kw)}
                >
                  {kw}
                </button>
                <button
                  onClick={() => removeRecentKeyword(kw)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <IoCloseOutline className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 검색 결과 */}
      <div>
        <ul className="list-none px-4">
          {result.map((result) => (
            <li className="border-b border-gray-300 pb-4">
              <Link href={result.dataUrl} className="flex p-3">
                <div className="flex flex-col items-start bg-white-100 rounded-lg mt-4">
                  <div className="flex flex-row">
                    {getCategoryIcon(result.categoryName)}
                  </div>
                  <p className="text-md pl-8">{result.title}</p>
                  <p className="text-sm text-gray-600 pl-8 line-clamp-2">
                    {result.content}
                  </p>
                  <p className="text-sm text-gray-600 pl-8">
                    {formatKST(result.createdAt)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const getCategoryIcon = (categoryName: string) => {
  switch (categoryName) {
    case "소통해요":
      return <ChatIcon className="h-6 w-6 text-gray-400" />;
    case "수영장":
      return <PoolIcon className="h-6 w-6 text-gray-400" />;
    case "수영물품":
      return <SwimHatIcon className="h-6 w-6 text-gray-400" />;
    default:
      return <div className="h-6 w-6" />;
  }
};
