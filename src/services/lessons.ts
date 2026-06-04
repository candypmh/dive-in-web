"use server";

import { lessonDetailSchema, lessonSchema } from "@/schemas/lessons";
import { getMockLesson, mockLessonList } from "@/lib/home/mockLessonsData";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getLessons = async () => {
  if (USE_MOCK) return mockLessonList;

  try {
    const response = await fetch(`${BASE_URL}/lessons`, {
      next: { revalidate: 60 },
    });
    const body = await response.json();

    return lessonSchema.array().parse(body.data);
  } catch (error) {
    console.error(error);
    return mockLessonList;
  }
};

export const getLesson = async (id: number) => {
  if (USE_MOCK) return getMockLesson(id);

  try {
    const response = await fetch(`${BASE_URL}/lessons/${id}`, {
      next: { revalidate: 60 },
    });
    const body = await response.json();
    return lessonDetailSchema.parse(body.data);
  } catch (error) {
    console.error(error);
    return getMockLesson(id);
  }
};
