"use server";

import { homeResponseScheme } from "@/schemas/home";
import { mockHomeData } from "@/lib/home/mockHomeData";

export const getHome = async () => {
  if (process.env.USE_MOCK === "true") {
    return mockHomeData;
  }

  try {
    const response = await fetch("https://api.dive-in.co.kr/home/initial", {
      next: { revalidate: 0 }, //최신상태 유지를 위해 캐싱 X
    });

    const body = await response.json();
    const validateData = homeResponseScheme.parse(body);

    return validateData.data;
  } catch (error) {
    console.error(error);
    return {
      topViewLessonList: [],
      newLessonList: [],
      topViewPostList: [],
      newPostList: [],
      competitionPostList: [],
    };
  }
};
