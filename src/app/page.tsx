"use client";

import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import InstructorProfile from "./_components/InstructorProfile";
import LessonChip from "@/components/ui/Chip";
import { LuEye } from "react-icons/lu";
import { FiMessageSquare } from "react-icons/fi";
import { TiHeartOutline } from "react-icons/ti";

// export default function Home({content}: {content: string}) {
export default function Home() {
  // const router = useRouter();
  // useEffect(() => {
  //   router.replace("/lessons");
  // }, [router]);
    const [maxLength, setMaxLength] = useState(10);

    useEffect(()=> {
      const handleResize = () => {
        if(window.innerWidth < 640) {
          setMaxLength(16);
        }else if(window.innerWidth < 1024) {
          setMaxLength(30);
        }else{
          setMaxLength(40);
        }
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
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
      <header className="flex gap-2 pt-4 px-4">
        <div className="flex items-center gap-2">
          <Image
            alt="로고"
            src="/image/logo_o.png"
            width={68}
            height={16}
            className="h-4 w-[68px] object-cover"
          />
        </div>
      </header>

      {/* 검색창 */}
      <section className="flex flex-col">
        <div className="flex items-center gap-2 pt-6 px-4 pb-5">
          {/* <h2 className="text-heading_2 text-gray-900">수영장</h2> */}
          {/* <p className="text-body_lb text-gray-500">{pools.length}</p> */}
          <Link href="/search" className="relative w-full">
          <div className="relative w-full">
            <CiSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
            <input
              type="text"
              placeholder="클래스명, 수영장, 커뮤니티 글을 검색해보세요"
              className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              ></input>
          </div>
              </Link>

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
            <div
              key={lesson.id}
              className="p-6 rounded-lg shadow-sm bg-gray-100 flex flex-col h-full"
            >
              {/* 카드 1*/}
              <div className="flex gap-2 items-center pb-2">
                {lesson.chips.map((chip, index) => (
                  <LessonChip key={index} label={chip} />
                ))}
              </div>
              <h4 className="pb-10 text-xl font-bold text-gray-900 mb-1">
                {lesson.title}
              </h4>
              <div className="mt-auto">
                <InstructorProfile
                  avatar={lesson.avatar}
                  name={lesson.instructor}
                />
              </div>
            </div>
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
            <div
              key={lesson.id}
              className="p-6 rounded-lg shadow-sm bg-gray-100 flex flex-col h-full"
            >
              {/* 카드 1*/}
              <div className="flex gap-2 items-center pb-2">
                {lesson.chips.map((chip, index) => (
                  <LessonChip key={index} label={chip} />
                ))}
              </div>
              <h4 className="pb-10 text-xl font-bold text-gray-900 mb-1">
                {lesson.title}
              </h4>
              <div className="mt-auto">
                <InstructorProfile
                  avatar={lesson.avatar}
                  name={lesson.instructor}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col w-full pb-8">
        <div className="flex flex-row px-4 py-2 justify-between">
          <h2 className="text-heading_2 text-gray-900">
            🔥인기있는 커뮤니티 글
          </h2>
          <Link href="/lessons" className="flex">
            <ArrowRightIcon className="w-6 h-6 text-gray-900" />
          </Link>
        </div>
        {/* 카드리스트 */}
        <div className="flex flex-wrap gap-6 px-8 py-1">
          {popularCommunities.map((community) => (
            <div
              key={community.id}
              className="px-4 py-2 rounded-lg shadow-sm bg-gray-100 w-full"
            >
              {/* 카드 1*/}
              <div className="items-center gap-2 pb-2">
                {/* <Link
                  href={`/community/posts/${community.id}`}
                  className=""
                > */}
                  {/* 박스 내용물 하나 */}
                  <div className="flex flex-row justify-between items-start w-full rounded-lg px-2">
                    {/* 왼쪽 */}
                    <div className="flex-1 min-w-0 max-w-[80%] flex flex-col items-start gap-1.5 overflow-hidden">
                      {/* 여기가 태그/인기 */}
                      <div
                        className={`text-label_sb px-1.5 py-1 mt-4 rounded bg-chip-1 text-chip-1-foreground inline-block w-fit`}
                      >
                        <p>{community.categoryName || "\u00A0"}</p>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <h3 className="text-gray-900 text-body_bb">
                          {/* {community.communityTitle} */}
                          {community.title}
                        </h3>
                      </div>
                        {/* <p className="text-body_b text-gray-600 block truncate xs:max-w-[100px] sm:max-w-[200px] md:max-w-[300px] lg:max-w-[400px] "> */}
                      <div className="flex items-center gap-1 overflow-hidden min-w-0">
                        <p className="text-body_b text-gray-600 block truncate w-full">
                          {community.content.length > maxLength ? `${community.content.substring(0, maxLength)}...`
                          : community.content}
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
                          <p className="text-gray-500">{community.cmntCnt}</p>
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
                        <img
                          src={
                            community.images?.imageUrl ||
                            "/empty/community_thumbnail.png"
                          }
                          alt="썸네일"
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      {/* </div> */}
                    </div>
                  </div>
                {/* </Link> */}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col w-full pb-8">
        <div className="flex flex-row px-4 py-2 justify-between">
          <h2 className="pl-2 text-heading_2 text-gray-900">
            New 커뮤니티 글
          </h2>
          <Link href="/lessons" className="flex">
            <ArrowRightIcon className="w-6 h-6 text-gray-900" />
          </Link>
        </div>
        {/* 카드리스트 */}
        <div className="flex flex-wrap gap-6 px-8 py-1">
          {NewCommunities.map((community) => (
            <div
              key={community.id}
              className="px-4 py-2 rounded-lg shadow-sm bg-gray-100 w-full"
            >
              {/* 카드 1*/}
              <div className="items-center gap-2 pb-2">
                {/* <Link
                  href={`/community/posts/${community.id}`}
                  className=""
                > */}
                  {/* 박스 내용물 하나 */}
                  <div className="flex flex-row justify-between items-start w-full rounded-lg px-2">
                    {/* 왼쪽 */}
                    <div className="flex-1 min-w-0 max-w-[80%] flex flex-col items-start gap-1.5 overflow-hidden">
                      {/* 여기가 태그/인기 */}
                      <div
                        className={`text-label_sb px-1.5 py-1 mt-4 rounded bg-chip-1 text-chip-1-foreground inline-block w-fit`}
                      >
                        <p>{community.categoryName || "\u00A0"}</p>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <h3 className="text-gray-900 text-body_bb">
                          {/* {community.communityTitle} */}
                          {community.title}
                        </h3>
                      </div>
                        {/* <p className="text-body_b text-gray-600 block truncate xs:max-w-[100px] sm:max-w-[200px] md:max-w-[300px] lg:max-w-[400px] "> */}
                      <div className="flex items-center gap-1 overflow-hidden min-w-0">
                        <p className="text-body_b text-gray-600 block truncate w-full">
                          {community.content.length > maxLength ? `${community.content.substring(0, maxLength)}...`
                          : community.content}
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
                          <p className="text-gray-500">{community.cmntCnt}</p>
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
                        <img
                          src={
                            community.images?.imageUrl ||
                            "/empty/community_thumbnail.png"
                          }
                          alt="썸네일"
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      {/* </div> */}
                    </div>
                  </div>
                {/* </Link> */}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col w-full pb-8">
        <div className="flex flex-row px-4 py-2 justify-between">
          <h2 className="pl-2 text-heading_2 text-gray-900">
            모집중인 수영대회
          </h2>
          <Link href="/lessons" className="flex">
            <ArrowRightIcon className="w-6 h-6 text-gray-900" />
          </Link>
        </div>
        {/* 카드리스트 */}
        <div className="flex flex-wrap gap-6 px-8 py-1">
          {swimContests.map((contest) => (
            <div
              key={contest.id}
              className="px-4 py-2 rounded-lg shadow-sm bg-gray-100 w-full"
            >
              {/* 카드 1*/}
              <div className="items-center gap-2 pb-2">
                {/* <Link
                  href={`/community/posts/${community.id}`}
                  className=""
                > */}
                  {/* 박스 내용물 하나 */}
                  <div className="flex flex-row justify-between items-start w-full rounded-lg px-2">
                    {/* 왼쪽 */}
                    <div className="flex-1 min-w-0 max-w-[80%] flex flex-col items-start gap-1.5 overflow-hidden">
                      {/* 여기가 태그/인기 */}
                      <div
                        className={`text-label_sb px-1.5 py-1 mt-4 rounded bg-chip-1 text-chip-1-foreground inline-block w-fit`}
                      >
                        <p>{contest.categoryName || "\u00A0"}</p>
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
                          {contest.period.length > maxLength ? `${contest.period.substring(0, maxLength)}...`
                          : contest.period}
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
                    <div className="mt-6 items-center flex-shrink-0">
                      {/* <div className="mt-6 w-24 h-24 overflow-hidden rounded-lg"> */}
                      <p className="mr-2 font-bold">{contest.dDay}</p>
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
      </section>


      {/* <ul className="grid grid-cols-2 gap-4 px-4 pb-10"></ul> */}
    </div>
  );
}

const popularLessons = [
  {
    id: 1,
    chips: ["고급", "접영"],
    title: "마스터즈 평일 교정 훈련 클래스 20글자",
    avatar: "",
    instructor: "수달상회",
  },
  {
    id: 2,
    chips: ["초급", "접영", "다이빙"],
    title: "유소년 선수반",
    avatar: "",
    instructor: "이지스윔",
  },
];

const NewLessons = [
  {
    id: 1,
    chips: ["중급", "접영"],
    title: "마스터즈 평일",
    avatar: "",
    instructor: "물곰TV",
  },
  {
    id: 2,
    chips: ["초급", "접영", "다이빙"],
    title: "청소년 선수반",
    avatar: "",
    instructor: "4레인",
  },
];

const popularCommunities = [
  {
    id: 1,
    categoryName: "커뮤니티",
    title: "수영대회 찾는 중",
    content:
      "안녕하세요, 수영대회에 관심있는 수영장 처돌이입니다. 수영대회 찾아요.",
    images: {
      repImage: true,
      imageUrl:
        "https://dive-in-bucket.kr.object.ncloudstorage.com/2ae3190a-97d6-4600-9e27-470920503c26.jpg",
    },
    likesCnt: 13,
    cmntCnt: 5,
    viewCnt: 0,
  },
  {
    id: 2,
    categoryName: "수영물품",
    title: "수영물품 구해요",
    content: "수모수모수모",
    images: null,
    likesCnt: 13,
    cmntCnt: 5,
    viewCnt: 0,
  },
];

const NewCommunities = [
  {
    id: 1,
    categoryName: "커뮤니티",
    title: "수영대회 찾는 중",
    content:
      "안녕하세요, 수영대회에 관심있는 수영장 처돌이입니다. 수영대회 찾아요.",
    images: {
      repImage: true,
      imageUrl:
        "https://dive-in-bucket.kr.object.ncloudstorage.com/2ae3190a-97d6-4600-9e27-470920503c26.jpg",
    },
    likesCnt: 13,
    cmntCnt: 5,
    viewCnt: 0,
  },
  {
    id: 2,
    categoryName: "커뮤니티",
    title: "안녕하세요~~~~~~~~~",
    content: "수모수모수모",
    images: null,
    likesCnt: 13,
    cmntCnt: 5,
    viewCnt: 0,
  },
];

const swimContests = [
  {
    id: 1,
    categoryName: "수영대회",
    title: "2024 MAC배 전국수영대회",
    period: "2024.11.16 ~ 2024.11.20",
    dDay: "D-7",
  },
  {
    id: 2,
    categoryName: "수영대회",
    title: "2025년 수구 국가대표 및 국가대표 후보선수 선발대회",
    period: "2024.11.16 ~ 2024.11.20",
    dDay: "D-71",
  },
  {
    id: 3,
    categoryName: "수영대회",
    title: "2026년 하계 올림픽 대표팀 최종 선발전",
    period: "2026.06.01 ~ 2026.06.05",
    dDay: "D-14",
  },
];
