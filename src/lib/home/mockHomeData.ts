import { buildCommunityDetail } from "@/lib/community/mockCommunityDetail";
import { HomeProps } from "@/types/home";

function toPostListItem(postId: number) {
  const detail = buildCommunityDetail(postId);
  return {
    postId: detail.postId,
    categoryName: detail.categoryName,
    title: detail.title,
    content: detail.content,
    image: detail.images?.[0] ?? null,
    likesCnt: detail.likesCnt,
    cmmtCnt: detail.cmntCnt,
    viewCnt: detail.viewCnt,
    writer: detail.writer,
    writerProfile: detail.writerProfile,
    createdAt: detail.createdAt,
    updatedAt: detail.updatedAt,
  };
}

export const mockHomeData: HomeProps = {
  topViewLessonList: [
    {
      id: 1,
      instructorName: "수달상회",
      instructorImgUrl: "/empty/academy_profile.png",
      keyword: "접영,스타트",
      lessonName: "마스터즈 평일 교정 훈련 클래스",
      lessonImgUrl: "https://placehold.co/300x200",
      level: "고급",
      price: "월 150,000원",
      viewCnt: 320,
    },
    {
      id: 2,
      instructorName: "이지스윔",
      instructorImgUrl: "/empty/academy_profile.png",
      keyword: "자유형,다이빙",
      lessonName: "유소년 선수반",
      lessonImgUrl: "https://placehold.co/300x200",
      level: "초급,중급",
      price: "월 120,000원",
      viewCnt: 210,
    },
    {
      id: 3,
      instructorName: "물곰TV",
      instructorImgUrl: "/empty/academy_profile.png",
      keyword: "배영,개인혼영",
      lessonName: "성인 기초 수영 클래스",
      lessonImgUrl: "https://placehold.co/300x200",
      level: "초급",
      price: "월 90,000원",
      viewCnt: 185,
    },
    {
      id: 7,
      instructorName: "스윔히어로",
      instructorImgUrl: "/empty/academy_profile.png",
      keyword: "접영,교정",
      lessonName: "접영 집중 교정 클래스",
      lessonImgUrl: "https://placehold.co/300x200",
      level: "중급,고급",
      price: "월 140,000원",
      viewCnt: 160,
    },
  ],

  newLessonList: [
    {
      id: 4,
      instructorName: "4레인",
      instructorImgUrl: "/empty/academy_profile.png",
      keyword: "접영,교정",
      lessonName: "청소년 선수반",
      lessonImgUrl: "https://placehold.co/300x200",
      level: "중급",
      price: "월 130,000원",
      viewCnt: 45,
    },
    {
      id: 5,
      instructorName: "블루웨이브",
      instructorImgUrl: "/empty/academy_profile.png",
      keyword: "자유형,체력",
      lessonName: "주말 집중 수영 트레이닝",
      lessonImgUrl: "https://placehold.co/300x200",
      level: "중급,고급",
      price: "월 110,000원",
      viewCnt: 30,
    },
    {
      id: 6,
      instructorName: "아쿠아짐",
      instructorImgUrl: "/empty/academy_profile.png",
      keyword: "수중운동,건강",
      lessonName: "시니어 아쿠아로빅",
      lessonImgUrl: "https://placehold.co/300x200",
      level: "초급",
      price: "월 80,000원",
      viewCnt: 22,
    },
    {
      id: 8,
      instructorName: "오션핏",
      instructorImgUrl: "/empty/academy_profile.png",
      keyword: "자유형,체력",
      lessonName: "다이어트 수영 클래스",
      lessonImgUrl: "https://placehold.co/300x200",
      level: "초급,중급",
      price: "월 95,000원",
      viewCnt: 18,
    },
  ],

  topViewPostList: [5, 12, 20].map(toPostListItem),

  newPostList: [33, 34, 35].map(toPostListItem),

  competitionPostList: [
    {
      postId: 101,
      title: "2026 MAC배 전국수영대회",
      content: "전국 아마추어 수영인 대상 대회",
      categoryName: "COMPETITION",
      period: "2026.04.12 ~ 2026.04.13",
      dDay: null,
    },
    {
      postId: 102,
      title: "2026 전국 마스터즈 수영대회",
      content: "마스터즈 등록 선수 대상 대회",
      categoryName: "COMPETITION",
      period: "2026.05.02 ~ 2026.05.04",
      dDay: null,
    },
  ],
};
