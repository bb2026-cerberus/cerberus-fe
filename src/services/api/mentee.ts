import { request } from './http'

const basePath = '/mentee'

const getPlanner = <TResponse>(params?: Record<string, unknown>) => {
  return request<TResponse>({
    method: 'GET',
    url: `${basePath}/planner`,
    params,
  })
}

const createPersonalTask = <TResponse>(payload: Record<string, unknown>) => {
  return request<TResponse>({
    method: 'POST',
    url: `${basePath}/tasks`,
    data: payload,
  })
}

const uploadHomework = <TResponse>(taskId: string, file: File) => {
  const data = new FormData()
  data.append('file', file)

  return request<TResponse>({
    method: 'POST',
    url: `${basePath}/tasks/${taskId}/submission`,
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

const getFeedback = <TResponse>(params?: Record<string, unknown>) => {
  return request<TResponse>({
    method: 'GET',
    url: `${basePath}/feedback`,
    params,
  })
}

const getNotifications = <TResponse>() => {
  return request<TResponse>({
    method: 'GET',
    url: `${basePath}/notifications`,
  })
}

const menteeApi = {
  getPlanner,
  createPersonalTask,
  uploadHomework,
  getFeedback,
  getNotifications,
}

export default menteeApi
