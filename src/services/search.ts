import { searchSchema } from "@/schemas/search";

export const getSearch = async (keyword: string) => {
  try {
    const response = await fetch(`/api/search?keyword=${encodeURIComponent(keyword)}`);
    const body = await response.json();

    return searchSchema.array().parse(body);
  } catch (error) {
    console.error(error);
    return [];
  }
};
