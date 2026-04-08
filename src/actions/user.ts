"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getUser = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      next: { tags: ["user"] },
    });

    if (!userResponse.ok) {
      console.error(await userResponse.json());
      return null;
    }

    const body = await userResponse.json();
    const user = body.user;

    return {
      id: user.id,
      nickname: user.nickname,
      profileImageUrl: user.profile_image || "/image/logo_b.png",
      email: "",
      role: "user",
      socialType: "KAKAO",
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateUser = async (formData: FormData) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const userResponse = await fetch("https://api.dive-in.co.kr/user/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!userResponse.ok) {
      const body = await userResponse.json();
      console.error(body);
      return null;
    }

    revalidateTag("user");
  } catch (error) {
    console.error(error);
  }
};
