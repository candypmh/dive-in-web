"use client";

import { CommunitiesProps, CommunityProps } from "@/types/community";
import { buildCommunityList } from "./mockCommunityList";
import { buildCommunityDetail } from "./mockCommunityDetail";
import { CATEGORY_NAMES, CategoryName } from "@/constants/categories";

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
    console.log("seeded::", true);
    return;
  }

  //seed데이터 생성
  // const seedListRes = buildCommunityList(category, 0);
  const seedListRes = buildCommunityList(category, 0);
  const seedPosts: CommunitiesProps[] = seedListRes.data.posts;

  //detail로 확장
  const fullPosts: CommunityProps[] = seedPosts.map((p) => {
    const detail = buildCommunityDetail(Number(p.postId));
    const categoryName = randomCategory();
    // const categoryName = detail.categoryName ?? p.categoryName ?? randomCategory();

    const likesCnt = randomInt(0, 120);
    const viewCnt = randomInt(0, 1500);
    const isPopular = likesCnt >= 50;

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
