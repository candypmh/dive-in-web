"use client";

import usePhotoSlider from "@/hooks/usePhotoSlider";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { url } from "inspector";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  urls: string[];
  current: number; //현재 index
};

const PhotoViewerModal = ({ isOpen, onClose, urls, current }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(current); //초기화
  
  useEffect(() => {
    if(isOpen) {
      setCurrentIndex(current); //모달 열릴 때, 클릭한 이미지부터 보이게 설정
    }
  },[isOpen, current]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        className="fixed inset-0 bg-gray-900/70 duration-300 ease-out data-[closed]:opacity-0"
        transition
      />

      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <DialogPanel
          className="flex flex-col max-w-3xl w-full h-full bg-gray-900 duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          transition
        >
          <div className="flex-none w-full flex justify-end">
            <button
              className="flex items-center justify-center p-3"
              onClick={onClose}
            >
              <XIcon className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* 내부 요소의 렌더링 시점에 따라, observer 구독이 되어야 함 */}
          {/* 컴포넌트를 분리하여, 요소와 로직은 함께 구성 */}
          <ImageSlider urls={urls} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
        </DialogPanel>
      </div>
    </Dialog>
  );
};

const ImageSlider = ({ urls, currentIndex, setCurrentIndex }: { urls: string[], currentIndex: number, setCurrentIndex: (index: number) => void; }) => {
  // const imageLength = urls.length;
  const { sliderRef, imageRefs, visibleImageNumber } = usePhotoSlider(urls);
  const [isHover, setIsHover] = useState(false);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(urls.length - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < urls.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(urls.length - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < urls.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <>
      <div className="flex-1 w-full relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
        <div
          className={`h-full w-full snap-x snap-mandatory flex overflow-x-auto no-scrollbar`}
          ref={sliderRef}
        >
          {urls.map((url, index) => (
            <div
              key={index}
              className={`relative snap-start snap-always shrink-0 w-full overflow-hidden ${index === currentIndex ? "block" : "hidden"}`}
              ref={(el) => {
                if (el) {
                  imageRefs.current[index] = el;
                }
              }}
            >
              <Image
                src={url}
                alt="이미지"
                fill
                sizes="(min-width: 768px) 100vw, 768px"
                className="object-contain"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* 왼쪽 버튼 */}
          { isHover && (
            <button 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              onClick={handlePrev}>
              <FaChevronLeft />
            </button>
          )}

        {/* 오른쪽 버튼 */}
          { isHover && (
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              onClick={handleNext}
            >
              <FaChevronRight />
            </button>
          )}
      </div>

      <div className="flex-none w-full py-6 flex items-center justify-center">
        <div className="flex items-center gap-0.5 text-gray-500">
          <span>{visibleImageNumber}</span>
          <span>/</span>
          <span>{urls.length}</span>
        </div>
      </div>
    </>
  );
};

export default PhotoViewerModal;
