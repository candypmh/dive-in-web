import Link from "next/link";
import LessonChip from "@/components/ui/Chip";
import InstructorProfile from "@/app/_components/InstructorProfile";
import { z } from "zod";
import { topViewLessonListSchema } from "@/schemas/home";

type LessonCardProps = {
  lesson: z.infer<typeof topViewLessonListSchema>;
};

export default function LessonCard({ lesson }: LessonCardProps) {
  return (
    <Link
      href={`/lessons/${lesson.id}`}
      className="p-6 rounded-lg shadow-sm bg-gray-100 flex flex-col h-full hover:bg-gray-200 transition-colors"
    >
      <div className="flex flex-wrap gap-2 items-center pb-2">
        {[...lesson.level.split(","), ...lesson.keyword.split(",")].map(
          (tag, index) => (
            <LessonChip key={index} label={tag.trim()} />
          )
        )}
      </div>
      <h4 className="pb-10 text-base sm:text-xl font-bold text-gray-900 mb-1">
        {lesson.lessonName}
      </h4>
      <div className="mt-auto">
        <InstructorProfile
          avatar={lesson.instructorImgUrl}
          name={lesson.instructorName}
        />
      </div>
    </Link>
  );
}
