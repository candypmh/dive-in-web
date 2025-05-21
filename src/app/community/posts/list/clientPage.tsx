"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import FloatingButton from "../../_components/FloatingButton";
import CategoryFilter from "@/app/community/_components/CategoryFilter";
import { getCommunities } from "@/api/server/community";
import { useRouter } from "next/navigation";
import { CommunitiesProps, communityResponseDetailProps, communityResponseProps } from "@/types/community";
import { CATEGORIES } from "@/constants/categories";
import { useInView } from "react-intersection-observer";

// export const CATEGORIES = [
//   {name: "전체", key: "none"},
//   {name: "인기글", key: "popular"},
//   {name: "소통해요", key: "communication"},
//   {name: "수영장", key: "pool"},
//   {name: "수영물품", key: "goods"},
//   {name: "수영대회", key: "competition"},
// ];

export default function CommunitiesClient({ communityList, category, page }:{
  // communityList: CommunitiesProps[];
    communityList: communityResponseDetailProps;
    category: string; 
    page: string;
    // hasMore: boolean;
    // totalposts: number;
  }) {
  const [selectedCategory, setSelectedCategory] = useState<string>(category); //기본 카테고리
  const [communities, setCommunities] = useState<CommunitiesProps[]>(communityList.posts); //초기 데이터
  
  //무한스크롤 추가
  const [currentPage, setCurrentPage] = useState<number>(Number(page) || 0);
  const [hasMore, setHasMore] = useState<boolean>(communityList.hasMore);
  const {ref, inView} = useInView({
    threshold: 0.5, // 요소가 50% 보일 때 inView가 true로 바뀜
  });

  const router = useRouter();

  //카테고리 변경시 URL 업데이트
  useEffect(() => {
    //카테고리 변경시 데이터 가져옴
    const fetchData = async() => {
      const data: communityResponseDetailProps = await getCommunities(selectedCategory, page);
      setCommunities(data.posts);
      setHasMore(data.hasMore);
      setCurrentPage(0);
    };

    fetchData();
    router.push(`/community/posts/list?category=${selectedCategory}&page=${page}`);
  },[selectedCategory, page]);


  //무한스크롤
  useEffect(()=> {
    if(inView && hasMore) {
      const fetchMoreData = async() => {
        const nextPage = currentPage + 1;
        const data: communityResponseDetailProps = await getCommunities(selectedCategory, String(nextPage));

        if(data.posts.length > 0) {
          setCommunities((prev) => [...prev, ...data.posts]);
          setHasMore(data.hasMore);
          setCurrentPage(nextPage);
        }else{
          setHasMore(false);
        }
      };

      fetchMoreData();
    }
  },[inView, hasMore, currentPage, selectedCategory]);

  return (
    <div>
      <div className="flex gap-2 mb-4 px-4">
        {CATEGORIES.map((category) => (
          <button
            key={category.key}
            onClick={() => setSelectedCategory(category.key)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category.key
                ? "bg-gray-300 text-black font-bold"
                : "bg-gray-100 text-gray-500 font-bold"
            } 
              hover:bg-gray-300`}
          >
            {category.name}
          </button>
        ))}
      </div>

        {/*로딩 중*/}
        {/* {loading? (
          <p>로딩 중...</p>
        ) : ( */}
          <ul className="flex flex-col gap-1 px-4 pb-10">
          {communities && communities.length > 0 ? (
            communities.map((community) => (
              <CategoryFilter key={community.postId} community={community} selectedCategory={selectedCategory} />
            ))
          ) : (
            <p className="text-gray-500">해당 커뮤니티가 존재하지 않습니다.</p>
          )}
        </ul>
        {/* )} */}
        <FloatingButton />

        {/* 무한스크롤 감지 */}
        {hasMore? (
          <div className="flex justify-center pb-8 gap-2">
            <div className="w-6 h-6 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div>
            <div ref={ref} className="text-gray-400">Loading more...</div>
          </div>

        ) : (
          <p className="text-center text-gray-400 pb-8">더 이상 게시물이 없습니다.</p>
        )}
    </div>
  );
}
