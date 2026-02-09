import { request } from '@/services/api/http'
import type {
  OperationPath,
  OperationQuery,
  OperationRequestBody,
  OperationResponse,
} from '@/services/api/types'

const saveFeedback = (payload: OperationRequestBody<'saveFeedback'>) =>
  request<OperationResponse<'saveFeedback'>>({
    method: 'POST',
    url: '/feedbacks',
    data: payload,
  })

const getFeedbackDetail = (path: OperationPath<'getFeedbackDetail'>) =>
  request<OperationResponse<'getFeedbackDetail'>>({
    method: 'GET',
    url: `/feedbacks/${path.todoId}`,
  })

const getWeeklyFeedbacks = (query: OperationQuery<'getWeeklyFeedbacks'>) =>
  request<OperationResponse<'getWeeklyFeedbacks'>>({
    method: 'GET',
    url: '/feedbacks/weekly',
    params: query,
  })

const getDraftFeedbacks = (path: OperationPath<'getDraftFeedbacks'>) =>
  request<OperationResponse<'getDraftFeedbacks'>>({
    method: 'GET',
    url: `/feedbacks/drafts/${path.mentorId}`,
  })

const triggerImageAnalysis = (path: OperationPath<'triggerImageAnalysis'>) =>
  request<OperationResponse<'triggerImageAnalysis'>>({
    method: 'POST',
    url: `/feedbacks/analyze/${path.todoId}`,
  })

const feedbacksApi = {
  saveFeedback,
  getFeedbackDetail,
  getWeeklyFeedbacks,
  getDraftFeedbacks,
  triggerImageAnalysis,
}

export default feedbacksApi
