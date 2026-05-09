"use client";

import { CiSearch } from "react-icons/ci";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useSearchStore } from "@/store/searchStore";
import { HomeProps } from "@/types/home";
import { CATEGORYNAME_TO_LABEL, CategoryName } from "@/constants/categories";
import { calcDDay } from "@/utils";
import LessonCard from "./_components/LessonCard";
import CommunityCard from "./_components/CommunityCard";

export default function HomeClient({ home }: { home: HomeProps }) {
  const router = useRouter();
  const [homeKeyword, setHomeKeyword] = useState("");
  const { setKeyword } = useSearchStore();

  const popularLessons = home.topViewLessonList;
  const NewLessons = home.newLessonList;
  const topViewPostList = home.topViewPostList;
  const NewCommunities = home.newPostList;
  const swimContests = home.competitionPostList;


  return (
    <div className="flex flex-col">
      {/* 검색창 */}
      <section className="flex flex-col">
        <div className="flex items-center gap-2 pt-6 px-4 pb-5">
          <form
            className="relative w-full"
            onSubmit={(e) => {
              e.preventDefault();
              if (!homeKeyword.trim()) return;
              setKeyword(homeKeyword.trim());
              router.push("/search");
            }}
          >
            <div className="relative w-full">
              <input
                type="text"
                value={homeKeyword}
                onChange={(e) => setHomeKeyword(e.target.value)}
                placeholder="클래스명, 수영장, 커뮤니티 글을 검색해보세요"
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none"
              />
              <button
                type="submit"
                aria-label="검색"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-900"
              >
                <CiSearch size={20} />
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="flex flex-col w-full pb-8">
        <div className="flex flex-row px-4 py-2 justify-between">
          <h2 className="text-heading_2 text-gray-900">
            🔥인기있는 수영 클래스
          </h2>
          <Link href="/lessons" className="flex">
            <ArrowRightIcon className="w-6 h-6 text-gray-900" />
          </Link>
        </div>
        {/* 카드리스트 */}
        <div className="xl:grid-cols-3 grid grid-cols-2 gap-6 px-8 py-1">
          {popularLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </section>

      <section className="flex flex-col w-full pb-8">
        <div className="flex flex-row px-4 py-2 justify-between">
          <h2 className="pl-2 text-heading_2 text-gray-900">New 수영 클래스</h2>
          <Link href="/lessons" className="flex">
            <ArrowRightIcon className="w-6 h-6 text-gray-900" />
          </Link>
        </div>
        {/* 카드리스트 */}
        <div className="xl:grid-cols-3 grid grid-cols-2 gap-6 px-8 py-1">
          {NewLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </section>

      <section className="flex flex-col w-full pb-8">
        <div className="flex flex-row px-4 py-2 justify-between">
          <h2 className="text-heading_2 text-gray-900">
            🔥인기있는 커뮤니티 글
          </h2>
          <Link
            href="/community/posts/list?category=popular&page=0"
            className="flex"
          >
            <ArrowRightIcon className="w-6 h-6 text-gray-900" />
          </Link>
        </div>
        {/* 카드리스트 */}
        <div className="flex flex-wrap gap-6 px-8 py-1">
          {topViewPostList.map((community) => (
            <CommunityCard key={community.postId} community={community} />
          ))}
        </div>
      </section>

      <section className="flex flex-col w-full pb-8">
        <div className="flex flex-row px-4 py-2 justify-between">
          <h2 className="pl-2 text-heading_2 text-gray-900">New 커뮤니티 글</h2>
          <Link
            href="/community/posts/list?category=none&page=0"
            className="flex"
          >
            <ArrowRightIcon className="w-6 h-6 text-gray-900" />
          </Link>
        </div>
        {/* 카드리스트 */}
        <div className="flex flex-wrap gap-6 px-8 py-1">
          {NewCommunities.map((community) => (
            <CommunityCard key={community.postId} community={community} />
          ))}
        </div>
      </section>

      <section className="flex flex-col w-full pb-8">
        <div className="flex flex-row px-4 py-2 justify-between">
          <h2 className="pl-2 text-heading_2 text-gray-900">
            모집중인 수영대회
          </h2>
          <Link
            href="/community/posts/list?category=competition&page=0"
            className="flex"
          >
            <ArrowRightIcon className="w-6 h-6 text-gray-900" />
          </Link>
        </div>
        {/* 카드리스트 */}
        {swimContests.length === 0 ? (
          <div className="flex flex-wrap gap-6 px-8 py-1">
              <div className="px-4 py-2 rounded-lg shadow-sm bg-gray-100 w-full">
            <div className="items-center gap-2 pb-2 p-2">
              <p className="text-gray-500">현재 모집중인 수영대회가 없습니다.</p>
            </div>
          </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6 px-8 py-1">
            {swimContests.map((contest) => (
              <div
                key={contest.postId}
                className="px-4 py-2 rounded-lg shadow-sm bg-gray-100 w-full"
              >
                <div className="items-center gap-2 pb-2">
                  <div className="flex flex-row justify-between items-start w-full rounded-lg px-2 gap-3">
                    {/* 왼쪽 */}
                    <div className="flex-1 min-w-0 max-w-[80%] flex flex-col items-start gap-1.5 overflow-hidden">
                      <div
                        className={`text-label_sb px-1.5 py-1 mt-4 rounded bg-chip-1 text-chip-1-foreground inline-block w-fit`}
                      >
                        <p>{contest.categoryName ? CATEGORYNAME_TO_LABEL[contest.categoryName as CategoryName] : "\u00A0"}</p>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <h3 className="text-gray-900 text-body_bb">
                          {contest.title}
                        </h3>
                      </div>
                    </div>

                    {/* 오른쪽 */}
                    <div className="mt-7 items-center flex-shrink-0">
                      <p className="mr-2 font-bold">{calcDDay(contest.period)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
