"use client";

import usePhotoSlider from "@/hooks/usePhotoSlider";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XIcon } from "lucide-react";
import Image from "next/image";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  urls: string[];
};

const PhotoViewerModal = ({ isOpen, onClose, urls }: Props) => {
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
          <ImageSlider urls={urls} />
        </DialogPanel>
      </div>
    </Dialog>
  );
};

const ImageSlider = ({ urls }: { urls: string[] }) => {
  const imageLength = urls.length;
  const { sliderRef, imageRefs, visibleImageNumber } = usePhotoSlider(urls);

  return (
    <>
      <div className="flex-1 w-full relative">
        <div
          className={`h-full w-full snap-x snap-mandatory flex overflow-x-auto no-scrollbar`}
          ref={sliderRef}
        >
          {urls.map((url, index) => (
            <div
              key={index}
              className="relative snap-start snap-always shrink-0 w-full overflow-hidden"
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
      </div>

      <div className="flex-none w-full py-6 flex items-center justify-center">
        <div className="flex items-center gap-0.5 text-gray-500">
          <span>{visibleImageNumber}</span>
          <span>/</span>
          <span>{imageLength}</span>
        </div>
      </div>
    </>
  );
};

export default PhotoViewerModal;
