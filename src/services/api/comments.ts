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
    url: '/api/mentees/qnas',
    params: query,
  })

const createQna = (
  query: OperationQuery<'createQna'>,
  payload: OperationRequestBody<'createQna'>,
) =>
  request<OperationResponse<'createQna'>>({
    method: 'POST',
    url: '/api/mentees/qnas',
    params: query,
    data: payload,
  })

const updateQna = (
  query: OperationQuery<'updateQna'>,
  payload: OperationRequestBody<'updateQna'>,
) =>
  request<OperationResponse<'updateQna'>>({
    method: 'PUT',
    url: '/api/mentees/qnas',
    params: query,
    data: payload,
  })

const deleteQna = (query: OperationQuery<'deleteQna'>) =>
  request<OperationResponse<'deleteQna'>>({
    method: 'DELETE',
    url: '/api/mentees/qnas',
    params: query,
  })

const answerQna = (
  path: OperationPath<'answerQna'>,
  payload: OperationRequestBody<'answerQna'>,
) =>
  request<OperationResponse<'answerQna'>>({
    method: 'PUT',
    url: `/api/mentors/qnas/answer/${path.userId}/${path.userRole}`,
    data: payload,
  })

const getQnaDetail = (path: OperationPath<'getQnaDetail'>) =>
  request<OperationResponse<'getQnaDetail'>>({
    method: 'GET',
    url: `/api/mentors/qnas/${path.qnaId}`,
  })

const getQnasByMentorId = (path: OperationPath<'getQnasByMentorId'>) =>
  request<OperationResponse<'getQnasByMentorId'>>({
    method: 'GET',
    url: `/api/mentors/qnas/by-mentor/${path.mentorId}/${path.userRole}`,
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
