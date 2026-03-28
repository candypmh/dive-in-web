import { z } from "zod";
import { lessonDetailSchema, lessonSchema } from "@/schemas/lessons";

type Lesson = z.infer<typeof lessonSchema>;
type LessonDetail = z.infer<typeof lessonDetailSchema>;

export const mockLessonList: Lesson[] = [
  { id: 1, academyName: "수달상회", academyImageUrl: "/empty/academy_profile.png", lessonName: "마스터즈 평일 교정 훈련 클래스", level: "고급", keyword: "접영,스타트", price: "월 150,000원" },
  { id: 2, academyName: "이지스윔", academyImageUrl: "/empty/academy_profile.png", lessonName: "유소년 선수반", level: "초급,중급", keyword: "자유형,다이빙", price: "월 120,000원" },
  { id: 3, academyName: "물곰TV", academyImageUrl: "/empty/academy_profile.png", lessonName: "성인 기초 수영 클래스", level: "초급", keyword: "배영,개인혼영", price: "월 90,000원" },
  { id: 4, academyName: "4레인", academyImageUrl: "/empty/academy_profile.png", lessonName: "청소년 선수반", level: "중급", keyword: "접영,교정", price: "월 130,000원" },
  { id: 5, academyName: "블루웨이브", academyImageUrl: "/empty/academy_profile.png", lessonName: "주말 집중 수영 트레이닝", level: "중급,고급", keyword: "자유형,체력", price: "월 110,000원" },
  { id: 6, academyName: "아쿠아짐", academyImageUrl: "/empty/academy_profile.png", lessonName: "시니어 아쿠아로빅", level: "초급", keyword: "수중운동,건강", price: "월 80,000원" },
];

const mockDetail = (id: number): LessonDetail => ({
  id,
  lessonName: mockLessonList.find((l) => l.id === id)?.lessonName ?? "수영 클래스",
  level: mockLessonList.find((l) => l.id === id)?.level ?? "초급",
  capacity: "20명",
  price: mockLessonList.find((l) => l.id === id)?.price ?? "가격 문의",
  keyword: mockLessonList.find((l) => l.id === id)?.keyword ?? "",
  lessonDetail: {
    topic: "수영 기술 향상 및 체력 강화",
    eligibilityRequirements: ["수영 기본기를 보유하신 분", "꾸준히 참여 가능하신 분"],
    introduction: "전문 코치와 함께하는 체계적인 수영 클래스입니다. 개인 실력에 맞는 맞춤형 지도로 실력을 향상시켜 드립니다.",
    applicationMethod: [{ applyUrl: "https://instagram.com", applyUrlType: "인스타그램" }],
    refundPolicy: ["수업 3일 전 취소 시 전액 환불", "수업 당일 취소 시 환불 불가"],
  },
  lessonSchedule: "평일 오전 6:00 ~ 7:30 / 저녁 7:00 ~ 8:30",
  lessonStatus: "모집중",
  academy: {
    id,
    academyName: mockLessonList.find((l) => l.id === id)?.academyName ?? "수영 아카데미",
    academyInfo: "전문 수영 코치진이 운영하는 수영 클래스입니다.",
    profileImageUrl: "/empty/academy_profile.png",
  },
  pool: [
    { id: 1, poolName: "잠실실내수영장", poolAddress: "서울 송파구 올림픽로 240", region: "송파", imageUrl: "", latitude: 37.5126, longitude: 127.0769 },
    { id: 2, poolName: "올림픽수영장", poolAddress: "서울 송파구 올림픽로 424", region: "송파", imageUrl: "", latitude: 37.5219, longitude: 127.0822 },
    { id: 3, poolName: "뚝섬한강공원수영장", poolAddress: "서울 광진구 강변북로 139", region: "광진", imageUrl: "", latitude: 37.5295, longitude: 127.0667 },
    { id: 4, poolName: "노원실내수영장", poolAddress: "서울 노원구 동일로 1321", region: "노원", imageUrl: "", latitude: 37.6556, longitude: 127.0763 },
    { id: 5, poolName: "마포구민체육센터수영장", poolAddress: "서울 마포구 월드컵북로 400", region: "마포", imageUrl: "", latitude: 37.5683, longitude: 126.9077 },
    { id: 1, poolName: "잠실실내수영장", poolAddress: "서울 송파구 올림픽로 240", region: "송파", imageUrl: "", latitude: 37.5126, longitude: 127.0769 },
  ][id - 1],
  images: [],
});

export const getMockLesson = (id: number): LessonDetail | null => {
  const exists = mockLessonList.some((l) => l.id === id);
  if (!exists) return null;
  return mockDetail(id);
};
