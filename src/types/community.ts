import { CategoryName } from "@/constants/categories";
import { CommunityApiProps, CommunityDetailApiProps, openGraphSchema } from "@/schemas/communities";
import { z } from "zod";

// export type CommunitiesProps = {
//   postId: number;
//   categoryName: CategoryName;
//   title: string;
//   content: string;
//   image: { repImage: boolean; imageUrl: string } | null;
//   likesCnt: number;
//   cmntCnt: number;
//   viewCnt: number;
//   writer: string;
//   writerProfile: string | null;
//   createdAt: string;
//   updatedAt: string | null;
//   isPopular: boolean;
// };

export type CommunitiesProps = Omit<CommunityApiProps, "categoryName"> & {
  categoryName: CategoryName;
};

export type CommunityProps = Omit<CommunityDetailApiProps, "categoryName"> & {
  categoryName: CategoryName;
};

// export type CommunityProps = {
//   postId: number;
//   categoryName: CategoryName;
//   title: string;
//   content: string;
//   images: { repImage: boolean; imageUrl: string }[];
//   likesCnt: number;
//   viewCnt: number;
//   cmntCnt: number;
//   // cmntCnt: string;
//   writer: string;
//   writerProfile: string | null;
//   createdAt: string;
//   updatedAt: string | null;
//   commentList: CommentProps[];
//   // commentList: [];
//   isLiked: boolean;
//   isPopular: boolean;
// };

export type CommentProps = {
  postId?: number;
  cmntId: number;
  content: string;
  groupName: number;
  orderNumber: number;
  cmntClass: number;
  writer: string;
  writerId: string;
  writerProfile: string | null;
  likeCnt: number;
  createdAt: string;
};


// interface CommentProps {
// writerId: number;
// loggedUserId: number | null;
//   postId?: number;
//   cmntId: number;
//   content: string;
//   groupName?: number;
//   orderNumber?: number;
//   cmntClass?: number;
//   writer: string;
//   writerProfile: string;
//   likeCnt?: number;
//   createdAt: string;
// }

//추가
export type communityResponseProps = {
  success: boolean;
  message: string | null;
  data: communityResponseDetailProps[];
};

//추가
export type communityResponseDetailProps = {
  posts: CommunityApiProps[];
  totalPosts: number;
  hasMore: boolean;
};

//추가
export type openGraphProps = z.infer<typeof openGraphSchema>;

// export type HomeResponseProps = z.infer<typeof homeResponseScheme>;
// export type HomeProps = HomeResponseProps["data"];