"use client";

import { CommunitiesProps, CommunityProps } from "@/types/community";
import { buildCommunityDetail } from "./mockCommunityDetail";
import { CATEGORY_NAMES, CategoryName, KEY_TO_CATEGORYNAME } from "@/constants/categories";

type CategoryKey = keyof typeof KEY_TO_CATEGORYNAME;

const STORAGE_KEY = "mock_communities_v1";
const SEEDED_KEY = "mock_communities_seeded_v1";

function randomCategory(): CategoryName {
  return CATEGORY_NAMES[Math.floor(Math.random() * CATEGORY_NAMES.length)];
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function randomPopular(likesCnt: number) {
//   return likesCnt >= 30;
// }

//community -> communities로 변환
export function toListItem(post: CommunityProps): CommunitiesProps {
  return {
    postId: post.postId,
    categoryName: post.categoryName,
    title: post.title,
    content: post.content,
    image: post.images?.[0]
      ? { repImage: post.images[0].repImage, imageUrl: post.images[0].imageUrl }
      : null,
    likesCnt: post.likesCnt,
    cmntCnt: post.cmntCnt,
    viewCnt: post.viewCnt,
    writer: post.writer,
    writerProfile: post.writerProfile,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    isPopular: post.isPopular,
  };
}

export async function ensureSeeded(category: string = "none") {
  if (typeof window === "undefined") return;

  const seeded = localStorage.getItem(SEEDED_KEY);
  if (seeded === "true") {
    return;
  }

  // seed 데이터 35개 직접 생성
  const SEED_COUNT = 35;
  const fullPosts: CommunityProps[] = Array.from({ length: SEED_COUNT }, (_, i) => {
    const postId = i + 1;
    const detail = buildCommunityDetail(postId);
    const categoryName = randomCategory();
    const likesCnt = randomInt(0, 120);
    const viewCnt = randomInt(0, 1500);
    const isPopular = likesCnt >= 80;

    return {
      ...detail,
      categoryName,
      likesCnt,
      viewCnt,
      isPopular,
      commentList: detail.commentList ?? [],
      images: detail.images ?? [],
    };
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(fullPosts));
  localStorage.setItem(SEEDED_KEY, "true");
}

export async function listPosts(): Promise<CommunityProps[]> {
  try {
    if (typeof window === "undefined") return [];

    const data = localStorage.getItem(STORAGE_KEY);
    if(!data) return [];

    return JSON.parse(data);

  } catch (error) {
    console.error("[listPosts] JSON.parse failed::", error);
    return [];
  }
}

export async function getPost(postId: number): Promise<CommunityProps | null> {
  await ensureSeeded();
  const posts = await listPosts();
  return posts.find((p) => Number(p.postId) === Number(postId)) ?? null;
}

export async function createPost(newPost: CommunityProps): Promise<number> {
    try {
    const posts = await listPosts();
    posts.unshift(newPost);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));

  } catch (error) {
    console.error("[createPost] localStorage.setItem failed::", error);
    // 선택 1) 조용히 무시 (데모니까)
    // 선택 2) throw 해서 UI에서 토스트 띄우기
    throw error;
  }

  return newPost.postId;
}

export async function listPage(params: {
  categoryKey: CategoryKey;
  page: number;
  pageSize: number;
}): Promise<{
  items: CommunitiesProps[];
  page: number;
  pageSize: number;
  total: number;
  hasNext: boolean;
}> {
  await ensureSeeded();
  const { categoryKey, page, pageSize } = params;

  const posts = await listPosts();

  let filtered: CommunityProps[];
  if (categoryKey === "popular") {
    filtered = posts.filter((p) => p.isPopular);
  } else {
    const categoryValue = KEY_TO_CATEGORYNAME[categoryKey];
    filtered = categoryValue ? posts.filter((p) => p.categoryName === categoryValue) : posts;
  }

  const sorted = [...filtered].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const total = sorted.length;
  const start = page * pageSize;

  return {
    items: sorted.slice(start, start + pageSize).map(toListItem),
    page,
    pageSize,
    total,
    hasNext: start + pageSize < total,
  };
}
