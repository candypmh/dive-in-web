import * as mockServer from "./mock.server";
import * as mockClient from "./mock.client";
import * as real from "./real";

const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export const getCommunities = useMock? mockServer.getCommunities : real.getCommunities;
export const getCommunity = useMock? mockServer.getCommunity : real.getCommunity;
export const getComments = useMock? mockServer.getComments : real.getComments;
export const createCommunity = useMock ? mockClient.createCommunity : real.createCommunity;


// export const updateCommunity = useMock ? mock.updateCommunity : real.updateCommunity;
// export const deleteCommunity = useMock ? mock.deleteCommunity : real.deleteCommunity;

// export const createComment = useMock ? mock.createComment : real.createComment;

// export const addLikePost = useMock ? mock.addLikePost : real.addLikePost;
// export const deleteLikePost = useMock ? mock.deleteLikePost : real.deleteLikePost;

// export const getOG = useMock ? mock.getOG : real.getOG;
// export const openGraph = useMock ? mock.openGraph : real.openGraph;
