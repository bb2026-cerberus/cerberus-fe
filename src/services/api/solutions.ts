import { request } from '@/services/api/http'
import type {
  OperationPath,
  OperationQuery,
  OperationRequestBody,
  OperationResponse,
} from '@/services/api/types'

const getWeaknessSolutionsByMentor = (
  path: OperationPath<'getWeaknessSolutionsByMentor'>,
) =>
  request<OperationResponse<'getWeaknessSolutionsByMentor'>>({
    method: 'GET',
    url: `/api/mentors/weakness-solutions/by-mentor/${path.mentorId}`,
  })

const createWeaknessSolution = (
  path: OperationPath<'createWeaknessSolution'>,
  payload: OperationRequestBody<'createWeaknessSolution'>,
) =>
  request<OperationResponse<'createWeaknessSolution'>>({
    method: 'POST',
    url: `/api/mentors/weakness-solutions/${path.mentorId}`,
    data: payload,
  })

const updateWeaknessSolution = (
  path: OperationPath<'updateWeaknessSolution'>,
  payload: OperationRequestBody<'updateWeaknessSolution'>,
) =>
  request<OperationResponse<'updateWeaknessSolution'>>({
    method: 'PUT',
    url: `/api/mentors/weakness-solutions/${path.mentorId}`,
    data: payload,
  })

const deleteWeaknessSolution = (
  path: OperationPath<'deleteWeaknessSolution'>,
) =>
  request<OperationResponse<'deleteWeaknessSolution'>>({
    method: 'DELETE',
    url: `/api/mentors/weakness-solutions/${path.mentorId}/${path.weaknessSolutionId}`,
  })

const getMenteeSolutions = (query: OperationQuery<'getMenteeSolutions'>) =>
  request<OperationResponse<'getMenteeSolutions'>>({
    method: 'GET',
    url: '/api/mentors/assignments/solutions',
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
