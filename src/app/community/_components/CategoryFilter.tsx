import Image from "next/image";
import Link from "next/link";
import { LuEye } from "react-icons/lu";
import { FiMessageSquare } from "react-icons/fi";
import { TiHeartOutline } from "react-icons/ti";
import WriterProfile from "./WriterProfile";
import { useState } from "react";
import { CommunitiesProps } from "@/types/community";
import { CATEGORIES } from "@/constants/categories";
import { formatKST } from "@/utils";

//Mock
const CATEGORY_LABEL_MAP: Record<string, string> = {
  COMMUNICATION: "소통해요",
  POOL: "수영장",
  GOODS: "수영물품",
  COMPETITION: "수영대회",
};

export default function CategoryFilter({
  community,
  selectedCategory,
}: {
  community: CommunitiesProps;
  selectedCategory: string;
}) {
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
              <p>{CATEGORY_LABEL_MAP[community.categoryName ?? ""] ?? ""}</p>
            </div>

            <div className="flex flex-col gap-0.5">
              <h3 className="text-gray-900 text-body_bb">
                {community.title}
              </h3>
            </div>

            <div className="flex items-center gap-1">
              <p className="text-body_b text-gray-600">
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
              <Image
                src={community.image?.imageUrl || "/empty/community_thumbnail.png"}
                alt="썸네일"
                width={96}
                height={96}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>

            <span className="mt-3 text-b text-gray-500 ml-auto">
              {formatKST(community.createdAt)}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
