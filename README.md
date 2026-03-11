# 🏊 Dive In — 수영 클래스 통합 조회 플랫폼

**Dive + In** 의 합성어로, 수영에 진심인 스위머(swimmer)들이 깊게 다이빙하여 뛰어든다는 뜻입니다.

여기저기 흩어져 있던 수영 클래스 정보를 한 눈에 확인할 수 있는 통합 조회 플랫폼입니다.

**배포 링크**: [dive-in-web-vercel-deploy-8vor-7855qu2ia.vercel.app](https://dive-in-web-vercel-deploy-8vor-7855qu2ia.vercel.app)

---

## 📌 프로젝트 배경

수영 클래스 정보를 찾을 때 어려움을 느낀다고 응답한 사용자가 **116명 중 58.5%** 에 달했습니다.

> "수영 클래스 정보가 여기저기 다 흩어져 있어서 진짜 헷갈려요!"
> "원하는 시간대나 조건 맞는 클래스를 찾기가 정말 힘들어요"
> "강사 정보가 부족해서 누구한테 배워야 할지 고민돼요"

이 문제를 해결하기 위해 수영 클래스, 수영장, 커뮤니티 정보를 한 곳에서 확인할 수 있는 서비스를 기획했습니다.

---

## 👥 팀 구성 및 기간

| 역할 | 인원 |
|------|------|
| 서비스 기획 | 2명 |
| 디자인 | 1명 |
| 프론트엔드 | 1명 (본인) |
| 백엔드 | 1명 |

**팀 프로젝트 기간**: 2024.12 ~ 2025.05
**개인 프로젝트 전환**: 2026.02 ~ 현재

> 팀 프로젝트로 시작해 약 6개월간 개발했으나, 이후 개인 프로젝트로 전환하여 Mock 인프라를 직접 구축했습니다.

---

## 📸 데모

> 추후 GIF 추가 예정

---

## ✨ 핵심 기능

| 버전 | 기능 | 설명 |
|------|------|------|
| v1.0 | 수영 클래스 | 흩어져 있던 수영 클래스를 한눈에 확인. 난이도, 강사, 가격, 신청 링크 제공 |
| v1.0 | 수영장 | 수영장 정보 및 위치 확인, 카카오맵 길찾기 연동 |
| v1.5 | 마이페이지 | 내 정보 확인 및 프로필 관리, 수영코칭팀/강사 등록 |
| v2.0 | 커뮤니티 | 카테고리별 게시글 작성·조회·댓글, 무한스크롤, OG 링크 미리보기 |
| v2.5 | 통합검색 | 클래스·수영장·커뮤니티 통합 검색, 디바운싱 + Zustand 전역 상태 관리 |

---

## 🛠 기술 스택

| 분류 | 기술 | 선택 이유 |
|------|------|----------|
| Framework | Next.js 14 (App Router) | 서버 컴포넌트와 Route Handler로 클라이언트/서버 역할을 명확히 분리 |
| Language | TypeScript | API 응답 타입을 Zod로 검증하고 컴파일 타임에 타입 오류 방지 |
| Styling | Tailwind CSS | 유틸리티 클래스 기반 빠른 UI 구성 |
| Validation | Zod | API 경계에서 런타임 타입 검증 및 transform으로 안전한 데이터 처리 |
| 상태 관리 | Zustand | 검색 상태를 여러 컴포넌트에서 공유하고 props drilling 없이 접근 |
| 인증 | Kakao OAuth | 소셜 로그인 UX 제공 |

---

## 🏗 아키텍처

### Mock / Real API 전환 구조

백엔드 서버 이탈 후 `NEXT_PUBLIC_USE_MOCK` 환경변수 하나로 mock과 real API를 전환할 수 있는 구조를 설계했습니다.

```
src/api/server/community/
├── index.ts        # USE_MOCK 분기 — mock/real 중 하나를 re-export
├── real.ts         # 외부 API 호출 (api.dive-in.co.kr)
├── mock.server.ts  # 서버사이드 읽기 (getCommunities, getCommunity)
└── mock.client.ts  # 클라이언트 쓰기 (createCommunity → localStorage)
```

Mock 환경에서는 `localStorage`를 데이터 저장소로 사용합니다. seed 데이터 35개가 자동으로 생성되며 `SEEDED_KEY`로 중복 seed를 방지합니다.

### 페이지 구조 패턴

```
page.tsx (Server Component)
  └── clientPage.tsx (Client Component)
        └── _components/ (코로케이션 컴포넌트)
```

서버 컴포넌트에서 데이터를 fetch하고 클라이언트 컴포넌트에 props로 전달합니다. 인터랙션(필터링, 무한스크롤, 폼)은 클라이언트 컴포넌트에서 처리합니다.

### Route Handler 활용

외부 API 호출 시 발생하는 CORS 문제와 서버 액션 남용을 Route Handler로 해결했습니다.

| Route Handler | 역할 |
|--------------|------|
| `/api/og?url=` | 외부 URL OG 메타태그 서버사이드 파싱 (CORS 우회) |
| `/api/search?keyword=` | Mock: 빌더 기반 키워드 필터링 / Real: 외부 API 프록시 |

---

## 📁 폴더 구조

```
src/
├── app/                  # Next.js App Router 페이지 및 Route Handler
│   ├── api/              # Route Handler (og, search, auth 등)
│   └── community/        # 커뮤니티 관련 페이지
├── api/server/           # API 레이어 (mock/real 분기)
├── lib/community/        # Mock 데이터 빌더 및 localStorage CRUD
├── store/                # Zustand 전역 상태
├── schemas/              # Zod 스키마
├── types/                # z.infer 기반 타입
└── constants/            # 카테고리 등 상수
```

---

## 🚀 로컬 실행

```bash
npm install
npm run dev
```

**환경변수 설정** (`.env.local`):

```env
NEXT_PUBLIC_USE_MOCK=true
NEXT_PUBLIC_KAKAO_APP_KEY=your_key
NEXT_PUBLIC_KAKAO_REST_API_KEY=your_key
KAKAO_CLIENT_SECRET=your_secret
```

> `NEXT_PUBLIC_USE_MOCK=true` 설정 시 외부 API 없이 Mock 데이터로 동작합니다.
