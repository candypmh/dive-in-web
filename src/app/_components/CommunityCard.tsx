import Image from "next/image";
import Link from "next/link";
import { LuEye } from "react-icons/lu";
import { FiMessageSquare } from "react-icons/fi";
import { TiHeartOutline } from "react-icons/ti";
import { CATEGORYNAME_TO_LABEL, CategoryName } from "@/constants/categories";
import { z } from "zod";
import { topViewPostListSchema } from "@/schemas/home";

type CommunityCardProps = {
  community: z.infer<typeof topViewPostListSchema>;
};

export default function CommunityCard({ community }: CommunityCardProps) {
  return (
    <Link
      href={"/community/posts/" + community.postId}
      className="px-4 py-2 rounded-lg shadow-sm bg-gray-100 w-full"
    >
      <div className="items-center gap-2 pb-2">
        <div className="flex flex-row justify-between items-start w-full rounded-lg px-2 gap-3">
          {/* 왼쪽 */}
          <div className="flex-1 min-w-0 max-w-[80%] flex flex-col items-start gap-1.5 overflow-hidden">
            <div className="text-label_sb px-1.5 py-1 mt-4 rounded bg-chip-1 text-chip-1-foreground inline-block w-fit">
              <p>{community.categoryName ? CATEGORYNAME_TO_LABEL[community.categoryName as CategoryName] : "\u00A0"}</p>
            </div>
            <div className="flex flex-col gap-0.5">
              <h3 className="text-gray-900 text-body_bb line-clamp-1 sm:line-clamp-none">
                {community.title}
              </h3>
            </div>
            <div className="flex items-center gap-1 overflow-hidden min-w-0">
              <p className="text-body_b text-gray-600 w-full line-clamp-2 sm:line-clamp-none">
                {community.content}
              </p>
            </div>
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
          <div className="mt-6 items-center w-24 flex-shrink-0">
            <Image
              src={community.image?.imageUrl || "/empty/community_thumbnail.png"}
              alt="썸네일"
              width={96}
              height={96}
              className="w-24 h-24 object-cover rounded-lg"
              unoptimized
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
