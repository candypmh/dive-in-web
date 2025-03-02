"use server";

import { poolDetailSchema, poolSchema } from "@/schemas/pools";

const BASE_URL = "https://api.dive-in.co.kr";

export const getPools = async () => {
  try {
    const response = await fetch(`${BASE_URL}/pools`);

    if (!response.ok) {
      return [];
    }

    const body = await response.json();

    return poolSchema.array().parse(body.data);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getPool = async (id: number) => {
  try {
    const apiResponse = await fetch(`https://api.dive-in.co.kr/pools/${id}`);

    if (!apiResponse.ok) {
      return null;
    }

    const body = await apiResponse.json();

    return poolDetailSchema.parse(body.data);
  } catch (error) {
    console.error(error);
    return null;
  }
};
