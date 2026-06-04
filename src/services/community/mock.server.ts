import { buildCommunityDetail } from "@/lib/community/mockCommunityDetail";
import { buildCommunityList } from "@/lib/community/mockCommunityList";
import { getPost } from "@/lib/community/communityRepo.client";
import { CommunityProps, communityResponseDetailProps } from "@/types/community";

export const getCommunities = async( category: string = "none", page: string = "0" ): Promise<communityResponseDetailProps>  => {
  try {
    const res = buildCommunityList(category, Number(page));
    const body = res.data;
    return body;
  } catch (error) {
    console.error("[getCommunities] error::", error);
    throw error;
  }
};

export const getCommunity = async (postId: string): Promise<CommunityProps|null> => {
  try {
    const res = buildCommunityDetail(Number(postId));
    return {
      ...res,
      commentList: res.commentList ?? [],
      images: res.images ?? [],
    };
  } catch (error) {
    console.error("[getCommunity] error::", error);
    return null;
  }
};

export const getComments = async (postId: number) => {
  const post = await getPost(postId);
  return post?.commentList ?? [];
};
