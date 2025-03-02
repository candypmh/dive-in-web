import Link from "next/link";
import { LuEye } from "react-icons/lu";
import { FiMessageSquare } from "react-icons/fi";
import { TiHeartOutline } from "react-icons/ti";
import WriterProfile from "./WriterProfile";
import { useState } from "react";
import { CommunitiesProps } from "@/types/community";
import { CATEGORIES } from "@/constants/categories";

// const CATEGORIES = [
//   { name: "전체", key: "none" },
//   { name: "인기글", key: "popular" },
//   { name: "소통해요", key: "communication" },
//   { name: "수영장", key: "pool" },
//   { name: "수영물품", key: "goods" },
//   { name: "수영대회", key: "competition" },
// ];

export default function CategoryFilter({
  community,
  selectedCategory,
}: {
  community: CommunitiesProps;
  selectedCategory: string;
}) {
  const categoryName =
    CATEGORIES.find((category) => category.key === selectedCategory)?.name ||
    "알 수 없음";

  // console.warn(":::::::::::::::::::::::카테고리필터의 postID:", community.postId);

  return (
    <li className="border-b border-gray-300 pb-4">
      <Link
        href={`/community/posts/${community.postId}`}
        className="flex flex-col gap-2"
      >
        <div className="flex-1 flex flex-row items-start gap-1 bg-white-100 rounded-lg px-2">
          {/* 왼쪽 */}
          <div className="flex-1 flex flex-col items-start gap-1.5">
            {/* 여기가 태그/인기 */}
            <div
              className={`text-label_sb px-1.5 py-1 mt-4 rounded bg-chip-1 text-chip-1-foreground inline-block w-fit`}
            >
              <p>{community.categoryName || "\u00A0"}</p>
            </div>

            {/* {selectedCategory === "none" || selectedCategory === "popular" ? 
              (
                <div className={`text-label_sb px-1.5 py-1 mt-3 rounded bg-chip-1 text-chip-1-foreground inline-block w-fit`}>
                  <p>{community.categoryName || "\u00A0"}</p>
                </div>
              ) : (
                <div className={`text-label_sb px-1.5 py-0.5 w-fit`}>
                  <p>&nbsp;</p>
                </div>
              )
            } */}

            <div className="flex flex-col gap-0.5">
              <h3 className="text-gray-900 text-body_bb">
                {/* {community.communityTitle} */}
                {community.title}
              </h3>
            </div>

            <div className="flex items-center gap-1">
              <p className="text-body_b text-gray-600">
                {/* {community.communityContent} */}
                {/* 게시글 내용입니다. */}
                {community.content}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <WriterProfile
                avatar={community.writerProfile}
                name={community.writer}
              />
            </div>

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
          <div className="flex flex-col items-center w-24">
            <div className="mt-6 w-24 h-24 overflow-hidden rounded-lg">
              <img
                src={
                  community.image?.imageUrl || "/empty/community_thumbnail.png"
                }
                alt="썸네일"
                className="w-full h-full object-cover"
              />
            </div>

            {/* {selectedCategory === "none" || selectedCategory === "popular" ? 
              (
                <div className="mt-6 w-24 h-24 overflow-hidden rounded-lg">
                  <img
                src={community.image?.imageUrl || "/empty/community_thumbnail.png"}
                alt="썸네일"
                className="w-full h-full object-cover"
              />
                </div>
              ) : (
                <div className="mt-5 w-24 h-24 overflow-hidden rounded-lg">
                  <img
                src={community.image?.imageUrl || "/empty/community_thumbnail.png"}
                alt="썸네일"
                className="w-full h-full object-cover"
              />
                </div>
              )
            } */}

            <span className="mt-3 text-b text-gray-500 ml-auto">
              {/* {community.createdAt.split(" ")[0].slice(2)} */}
              {community.createdAt.slice(2, 12)}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
