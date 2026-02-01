import { request } from './http'

const basePath = '/mentor'

const getStudents = <TResponse>() => {
  return request<TResponse>({
    method: 'GET',
    url: `${basePath}/students`,
  })
}

const createTask = <TResponse>(payload: Record<string, unknown>) => {
  return request<TResponse>({
    method: 'POST',
    url: `${basePath}/tasks`,
    data: payload,
  })
}

const uploadWorksheet = <TResponse>(taskId: string, file: File) => {
  const data = new FormData()
  data.append('file', file)

  return request<TResponse>({
    method: 'POST',
    url: `${basePath}/tasks/${taskId}/worksheet`,
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

const createFeedback = <TResponse>(payload: Record<string, unknown>) => {
  return request<TResponse>({
    method: 'POST',
    url: `${basePath}/feedback`,
    data: payload,
  })
}

const mentorApi = {
  getStudents,
  createTask,
  uploadWorksheet,
  createFeedback,
}

export default mentorApi
