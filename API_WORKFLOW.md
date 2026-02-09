# API 연동/로딩/삭제 모달 가이드

## 핵심 규칙
- API 타입 원본: `src/types/api/generated.ts`
- API 호출 모듈: `src/services/api/*`
- 기본 훅 사용: `const { error, run, setError } = useApiRequest()`

## useApiRequest 기본 사용법
- 공통 패턴
```ts
const { error, run, setError } = useApiRequest()

const response = await run(
  () => someApi.call(payload),
  {
    errorMessage: '요청에 실패했어요.',
    onSuccess: (data) => {
      // 성공 처리
    },
  },
)
```
- 에러 메시지는 `error`로 UI에 노출하고, 유효성 검사는 `setError`로 처리

## 로딩 규칙
- 목록 조회: 인라인 로딩 사용 + `Skeleton` 렌더링
- 커밋성 액션(등록/수정/삭제/업로드): 전역 오버레이 로딩 사용

### 오버레이 로딩 사용 예시
```ts
await run(
  () => api.create(payload),
  { useOverlay: true, overlayMessage: '등록 중...', errorMessage: '등록 실패' },
)
```

### 인라인 로딩 사용 예시
- `loading` 상태로 리스트 영역에 `Skeleton` 표시
- 전체 화면 오버레이는 사용하지 않음

## 삭제 UX
- 삭제 액션은 반드시 `DeleteConfirmModal` 사용
- 즉시 삭제 금지, 모달에서 사용자 확인 후 API 호출
- 임시저장 삭제 흐름을 참고 (멘티 임시저장 목록에서 확인 모달 후 삭제)

## 참고 코드 (`run` 사용 예시)
GET
`src/pages/mentee/MenteeTodoCreate.tsx` (임시저장 목록 조회)
POST
`src/pages/Home.tsx` (로그인)
`src/pages/mentee/MenteeTodoCreate.tsx` (할 일 등록/임시저장)
DELETE
`src/pages/mentee/MenteeTodoCreate.tsx` (임시저장 삭제)
