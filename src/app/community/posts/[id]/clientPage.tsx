"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LuSend } from "react-icons/lu";
import { TiHeartOutline, TiHeartFullOutline } from "react-icons/ti";
import { RiShare2Line } from "react-icons/ri";
import WriterProfile from "../../_components/WriterProfile";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import { VscKebabVertical } from "react-icons/vsc";
import { useRouter } from "next/navigation";
import { CommunityProps } from "@/types/community";
import { CATEGORYNAME_TO_LABEL } from "@/constants/categories";
import CustomModal from "@/app/_components/CustomModal";
import PostMenuSlide from "./_components/PostMenuSlide";
import { getCommunity, deleteCommunity, addLikePost, deleteLikePost, createComment } from "@/services/community";
import toast from "react-hot-toast";
import { formatKST } from "@/utils";
import DetailPagePhotoSlider from "@/app/_components/PhotoSlider";
import CommentList from "../../_components/CommentList";

export default function ClientCommunity({ postId, currentUserId }: { postId: number; currentUserId: string | null }) {
  const [community, setCommunity] = useState<CommunityProps | null>(null);
  const isLoggedIn = currentUserId !== null;
  const [comment, setComment] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changeLiked, setChangeLiked] = useState(false);
  const [changeLikesCnt, setChangeLikesCnt] = useState(0);
  const router = useRouter();
  const fetchedPostIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (fetchedPostIdRef.current === postId) return;
    fetchedPostIdRef.current = postId;

    getCommunity(String(postId)).then((post) => {
      if (!post) {
        router.back();
        return;
      }
      setCommunity(post);
      setChangeLiked(post.isLiked);
      setChangeLikesCnt(post.likesCnt);
    });
  }, [postId]);
  //og관련
  type OgPreview = { title: string; description: string; image: string | null; url: string };
  const [preview, setPreview] = useState<OgPreview | null>(null);
  const urlRegex = /(https?:\/\/[^\s]+)/g; //OG추출을 위한 정규표현식
  useEffect(() => {
    if (!community?.content) return;

    const matchUrls = community.content.match(urlRegex);
    const lastUrl = matchUrls?.[matchUrls?.length - 1]; //마지막링크
    if (!lastUrl) return;

    const fetchOG = async () => {
      try {
        const res = await fetch(`/api/og?url=${encodeURIComponent(lastUrl)}`);
        const og = await res.json();
        if (og) {
          setPreview(og);
        }
      } catch (error) {
        console.error("OG미리보기 불러오기 실패", error);
      }
    };

    fetchOG();
  }, [community?.content]);

  const handleTextareaHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;

    setComment(e.target.value);

    if (textarea) {
      textarea.style.height = "1.25rem"; //초기높이
      textarea.style.height = `${textarea.scrollHeight}px`; //내용에 맞게 높이설정
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleDeleteModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleDeleteModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteCommunity(String(postId));
      router.replace("/community/posts/list?category=none");
      toast.success("게시글이 삭제되었습니다.");
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
      toast.error("게시글 삭제에 실패했습니다.");
    }
  };

  const handleLike = async () => {
    if (!community) return;
    if (!isLoggedIn) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    // optimistic update
    const prevLiked = changeLiked;
    const prevCnt = changeLikesCnt;
    setChangeLiked(!prevLiked);
    setChangeLikesCnt(prevLiked ? prevCnt - 1 : prevCnt + 1);

    try {
      const result = prevLiked
        ? await deleteLikePost(String(postId))
        : await addLikePost(String(postId));
      setChangeLiked(result.isLiked);
      setChangeLikesCnt(result.likesCnt);
    } catch (error) {
      console.error("좋아요 처리 오류:", error);
      // rollback
      setChangeLiked(prevLiked);
      setChangeLikesCnt(prevCnt);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const newComment = await createComment(postId, comment);
      setCommunity((prev) => prev ? {
        ...prev,
        commentList: [...(prev.commentList ?? []), newComment],
        cmntCnt: (prev.cmntCnt ?? 0) + 1,
      } : prev);
      setComment("");
    } catch (error) {
      console.error("댓글 등록 실패:", error);
      toast.error("댓글 등록에 실패했습니다.");
    }
  };

  //클립보드 복사
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("링크가 복사되었습니다!");
    } catch (error) {
      console.error("클립보드 복사 실패:", error);
      toast.error("링크 복사에 실패하였습니다.");
    }
  };

  if (!community) return null;

  return (
    <div className="flex flex-col xl:px-6 pb-10 relative h-full">
      {/* 상단Nav */}
      <div className="flex items-center justify-between py-1 px-1">
        <button type="button" aria-label="뒤로 가기" className="flex p-3" onClick={() => router.back()}>
          <ArrowLeftIcon className="w-6 h-6 text-gray-900" />
        </button>

        <button type="button" aria-label="게시글 메뉴 열기" className="flex p-3" onClick={handleMenuToggle}>
          <VscKebabVertical className="mt-1 w-6 h-6 text-gray-900" />
        </button>
      </div>

      {/* 태그 */}
      <div
        className={`mx-4 text-label_sb px-1.5 py-1 rounded bg-chip-1 text-chip-1-foreground inline-block w-fit`}
      >
        {/* <p>{community.category}</p> */}
        <p>{CATEGORYNAME_TO_LABEL[community.categoryName]}</p>
      </div>

      {/* 작성자 */}
      <div className="flex flex-row items-start px-4 mt-3">
        <WriterProfile
          width={36}
          height={36}
          avatar={community.writerProfile}
          name=""
        />
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-gray-700">
            {community.writer || "작성자"}
          </p>

          <div className="flex gap-2 text-sm text-gray-500">
            <span className="text-sm text-gray-500 ml-auto">
              {formatKST(community.createdAt)}
            </span>
            <span className="text-sm text-gray-500 ml-auto">
              조회{community.viewCnt}
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <h1 className="text-2xl font-bold">{community.title}</h1>
        <p className="text-gray-700 mt-4 whitespace-pre-line">
          {community.content}
        </p>

        <div className="mt-4 flex justify-center max-w-fit mx-auto gap-4">
          {community.images.length > 0 ? (
            <DetailPagePhotoSlider
              imageUrls={community.images.map((image) => image.imageUrl)}
              alt="게시글 이미지"
              sliderType="community"
            />
          ) : (
            <p className="text-gray-500"></p>
          )}
        </div>

        {/* og삽입 */}
        {preview && (
          <a
            href={preview.url}
            target="_blank"
            className="block mt-4 p-4 border rounded bg-gray-100 hover:bg-gray-200"
          >
            <div className="flex gap-4">
              {preview.image && (
                <Image
                  src={preview.image}
                  alt="미리보기 이미지"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded border"
                  unoptimized
                />
              )}
              <div className="overflow-hidden">
                <p className="font-bold text-sm line-clamp-2">
                  {preview.title}
                </p>
                <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                  {preview.description}
                </p>
              </div>
            </div>
          </a>
        )}
      </div>

      <div className="flex justify-center items-center gap-4">
        <button
          aria-label={changeLiked ? "좋아요 취소" : "좋아요"}
          className="flex flex-row justify-center items-center gap-1 flex-1"
          onClick={handleLike}
        >
          {changeLiked ? (
            <TiHeartFullOutline className="w-5 h-5 text-red-500" />
          ) : (
            <TiHeartOutline className="w-5 h-5 text-gray-700" />
          )}
          <span className="text-gray-700">{changeLikesCnt}</span>
        </button>
        <button aria-label="링크 복사" className="flex justify-center items-center gap-1 flex-1" onClick={handleCopyLink}>
          <RiShare2Line
            className="w-5 h-5 text-gray-700"
          />
          <p className="text-gray-500"></p>
        </button>
      </div>

      <div className="bg-gray-100 py-2 mt-4"></div>
      <CommentList
        commentList={community.commentList}
        postId={community.postId}
        currentUserId={currentUserId}
        onCommentChange={(updated) =>
          setCommunity((prev) => prev ? { ...prev, commentList: updated, cmntCnt: updated.length } : prev)
        }
      />

      {/* 댓글 상자 */}
      <div className="relative px-4 pb-4">
        {!isLoggedIn ? (
          <p className="flex items-center justify-between w-full px-4 py-5 text-left text-sm bg-gray-100 rounded text-gray-500 focus:outline-none">
            로그인 후 댓글 달기가 가능합니다
            <button
              className="text-left text-sm font-semibold text-blue-900"
              onClick={() => router.push("/auth/login")}
            >
              로그인
            </button>
          </p>
        ) : (
          <form
            className="flex flex-row px-4 py-5 items-center bg-gray-100 rounded"
            onSubmit={handleCommentSubmit}
          >
            <textarea
              ref={textareaRef}
              value={comment}
              onChange={handleTextareaHeight}
              placeholder="댓글을 입력해주세요." //500자 제한
              maxLength={500}
              style={{
                height: "1.25rem", //초기높이 20
                lineHeight: "1.25rem", //높이 20
                padding: "0px",
                boxSizing: "border-box", // 높이에 패딩과 테두리 포함
              }}
              className="w-full resize-none overflow-hidden border-none text-left text-sm text-gray-700 bg-gray-100 focus:outline-none"
            />
            <button
              className="text-left text-sm font-semibold text-gray-500"
              type="submit"
            >
              <LuSend size={18} />
            </button>
          </form>
        )}
      </div>

      <PostMenuSlide
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
        onShare={handleCopyLink}
        onEdit={() => router.push(`/community/posts/${community.postId}/edit`)}
        onDeleteClick={handleDeleteModalOpen}
      />
      <CustomModal
              isOpen={isModalOpen}
              title="삭제 확인"
              message="정말로 게시글을 삭제하시겠습니까?"
              onConfirm={handleDelete}
              onCancel={handleDeleteModalCancel}
            />
    </div>
  );
}
