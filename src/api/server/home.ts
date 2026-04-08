"use server";

import { homeResponseScheme } from "@/schemas/home";
import { mockHomeData } from "@/lib/home/mockHomeData";

export const getHome = async () => {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return mockHomeData;
  }

  try {
    const response = await fetch("https://api.dive-in.co.kr/home/initial", {
      next: { revalidate: 0 },
    });

    const body = await response.json();
    const validateData = homeResponseScheme.parse(body);

    return validateData.data;
  } catch (error) {
    console.error(error);
    return mockHomeData;
  }
};
