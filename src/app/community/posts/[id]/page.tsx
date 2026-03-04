import ClientCommunityPage from "./clientPage";

const CommunityPage = ({ params }: { params: { id: string } }) => {
  return <ClientCommunityPage postId={Number(params.id)} />;
};

export default CommunityPage;
