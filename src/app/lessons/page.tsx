import { getLessons } from "@/api/server/lessons";
import LessonChip from "@/components/ui/Chip";
import Link from "next/link";
import InstructorProfile from "../_components/InstructorProfile";
import Image from "next/image";

const convertToKRW = (price: string) => {
  if (!price) {
    return "";
  }

  const isNumber = /^[0-9]*$/.test(price);

  if (!isNumber) {
    return price;
  }

  return `${parseInt(price).toLocaleString()}원`;
};

export default async function LessonsPage() {
  const lessons = await getLessons();

  return (
    <div className="flex flex-col">
      <header className="flex gap-2 pt-4 px-4">
        <div className="flex items-center gap-2">
          <Image
            alt="로고"
            src="/image/logo_o.png"
            width={68}
            height={16}
            className="h-4 w-[68px] object-cover"
          />
        </div>
      </header>
      <section className="flex flex-col">
        <div className="flex items-center gap-2 pt-6 px-4 pb-5">
          <h2 className="text-heading_2">수영 클래스</h2>
        </div>

        <ul className="flex flex-col gap-6 px-4 pb-10">
          {lessons.map((lesson) => (
            <li key={lesson.id}>
              <Link
                href={`/lessons/${lesson.id}`}
                className="flex flex-col gap-2"
              >
                <InstructorProfile
                  avatar={lesson.academyImageUrl}
                  name={lesson.academyName}
                />

                <div className="flex-none flex flex-col items-start gap-2 bg-gray-100 rounded-lg p-4">
                  <div className="flex flex-wrap items-center gap-1">
                    {lesson.level &&
                      lesson.level
                        .split(",")
                        .map((tag) => (
                          <LessonChip key={tag} label={tag.trim()} />
                        ))}
                    {lesson.keyword.split(",").map((tag) => (
                      <LessonChip key={tag} label={tag} />
                    ))}
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <h3 className="text-gray-900 text-body_bb">
                      {lesson.lessonName}
                    </h3>
                  </div>

                  {lesson.price && (
                    <div className="flex items-center gap-1">
                      <p className="text-body_sm text-gray-900">
                        {convertToKRW(lesson.price)}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
