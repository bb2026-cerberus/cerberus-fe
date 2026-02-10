import { request } from '@/services/api/http'
import type {
  OperationPath,
  OperationQuery,
  OperationRequestBody,
  OperationResponse,
} from '@/services/api/types'

const getQna = (query: OperationQuery<'getQna'>) =>
  request<OperationResponse<'getQna'>>({
    method: 'GET',
    url: '/mentees/qnas',
    params: query,
  })

const createQna = (
  query: OperationQuery<'createQna'>,
  payload: OperationRequestBody<'createQna'> | FormData,
) =>
  request<OperationResponse<'createQna'>>({
    method: 'POST',
    url: '/mentees/qnas',
    params: query,
    data: payload,
  })

const updateQna = (
  query: OperationQuery<'updateQna'>,
  payload: OperationRequestBody<'updateQna'> | FormData,
) =>
  request<OperationResponse<'updateQna'>>({
    method: 'PUT',
    url: '/mentees/qnas',
    params: query,
    data: payload,
  })

const deleteQna = (query: OperationQuery<'deleteQna'>) =>
  request<OperationResponse<'deleteQna'>>({
    method: 'DELETE',
    url: '/mentees/qnas',
    params: query,
  })

const answerQna = (payload: OperationRequestBody<'answerQna'>) =>
  request<OperationResponse<'answerQna'>>({
    method: 'PUT',
    url: '/mentors/qnas/answer',
    data: payload,
  })

const getQnaDetail = (path: OperationPath<'getQnaDetail'>) =>
  request<OperationResponse<'getQnaDetail'>>({
    method: 'GET',
    url: `/mentors/qnas/${path.qnaId}`,
  })

const getQnasByMentorId = (query: OperationQuery<'getQnasByMentorId'>) =>
  request<OperationResponse<'getQnasByMentorId'>>({
    method: 'GET',
    url: '/mentors/qnas',
    params: query,
  })

const commentsApi = {
  getQna,
  createQna,
  updateQna,
  deleteQna,
  answerQna,
  getQnaDetail,
  getQnasByMentorId,
}

export default commentsApi
