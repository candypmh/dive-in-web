"use server";

import { poolDetailSchema, poolSchema } from "@/schemas/pools";
import { mockPools, mockPoolDetails } from "@/lib/pools/mockPoolsData";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export const getPools = async () => {
  if (useMock) return mockPools;

  try {
    const response = await fetch(`${BASE_URL}/pools`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return mockPools;
    }

    const body = await response.json();
    return poolSchema.array().parse(body.data);
  } catch (error) {
    console.error(error);
    return mockPools;
  }
};

export const getPool = async (id: number) => {
  if (useMock) return mockPoolDetails.find((p) => p.id === id) ?? null;

  try {
    const apiResponse = await fetch(`${BASE_URL}/pools/${id}`, {
      next: { revalidate: 60 },
    });

    if (!apiResponse.ok) {
      return mockPoolDetails.find((p) => p.id === id) ?? null;
    }

    const body = await apiResponse.json();

    return poolDetailSchema.parse(body.data);
  } catch (error) {
    console.error(error);
    return mockPoolDetails.find((p) => p.id === id) ?? null;
  }
};
