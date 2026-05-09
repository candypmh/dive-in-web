import { RiShare2Line } from "react-icons/ri";
import { GoPencil, GoTrash } from "react-icons/go";

type PostMenuSlideProps = {
  isOpen: boolean;
  onClose: () => void;
  onShare: () => void;
  onEdit: () => void;
  onDeleteClick: () => void;
};

export default function PostMenuSlide({ isOpen, onClose, onShare, onEdit, onDeleteClick }: PostMenuSlideProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
          style={{ zIndex: 40 }}
          onClick={onClose}
        />
      )}

      <div
        className={`fixed bottom-0 left-1/2 w-full transform -translate-x-1/2 bg-white py-4 px-6 border-t rounded-t-2xl transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
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
            onClick={onShare}
          >
            <div className="flex justify-start items-center gap-1 flex-1">
              <RiShare2Line className="w-5 h-5 text-gray-900" />
              <p className="text-gray-900">공유하기</p>
            </div>
          </li>

          <li
            className="py-2 text-sm font-bold hover:bg-gray-100 cursor-pointer"
            onClick={onEdit}
          >
            <div className="flex justify-start items-center gap-1 flex-1">
              <GoPencil className="w-5 h-5 text-gray-900" />
              <p className="text-gray-900">수정하기</p>
            </div>
          </li>

          <li
            className="py-2 text-sm font-bold hover:bg-gray-100 cursor-pointer"
            onClick={onDeleteClick}
          >
            <div className="flex justify-start items-center gap-1 flex-1">
              <GoTrash className="w-5 h-5 text-red-500" />
              <p className="text-red-500">삭제하기</p>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
