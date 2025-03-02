export type CommunitiesProps = {
  postId: number;
  categoryName?: string;
  title: string;
  content: string;
  image: { repImage: boolean; imageUrl: string } | null;
  likesCnt: number;
  cmntCnt: number;
  viewCnt: number;
  writer: string;
  writerProfile: string | null;
  createdAt: string;
  updatedAt: string | null;
  isPopular: boolean;
};

export type CommunityProps = {
  postId: number;
  categoryName?: string;
  title: string;
  content: string;
  images: { repImage: boolean; imageUrl: string }[];
  likesCnt: number;
  viewCnt: number;
  cmntCnt: number;
  // cmntCnt: string;
  writer: string;
  writerProfile: string | null;
  createdAt: string;
  updatedAt: string | null;
  commentList: CommentProps[];
  // commentList: [];
  isLiked: boolean;
  isPopular: boolean;
};

export type CommentProps = {
  cmntId: number;
  content: string;
  groupName: number;
  orderNumber: number;
  cmntClass: number;
  writer: string;
  writerProfile: string;
  likeCnt: number;
  createdAt: string;
};

//추가
export type communityResponseProps = {
  success: boolean;
  message: string | null;
  data: communityResponseDetailProps[];
};

//추가
export type communityResponseDetailProps = {
  posts: CommunitiesProps[];
  totalPosts: number;
  hasMore: boolean;
};
