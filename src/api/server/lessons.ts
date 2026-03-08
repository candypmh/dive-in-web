"use server";

import { lessonDetailSchema, lessonSchema } from "@/schemas/lessons";

export const getLessons = async () => {
  try {
    const response = await fetch("https://api.dive-in.co.kr/lessons");
    const body = await response.json();

    return lessonSchema.array().parse(body.data);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getLesson = async (id: number) => {
  try {
    const response = await fetch(`https://api.dive-in.co.kr/lessons/${id}`);
    const body = await response.json();
    return lessonDetailSchema.parse(body.data);
  } catch (error) {
    console.error(error);
    return null;
  }
};
