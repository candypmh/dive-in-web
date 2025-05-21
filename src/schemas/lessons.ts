import { z } from "zod";

export const lessonSchema = z.object({
  id: z.number(),
  academyName: z.string(),
  academyImageUrl: z
    .string()
    .nullable()
    .default("/empty/academy_profile.png")
    .transform((value) => value || "/empty/academy_profile.png"),
  lessonName: z.string(),
  level: z.string(),
  keyword: z.string(),
  // price: z.string(),
  price: z.string().nullable(),
});

export const lessonDetailSchema = z.object({
  id: z.number(),
  lessonName: z.string().default(""),
  level: z.string().default(""),
  // capacity: z.string().default(""),
  capacity: z.string().nullable().default(""),
  // price: z.string().default(""),
  price: z.string().nullable().default(""),
  keyword: z.string().default(""),
  lessonDetail: z.string().default(""),
  // lessonSchedule: z.string().default(""),
  lessonSchedule: z.string().nullable().default(""),
  lessonStatus: z.string().default(""),
  academy: z.object({
    id: z.number(),
    academyName: z.string().default(""),
    academyInfo: z.string().nullable().default(""),
    profileImageUrl: z
      .string()
      .nullable()
      .default("/empty/image.png")
      .transform((value) => value || "/empty/academy_profile.png"),
  }),
  pool: z
    .object({
      id: z.number(),
      poolName: z.string().default(""),
      poolAddress: z.string().default(""),
      region: z.string().default(""),
      imageUrl: z.string().default(""),
      latitude: z.number().or(z.string()).pipe(z.coerce.number()),
      longitude: z.number().or(z.string()).pipe(z.coerce.number()),
    })
    .nullable(),
  instructors: z
    .object({
      id: z.number(),
      instructorId: z.number(),
      instructorName: z.string().default(""),
      instructorInfo: z.string().default(""),
    })
    .array(),
  images: z.object({ imageUrl: z.string() }).array(),
  applyChannels: z
    .object({
      applyUrlType: z.string(),
      applyUrl: z
        .string()
        .nullable()
        .transform((value) => value || ""),
    })
    .array(),
});

//이 부분이 문제
export const lessonDetailContentSchema = z.object({
  classTopic: z.string().default(""),
  eligibilityRequirements: z.array(z.string()).default([]),
  classIntroduction: z.string().default(""),
  applicationMethod: z.array(z.string()).default([]),
  refundPolicy: z.array(z.string()).default([]),
});
