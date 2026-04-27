import ClientCommunityPage from "./clientPage";
import { getUser } from "@/actions/user";

const CommunityPage = async ({ params }: { params: { id: string } }) => {
  const user = await getUser();
  return <ClientCommunityPage postId={Number(params.id)} currentUserId={user?.id ?? null} />;
};

export default CommunityPage;
