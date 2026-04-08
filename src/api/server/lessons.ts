"use server";

import { lessonDetailSchema, lessonSchema } from "@/schemas/lessons";
import { getMockLesson, mockLessonList } from "@/lib/home/mockLessonsData";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export const getLessons = async () => {
  if (USE_MOCK) return mockLessonList;

  try {
    const response = await fetch("https://api.dive-in.co.kr/lessons");
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
    const response = await fetch(`https://api.dive-in.co.kr/lessons/${id}`);
    const body = await response.json();
    return lessonDetailSchema.parse(body.data);
  } catch (error) {
    console.error(error);
    return getMockLesson(id);
  }
};
