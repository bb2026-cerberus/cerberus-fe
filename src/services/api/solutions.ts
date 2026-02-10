import { request } from '@/services/api/http'
import type {
  OperationPath,
  OperationQuery,
  OperationResponse,
} from '@/services/api/types'

const getWeaknessSolutionsByMentor = (
  path: OperationPath<'getWeaknessSolutionsByMentor'>,
  query?: OperationQuery<'getWeaknessSolutionsByMentor'>,
) =>
  request<OperationResponse<'getWeaknessSolutionsByMentor'>>({
    method: 'GET',
    url: `/mentors/weakness-solutions/by-mentor/${path.mentorId}`,
    params: query,
  })

const createWeaknessSolution = (
  path: OperationPath<'createWeaknessSolution'>,
  payload: FormData,
) =>
  request<OperationResponse<'createWeaknessSolution'>>({
    method: 'POST',
    url: `/mentors/weakness-solutions/${path.mentorId}`,
    data: payload,
    headers: { 'Content-Type': undefined },
  })

const updateWeaknessSolution = (
  path: OperationPath<'updateWeaknessSolution'>,
  payload: FormData,
) =>
  request<OperationResponse<'updateWeaknessSolution'>>({
    method: 'PUT',
    url: `/mentors/weakness-solutions/${path.mentorId}`,
    data: payload,
    headers: { 'Content-Type': undefined },
  })

const deleteWeaknessSolution = (
  path: OperationPath<'deleteWeaknessSolution'>,
) =>
  request<OperationResponse<'deleteWeaknessSolution'>>({
    method: 'DELETE',
    url: `/mentors/weakness-solutions/${path.mentorId}/${path.weaknessSolutionId}`,
  })

const getMenteeSolutions = (query: OperationQuery<'getMenteeSolutions'>) =>
  request<OperationResponse<'getMenteeSolutions'>>({
    method: 'GET',
    url: '/mentors/assignments/solutions',
    params: query,
  })

const solutionsApi = {
  getWeaknessSolutionsByMentor,
  createWeaknessSolution,
  updateWeaknessSolution,
  deleteWeaknessSolution,
  getMenteeSolutions,
}

export default solutionsApi
