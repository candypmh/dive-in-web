"use client";

import { formatKST } from "@/utils";
import WriterProfile from "../_components/WriterProfile";
import { VscKebabVertical } from "react-icons/vsc";
import { useState } from "react";
import { GoPencil } from "react-icons/go";
import { GoTrash } from "react-icons/go";
import { CommentProps } from "@/types/community";
import { updateComment, deleteComment } from "@/services/community";
import toast from "react-hot-toast";

type CommentComponentProps = CommentProps & {
  postId: number;
  currentUserId: string | null;
  onDelete: (cmntId: number) => void;
  onUpdate: (comment: CommentProps) => void;
};

export const Comment = ({
  cmntId,
  content,
  groupName,
  orderNumber,
  cmntClass,
  writer,
  writerId,
  writerProfile,
  likeCnt,
  createdAt,
  postId,
  currentUserId,
  onDelete,
  onUpdate,
}: CommentComponentProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const isMyComment = writerId === currentUserId;

  const handleMenuToggle = () => setIsMenuOpen((prev) => !prev);
  const handleMenuClose = () => setIsMenuOpen(false);

  const handleDelete = async () => {
    try {
      await deleteComment(postId, String(cmntId));
      onDelete(cmntId);
      toast.success("댓글이 삭제되었습니다.");
    } catch {
      toast.error("댓글 삭제에 실패했습니다.");
    }
    setIsMenuOpen(false);
  };

  const handleEditSubmit = async () => {
    if (!editContent.trim()) return;
    try {
      const updatedComment = await updateComment(postId, String(cmntId), editContent);
      onUpdate(updatedComment);
      setIsEditing(false);
      toast.success("댓글이 수정되었습니다.");
    } catch {
      toast.error("댓글 수정에 실패했습니다.");
    }
  };

  return (
    <div key={cmntId} className="py-3">
      <div className="flex flex-row items-start px-4">
        <WriterProfile width={24} height={24} avatar={writerProfile} name={writer} />
        {isMyComment && (
          <button type="button" className="flex ml-auto">
            <VscKebabVertical className="w-6 h-6 text-gray-900" onClick={handleMenuToggle} />
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="px-4 mt-2 flex flex-col gap-2">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full text-sm text-gray-700 border border-gray-300 rounded p-2 resize-none focus:outline-none"
            rows={3}
          />
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-xs text-gray-500"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleEditSubmit}
              className="text-xs font-bold text-blue-900"
            >
              저장
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 px-4 mt-2">{editContent}</p>
      )}

      <div className="flex flex-row items-center gap-2 mt-2">
        <span className="text-sm text-gray-500 pl-4">{formatKST(createdAt)}</span>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
          style={{ zIndex: 90 }}
          onClick={handleMenuClose}
        />
      )}

      <div
        className={`fixed bottom-0 left-1/2 w-full transform -translate-x-1/2 bg-white py-4 px-6 border-t rounded-t-2xl transition-transform duration-300 ${
          isMenuOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ zIndex: 100, width: "100%", maxWidth: "48rem", boxShadow: "0 -1px 3px rgba(0, 0, 0, 0.05)" }}
      >
        <ul>
          <li
            className="py-2 text-sm font-bold hover:bg-gray-100 cursor-pointer"
            onClick={() => { setIsEditing(true); setIsMenuOpen(false); }}
          >
            <div className="flex justify-start items-center gap-1 flex-1">
              <GoPencil className="w-5 h-5 text-gray-900" />
              <p className="text-gray-900">수정하기</p>
            </div>
          </li>
          <li className="py-2 text-sm font-bold hover:bg-gray-100 cursor-pointer" onClick={handleDelete}>
            <div className="flex justify-start items-center gap-1 flex-1">
              <GoTrash className="w-5 h-5 text-red-500" />
              <p className="text-red-500">삭제하기</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
