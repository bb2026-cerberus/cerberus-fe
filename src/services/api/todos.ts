import { request } from '@/services/api/http'
import type {
  OperationPath,
  OperationQuery,
  OperationRequestBody,
  OperationResponse,
} from '@/services/api/types'

const getTodos = (query: OperationQuery<'getTodos'>) =>
  request<OperationResponse<'getTodos'>>({
    method: 'GET',
    url: '/api/todos',
    params: query,
  })

const createTodo = (payload: OperationRequestBody<'createTodo'>) =>
  request<OperationResponse<'createTodo'>>({
    method: 'POST',
    url: '/api/todos',
    data: payload,
  })

const getTodoDetail = (path: OperationPath<'getTodoDetail'>) =>
  request<OperationResponse<'getTodoDetail'>>({
    method: 'GET',
    url: `/api/todos/${path.todoId}`,
  })

const toggleTodoStatus = (path: OperationPath<'toggleStatus'>) =>
  request<OperationResponse<'toggleStatus'>>({
    method: 'PATCH',
    url: `/api/todos/${path.todoId}/completed`,
  })

const addTimerSession = (
  path: OperationPath<'addTimerSession'>,
  payload: OperationRequestBody<'addTimerSession'>,
) =>
  request<OperationResponse<'addTimerSession'>>({
    method: 'POST',
    url: `/api/todos/${path.todoId}/timer/sessions`,
    data: payload,
  })

const getTodosWeekly = (query: OperationQuery<'getTodosWeekly'>) =>
  request<OperationResponse<'getTodosWeekly'>>({
    method: 'GET',
    url: '/api/todos/weekly',
    params: query,
  })

const getTimersByDate = (query: OperationQuery<'getTimersByDate'>) =>
  request<OperationResponse<'getTimersByDate'>>({
    method: 'GET',
    url: '/api/todos/timers/daily',
    params: query,
  })

const downloadTodoFile = (query: OperationQuery<'downloadFile'>) =>
  request<OperationResponse<'downloadFile'>>({
    method: 'GET',
    url: '/api/todos/download',
    params: query,
  })

const getDraftTodos = (query: OperationQuery<'getDraftTodos'>) =>
  request<OperationResponse<'getDraftTodos'>>({
    method: 'GET',
    url: '/api/todos/drafts',
    params: query,
  })

const createDraftTodo = (payload: OperationRequestBody<'createDraftTodo'>) =>
  request<OperationResponse<'createDraftTodo'>>({
    method: 'POST',
    url: '/api/todos/drafts',
    data: payload,
  })

const deleteDraftTodo = (path: OperationPath<'deleteDraftTodo'>) =>
  request<OperationResponse<'deleteDraftTodo'>>({
    method: 'DELETE',
    url: `/api/todos/drafts/${path.todoId}`,
  })

const uploadTodoVerification = (
  path: OperationPath<'uploadVerification'>,
  payload: OperationRequestBody<'uploadVerification'>,
) =>
  request<OperationResponse<'uploadVerification'>>({
    method: 'POST',
    url: `/api/todos/${path.todoId}/verification`,
    data: payload,
  })

const updateTodoVerification = (
  path: OperationPath<'updateVerification'>,
  payload: OperationRequestBody<'updateVerification'>,
) =>
  request<OperationResponse<'updateVerification'>>({
    method: 'PUT',
    url: `/api/todos/${path.todoId}/verification`,
    data: payload,
  })

const deleteTodoVerification = (path: OperationPath<'deleteVerification'>) =>
  request<OperationResponse<'deleteVerification'>>({
    method: 'DELETE',
    url: `/api/todos/${path.todoId}/verification`,
  })

const todosApi = {
  getTodos,
  createTodo,
  getTodoDetail,
  toggleTodoStatus,
  addTimerSession,
  getTodosWeekly,
  getTimersByDate,
  downloadTodoFile,
  getDraftTodos,
  createDraftTodo,
  deleteDraftTodo,
  uploadTodoVerification,
  updateTodoVerification,
  deleteTodoVerification,
}

export default todosApi
