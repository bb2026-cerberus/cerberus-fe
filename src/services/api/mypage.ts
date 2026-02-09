import { request } from '@/services/api/http'
import type {
  OperationPath,
  OperationQuery,
  OperationResponse,
} from '@/services/api/types'

const getMentorHomeData = (
  path: OperationPath<'getMentorHomeData'>,
  query: OperationQuery<'getMentorHomeData'>,
) =>
  request<OperationResponse<'getMentorHomeData'>>({
    method: 'GET',
    url: `/api/mentors/${path.mentorId}/home`,
    params: query,
  })

const getDraftCounts = (path: OperationPath<'getDraftCounts'>) =>
  request<OperationResponse<'getDraftCounts'>>({
    method: 'GET',
    url: `/api/mentors/${path.mentorId}/draft-counts`,
  })

const getNotifications = (query: OperationQuery<'getNotifications'>) =>
  request<OperationResponse<'getNotifications'>>({
    method: 'GET',
    url: '/api/notifications',
    params: query,
  })

const mypageApi = {
  getMentorHomeData,
  getDraftCounts,
  getNotifications,
}

export default mypageApi
