"use client";

import { useEffect, useState } from "react";
import { Comment } from "../comments/Comment";
import { getComments } from "@/api/server/community";

// import { CommentProps } from "@/types/community";

interface CommentProps {
  postId?: number;
  cmntId: number;
  content: string;
  groupName?: number;
  orderNumber?: number;
  cmntClass?: number;
  writer: string;
  writerProfile: string;
  likeCnt?: number;
  createdAt: string;
}

export default function CommentList({
  commentList,
  postId,
}: {
  commentList: CommentProps[];
  postId: number;
}) {
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [loggedUserId, setLoggedUserId] = useState<number | null>(1);

  useEffect(() => {
    const fetchComments = async () => {
      const data = await getComments(postId);
      setComments(data);
    };
    fetchComments();

    const fetchUserId = async () => {
      // const userId = await getUser();
      const userId = 1;
      setLoggedUserId(userId);
    };
    fetchUserId();
  }, []);

  console.warn("commentList page:::::::::::::::", commentList);

  if (!commentList || commentList.length === 0) {
    return (
      <>
      <div className="text-gray-500">
        <div className="flex flex-row items-start">
          <div className="bg-white-100 px-4 py-4">
            <h3 className="text-xs text-gray-600 mb-2">
              댓글 {commentList.length}
            </h3>
          </div>
        </div>
      </div>

      <div className="pb-12"> 
          <div className="flex items-center justify-center h-full w-full text-sm text-gray-500">댓글이 없습니다.</div>
      </div>
      </>
    );
  }

  return (
    // <div className="bg-white-100 px-4 py-4">
    //   <h3 className="text-xs text-gray-600 mb-2">댓글 {commentList.length}</h3>
    //   {commentList.map((comment) => (
    //     <div key={comment.cmntId} className="py-3">
    //       <p>{comment.content}</p>
    //     </div>
    //   ))}
    // </div>

    //--------------------
    <div className="bg-white-100 px-4 py-4">
      <h3 className="text-xs text-gray-600 mb-2">댓글 {commentList.length}</h3>
      {commentList.map((comment) => (
        <Comment
          key={comment.cmntId}
          cmmtId={comment.cmntId}
          content={comment.content}
          groupName={comment.groupName}
          orderNumber={comment.orderNumber}
          cmntClass={comment.cmntClass}
          writer={comment.writer}
          writerProfile={comment.writerProfile}
          likeCnt={comment.likeCnt}
          createdAt={comment.createdAt}
          // writerId={comment.writerId}
          // loggedUserId={comment.loggedUserId}
        />
      ))}
    </div>
  );
}
