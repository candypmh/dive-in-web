"use client";
import { useEffect, useRef, useState } from "react";
import { LuSend } from "react-icons/lu";
import { TiHeartOutline, TiHeartFullOutline } from "react-icons/ti";
import { RiShare2Line } from "react-icons/ri";
import WriterProfile from "../../_components/WriterProfile";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import { VscKebabVertical } from "react-icons/vsc";
import { GoPencil } from "react-icons/go";
import { GoTrash } from "react-icons/go";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CommunityProps } from "@/types/community";
import CustomModal from "@/app/_components/CustomModal";
import {
  addLikePost,
  createComment,
  deleteCommunity,
  deleteLikePost,
  getCommunity,
} from "@/api/server/community";
import DetailPagePhotoSlider from "@/app/_components/PhotoSlider";
import CommentList from "../../_components/CommentList";

export default function ClientCommunity({
  community,
}: {
  community: CommunityProps;
}) {
  console.warn("::::::::::postId가 넘어오니?::", community.postId);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [comment, setComment] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changeLiked, setChangeLiked] = useState(community.isLiked);
  const [changeLikesCnt, setChangeLikesCnt] = useState(community.likesCnt);
  const router = useRouter();
  // console.warn("코멘트 안오냐?:::::::::::", community.commentList);

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
    const isDeleted = await deleteCommunity(community.postId + "", "1");
    console.warn("삭제된 게시글:", community.postId);

    if (isDeleted) {
      await router.replace("/community/posts/list?category=none&page=0");
      alert("게시글이 삭제되었습니다.");
    } else {
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  const handleLike = async () => {
    console.warn("현재 좋아요의 상태는?:::::::::::::::::::", community.isLiked);

    try {
      setChangeLiked((prev) => !prev);
      setChangeLikesCnt((prev) => (changeLiked ? prev - 1 : prev + 1));

      const response = changeLiked
        ? await deleteLikePost(community.postId + "", "1") //좋아요가 되어있으면
        : await addLikePost(community.postId + "", "1"); //좋아요가 안되어있으면

      if (!response || !response.success || response.data === null) {
        throw new Error(response?.message || "서버 응답 오류");
      }

      console.log("현재setIsLiked::", response.data.isLiked);
      setChangeLiked(response.data.isLiked);

      console.log("현재setLikesCnt::", response.data.likeCnt);
      setChangeLikesCnt(response.data.likeCnt);
    } catch (error) {
      console.error("좋아요 처리 오류! 기존으로 돌아갑니다:::", error);

      // 상태 롤백
      setChangeLiked((prev) => !prev);
      setChangeLikesCnt((prev) => (changeLiked ? prev + 1 : prev - 1));
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("postId", String(community.postId));
    formData.append("content", comment);
    formData.append("memberId", "1");

    console.warn("입력된 댓글내용?::::", comment);
    
    try {
      const result = await createComment(formData);
      console.log("댓글 등록 결과는::::", result);

      // {
      //   "content": "9482308953개요",
      //   "postId": 13,
      //   "memberId": 1
      // }

      setComment(""); //댓글필드 초기화

    } catch (error) {
      console.error("댓글 등록 실패!", error);
    }
  };


  //최신데이터 가져오기
  useEffect(() => {
    const fetchPost = async() => {
      try {
        const reloadPost = await getCommunity(community.postId + "");

        if(reloadPost){
          setChangeLiked(reloadPost?.isLiked);
          setChangeLikesCnt(reloadPost?.likesCnt);
        }

      } catch (error) {
        console.error("초기 데이터 동기화 오류:", error);
      }
    };

    fetchPost();
  },[community.postId]); 

  return (
    <div className="flex flex-col pb-10 relative h-full">
      {/* 상단Nav */}
      <div className="flex items-center justify-between py-1 px-1">
        <Link href="/community/posts/list?category=none&page=0" className="flex p-3">
          <ArrowLeftIcon className="w-6 h-6 text-gray-900" />
        </Link>

        <button type="button" className="flex p-3" onClick={handleMenuToggle}>
          <VscKebabVertical className="mt-1 w-6 h-6 text-gray-900" />
        </button>
      </div>

      {/* 태그 */}
      <div
        className={`mx-4 text-label_sb px-1.5 py-1 rounded bg-chip-1 text-chip-1-foreground inline-block w-fit`}
      >
        {/* <p>{community.category}</p> */}
        <p>{community.categoryName}</p>
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
              {community.createdAt}
            </span>
            <span className="text-sm text-gray-500 ml-auto">
              조회{community.viewCnt}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold">{community.title}</h1>
        <p className="text-gray-700 mt-4 whitespace-pre-line">
          {community.content}
        </p>

        <div className="mt-4 flex justify-center max-w-fit mx-auto gap-4">
        {/* <div className="mt-4 flex justify-center"> */}
          {community.images.length > 0 ? (
              // <div key={index} className="overflow-hidden rounded-lg">
              // <div className="mt-4 flex justify-center">
                <DetailPagePhotoSlider
                  imageUrls={community.images.map((image) => image.imageUrl)}
                  alt="게시글 이미지"
                />
              // </div>
          ) : (
            // 이미지가 없을시
            <p className="text-gray-500"></p>
          )}
          
        </div>
      </div>

      <div className="flex justify-center items-center gap-4">
        <button
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
        <button className="flex justify-center items-center gap-1 flex-1">
          <RiShare2Line className="w-5 h-5 text-gray-700" />
          <p className="text-gray-500"></p>
        </button>
      </div>

      <div className="bg-gray-100 py-2 mt-4"></div>
      <CommentList commentList={community.commentList} postId={community.postId} />

      {/* 댓글 상자 */}
      <div className="relative px-4 pb-4">
        {!isLoggedIn ? (
          <p className="flex items-center justify-between w-full px-4 py-5 text-left text-sm bg-gray-100 rounded text-gray-500 focus:outline-none">
            로그인 후 댓글 달기가 가능합니다
            <button
              className="text-left text-sm font-semibold text-blue-900"
              onClick={() => {
                console.log("로그인되었습니다");
                setIsLoggedIn(true);
              }}
            >
              로그인
            </button>
          </p>
        ) : (
          <form className="flex flex-row px-4 py-5 items-center bg-gray-100 rounded" onSubmit={handleCommentSubmit}>
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
            <button className="text-left text-sm font-semibold text-gray-500" type="submit">
              <LuSend size={18} />
            </button>
          </form>
        )}
      </div>

      
      {/* 배경 */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300" 
          style={{zIndex: 40}} 
          onClick={handleMenuClose} />
        )}

      {/* 글 메뉴 슬라이드 */}
      <div
        className={`fixed bottom-0 left-1/2 w-full transform -translate-x-1/2 bg-white p-4 pt-6 pb-6 border-t rounded-t-2xl transition-transform duration-300 ${
          isMenuOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          width: "100%",
          maxWidth: "48rem",
          boxShadow: "0 -1px 3px rgba(0, 0, 0, 0.05)",
          zIndex: 80,
        }}
      >
        <ul>
          <li
            className="py-2 text-sm font-bold hover:bg-gray-100 cursor-pointer"
            onClick={() => {}}
          >
            <div className="flex justify-start items-center gap-1 flex-1">
              <RiShare2Line className="w-5 h-5 text-gray-900" />
              <p className="text-gray-900">공유하기</p>
            </div>
          </li>

          <li
            className="py-2 text-sm font-bold hover:bg-gray-100 cursor-pointer"
            onClick={() => {}}
          >
            <div
              className="flex justify-start items-center gap-1 flex-1"
              onClick={() =>
                router.push(`/community/posts/${community.postId}/edit`)
              }
            >
              <GoPencil className="w-5 h-5 text-gray-900" />
              <p className="text-gray-900">수정하기</p>
            </div>
          </li>
          <li
            className="py-2 text-sm font-bold hover:bg-gray-100 cursor-pointer"
            onClick={handleDeleteModalOpen}
          >
            <div className="flex justify-start items-center gap-1 flex-1">
              <GoTrash className="w-5 h-5 text-red-500" />
              <p className="text-red-500">삭제하기</p>
            </div>

            <CustomModal
              isOpen={isModalOpen}
              title="삭제 확인"
              message="정말로 게시글을 삭제하시겠습니까?"
              onConfirm={handleDelete}
              onCancel={handleDeleteModalCancel}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
