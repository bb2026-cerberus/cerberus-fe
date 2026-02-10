import type { operations } from '@/types/api'

type OperationQuery<T extends keyof operations> =
  operations[T] extends { parameters: { query?: infer Q } } ? Q : never

type OperationPath<T extends keyof operations> =
  operations[T] extends { parameters: { path?: infer P } } ? P : never

// requestBody 가 선택(optional)인 경우까지 포함해서 매핑
type OperationRequestBody<T extends keyof operations> =
  operations[T] extends { requestBody?: { content: infer C } } ? C[keyof C] : never

type OperationResponse<T extends keyof operations> =
  operations[T] extends { responses: { 200: { content: infer C } } }
    ? C[keyof C]
    : never

export type {
  OperationPath,
  OperationQuery,
  OperationRequestBody,
  OperationResponse,
}
