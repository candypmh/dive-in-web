"use client";

import usePhotoSlider from "@/hooks/usePhotoSlider";
import { logger } from "@/utils";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import PhotoViewerModal from "./PhotoViewerModal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

type Props = {
  imageUrls: string[];
  alt: string;
  className?: string;
};

const DetailPagePhotoSlider = ({ imageUrls, alt }: Props) => {
  useEffect(()=> {
    setIsHover(true);
  },[]);

  const urls = useMemo(() => {
    if (imageUrls.length === 0) {
      return ["/empty/image.png"];
    }

    return imageUrls;
  }, [imageUrls]);

  // const { sliderRef, imageRefs, visibleImageNumber } = usePhotoSlider(urls);
  const { imageRefs, visibleImageNumber } = usePhotoSlider(urls);
  // 이미지 뷰어 모달을 통해 이미지를 크게 볼 수 있도록 하기
  // 1. slider 컨테이너를 클릭하여, 이미지 뷰어 모달을 열 수 있도록 함
  // 2. 이미지 뷰어 모달에서는 현재 보고 있는 이미지를 크게 보여주고, 다음 이미지로 넘어갈 수 있도록 함
  // 3. esc 키를 누르거나, 닫기 버튼을 눌러 이미지 뷰어 모달을 닫을 수 있도록 함
  const [showImageViewerModal, setShowImageViewerModal] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);

  const handlePrev = (e: React.MouseEvent) => {
    if (currentIndex > 0) {
      e.stopPropagation();
      setCurrentIndex(currentIndex - 1);
    } else {
      e.stopPropagation();
      setCurrentIndex(imageUrls.length - 1); //0미만일 경우, 첫 번째 이미지에서 마지막으로 이동
    }
  };
  
  const handleNext = (e: React.MouseEvent) => {
    if (currentIndex < imageUrls.length - 1) {
      e.stopPropagation();
      setCurrentIndex(currentIndex + 1);
    } else {
      e.stopPropagation();
      setCurrentIndex(0); //마지막 이미지에서 첫번째 이미지로 이동
    }
  };

  return (
    <>
      <div
        className="relative w-full"
        onClick={() => {
          logger.log("PhotoSlider clicked");
          setShowImageViewerModal(true);
        }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div
          className="relative w-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
          ref={sliderRef}
          //   style={{scrollSnapType: "x mandatody"}}
        >
          {imageUrls.map((url, index) => (
            <div
              key={url}
              className={`snap-start shrink-0 w-96 h-64 overflow-hidden ${
                index === currentIndex ? "" : "hidden"
              }`}
              onClick={() => setShowImageViewerModal(true)}
            >
              <Image
                src={url}
                alt={alt}
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          ))} */}
          {imageUrls.map((url, index) => (
            <div
              key={url}
              className={`snap-start shrink-0 w-96 h-64 overflow-hidden ${
                index === currentIndex ? "" : "hidden"
              }`}
              onClick={() => setShowImageViewerModal(true)}
            >
              <Image
                src={url}
                alt={alt}
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* 왼쪽 화살표 */}
        {isHover && (
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            onClick={handlePrev}
          >
            <FaChevronLeft />
          </button>
        )}

        {/* 오른쪽 화살표 */}
        {isHover && (
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            onClick={handleNext}
          >
            <FaChevronRight />
          </button>
        )}

        {isHover && (
          <div className="absolute bottom-3 right-3 flex items-center gap-0.5 bg-gray-900/70 px-1.5 py-0.5 rounded">
            <span className="text-label_sb text-gray-500">
              {currentIndex + 1} / {imageUrls.length}
              {/* {visibleImageNumber} / {imageUrls.length} */}
            </span>
          </div>
        )}
      </div>

      <PhotoViewerModal
        isOpen={showImageViewerModal}
        onClose={() => setShowImageViewerModal(false)}
        urls={imageUrls}
        current={currentIndex}
      />
    </>
  );
};

export default DetailPagePhotoSlider;
