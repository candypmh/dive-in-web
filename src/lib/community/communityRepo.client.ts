"use client";

import { CommunitiesProps, CommunityProps, CommentProps } from "@/types/community";
import { buildCommunityDetail } from "./mockCommunityDetail";
import { CATEGORY_NAMES, CategoryName, KEY_TO_CATEGORYNAME } from "@/constants/categories";

type CategoryKey = keyof typeof KEY_TO_CATEGORYNAME;

const STORAGE_KEY = "mock_communities_v1";
const SEEDED_KEY = "mock_communities_seeded_v1";

const SEEDABLE_CATEGORIES = CATEGORY_NAMES.filter((c) => c !== "COMPETITION");

function randomCategory(): CategoryName {
  return SEEDABLE_CATEGORIES[Math.floor(Math.random() * SEEDABLE_CATEGORIES.length)];
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

  const competitionPosts: CommunityProps[] = [
    {
      postId: 101,
      categoryName: "COMPETITION",
      title: "2026 MAC배 전국수영대회",
      content: "전국 아마추어 수영인을 대상으로 하는 MAC배 전국수영대회입니다.\n\n📅 일정: 2026.04.12 ~ 2026.04.13\n📍 장소: 잠실실내수영장\n🏊 종목: 자유형, 배영, 평영, 접영, 개인혼영 (50m / 100m / 200m)\n\n참가 신청은 대한수영연맹 홈페이지를 통해 접수하실 수 있습니다.",
      writer: "운영진",
      writerProfile: null,
      likesCnt: 24,
      cmntCnt: 8,
      viewCnt: 312,
      isPopular: false,
      isLiked: false,
      createdAt: "2026-03-01T09:00:00.000Z",
      updatedAt: "2026-03-01T09:00:00.000Z",
      images: [],
      commentList: [],
    },
    {
      postId: 102,
      categoryName: "COMPETITION",
      title: "2026 전국 마스터즈 수영대회",
      content: "마스터즈 등록 선수를 대상으로 하는 전국 마스터즈 수영대회입니다.\n\n📅 일정: 2026.05.02 ~ 2026.05.04\n📍 장소: 올림픽수영장\n🏊 종목: 연령별 부문 (25세 이상, 5세 단위 구분)\n\n참가 자격: 대한마스터즈수영연맹 등록 선수",
      writer: "운영진",
      writerProfile: null,
      likesCnt: 18,
      cmntCnt: 5,
      viewCnt: 278,
      isPopular: false,
      isLiked: false,
      createdAt: "2026-03-05T09:00:00.000Z",
      updatedAt: "2026-03-05T09:00:00.000Z",
      images: [],
      commentList: [],
    },
  ];

  localStorage.setItem(STORAGE_KEY, JSON.stringify([...competitionPosts, ...fullPosts]));
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

export async function updatePost(postId: number, updates: Partial<CommunityProps>): Promise<void> {
  const posts = await listPosts();
  const idx = posts.findIndex((p) => Number(p.postId) === postId);
  if (idx === -1) throw new Error("Post not found");
  posts[idx] = { ...posts[idx], ...updates, updatedAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

export async function deletePost(postId: number): Promise<void> {
  const posts = await listPosts();
  const filtered = posts.filter((p) => Number(p.postId) !== postId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export async function toggleLike(postId: number): Promise<{ isLiked: boolean; likesCnt: number }> {
  const posts = await listPosts();
  const idx = posts.findIndex((p) => Number(p.postId) === postId);
  if (idx === -1) throw new Error("Post not found");
  const post = posts[idx];
  const newIsLiked = !post.isLiked;
  const newLikesCnt = newIsLiked ? post.likesCnt + 1 : post.likesCnt - 1;
  posts[idx] = { ...post, isLiked: newIsLiked, likesCnt: newLikesCnt };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return { isLiked: newIsLiked, likesCnt: newLikesCnt };
}

export async function deleteComment(postId: number, cmntId: number): Promise<CommentProps[]> {
  const posts = await listPosts();
  const idx = posts.findIndex((p) => Number(p.postId) === postId);
  if (idx === -1) throw new Error("Post not found");
  const updated = posts[idx].commentList.filter((c) => c.cmntId !== cmntId);
  posts[idx] = { ...posts[idx], commentList: updated, cmntCnt: updated.length };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return updated;
}

export async function updateComment(postId: number, cmntId: number, content: string): Promise<CommentProps[]> {
  const posts = await listPosts();
  const idx = posts.findIndex((p) => Number(p.postId) === postId);
  if (idx === -1) throw new Error("Post not found");
  const updated = posts[idx].commentList.map((c) =>
    c.cmntId === cmntId ? { ...c, content } : c
  );
  posts[idx] = { ...posts[idx], commentList: updated };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return updated;
}

export async function addComment(postId: number, content: string): Promise<CommentProps[]> {
  const posts = await listPosts();
  const idx = posts.findIndex((p) => Number(p.postId) === postId);
  if (idx === -1) throw new Error("Post not found");
  const newComment: CommentProps = {
    cmntId: Date.now(),
    content,
    writer: "나",
    writerProfile: null,
    groupName: 0,
    orderNumber: 0,
    cmntClass: 0,
    likeCnt: 0,
    createdAt: new Date().toISOString(),
  };
  const updated = [...(posts[idx].commentList ?? []), newComment];
  posts[idx] = { ...posts[idx], commentList: updated, cmntCnt: updated.length };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return updated;
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
