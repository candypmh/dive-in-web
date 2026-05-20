"use server";

import { homeResponseScheme } from "@/schemas/home";
import { mockHomeData } from "@/lib/home/mockHomeData";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getHome = async () => {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return mockHomeData;
  }

  try {
    const response = await fetch(`${BASE_URL}/home/initial`, {
      next: { revalidate: 60 },
    });

    const body = await response.json();
    const validateData = homeResponseScheme.parse(body);

    return validateData.data;
  } catch (error) {
    console.error(error);
    return mockHomeData;
  }
};
