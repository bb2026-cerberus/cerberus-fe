# 개발 가이드

## 기본 규칙
- TypeScript 기준으로 작성하고 any 사용은 최소화한다.
- 역할별 화면은 `src/pages/mentee`, `src/pages/mentor`에 둔다.
- 공통 레이아웃은 `AppShell`을 사용한다.
- 전역 인증 상태는 `useAuth()`로만 접근한다.
- API 호출은 도메인별 모듈(`src/services/api/*`)에서만 만든다.
- 페이지 로딩은 `Loading`, 리스트 로딩은 `Skeleton`을 사용한다.

## 짧은 예시

### 1) 역할 기반 라우트
```tsx
<Route element={<RoleGuard allow="mentee" />}>
  <Route path={routePaths.mentee} element={<MenteeLayout />}>
    <Route index element={<MenteeHome />} />
  </Route>
</Route>
```

### 2) API 호출 모듈
```ts
const getPlanner = <TResponse>() =>
  request<TResponse>({ method: 'GET', url: '/mentee/planner' })
```

### 3) 인증 상태 사용
```tsx
const { role, setRole, setToken, logout } = useAuth()
```

### 4) 로딩 처리
```tsx
if (isLoading) return <Loading />

return (
  <div className="space-y-2">
    {items.length === 0 ? (
      <Skeleton className="h-24 w-full" />
    ) : (
      items.map((item) => <div key={item.id}>{item.title}</div>)
    )}
  </div>
)
```
