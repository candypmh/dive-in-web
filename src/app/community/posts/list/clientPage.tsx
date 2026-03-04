"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import FloatingButton from "../../_components/FloatingButton";
import CategoryFilter from "@/app/community/_components/CategoryFilter";
import { CATEGORIES, KEY_TO_CATEGORYNAME } from "@/constants/categories";
import { listPage } from "@/lib/community/communityRepo.client";
import { CommunitiesProps } from "@/types/community";

const PAGE_SIZE = 10;
type CategoryKey = keyof typeof KEY_TO_CATEGORYNAME;

export default function CommunitiesClient({
  category,
}: {
  category: string;
}) {
  const categoryKey = category as CategoryKey;
  const [items, setItems] = useState<CommunitiesProps[]>([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({ threshold: 0 });
  const router = useRouter();

  // Reset state when category changes
  useEffect(() => {
    setItems([]);
    setPage(0);
    setHasNext(true);
  }, [categoryKey]);

  // Load a page whenever categoryKey or page changes
  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    listPage({ categoryKey, page, pageSize: PAGE_SIZE })
      .then((result) => {
        if (cancelled) return;
        setItems((prev) => (page === 0 ? result.items : [...prev, ...result.items]));
        setHasNext(result.hasNext);
      })
      .catch(() => {
        if (!cancelled) setHasNext(false);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [categoryKey, page]);

  // Trigger next page when sentinel enters view
  useEffect(() => {
    if (inView && hasNext && !loading) {
      setPage((p) => p + 1);
    }
  }, [inView, hasNext, loading]);

  return (
    <div>
      <div className="mb-4 px-4 grid grid-cols-3 gap-2 md:flex md:flex-nowrap md:gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() =>
              router.replace(`/community/posts/list?category=${c.key}`)
            }
            className={`w-full md:w-auto px-2 py-1 text-xs md:px-4 md:py-2 md:text-base
                        rounded-full whitespace-nowrap font-bold
                        ${category === c.key ? "bg-gray-300 text-black" : "bg-gray-100 text-gray-500"}
                        hover:bg-gray-300`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <ul className="flex flex-col gap-1 px-4 pb-10">
        {items.length > 0 ? (
          items.map((community) => (
            <CategoryFilter
              key={community.postId}
              community={community}
              selectedCategory={category}
            />
          ))
        ) : !loading ? (
          <p className="text-gray-500"></p>
        ) : null}
      </ul>

      <FloatingButton />

      {/* Infinite scroll sentinel — always rendered so the observer stays active */}
      <div ref={ref} className="py-4 flex justify-center">
        {loading && (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin" />
            <span className="text-gray-400">Loading more...</span>
          </div>
        )}
        {!hasNext && !loading && (
          <p className="pb-8 text-center text-gray-400">더 이상 게시물이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
