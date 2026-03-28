"use client";

import Image from "next/image";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import Link from "next/link";
import { IoCheckmark } from "react-icons/io5";
import { MdOutlineBrokenImage } from "react-icons/md";
import { AiOutlineLink } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import OpenGraphPreview from "@/app/_components/OpenGraphLinkReview";
import { createCommunity } from "@/api/server/community";
import toast from "react-hot-toast";

const CATEGORIES = [
  { name: "소통해요", key: "COMMUNICATION" },
  { name: "수영장", key: "POOL" },
  { name: "수영물품", key: "GOODS" },
  { name: "수영대회", key: "COMPETITION" },
];

export default function CreatePost() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("소통해요");
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null); //input참조

  const [isLoading, setIsLoading] = useState(false);
  const isSubmittingRef = useRef(false);
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [link, setLink] = useState("");
  type OgPreview = { title: string; description: string; image: string | null; url: string };
  const [preview, setPreview] = useState<OgPreview | null>(null); //OG데이터
  const router = useRouter();

  //textarea하단 공백 조절
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [content]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmittingRef.current) return;

    // validation 먼저 — 실패 시 isLoading 건드리지 않음
    const selectedCategoryKey = CATEGORIES.find(
      (category) => category.name === selectedCategory
    )?.key;
    if (!selectedCategoryKey) {
      toast.error("카테고리를 선택해주세요!");
      return;
    }

    const title = e.currentTarget.querySelector<HTMLInputElement>("#title");
    if (!title || !title.value.trim()) {
      toast.error("제목을 입력해주세요!");
      return;
    }

    if (!content.trim()) {
      toast.error("내용을 입력해주세요!");
      return;
    }

    // validation 통과 후 제출
    isSubmittingRef.current = true;
    setIsLoading(true);
    const formData = new FormData();
    formData.append("categoryType", selectedCategoryKey);
    formData.append("title", title.value.trim());
    formData.append("content", content);
    formData.append("memberId", "1");
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const postId = await createCommunity(formData);
      router.replace(`/community/posts/${postId}`);
    } catch (err) {
      console.error("글 작성 실패", err);
      toast.error("글 작성에 실패했습니다.");
    } finally {
      isSubmittingRef.current = false;
      setIsLoading(false);
    }
  };

  //카테고리
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  //이미지
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files); //선택파일 배열변환
    if (images.length + selectedFiles.length > 5) {
      toast.error("이미지는 최대 5장까지 업로드 가능합니다.");
      return;
    }
    setImages((prev) => [...prev, ...selectedFiles]); //이미지추가
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const toggleSlide = () => {
    setIsLinkOpen((prev) => !prev);
  };

  //링크
  const handleSubmitLink = async () => {
    if (!link.trim()) return;
    try {
      const res = await fetch(`/api/og?url=${encodeURIComponent(link)}`);
      const og = await res.json();

      if (og.error) {
        toast.error("유효한 링크가 아닙니다.");
        return;
      } else if (!og.title && !og.description && !og.image) {
        setPreview({
          title: link,
          description: "링크를 확인해보세요.",
          image: "/empty/community_thumbnail.png",
          url: link,
        });
      } else {
        setPreview({
          title: og.title,
          description: og.description,
          image: og.image,
          url: og.url,
        });
      }

      //content마지막에 링크 삽입
      setContent((prev) => prev.trim() + "\n" + link);
      setLink("");
      setIsLinkOpen(false);
    } catch (error) {
      console.error("오픈그래프 불러오기 실패:::", error);
      toast.error("오픈그래프 정보를 불러올 수 없습니다.");
    }
  };

  return (
    <div className="flex flex-col h-screen pb-[4.5rem]">
      <div className="flex items-center justify-between py-1 px-1">
        <Link href="/community/posts/list?category=none" className="flex p-3">
          <ArrowLeftIcon className="w-6 h-6 text-gray-900" />
        </Link>

        <h2 className="text-heading_3 font-bold text-center">글쓰기</h2>

        <button type="submit" form="createPostForm" className="flex p-3" disabled={isLoading}>
          <IoCheckmark className={`w-6 h-6 ${isLoading ? "text-gray-200" : "text-gray-400 hover:text-blue-900"}`} />
        </button>
      </div>

      {/* 카테고리 */}
      <div className="relative px-4 py-4">
        <button
          className="flex items-center justify-between w-full px-4 py-3 text-left text-sm font-bold border bg-gray-100 border-gray-300 rounded-xl text-gray-700 focus:outline-none"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {selectedCategory}
          <IoIosArrowDown />
        </button>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="bg-white rounded-t-2xl p-4"
              style={{ width: "48rem" }}
            >
              <h3 className="text-gray-600 text-sm mb-2 py-1 font-bold">
                카테고리 선택
              </h3>
              <ul>
                {CATEGORIES.map((category) => (
                  <li
                    key={category.key}
                    className="py-2 text-sm font-bold hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCategorySelect(category.name)}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>

            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4">
        <form
          id="createPostForm"
          onSubmit={handleSubmit}
          className="relative flex flex-col h-full"
        >
          <input
            id="title"
            type="text"
            maxLength={20}
            placeholder="제목을 입력해주세요(최대 20자)"
            className="text-xl w-full px-4 mb-4 border-none border-gray-300 font-bold focus:outline-none"
          />

          {/* 이미지 */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* 이미지 미리보기 */}
          <div className="flex gap-2 flex-wrap px-4 pb-3">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)} //이미지 미리보기 URL
                  alt={`이미지 ${index + 1}`}
                  className="w-20 h-20 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() =>
                    setImages((prev) => prev.filter((_, i) => i !== index))
                  }
                  className="absolute w-5 h-5 top-1 right-1 bg-gray-600 text-white font-semibold text-xs flex justify-center items-center leading-none rounded-full"
                >
                  x
                </button>
              </div>
            ))}
          </div>

          {/* 내용 */}
          <textarea
            ref={textareaRef}
            placeholder="내용을 입력해주세요(최대 2000자)"
            maxLength={2000}
            value={content}
            className="text-base w-full px-4 py-2 pb-1 resize-none overflow-y-auto border-none border-gray-300 focus:outline-none scrollbar-hide"
            onChange={(e) => setContent(e.target.value)}
            onInput={(e) => {
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
          />

          {/* OG 썸네일 */}
          {preview && (
            <div className="p-4 mt-4 border rounded bg-gray-100 flex gap-4 items-start">
              {preview.image && (
                <Image
                  src={preview.image || "/empty/community_thumbnail.png"}
                  alt="미리보기 페이지"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded border flex-shrink-0"
                  unoptimized
                />
              )}
              <div className="flex flex-col justify-center overflow-hidden pt-1.5">
                <p className="font-bold break-words max-w-full line-clamp-2">
                  {preview.title}
                </p>
                <p className="text-sm text-gray-600 break-words max-w-full line-clamp-1">
                  {preview.description}
                </p>
              </div>
            </div>
          )}

          <button type="submit" className="hidden"></button>

          {/* 이미지 및 링크 삽입 버튼 */}
          <div className="fixed w-full bottom-14 p-4 pt-4 max-w-[48rem] bg-white border-t border-gray-300">
            <div className="flex justify-start items-center jusfity-center gap-8 px-3 text-gray-500">
              <button type="button" onClick={handleImageButtonClick}>
                <MdOutlineBrokenImage className="w-5 h-5 hover:text-blue-900" />
              </button>
              <button type="button" onClick={toggleSlide}>
                <AiOutlineLink className="w-5 h-5 hover:text-blue-900" />
              </button>
            </div>
          </div>

        </form>
      </div>

      {/* 링크 슬라이드 */}
      
        <OpenGraphPreview
          url={link}
          setUrl={setLink}
          onConfirm={handleSubmitLink}
          onClose={() => setIsLinkOpen(false)}
          isOpen={isLinkOpen}
        />
     
    </div>
  );
}