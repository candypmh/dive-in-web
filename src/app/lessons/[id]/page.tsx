import { getLesson } from "@/services/lessons";
import DetailPagePhotoSlider from "@/app/_components/PhotoSlider";
import ShareButton from "@/app/_components/ShareButton";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import LessonChip from "@/components/ui/Chip";
import { lessonDetailContentSchema } from "@/schemas/lessons";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const Map = dynamic(() => import("@/components/maps/KakaoMap"), { ssr: false });
const Marker = dynamic(() => import("@/components/maps/Marker"), {
  ssr: false,
});

const LessonPage = async ({ params }: { params: { id: string } }) => {
  const LessonId = Number(params.id);
  const lesson = await getLesson(LessonId);

  if (!lesson) {
    notFound();
  }

  const lessonDetail = lessonDetailContentSchema.parse(lesson.lessonDetail);

  const imageUrls = lesson.images.map((image) => image.imageUrl);
  const levels = lesson.level.split(",").map((tag) => tag.trim());

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-1">
        <Link href="/lessons" className="flex p-3">
          <ArrowLeftIcon className="w-6 h-6 text-gray-900" />
        </Link>
        <ShareButton />
      </div>

      <div className="relative mb-4">
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 py-1 pl-1 pr-2 bg-gray-900/70 rounded-full">
          <Image
            src={lesson.academy.profileImageUrl}
            alt="아바타"
            width={32}
            height={32}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-body_sr text-gray-100 pr-1.5">
            {lesson.academy.academyName}
          </span>
        </div>
        <DetailPagePhotoSlider
          imageUrls={imageUrls}
          alt="수업 사진"
          sliderType="other"
        />
      </div>

      <section className="flex flex-col gap-3 px-4">
        <div className="flex flex-wrap items-center gap-1">
          {!!levels.length &&
            levels.map((tag) => <LessonChip key={tag} label={tag} />)}
          {lesson.keyword.split(",").map((tag) => (
            <LessonChip key={tag} label={tag} />
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-heading_2 text-gray-900">{lesson.lessonName}</h1>
        </div>

        {lesson.price && (
          <div className="flex items-center justify-start gap-1">
            <p className="text-body_bm text-gray-900">{lesson.price}</p>
          </div>
        )}
      </section>

      <section className="flex flex-col gap-4 pt-6 px-4">
        <div className="flex flex-col gap-2 bg-gray-100 rounded-lg">
          <div className="flex items-center pt-4 px-4">
            <h2 className="text-body_bb text-gray-700">클래스 상세 설명</h2>
          </div>
          <div className="flex flex-col py-2">
            <div className="flex gap-3 px-4 py-2">
              <p className="flex-none text-body_sb w-[60px] text-gray-700">
                주제
              </p>
              <span className="text-body_sr text-gray-700">
                {lessonDetail.topic}
              </span>
            </div>

            <div className="flex gap-3 px-4 py-2">
              <p className="flex-none text-body_sb w-[60px] text-gray-700">
                신청자격
              </p>
              <div className="flex flex-col gap-1 text-body_sr text-gray-700">
                {lessonDetail.eligibilityRequirements}
              </div>
            </div>

            <div className="flex gap-3 px-4 py-2">
              <p className="flex-none text-body_sb w-[60px] text-gray-700">
                소개
              </p>
              <span className="text-body_sr text-gray-700 whitespace-pre-line">
                {lessonDetail.introduction}
              </span>
            </div>

            <div className="flex gap-1.5 px-4 py-2">
              <p className="flex-none text-body_sb w-[60px] text-gray-700">
                신청방법
              </p>
              <span className="text-body_sr text-gray-700"></span>

              <div className="flex flex-col gap-1 text-body_sr text-gray-700">
                {lessonDetail.applicationMethod.map((item, index) => (
                  <span key={index}>
                    {`(${index + 1}) `}
                    <a
                      href={item.applyUrl}
                      target="_blank"
                      className="underline text-blue-600 hover:text-blue-800"
                    >
                      {item.applyUrlType}
                    </a>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 px-4 py-2">
              <p className="flex-none text-body_sb w-[60px] text-gray-700">
                환불안내
              </p>
              <div className="flex flex-col gap-1 text-body_sr text-gray-700">
                {lessonDetail.refundPolicy &&
                lessonDetail.refundPolicy.length > 0 ? (
                  lessonDetail.refundPolicy.map((item, index) => (
                    <span key={item}>{`(${index + 1}) ${item}`}</span>
                  ))
                ) : (
                  <span>없음</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {lesson.pool ? (
          <div className="flex flex-col bg-gray-100 rounded-lg">
            <div className="flex items-center justify-between pl-4">
              <h2 className="text-body_bb text-gray-700">클래스 위치</h2>
              <Link href={`/pools/${lesson.pool.id}`} className="flex p-4">
                <ArrowRightIcon className="w-4 h-4 text-gray-900" />
              </Link>
            </div>

            <div className="px-4">
              <Map
                center={{
                  lat: lesson.pool.latitude,
                  lng: lesson.pool.longitude,
                }}
              >
                <Marker
                  lat={lesson.pool.latitude}
                  lng={lesson.pool.longitude}
                />
              </Map>
            </div>

            <div className="flex flex-col gap-1 pt-2 px-4 pb-4">
              <p className="text-body_sr text-gray-700">
                {lesson.pool.poolAddress}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col bg-gray-100 rounded-lg">
            <div className="flex items-center justify-between pt-4 pl-4">
              <h2 className="text-body_bb text-gray-700">클래스 위치</h2>
            </div>

            <div className="flex flex-col gap-1 pt-4 px-4 pb-4">
              <p className="text-body_sr text-gray-700">
                현재 등록된 장소 정보가 없습니다.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default LessonPage;
