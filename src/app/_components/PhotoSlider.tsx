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

  sliderType?: "community" | "other"; //추가
};

const DetailPagePhotoSlider = ({ imageUrls, alt, sliderType = "community" }: Props) => {

  useEffect(()=> {
    setIsHover(true);
  },[]);


  const encodeUrls = useMemo(() => {

    if (imageUrls.length === 0) {
      return ["/empty/image.png"];
    }else{
      return imageUrls.map((url) => encodeURIComponent(url));
    }

  }, [imageUrls]);

  const displayUrls = imageUrls.length === 0 ? ["/empty/image.png"] : imageUrls;

  
  const { imageRefs, visibleImageNumber } = usePhotoSlider(encodeUrls);

  // 이미지 뷰어 모달을 통해 이미지를 크게 볼 수 있도록 하기
  // 1. slider 컨테이너를 클릭하여, 이미지 뷰어 모달을 열 수 있도록 함
  // 2. 이미지 뷰어 모달에서는 현재 보고 있는 이미지를 크게 보여주고, 다음 이미지로 넘어갈 수 있도록 함
  // 3. esc 키를 누르거나, 닫기 버튼을 눌러 이미지 뷰어 모달을 닫을 수 있도록 함
  const [showImageViewerModal, setShowImageViewerModal] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const touchStartX = useRef<number>(0);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : displayUrls.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < displayUrls.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    goToPrev();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    goToNext();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (delta > 50) goToNext();
    if (delta < -50) goToPrev();
  };

  //이미지 슬라이드 크기 선택
  const sliderTypeStyles = {
    community: "w-[400px] h-[300px]",
    other: "w-full h-[300px]",
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
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {displayUrls.map((url, index) => (
            <div
              key={url}
              className={`snap-start shrink-0 ${sliderTypeStyles[sliderType]} verflow-hidden ${

                index === currentIndex ? "" : "hidden"
              }`}
              onClick={() => setShowImageViewerModal(true)}
            >

              {sliderType === "community" ? (
                <Image
                  src={url}
                  alt={alt}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
                
              ) : (
                <Image
                  src={url}
                  alt={alt}
                  width={800}
                  height={500}
                  className="w-full h-full object-cover"
                />
              )}

            </div>
          ))}
        </div>

        {/* 왼쪽 화살표 */}
        {!isTouchDevice && isHover && (
          <button
            aria-label="이전 이미지"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            onClick={handlePrev}
          >
            <FaChevronLeft />
          </button>
        )}

        {/* 오른쪽 화살표 */}
        {!isTouchDevice && isHover && (
          <button
            aria-label="다음 이미지"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            onClick={handleNext}
          >
            <FaChevronRight />
          </button>
        )}

        {!isTouchDevice && isHover && (
          <div className="absolute bottom-3 right-3 flex items-center gap-0.5 bg-gray-900/70 px-1.5 py-0.5 rounded">
            <span className="text-label_sb text-gray-500">
              {currentIndex + 1} / {displayUrls.length}
            </span>
          </div>
        )}
      </div>

      <PhotoViewerModal
        isOpen={showImageViewerModal}
        onClose={() => setShowImageViewerModal(false)}
        urls={displayUrls}
        current={currentIndex}
      />
    </>
  );
};

export default DetailPagePhotoSlider;
