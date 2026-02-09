import { request } from '@/services/api/http'
import type { OperationPath, OperationResponse } from '@/services/api/types'

const getMenteeProgress = (path: OperationPath<'getMenteeProgress'>) =>
  request<OperationResponse<'getMenteeProgress'>>({
    method: 'GET',
    url: `/mentors/${path.mentorId}/mentees/${path.menteeId}/progress`,
  })

const menteeManagementApi = {
  getMenteeProgress,
}

export default menteeManagementApi
