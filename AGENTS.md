# AI 작업 규칙 (AGENTS)

## 범위

- 이 파일은 AI 작업자를 위한 지침이다. 사람용 규칙은 별도 문서를 참고한다.

## 프로젝트 기본 원칙

- TypeScript 기준으로 작성하고 any 사용은 최소화한다.
- 단일 책임 원칙을 지키고, 작은 컴포넌트/훅/유틸로 분리한다.
- import는 절대 경로 "@"를 유지한다.
- 스타일은 Tailwind + shadcn 패턴을 따른다.
- 멘티 화면은 모바일 우선, 멘토 화면은 데스크톱 우선을 기본으로 설계한다.
- 회원가입은 구현하지 않고 역할별 사전 계정 흐름을 전제로 한다.

## 라우팅/레이아웃

- 라우트 상수는 `src/routes/routePaths.ts`에만 추가한다.
- 페이지는 `src/pages` 아래에 역할별(`mentee`, `mentor`)로 둔다.
- 레이아웃은 `src/components/layout/AppShell.tsx`를 사용한다.
- 역할 접근은 `RoleGuard`로만 제어한다.

## 상태관리(Auth)

- 전역 인증 상태는 `useAuth()`를 통해서만 읽고 변경한다.
- 토큰/역할 변경은 `setToken`, `setRole`, `logout`으로만 한다.
- `localStorage` 직접 접근 금지. `src/services/storage/*`만 사용한다.
- 401 응답 시 토큰/역할 제거 로직과 일관되게 동작하도록 한다.

## API/통신

- axios 인스턴스는 `src/services/api/http.ts`만 사용한다.
- API 호출은 `src/services/api/*` 도메인 모듈로만 작성한다.
- 에러 처리는 공통 `ApiError` 구조를 따른다.
- API 응답 타입은 `src/types/api` 공통 타입을 우선 사용한다.

## 타입 설계

- 타입은 용도에 따라 분리한다.
  - 화면(UI) 타입: `src/types/ui/*`
  - API 타입: `src/types/api/*`
- 공통 도메인 타입: `src/types/shared/*`
- 화면 타입은 UI 컴포넌트/페이지에서 재사용되는 경우에만 공통 폴더로 올린다. 파일 내부 전용 타입은 로컬에 유지한다.

## UI/공통 컴포넌트

- UI 작업 전에 항상 `src/components` 폴더(공통 UI는 `src/components/ui`)를 확인하여 기존 컴포넌트 재사용 여부를 판단한다.
- 공통 UI는 `src/components/ui`에만 추가한다.
- 클래스 결합은 `cn` 유틸(`@/lib/utils`)로 한다.
- 에러/로딩은 `ErrorBoundary`, `Loading`을 사용한다.
- 비동기 화면에는 `Loading` 또는 `Skeleton` 중 하나를 적용한다.

## 색상/디자인 토큰

- 색상은 `src/index.css`에 정의된 Figma 디자인 토큰(CSS 변수)만 사용한다. `--color-figma-white`, `--color-figma-point-color-1`, `--color-figma-point-color-2`, `--color-figma-card-color`, `--color-figma-light-gray`, `--color-figma-typo-black`, `--color-figma-typo-gray`, `--color-figma-icon-color`, `--color-figma-sub-color-1`, `--color-figma-sub-color-2`, `--color-figma-sub-color-3`, `--color-figma-typo-gray-b`, `--color-figma-card-gray`, `--color-figma-start-color` 등(`src/index.css` 29–42라인 근처)을 참고한다.

## 로딩 규칙

- 전체 페이지 로딩: `Loading` 컴포넌트를 사용한다.
- 리스트/카드 단위 로딩: `Skeleton`으로 자리 잡고 전환한다.
- 단순 액션 로딩(버튼 클릭 등): 버튼 내부에 로딩 상태를 표시한다.

## 환경 변수

- API Base URL은 `VITE_API_BASE_URL`만 사용한다.
- 환경별 값은 `.env*` 파일에서 관리한다.
