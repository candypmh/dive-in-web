"use client";

import { useEffect, useState } from "react";
import { Comment } from "../comments/Comment";
import { CommentProps } from "@/types/community";

export default function CommentList({
  commentList,
  postId,
  currentUserId,
  onCommentChange,
}: {
  commentList: CommentProps[];
  postId: number;
  currentUserId: string | null;
  onCommentChange: (comments: CommentProps[]) => void;
}) {
  const [comments, setComments] = useState<CommentProps[]>(commentList || []);

  useEffect(() => {
    setComments(commentList || []);
  }, [commentList]);

  const handleDelete = (cmntId: number) => {
    const updated = comments.filter((c) => c.cmntId !== cmntId);
    setComments(updated);
    onCommentChange(updated);
  };

  const handleUpdate = (updatedComment: CommentProps) => {
    const updated = comments.map((c) =>
      c.cmntId === updatedComment.cmntId ? updatedComment : c
    );
    setComments(updated);
    onCommentChange(updated);
  };

  if (!comments || comments.length === 0) {
    return (
      <>
        <div className="text-gray-500">
          <div className="flex flex-row items-start">
            <div className="bg-white-100 px-4 py-4">
              <h3 className="text-xs text-gray-600 mb-2">댓글 0</h3>
            </div>
          </div>
        </div>
        <div className="pb-12">
          <div className="flex items-center justify-center h-full w-full text-sm text-gray-500">
            댓글이 없습니다.
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="bg-white-100 px-4 py-4">
      <h3 className="text-xs text-gray-600 mb-2">댓글 {comments.length}</h3>
      {comments.map((comment) => (
        <Comment
          key={comment.cmntId}
          {...comment}
          postId={postId}
          currentUserId={currentUserId}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}
