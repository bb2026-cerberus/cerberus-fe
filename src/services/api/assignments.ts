import { request } from '@/services/api/http'
import type {
  OperationPath,
  OperationQuery,
  OperationRequestBody,
  OperationResponse,
} from '@/services/api/types'

const createAssignment = (payload: OperationRequestBody<'createAssignment'>) =>
  request<OperationResponse<'createAssignment'>>({
    method: 'POST',
    url: '/api/mentors/assignments',
    data: payload,
  })

const getAssignments = (query: OperationQuery<'getAssignments'>) =>
  request<OperationResponse<'getAssignments'>>({
    method: 'GET',
    url: '/api/assignments',
    params: query,
  })

const getAssignmentDetail = (path: OperationPath<'getAssignmentDetail'>) =>
  request<OperationResponse<'getAssignmentDetail'>>({
    method: 'GET',
    url: `/api/assignments/${path.assignmentId}`,
  })

const getAssignmentsWeekly = (query: OperationQuery<'getAssignmentsWeekly'>) =>
  request<OperationResponse<'getAssignmentsWeekly'>>({
    method: 'GET',
    url: '/api/assignments/weekly',
    params: query,
  })

const downloadAssignmentFile = (query: OperationQuery<'downloadFile_1'>) =>
  request<OperationResponse<'downloadFile_1'>>({
    method: 'GET',
    url: '/api/assignments/download',
    params: query,
  })

const uploadAssignmentVerification = (
  path: OperationPath<'uploadVerification_1'>,
  payload: OperationRequestBody<'uploadVerification_1'>,
) =>
  request<OperationResponse<'uploadVerification_1'>>({
    method: 'POST',
    url: `/api/assignments/${path.assignmentId}/verification`,
    data: payload,
  })

const updateAssignmentVerification = (
  path: OperationPath<'updateVerification_1'>,
  payload: OperationRequestBody<'updateVerification_1'>,
) =>
  request<OperationResponse<'updateVerification_1'>>({
    method: 'PUT',
    url: `/api/assignments/${path.assignmentId}/verification`,
    data: payload,
  })

const deleteAssignmentVerification = (path: OperationPath<'deleteVerification_1'>) =>
  request<OperationResponse<'deleteVerification_1'>>({
    method: 'DELETE',
    url: `/api/assignments/${path.assignmentId}/verification`,
  })

const assignmentsApi = {
  createAssignment,
  getAssignments,
  getAssignmentDetail,
  getAssignmentsWeekly,
  downloadAssignmentFile,
  uploadAssignmentVerification,
  updateAssignmentVerification,
  deleteAssignmentVerification,
}

export default assignmentsApi
