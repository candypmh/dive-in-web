import { getCommunities } from "@/api/server/community/mock";
import Link from "next/link";
import Image from "next/image";
import CommunitiesClient from "./clientPage";
import { CATEGORIES } from "@/constants/categories";

export default async function CommunityPage({searchParams}: {searchParams: {category?: string; page?: string};}) {
  const category = searchParams.category || "none";
  const page = searchParams.page || "0";
  console.log("category:", category, "page:", page); 

  const communities = await getCommunities(category, page);
  const selectedCategoryName = CATEGORIES.find((cate) => cate.key === category)?.name || "전체";
  
  return (
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

      <section className="flex flex-col">
        <div className="flex items-center gap-2 pt-6 px-4 pb-5">
          <h2 className="text-heading_2">{selectedCategoryName}</h2>
          {/* <p className="text-body_lb text-gray-500">{communities.posts.length}</p> */}
        </div>

        <div>
          <CommunitiesClient communityList={communities} category={category} page={page}/>
        </div>
      </section>
    </div>
  );
}