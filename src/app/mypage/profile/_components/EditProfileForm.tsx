"use client";

import { revalidateTagAction } from "@/actions/revalidate";
import { updateUser } from "@/actions/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useMemo, useState } from "react";
import toast from "react-hot-toast";
import UserProfileImage from "./UserProfileImage";

const EditProfileForm = ({
  user,
}: {
  user: {
    nickname: string;
    profileImageUrl: string;
    email: string;
  };
}) => {
  const router = useRouter();

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [nickname, setNickname] = useState(user.nickname);

  const imageUrl = useMemo(() => {
    if (profileImage) {
      return URL.createObjectURL(profileImage);
    }

    return user.profileImageUrl || "/empty/image.png";
  }, [profileImage, user.profileImageUrl]);

  const handleChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const readyToSubmit = useMemo(() => {
    const isNicknameChanged = nickname !== user.nickname;
    const isProfileImageChanged = !!profileImage;
    const isNicknameValid = nickname.length > 1 && nickname.length <= 8;

    return isNicknameValid && (isNicknameChanged || isProfileImageChanged);
  }, [nickname, user.nickname, profileImage]);

  return (
    <form
      className="flex flex-col gap-8 p-4"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!readyToSubmit) {
          return;
        }

        const formData = new FormData();
        formData.append("nickname", nickname);
        if (profileImage) {
          formData.append("profile_image", profileImage);
        }

        const isUpdated = await updateUser(formData);
        if (!isUpdated) {
          toast.error("프로필 수정에 실패했습니다. 잠시 후 다시 시도해주세요.");
          return;
        }

        await revalidateTagAction("user");
        toast.success("프로필이 수정됐습니다.");
        router.push("/mypage");
      }}
    >
      <div className="flex items-center gap-6">
        <UserProfileImage
          imageUrl={imageUrl}
          onChangeProfileImage={(image) => setProfileImage(image)}
        />

        <div className="flex-1 flex flex-col gap-2">
          <div className="flex-1 relative flex border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="text"
              className="w-full flex-1 py-3 px-4 text-body_bb rounded-lg outline-primary"
              placeholder="닉네임을 입력하세요"
              maxLength={8}
              value={nickname}
              onChange={handleChangeNickname}
            />
            <span className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center text-body_sr text-gray-600 select-none">
              8자
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            <Image
              alt="카카오 로고"
              src="/icon/kakao_2.png"
              width={20}
              height={20}
              className="flex-none w-5 h-5"
            />
            <span className="text-body_br text-gray-700 whitespace-pre-line">
              {user.email}
            </span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="h-12 bg-primary text-gray-100 rounded-lg disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
        disabled={!readyToSubmit}
      >
        <span className="text-body_sm">저장하기</span>
      </button>
    </form>
  );
};

export default EditProfileForm;
