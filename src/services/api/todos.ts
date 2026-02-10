import { request } from '@/services/api/http'
import type {
  OperationPath,
  OperationQuery,
  OperationRequestBody,
  OperationResponse,
} from '@/services/api/types'
import type { components } from '@/types/api'
import type { TodoDailyOverviewResponse } from '@/types/api/todos'

const getTodos = (query: OperationQuery<'getTodos'>) =>
  request<OperationResponse<'getTodos'>>({
    method: 'GET',
    url: '/todos',
    params: query,
  })

// /api/todos POST (등록 및 임시저장 공통) - multipart/form-data
const createTodo = (payload: FormData) =>
  request<OperationResponse<'createTodo'>>({
    method: 'POST',
    url: '/todos',
    data: payload,
    headers: { 'Content-Type': undefined },
  })

const getTodoDetail = (path: OperationPath<'getTodoDetail'>) =>
  request<OperationResponse<'getTodoDetail'>>({
    method: 'GET',
    url: `/todos/${path.todoId}`,
  })

const toggleTodoStatus = (path: OperationPath<'toggleStatus'>) =>
  request<OperationResponse<'toggleStatus'>>({
    method: 'PATCH',
    url: `/todos/${path.todoId}/completed`,
  })

const addTimerSession = (
  path: OperationPath<'addTimerSession'>,
  payload: OperationRequestBody<'addTimerSession'>,
) =>
  request<OperationResponse<'addTimerSession'>>({
    method: 'POST',
    url: `/todos/${path.todoId}/timer/sessions`,
    data: payload,
  })

// /api/todos/{todoId} PUT - 할 일 수정
const updateTodo = (path: OperationPath<'updateTodo'>, payload: FormData) =>
  request<OperationResponse<'updateTodo'>>({
    method: 'PUT',
    url: `/todos/${path.todoId}`,
    data: payload,
    headers: { 'Content-Type': undefined },
  })

const getTodosWeekly = (query: OperationQuery<'getTodosWeekly'>) =>
  request<OperationResponse<'getTodosWeekly'>>({
    method: 'GET',
    url: '/todos/weekly',
    params: query,
  })

const getTimersByDate = (query: OperationQuery<'getTimersByDate'>) =>
  request<OperationResponse<'getTimersByDate'>>({
    method: 'GET',
    url: '/todos/timers/daily',
    params: query,
  })

type GetDailyOverviewQuery = {
  menteeId: number
  date?: string
}

const getDailyOverview = (query: GetDailyOverviewQuery) =>
  request<TodoDailyOverviewResponse>({
    method: 'GET',
    url: '/todos/daily/overview',
    params: query,
  })

const downloadTodoFile = (query: OperationQuery<'downloadFile'>) =>
  request<OperationResponse<'downloadFile'>>({
    method: 'GET',
    url: '/todos/download',
    params: query,
  })

// 임시저장 할 일 관련 API는 OpenAPI에 정의되지 않아 별도 타입 정의
type GetDraftTodosQuery = {
  menteeId: number
}

type GetDraftTodosResponse =
  components['schemas']['CommonResponseListGroupedTodosResponseDto']

type CreateDraftTodoPayload = {
  menteeId: number
  subject?: components['schemas']['TodoSaveRequestDto']['subject']
  title?: string
  content?: string
  date?: string
}

type DeleteDraftTodoPath = {
  todoId: number
}

const getDraftTodos = (query: GetDraftTodosQuery) =>
  request<GetDraftTodosResponse>({
    method: 'GET',
    url: '/todos/drafts',
    params: query,
  })

const createDraftTodo = (payload: CreateDraftTodoPayload) =>
  request<components['schemas']['CommonResponseVoid']>({
    method: 'POST',
    url: '/todos/drafts',
    data: payload,
  })

const deleteDraftTodo = (path: DeleteDraftTodoPath) =>
  request<components['schemas']['CommonResponseVoid']>({
    method: 'DELETE',
    url: `/todos/drafts/${path.todoId}`,
  })

const uploadTodoVerification = (
  path: OperationPath<'uploadVerification'>,
  payload: OperationRequestBody<'uploadVerification'>,
) =>
  request<OperationResponse<'uploadVerification'>>({
    method: 'POST',
    url: `/todos/${path.todoId}/verification`,
    data: payload,
  })

const updateTodoVerification = (
  path: OperationPath<'updateVerification'>,
  payload: OperationRequestBody<'updateVerification'>,
) =>
  request<OperationResponse<'updateVerification'>>({
    method: 'PUT',
    url: `/todos/${path.todoId}/verification`,
    data: payload,
  })

const deleteTodoVerification = (path: OperationPath<'deleteVerification'>) =>
  request<OperationResponse<'deleteVerification'>>({
    method: 'DELETE',
    url: `/todos/${path.todoId}/verification`,
  })

const todosApi = {
  getTodos,
  createTodo,
  updateTodo,
  getTodoDetail,
  toggleTodoStatus,
  addTimerSession,
  getTodosWeekly,
  getTimersByDate,
  getDailyOverview,
  downloadTodoFile,
  getDraftTodos,
  createDraftTodo,
  deleteDraftTodo,
  uploadTodoVerification,
  updateTodoVerification,
  deleteTodoVerification,
}

export default todosApi
