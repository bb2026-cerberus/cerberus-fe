import { request } from '@/services/api/http'
import type {
  OperationPath,
  OperationQuery,
  OperationRequestBody,
  OperationResponse,
} from '@/services/api/types'

const createWeeklyReport = (
  path: OperationPath<'createWeeklyReport'>,
  payload: OperationRequestBody<'createWeeklyReport'>,
) =>
  request<OperationResponse<'createWeeklyReport'>>({
    method: 'POST',
    url: `/mentors/weekly-reports/${path.mentorId}`,
    data: payload,
  })

const updateWeeklyReport = (
  path: OperationPath<'updateWeeklyReport'>,
  payload: OperationRequestBody<'updateWeeklyReport'>,
) =>
  request<OperationResponse<'updateWeeklyReport'>>({
    method: 'PUT',
    url: `/mentors/weekly-reports/${path.mentorId}`,
    data: payload,
  })

const deleteWeeklyReport = (path: OperationPath<'deleteWeeklyReport'>) =>
  request<OperationResponse<'deleteWeeklyReport'>>({
    method: 'DELETE',
    url: `/mentors/weekly-reports/${path.mentorId}/${path.reportId}`,
  })

const getWeeklyReportDetail = (path: OperationPath<'getWeeklyReportDetail'>) =>
  request<OperationResponse<'getWeeklyReportDetail'>>({
    method: 'GET',
    url: `/mentors/weekly-reports/${path.reportId}`,
  })

const getWeeklyReportsByMentor = (
  path: OperationPath<'getWeeklyReportsByMentor'>,
  query: OperationQuery<'getWeeklyReportsByMentor'>,
) =>
  request<OperationResponse<'getWeeklyReportsByMentor'>>({
    method: 'GET',
    url: `/mentors/weekly-reports/by-mentor/${path.mentorId}`,
    params: query,
  })

const getWeeklyReportsByMentee = (
  path: OperationPath<'getWeeklyReportsByMentee'>,
) =>
  request<OperationResponse<'getWeeklyReportsByMentee'>>({
    method: 'GET',
    url: `/mentors/weekly-reports/by-mentee/${path.menteeId}/week/${path.yearMonthWeek}`,
  })

const reportsApi = {
  createWeeklyReport,
  updateWeeklyReport,
  deleteWeeklyReport,
  getWeeklyReportDetail,
  getWeeklyReportsByMentor,
  getWeeklyReportsByMentee,
}

export default reportsApi
