"use client";

import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchStore } from "@/store/searchStore";
import InstructorProfile from "./_components/InstructorProfile";
import LessonChip from "@/components/ui/Chip";
import { LuEye } from "react-icons/lu";
import { FiMessageSquare } from "react-icons/fi";
import { TiHeartOutline } from "react-icons/ti";
import { getHome } from "@/api/server/home";
import { HomeProps } from "@/types/home";
import { CATEGORYNAME_TO_LABEL, CategoryName } from "@/constants/categories";

function calcDDay(period: string | null): string {
  if (!period) return "";
  const startStr = period.split("~")[0].trim().replace(/\./g, "-");
  const start = new Date(startStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.ceil((start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff > 0) return `D-${diff}`;
  if (diff === 0) return "D-Day";
  return `D+${Math.abs(diff)}`;
}

// export default function Home({content}: {content: string}) {
export default function HomeClient({ home }: { home: HomeProps }) {
  const router = useRouter();
  // useEffect(() => {
  //   router.replace("/lessons");
  // }, [router]);
  const [homeKeyword, setHomeKeyword] = useState("");
  const { setKeyword } = useSearchStore();

  const popularLessons = home.topViewLessonList;
  const NewLessons = home.newLessonList;
  const topViewPostList = home.topViewPostList;
  const NewCommunities = home.newPostList;
  const swimContests = home.competitionPostList;


  return (
    // <div className="flex flex-col items-center justify-center h-screen bg-white">
    //   <Image
    //     alt="로고"
    //     src="/image/logo_w.png"
    //     width={200}
    //     height={200}
    //     priority
    //   />
    // </div>

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
        <div className="grid grid-cols-2 gap-6 px-8 py-1">
          {popularLessons.map((lesson) => (
            <Link
              key={lesson.id}
              href={`/lessons/${lesson.id}`}
              className="p-6 rounded-lg shadow-sm bg-gray-100 flex flex-col h-full hover:bg-gray-200 transition-colors"
            >
              {/* 카드 1*/}
              <div className="flex flex-wrap gap-2 items-center pb-2">
                {[...lesson.level.split(","), ...lesson.keyword.split(",")].map(
                  (tag, index) => (
                    <LessonChip key={index} label={tag.trim()} />
                  )
                )}
              </div>
              <h4 className="pb-10 text-base sm:text-xl font-bold text-gray-900 mb-1">
                {lesson.lessonName}
              </h4>
              <div className="mt-auto">
                <InstructorProfile
                  avatar={lesson.instructorImgUrl}
                  name={lesson.instructorName}
                />
              </div>
            </Link>
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
        <div className="grid grid-cols-2 gap-6 px-8 py-1">
          {NewLessons.map((lesson) => (
            <Link
              key={lesson.id}
              href={`/lessons/${lesson.id}`}
              className="p-6 rounded-lg shadow-sm bg-gray-100 flex flex-col h-full hover:bg-gray-200 transition-colors"
            >
              {/* 카드 1*/}
              <div className="flex flex-wrap gap-2 items-center pb-2">
                {[...lesson.level.split(","), ...lesson.keyword.split(",")].map(
                  (tag, index) => (
                    <LessonChip key={index} label={tag.trim()} />
                  )
                )}
              </div>
              <h4 className="pb-10 text-base sm:text-xl font-bold text-gray-900 mb-1">
                {lesson.lessonName}
              </h4>
              <div className="mt-auto">
                <InstructorProfile
                  avatar={lesson.instructorImgUrl}
                  name={lesson.instructorName}
                />
              </div>
            </Link>
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
            <Link
              href={"/community/posts/" + community.postId}
              key={community.postId}
              className="px-4 py-2 rounded-lg shadow-sm bg-gray-100 w-full"
            >
              {/* 카드 1*/}
              <div className="items-center gap-2 pb-2">
                {/* <Link
                  href={`/community/posts/${community.id}`}
                  className=""
                > */}
                {/* 박스 내용물 하나 */}
                <div className="flex flex-row justify-between items-start w-full rounded-lg px-2 gap-3">
                  {/* 왼쪽 */}
                  <div className="flex-1 min-w-0 max-w-[80%] flex flex-col items-start gap-1.5 overflow-hidden">
                    {/* 여기가 태그/인기 */}
                    <div
                      className={`text-label_sb px-1.5 py-1 mt-4 rounded bg-chip-1 text-chip-1-foreground inline-block w-fit`}
                    >
                      <p>{community.categoryName ? CATEGORYNAME_TO_LABEL[community.categoryName as CategoryName] : "\u00A0"}</p>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <h3 className="text-gray-900 text-body_bb line-clamp-1 sm:line-clamp-none">
                        {community.title}
                      </h3>
                    </div>
                    {/* <p className="text-body_b text-gray-600 block truncate xs:max-w-[100px] sm:max-w-[200px] md:max-w-[300px] lg:max-w-[400px] "> */}
                    <div className="flex items-center gap-1 overflow-hidden min-w-0">
                      <p className="text-body_b text-gray-600 w-full line-clamp-2 sm:line-clamp-none">
                        {community.content}
                      </p>
                    </div>

                    {/* <div className="flex items-center gap-1">
              <WriterProfile
                avatar={community.writerProfile}
                name={community.writer}
              />
            </div> */}

                    <div className="flex flex-row items-center gap-4">
                      <div className="flex items-center gap-1">
                        <LuEye className="w-5 h-5 text-gray-400" />
                        <p className="text-gray-500"> {community.viewCnt}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiMessageSquare className="w-5 h-5 text-gray-400" />
                        <p className="text-gray-500">{community.cmmtCnt}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <TiHeartOutline className="w-5 h-5 text-gray-400" />
                        <p className="text-gray-500"> {community.likesCnt}</p>
                      </div>
                    </div>
                  </div>

                  {/* 오른쪽 */}
                  {/* <div className="flex flex-col items-center w-24 flex-shrink-0"> */}
                  <div className="mt-6 items-center w-24 flex-shrink-0">
                    {/* <div className="mt-6 w-24 h-24 overflow-hidden rounded-lg"> */}
                    <Image
                      src={community.image?.imageUrl || "/empty/community_thumbnail.png"}
                      alt="썸네일"
                      width={96}
                      height={96}
                      className="w-24 h-24 object-cover rounded-lg"
                      unoptimized
                    />
                    {/* </div> */}
                  </div>
                </div>
                {/* </Link> */}
              </div>
            </Link>
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
            <Link
              href={"/community/posts/" + community.postId}
              key={community.postId}
              className="px-4 py-2 rounded-lg shadow-sm bg-gray-100 w-full"
            >
              {/* 카드 1*/}
              <div className="items-center gap-2 pb-2">
                {/* <Link
                  href={`/community/posts/${community.id}`}
                  className=""
                > */}
                {/* 박스 내용물 하나 */}
                <div className="flex flex-row justify-between items-start w-full rounded-lg px-2 gap-3">
                  {/* 왼쪽 */}
                  <div className="flex-1 min-w-0 max-w-[80%] flex flex-col items-start gap-1.5 overflow-hidden">
                    {/* 여기가 태그/인기 */}
                    <div
                      className={`text-label_sb px-1.5 py-1 mt-4 rounded bg-chip-1 text-chip-1-foreground inline-block w-fit`}
                    >
                      <p>{community.categoryName ? CATEGORYNAME_TO_LABEL[community.categoryName as CategoryName] : "\u00A0"}</p>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <h3 className="text-gray-900 text-body_bb line-clamp-1 sm:line-clamp-none">
                        {community.title}
                      </h3>
                    </div>
                    {/* <p className="text-body_b text-gray-600 block truncate xs:max-w-[100px] sm:max-w-[200px] md:max-w-[300px] lg:max-w-[400px] "> */}
                    <div className="flex items-center gap-1 overflow-hidden min-w-0">
                      <p className="text-body_b text-gray-600 w-full line-clamp-2 sm:line-clamp-none">
                        {community.content}
                      </p>
                    </div>

                    {/* <div className="flex items-center gap-1">
              <WriterProfile
                avatar={community.writerProfile}
                name={community.writer}
              />
            </div> */}

                    <div className="flex flex-row items-center gap-4">
                      <div className="flex items-center gap-1">
                        <LuEye className="w-5 h-5 text-gray-400" />
                        <p className="text-gray-500"> {community.viewCnt}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiMessageSquare className="w-5 h-5 text-gray-400" />
                        <p className="text-gray-500">{community.cmmtCnt}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <TiHeartOutline className="w-5 h-5 text-gray-400" />
                        <p className="text-gray-500"> {community.likesCnt}</p>
                      </div>
                    </div>
                  </div>

                  {/* 오른쪽 */}
                  {/* <div className="flex flex-col items-center w-24 flex-shrink-0"> */}
                  <div className="mt-6 items-center w-24 flex-shrink-0">
                    {/* <div className="mt-6 w-24 h-24 overflow-hidden rounded-lg"> */}
                    <Image
                      src={community.image?.imageUrl || "/empty/community_thumbnail.png"}
                      alt="썸네일"
                      width={96}
                      height={96}
                      className="w-24 h-24 object-cover rounded-lg"
                      unoptimized
                    />
                    {/* </div> */}
                  </div>
                </div>
                {/* </Link> */}
              </div>
            </Link>
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
                {/* 카드 1*/}
                <div className="items-center gap-2 pb-2">
                  {/* <Link
                  href={`/community/posts/${community.id}`}
                  className=""
                > */}
                  {/* 박스 내용물 하나 */}
                  <div className="flex flex-row justify-between items-start w-full rounded-lg px-2 gap-3">
                    {/* 왼쪽 */}
                    <div className="flex-1 min-w-0 max-w-[80%] flex flex-col items-start gap-1.5 overflow-hidden">
                      {/* 여기가 태그/인기 */}
                      <div
                        className={`text-label_sb px-1.5 py-1 mt-4 rounded bg-chip-1 text-chip-1-foreground inline-block w-fit`}
                      >
                        <p>{contest.categoryName ? CATEGORYNAME_TO_LABEL[contest.categoryName as CategoryName] : "\u00A0"}</p>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <h3 className="text-gray-900 text-body_bb">
                          {/* {community.communityTitle} */}
                          {contest.title}
                        </h3>
                      </div>
                      {/* <p className="text-body_b text-gray-600 block truncate xs:max-w-[100px] sm:max-w-[200px] md:max-w-[300px] lg:max-w-[400px] "> */}
                      <div className="flex items-center gap-1 overflow-hidden min-w-0">
                        <p className="text-body_b text-gray-600 block truncate w-full">
                          {/* {contest.period.length > maxLength ? `${contest.period.substring(0, maxLength)}...`
                          : contest.period} */}
                        </p>
                      </div>

                      {/* <div className="flex items-center gap-1">
              <WriterProfile
                avatar={community.writerProfile}
                name={community.writer}
              />
            </div> */}

                      {/* <div className="flex flex-row items-center gap-4">
                        <div className="flex items-center gap-1">
                          <LuEye className="w-5 h-5 text-gray-400" />
                          <p className="text-gray-500"> {community.viewCnt}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiMessageSquare className="w-5 h-5 text-gray-400" />
                          <p className="text-gray-500">{community.cmntCnt}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <TiHeartOutline className="w-5 h-5 text-gray-400" />
                          <p className="text-gray-500"> {community.likesCnt}</p>
                        </div>
                      </div> */}
                    </div>

                    {/* 오른쪽 */}
                    {/* <div className="flex flex-col items-center w-24 flex-shrink-0"> */}
                    <div className="mt-7 items-center flex-shrink-0">
                      {/* <div className="mt-6 w-24 h-24 overflow-hidden rounded-lg"> */}
                      <p className="mr-2 font-bold">{calcDDay(contest.period)}</p>
                      {/* <img
                          src={
                            community.images?.imageUrl ||
                            "/empty/community_thumbnail.png"
                          }
                          alt="썸네일"
                          className="w-24 h-24 object-cover rounded-lg"
                        /> */}
                      {/* </div> */}
                    </div>
                  </div>
                  {/* </Link> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
