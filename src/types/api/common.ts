type ApiMeta = {
  requestId?: string
  timestamp?: string
}

type ApiErrorDetail = {
  field?: string
  message?: string
  code?: string
}

type ApiErrorResponse = {
  status: number
  message: string
  code?: string
  details?: ApiErrorDetail[] | Record<string, unknown>
  meta?: ApiMeta
}

type ApiResponse<T> = {
  data: T
  meta?: ApiMeta
}

type Pagination = {
  page: number
  size: number
  total: number
  totalPages?: number
}

type PaginatedResponse<T> = {
  data: T[]
  pagination: Pagination
  meta?: ApiMeta
}

export type {
  ApiMeta,
  ApiErrorDetail,
  ApiErrorResponse,
  ApiResponse,
  Pagination,
  PaginatedResponse,
}
