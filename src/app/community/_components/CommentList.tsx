"use client";

import { useEffect, useState } from "react";
import { Comment } from "../comments/Comment";
import { getComments } from "@/api/server/community";
import { CommentProps } from "@/types/community";

export default function CommentList({
  commentList,
  postId,
  onCommentChange,
}: {
  commentList: CommentProps[];
  postId: number;
  onCommentChange: (comments: CommentProps[]) => void;
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
    <div className="bg-white-100 px-4 py-4">
      <h3 className="text-xs text-gray-600 mb-2">댓글 {commentList.length}</h3>
      {commentList.map((comment) => (
        <Comment
          key={comment.cmntId}
          {...comment}
          postId={postId}
          onCommentChange={onCommentChange}
        />
      ))}
    </div>
  );
}
