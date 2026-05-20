import { z } from "zod";

export const poolSchema = z.object({
  id: z.number(),
  poolName: z.string().default(""),
  poolAddress: z.string().default(""),
  region: z.string().default(""),
  imageUrl: z.string().nullable().default(""),
  latitude: z.number().or(z.string()).pipe(z.coerce.number()),
  longitude: z.number().or(z.string()).pipe(z.coerce.number()),
});

export const poolDetailSchema = z.object({
  id: z.number(),
  poolName: z.string().default(""),
  poolAddress: z.string().default(""),
  operatingHours: z.string().default(""),
  closingDays: z.string().default(""),
  latitude: z.number().or(z.string()).pipe(z.coerce.number()),
  longitude: z.number().or(z.string()).pipe(z.coerce.number()),
  contact: z.string().default(""),
  laneLength: z.number().nullable(),
  laneCount: z.number().nullable(),
  maxDepth: z.number().nullable(),
  minDepth: z.number().nullable(),
  facilities: z.string().default(""),
  region: z.string().default(""),
  poolImages: z.array(
    z.object({
      repImage: z.boolean(),
      imageUrl: z.string(),
    })
  ),
  lessons: z.array(
    z.object({
      id: z.number(),
      academyName: z.string().default(""),
      academyImageUrl: z
        .string()
        .nullable()
        .default("")
        .transform((value) => value || "/empty/academy_profile.png"),
      keyword: z.string().default(""),
      lessonName: z.string().default(""),
      level: z.string().default(""),
      price: z.string().nullable().default(""),
    })
  ),
});

export const dummyPoolDetailSchema = z.object({
  id: z.number(),
  poolName: z.string(),
  poolAddress: z.string(),
  operatingHours: z.string(),
  closingDays: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  contact: z.string(),
  laneLength: z.number(),
  laneCount: z.number(),
  maxDepth: z.number(),
  minDepth: z.number(),
  facilities: z.string(),
  region: z.string(),
  poolImage: z.array(
    z.object({
      repImage: z.boolean(),
      imageUrl: z.string(),
    })
  ),
  lesson: z.array(
    z.object({
      id: z.number(),
      academyName: z.string(),
      academyImageUrl: z.string(),
      keyword: z.string(),
      lessonName: z.string(),
      level: z.string(),
      price: z.number(),
    })
  ),
});
