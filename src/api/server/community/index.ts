import * as mock from "./mock.server";
import * as real from "./real";

const useMock = process.env.USE_MOCK === "true";

export const getCommunities = useMock? mock.getCommunities : real.getCommunities;
export const getCommunity = useMock? mock.getCommunity : real.getCommunity;
export const getComments = useMock? mock.getComments : real.getComments;
export const createCommunity = useMock ? mock.createCommunity : real.createCommunity;


// export const updateCommunity = useMock ? mock.updateCommunity : real.updateCommunity;
// export const deleteCommunity = useMock ? mock.deleteCommunity : real.deleteCommunity;

// export const createComment = useMock ? mock.createComment : real.createComment;

// export const addLikePost = useMock ? mock.addLikePost : real.addLikePost;
// export const deleteLikePost = useMock ? mock.deleteLikePost : real.deleteLikePost;

// export const getOG = useMock ? mock.getOG : real.getOG;
// export const openGraph = useMock ? mock.openGraph : real.openGraph;
