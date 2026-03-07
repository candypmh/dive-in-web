"use server";

import { searchSchema } from "@/schemas/search";

export const getSearch = async(keyword: string) => {
  try {
    const response = await fetch(`https://api.dive-in.co.kr/home/search?keyword=${keyword}`);
    const body = await response.json();
    
    return searchSchema.array().parse(body.data);
  } catch (error) {
    console.error(error);
    return [];
  }
};