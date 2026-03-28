"use client";

import PenIcon from "@/components/icons/PenIcon";
import Image from "next/image";
import { ChangeEvent, useRef } from "react";

const UserProfileImage = ({
  imageUrl,
  onChangeProfileImage,
}: {
  imageUrl: string;
  onChangeProfileImage: (image: File | null) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onChangeProfileImage(file || null);

    // TODO: 이미지 압축
    // TODO: 이미지 용량 제한

    e.target.value = "";
    return;
  };

  return (
    <div className="flex-none flex relative">
      <Image
        alt="프로필 이미지"
        src={imageUrl}
        width={96}
        height={96}
        className="w-24 h-24 rounded-full object-cover"
        priority
      />
      <button
        aria-label="프로필 이미지 변경"
        className="flex p-1 absolute bottom-0 right-0 bg-gray-400 rounded-full"
        onClick={openFileInput}
        type="button"
      >
        <PenIcon className="w-5 h-5 text-gray-100" />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </button>
    </div>
  );
};

export default UserProfileImage;
