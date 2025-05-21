import { getLesson } from "@/api/server/lessons";
import DetailPagePhotoSlider from "@/app/_components/PhotoSlider";
import ShareButton from "@/app/_components/ShareButton";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import InternetIcon from "@/components/icons/InternetIcon";
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
    // console.log("lessonDetail::::::::::::::::::값이 없어"); 
    notFound();
  }
  
  console.log("lessonDetail::::::::::::::::::", lesson.lessonDetail); 


  const applyChannels = lesson.applyChannels.filter(
    ({ applyUrl }) => !!applyUrl
  );

  console.log("lesson.lessonDetail::::::::::::::::왜에러남??", lesson.lessonDetail); 
  console.log("lessonDetail::::::::::::::::::타입?", typeof lesson.lessonDetail); 
  
  const lessonDetail = lessonDetailContentSchema.parse(
    JSON.parse(lesson.lessonDetail)
    // lesson.lessonDetail
  );
  
  console.log("lessonDetail classTopic::::::::::::::::::", lessonDetail.classTopic); 
  console.log("lessonDetail eligibilityRequirements::::::::::::::::::", lessonDetail.eligibilityRequirements); 
  console.log("lessonDetail classIntroduction::::::::::::::::::", lessonDetail.classIntroduction); 
  console.log("lessonDetail applicationMethod::::::::::::::::::", lessonDetail.applicationMethod); 
  

  const imageUrls = lesson.images.map((image) => image.imageUrl);
  const levels = lesson.level.split(",").map((tag) => tag.trim());

  // console.log("lessonDetail::::::::::::::::::", lesson.images); 

  // "classTopic": "스타트 특강",
  // "eligibilityRequirements": ["조건1", "조건2"],
  // "classIntroduction": "신식 스타트대 사용",
  // "applicationMethod": ["DM"],
  // "refundPolicy": []

  return (
    <div className="flex flex-col pb-10">
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
          <span className="text-body_sr text-gray-100">
            {lesson.academy.academyName}
          </span>
        </div>
        <DetailPagePhotoSlider 
        imageUrls={imageUrls} 
        alt="수업 사진"
        sliderType="other" />
      </div>

      <section className="flex flex-col gap-3 px-4 mb-6">
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

      <section className="flex flex-col gap-2 px-4 pb-6 border-b border-gray-200">
        <h2 className="text-body_bb text-gray-700">신청하기</h2>

        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {applyChannels.map(({ applyUrl, applyUrlType }) => {
            if (applyUrlType === "KAKAOTALK") {
              return (
                <Link
                  key={applyUrl}
                  href={applyUrl}
                  className={`${
                    applyChannels.length > 2 ? "flex-none" : "flex-1"
                  } flex items-center justify-center gap-2 bg-gray-200 rounded-lg py-3 px-4`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/icon/kakao.png"
                    alt="카카오톡"
                    width={24}
                    height={24}
                  />
                  <p className="text-slate-800 text-body_sm">오픈 카카오톡</p>
                </Link>
              );
            }

            if (applyUrlType === "INSTAGRAM") {
              return (
                <Link
                  key={applyUrl}
                  href={applyUrl}
                  className={`${
                    applyChannels.length > 2 ? "flex-none" : "flex-1"
                  } flex items-center justify-center gap-2 bg-gray-200 rounded-lg py-3 px-4`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/icon/instagram.png"
                    alt="인스타그램"
                    width={24}
                    height={24}
                  />
                  <p className="text-slate-800 text-body_sm">인스타그램</p>
                </Link>
              );
            }

            if (applyUrlType === "NAVERCAFE") {
              return (
                <Link
                  key={applyUrl}
                  href={applyUrl}
                  className={`${
                    applyChannels.length > 2 ? "flex-none" : "flex-1"
                  } flex items-center justify-center gap-2 bg-gray-200 rounded-lg py-3 px-4`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/icon/naver-cafe-c.png"
                    alt="네이버 카페"
                    width={24}
                    height={24}
                  />
                  <p className="text-slate-800 text-body_sm">네이버 카페</p>
                </Link>
              );
            }

            if (applyUrlType === "SITE") {
              return (
                <Link
                  key={applyUrl}
                  href={applyUrl}
                  className={`${
                    applyChannels.length > 2 ? "flex-none" : "flex-1"
                  } flex items-center justify-center gap-2 bg-gray-200 rounded-lg py-3 px-4`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InternetIcon className="w-6 h-6" />
                  <p className="text-slate-800 text-body_sm">사이트</p>
                </Link>
              );
            }

            return null;
          })}
        </div>
      </section>

      <section className="flex flex-col gap-4 pt-6 px-4">
        <div className="flex flex-col gap-2 bg-gray-100 rounded-lg">
          <div className="flex items-center pt-4 px-4">
            <h2 className="text-body_bb text-gray-700">클래스 상세 설명</h2>
          </div>
          <div className="flex flex-col py-2">
            <div className="flex gap-3 px-4 py-2">
              <p className="flex-none text-body_sb w-[52px] text-gray-700">
                주제
              </p>
              <span className="text-body_sr text-gray-700">
                {lessonDetail.classTopic}
              </span>
            </div>

            <div className="flex gap-3 px-4 py-2">
              <p className="flex-none text-body_sb w-[52px] text-gray-700">
                신청자격
              </p>
              <div className="flex flex-col gap-1 text-body_sr text-gray-700">
                {lessonDetail.eligibilityRequirements.map(
                  (requirement, index) => (
                    <span key={requirement}>
                      {`(${index + 1}) `}
                      {requirement}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="flex gap-3 px-4 py-2">
              <p className="flex-none text-body_sb w-[52px] text-gray-700">
                소개
              </p>
              <span className="text-body_sr text-gray-700 whitespace-pre-line">
                {lessonDetail.classIntroduction}
              </span>
            </div>

            <div className="flex gap-3 px-4 py-2">
              <p className="flex-none text-body_sb w-[52px] text-gray-700">
                신청방법
              </p>
              <span className="text-body_sr text-gray-700">
                {lessonDetail.applicationMethod.join(", ")}
              </span>
            </div>

            <div className="flex gap-3 px-4 py-2">
              <p className="flex-none text-body_sb w-[52px] text-gray-700">
                환불안내
              </p>
              <div className="flex flex-col gap-1 text-body_sr text-gray-700">
                {lessonDetail.refundPolicy.map((item, index) => (
                  <span key={item}>
                    {`(${index + 1}) `}
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {lesson.pool && (
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
        )}
      </section>
    </div>
  );
};

export default LessonPage;
