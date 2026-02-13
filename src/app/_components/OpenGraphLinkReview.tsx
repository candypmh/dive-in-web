import { useEffect, useRef, useState } from "react";
import { IoCheckmark } from "react-icons/io5";

interface OpenGraphPreviewProps {
  url: string;
  setUrl: (value: string) => void;
  onConfirm: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export default function OpenGraphPreview({
  url,
  setUrl,
  onConfirm,
  onClose,
  isOpen,
}: OpenGraphPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        e.stopPropagation(); //이벤트 버블링 방지
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // const handleMenuToggle = () => {
  //   setIsMenuOpen((prev) => !prev);
  // };

  // const handleMenuClose = () => {
  //   setIsMenuOpen(false);
  // };

  return (
    //배경
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ zIndex: 40 }}
      // onClick={onClose}
    >
      {/* // <div className="fixed inset-0 bg-black/30 flex items-end justify-center z-50"> */}
      {/* <div
        ref={containerRef}
        className="bg-white w-full max-w-[48rem] rounded-t-2xl p-4 pb-10 transion-transform duration-300 translate-y-0"
      > */}

      {/* 아래에서 슬라이딩 */}
      <div
        ref={containerRef}
        className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white p-4 pt-6 pb-10 border-t rounded-t-2xl transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          width: "100%",
          maxWidth: "48rem",
          boxShadow: "0 -1px 3px rgba(0, 0, 0, 0.05)",
          zIndex: 60,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-600">링크 삽입</h3>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoCheckmark className="w-6 h-6 text-gray-400 hover:text-blue-900" />
          </button>
        </div>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="링크 주소를 붙여넣어주세요"
          className="w-full p-2 border rounded-xl focus:outline-none border-gray-300"
        />
      </div>
    </div>
  );
}
