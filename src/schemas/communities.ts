import { z } from "zod";

export const imageSchema = z.object({
  repImage: z.boolean(),
  imageUrl: z.string().url(),
});

export const communitySchema = z.object({
  postId: z.number(),
  categoryName: z.string().optional(),
  title: z.string(),
  content: z.string(),
  image: imageSchema.nullable(),
  likesCnt: z.number(),
  cmntCnt: z.number().default(0),
  // cmmtCnt: z.string(),
  // viewsCnt: z.string(),
  viewCnt: z.number(),
  writer: z.string(),
  writerProfile: z.string().url().nullable(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  isPopular: z.boolean(),
});

// export const postsSchema = z.object({
//   success: z.boolean(),
//   message: z.string().nullable(),
//   data: z.array(communitySchema).default([]),
// });

export const communityDetailCommentSchema = z.object({
  cmntId: z.number(),
  content: z.string().max(500),
  groupName: z.number(),
  orderNumber: z.number(),
  cmntClass: z.number(),
  writer: z.string(),
  writerProfile: z.string().optional(),
  // writerProfile: z.string().url().optional(),
  likeCnt: z.number(),
  createdAt: z.string(),
});

export const communityDetailReCommentSchema = z.object({
  // recommentId: z.number(),
  id: z.number(), //대댓글을 달 댓글의 ID
  content: z.string().max(500),
  postId: z.number(),
  memberId: z.number(),
});

export const communityDetailSchema = z.object({
  postId: z.number(),
  categoryName: z.string().optional(),
  title: z.string(),
  content: z.string(),
  images: z.array(imageSchema).max(5).default([]), //이미지가 최대 5장 들어감
  likesCnt: z.number(),
  viewCnt: z.number().default(0),
  cmntCnt: z.number().default(0),
  writer: z.string(),
  writerProfile: z.string().url().nullable(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  // commentList: z.any(),
  // commentList: z.array(communityDetailCommentSchema),
  commentList: z.array(communityDetailCommentSchema).default([]),
  isLiked: z.boolean(),
  isPopular: z.boolean(),
  // isPopular: z.string().nullable(),
});

//페이징을 위한 추가
export const communityResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().nullable(),
  data: z.object({
      posts: z.array(communitySchema),
      totalPosts:z.number(),
      hasMore: z.boolean(),
    }),
    // data: z.array(communitySchema),
});

//오픈그래프를 위한 추가
export const openGraphSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  image: z.string().nullable(),
  url: z.string(),
  error: z.string().nullable(),
});