import { getCommunity } from "@/api/server/community";
import { notFound } from "next/navigation";
import ClientCommunityPage from "./clientPage";

const CommunityPage = async ({ params }: { params: { id: string } }) => {
  const CommunityId = params.id;
  console.warn("CommunityId:::::::::::::::::::::",CommunityId);
  const community = await getCommunity(CommunityId);
  console.warn("Community코멘트 들고왔나?:::::::::::::::::::::", community?.commentList);

  if (!community) {
    notFound();
  }

  return (<ClientCommunityPage community={community} />);
};

export default CommunityPage;
