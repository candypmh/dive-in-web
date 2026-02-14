"use client";

import Link from "next/link";
import ChatIcon from "@/components/icons/ChatIcon";
import PoolIcon from "@/components/icons/PoolIcon";
import SwimHatIcon from "@/components/icons/SwimHatIcon";
import { Search } from "@/types/search";
import { useEffect, useState } from "react";
import { getSearch } from "@/api/server/search";
import BackButton from "../_components/backButton";
import { useDebounce } from "@/hooks/useDebounce";

export default function ClientSearch() {
  // const keyword = 사용자의 키보드 입력으로 받은 값
  const [keyword, setKeyword] = useState(""); //실시간 사용자 입력값
  const [result, setResults] = useState<Search[]>([]); //검색어에 따른 결과
  const debounceKeyword = useDebounce(keyword, 300); //디바운싱 적용된 입력값

  useEffect(() => {
    const fetchSearch = async () => {
      if (!debounceKeyword.trim()) {
        setResults([]); //검색창이 비면 결과 비우기
        return; //함수 종료(빈문자열로 api요청 안보내도록 무시/fetch요청 막기)
      }

      try {
        const data = await getSearch(debounceKeyword);

        if (data) {
          setResults(data);
        } else {
          console.log("검색 결과가 존재하지 않습니다.");
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
          {/* <button
            type="submit"
            className="flex-none flex items-center justify-center bg-gray-100 w-10 h-10"
          >
            <SearchIcon className="w-5 h-5" />
          </button> */}
        </form>
      </div>
      
      <div>
        <div>
          {/* <p className="p-4">클라이언트 페이지</p> */}
          <ul className="list-none px-4">
            {result.map((result) => (
              // <li key={result.id} className="border-b border-gray-300 pb-4">
              <li className="border-b border-gray-300 pb-4">
                <Link href={result.dataUrl} className="flex p-3">
                  <div className="flex flex-col items-start bg-white-100 rounded-lg mt-4">
                    <div className="flex flex-row">
                      {getCategoryIcon(result.categoryName)}
                      <div
                        className={`text-label_sb py-1 rounded text-chip-1-foreground inline-block w-fit`}
                      >
                        <p className="pl-2">{result.categoryName}</p>
                      </div>
                    </div>
                    <p className="text-md pl-8">{result.title}</p>
                    <p className="text-sm text-gray-600 pl-8">
                      {result.content}
                    </p>
                    <p className="text-sm text-gray-600 pl-8">
                      {result.contentSummary}
                    </p>
                    <p className="text-sm text-gray-600 pl-8">
                      {result.createdAt}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const getCategoryIcon = (categoryName: string) => {
  switch (categoryName) {
    case "수영장":
      return <PoolIcon className="h-6 w-6 text-gray-400" />;
    case "수영수업":
      return <SwimHatIcon className="h-6 w-6 text-gray-400" />;
    case "커뮤니티":
      return <ChatIcon className="h-6 w-6 text-gray-400" />;
    default:
      return <div></div>;
  }
};
