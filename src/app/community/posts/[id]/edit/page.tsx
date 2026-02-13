"use client";

import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import Link from "next/link";
import { IoCheckmark } from "react-icons/io5";
import { MdOutlineBrokenImage } from "react-icons/md";
import { AiOutlineLink } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import {
  createCommunity,
  getCommunity,
  openGraph,
  updateCommunity,
} from "@/api/server/community";
import { useRouter } from "next/navigation";
import OpenGraphPreview from "@/app/_components/OpenGraphLinkReview";

// const CATEGORIES = ["소통해요", "수영장", "수영물품", "수영대회"];
const CATEGORIES = [
  { name: "소통해요", key: "COMMUNICATION" },
  { name: "수영장", key: "POOL" },
  { name: "수영물품", key: "GOODS" },
  { name: "수영대회", key: "COMPETITION" },
];

type EditPostProps = {
  params: { id: string };
};

export default function EditPost({ params }: EditPostProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [textareaHeight, setTextareaHeight] = useState("500px");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  //이미지처리
  const [existImages, setExistImages] = useState<
    { repImage: boolean; imageUrl: string }[]
  >([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null); //input참조
  const postId = params.id;

  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [link, setLink] = useState("");
  const [preview, setPreview] = useState<any>(null); //OG데이터
  // const [ogContent, setOgContent] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const urlRegex = /(https?:\/\/[^\s]+)/g; //OG추출을 위한 정규표현식
  const [ogFromUserInsert, setOgFromUserInsert] = useState(false);
  const [lastOgUrl, setLastOgUrl] = useState("");

  //og관련-감지용
  useEffect(() => {
  const matchUrls = content.match(urlRegex);
  const lastUrl = matchUrls?.[matchUrls.length - 1];

  if (lastUrl && lastUrl !== lastOgUrl) {
    setLastOgUrl(lastUrl);
  }
}, [content]);

// 실제 openGraph 요청/별도 useEffect
useEffect(() => {
  if (!lastOgUrl) return;

  const controller = new AbortController();
  const fetchOG = async () => {
    try {
      const og = await openGraph(lastOgUrl);
      if (!og || (!og.title && !og.description && !og.image)) {
        setPreview({
          title: "링크를 확인해보세요",
          description: lastOgUrl,
          image: "/empty/community_thumbnail.png",
          url: lastOgUrl,
        });
      } else {
        setPreview({
          title: og.title,
          description: og.description,
          image: og.image,
          url: og.url,
        });
      }
    } catch (error) {
      if (controller.signal.aborted) return;
      console.error("OG 미리보기 실패", error);
    }
  };

  fetchOG();
}, [lastOgUrl]);


  //textarea하단 공백 조절
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [content]);

  useEffect(() => {
    if (isLinkOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
  }, [isLinkOpen]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getCommunity(postId);
        if (!post) {
          throw new Error("게시글 수정 실패!");
        }

        setTitle(post.title);
        setContent(post.content);
        setSelectedCategory(post.categoryName || "소통해요");
        setExistImages(post.images);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.warn("카테고리는?::::", selectedCategory);

    // const formData = new FormData(e.currentTarget);
    const formData = new FormData();
    const category = CATEGORIES.find(
      (category) => category.name === selectedCategory
    );
    if (!category) {
      alert("카테고리를 선택해주세요!");
      return;
    }

    formData.append("memberId", "1");
    formData.append("categoryType", category.key);
    formData.append("title", title);
    formData.append("content", content);

    newImages.forEach((image) => {
      formData.append("newImages", image);
    });

    formData.append(
      "existingImages",
      JSON.stringify(
        existImages.map((img) => ({
          repImage: img.repImage,
          imageUrl: img.imageUrl,
        }))
      )
    );

    try {
      const result = await updateCommunity(postId, formData);
      console.log("글 수정 성공", result);

      //최신 데이터 가져오기
      const updatePost = await getCommunity(postId);
      console.log("변경된 내용:", updatePost);
      if (updatePost) {
        setTitle(updatePost.title);
        setContent(updatePost?.content);
      }

      if (postId) {
        router.replace(`/community/posts/${postId}`);
      }
    } catch (err) {
      console.error(err);
      alert("글 수정 실패");
    }
  };

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName); // 선택된 카테고리 업데이트
    setIsOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files); //선택파일 배열변환
    if (existImages.length + newImages.length >= 5) {
      alert("이미지는 최대 5장까지 업로드 가능합니다.");
      return;
    }

    setNewImages((prev) => [...prev, ...selectedFiles]); //이미지추가
  };

  const handleNewImageDelete = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index)); //해당index 이미지삭제
  };

  const handleExistImageDelete = (imageUrl: string) => {
    setExistImages((prev) =>
      prev.filter((image) => image.imageUrl !== imageUrl)
    ); //해당index 이미지삭제
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const toggleSlide = () => {
    setIsLinkOpen((prev) => !prev);
  };

  //링크
  const handleSubmitLink = async () => {
    console.log("링크 삽입 완료", link);
    if (!link.trim()) return;
    
    // content에 이미 같은 링크가 있다면 중복 삽입 안 함
    const normalizedContent = content.replace(/\n/g, "").trim();
    if (normalizedContent.includes(link.trim())) {
      setLink("");
      setIsLinkOpen(false);
      return;
    }

    try {
      const og = await openGraph(link);

      // if(!og || !og.title){
      if (!og) {
        alert("유효한 링크가 아닙니다.");
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
      alert("오픈그래프 정보를 불러올 수 없습니다.");
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setIsLinkOpen(false);
    }
  };

  return (
    // <div className="flex flex-col pb-10 relative h-full">
    <div className="flex flex-col h-screen pb-[4.5rem]">
      <div className="flex items-center justify-between py-1 px-1">
        <Link href={`/community/posts/${postId}`} className="flex p-3">
          <ArrowLeftIcon className="w-6 h-6 text-gray-900" />
        </Link>

        <h2 className="text-heading_3 font-bold text-center">글쓰기</h2>
        {/* <Link href={`/communities/${community.id}`} className="flex p-3"> */}

        <button type="submit" form="createPostForm" className="flex p-3">
          <IoCheckmark className="w-6 h-6 text-gray-400 hover:text-blue-900" />
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
              {/* <button 
                className="mt-4 w-full py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                onClick={()=> setIsOpen(false)}>
              </button> */}
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          <div className="flex flex-wrap gap-2 px-4 pb-3">
            {/* 기존 이미지 */}
            {existImages.map((image, index) => (
              <div key={`exist-${index}`} className="relative w-20 h-20">
                <img
                  src={image.imageUrl} //이미지 미리보기 URL
                  alt={`기존 이미지 ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />
                <span className="absolute top-1 left-1 bg-gray-700 text-white text-xs px-1 py-0.5 rounded">
                  {image.repImage ? "" : "대표"}
                </span>
                <button
                  type="button"
                  onClick={() => handleExistImageDelete(image.imageUrl)}
                  className="absolute w-5 h-5 top-1 right-1 bg-gray-600 text-white font-semibold text-xs flex justify-center rounded-full"
                >
                  x
                </button>
              </div>
            ))}

            {/* 새로운 이미지 추가 */}
            {newImages.map((image, index) => (
              <div key={`new-${index}`} className="relative w-20 h-20">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`새 이미지 ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />

                <button
                  type="button"
                  onClick={() => handleNewImageDelete(index)}
                  className="absolute w-5 h-5 top-1 right-1 bg-gray-600 text-white font-semibold text-xs flex justify-center rounded-full"
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
            // style={{ minHeight: "17.2rem" }}
            onChange={(e) => setContent(e.target.value)}
            onInput={(e) => {
              // e.currentTarget.style.height = "auto";
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
            }}
          />

          {/* OG 썸네일 */}
          {preview && (
            <div className="p-4 mt-4 border rounded bg-gray-100 flex gap-4 items-start">
              {preview.image && (
                <img
                  src={preview.image || "/empty/community_thumbnail.png"}
                  alt="미리보기 페이지"
                  className="w-20 h-20 object-cover rounded border flex-shrink-0"
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
      {/* <div className="border-b border-gray-300 my-4"></div> */}

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
