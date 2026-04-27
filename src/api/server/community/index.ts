import * as mockServer from "./mock.server";
import * as mockClient from "./mock.client";
import * as real from "./real";

const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export const getCommunities = useMock? mockServer.getCommunities : real.getCommunities;
export const getCommunity = useMock? mockServer.getCommunity : real.getCommunity;
export const getComments = useMock? mockServer.getComments : real.getComments;
export const createCommunity = useMock ? mockClient.createCommunity : real.createCommunity;

// 인증 필요 뮤테이션 — mock 없음, real만 사용
export {
  createComment,
  updateCommunity,
  deleteCommunity,
  addLikePost,
  deleteLikePost,
  updateComment,
  deleteComment,
} from "./real";
