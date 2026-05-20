import { nullable, z } from "zod";

export const imageSchema = z.object({
  repImage: z.boolean(),
  imageUrl: z.string().url(),
});

// export const homeScheme = z.object({

// });

export const topViewLessonListSchema = z.object({
  id: z.number(),
  instructorName: z.string(),
  instructorImgUrl: z
  .string()
  .nullable()
  .default("/empty/academy_profile.png")
  .transform((value) => value || "/empty/academy_profile.png"),
  keyword: z.string(),
  lessonName: z.string(),
  // lessonImgUrl: z.object({ imageUrl: z.string() }).array(),
  lessonImgUrl: z.string().url(),
  level: z.string(),
  price: z.string().nullable(),
  viewCnt: z.number(),
});

export const newLessonListSchema = z.object({
  id: z.number(),
  instructorName: z.string(),
  instructorImgUrl: z
  .string()
  .nullable()
  .default("/empty/academy_profile.png")
  .transform((value) => value || "/empty/academy_profile.png"),
  keyword: z.string(),
  lessonName: z.string(),
  // lessonImgUrl: z.object({ imageUrl: z.string() }).array(),
  lessonImgUrl: z.string().url(),
  level: z.string(),
  price: z.string().nullable(),
  viewCnt: z.number(),
});

export const topViewPostListSchema = z.object({
  postId: z.number(),
  categoryName: z.string().optional(),
  title: z.string(),
  content: z.string(),
  image: z.object({ repImage: z.boolean(), imageUrl: z.string() }).nullable(),
  likesCnt: z.number(),
  cmntCnt: z.number().default(0),
  viewCnt: z.number(),
  writer: z.string(),
  writerProfile: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
});

export const newPostListSchema = z.object({
  postId: z.number(),
  categoryName: z.string().optional(),
  title: z.string(),
  content: z.string(),
  image: z.object({ repImage: z.boolean(), imageUrl: z.string() }).nullable(),
  likesCnt: z.number(),
  cmntCnt: z.number().default(0),
  viewCnt: z.number(),
  writer: z.string(),
  writerProfile: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
});

export const competitionPostListSchema = z.object({
  //모집중인 수영대회
  //임시구조
  postId: z.number().nullable(),
  title: z.string().nullable(),
  content: z.string().nullable(),
  categoryName: z.string().nullable(),
  period: z.string().nullable(),
  dDay: z.string().nullable(),
});

export const homeResponseScheme = z.object({
  success: z.boolean(),
  message: z.string().nullable(),
  data: z.object({
    topViewLessonList: z.array(topViewLessonListSchema),
    newLessonList: z.array(newLessonListSchema),
    topViewPostList: z.array(topViewPostListSchema),
    newPostList: z.array(newPostListSchema),
    competitionPostList: z.array(competitionPostListSchema),
  }),
});




