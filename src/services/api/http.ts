import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import { clearUserRole } from '../storage/authStorage'
import { clearAccessToken, getAccessToken } from '../storage/tokenStorage'

type ApiError = {
  status?: number
  code?: string
  message: string
  details?: unknown
  isNetworkError?: boolean
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }
  return config
})

const toApiError = (error: AxiosError): ApiError => {
  if (error.response) {
    return {
      status: error.response.status,
      code: error.code,
      message: error.message,
      details: error.response.data,
    }
  }

  return {
    code: error.code,
    message: error.message,
    isNetworkError: true,
  }
}

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearAccessToken()
      clearUserRole()
    }
    return Promise.reject(toApiError(error))
  },
)

const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response = await api.request<T>(config)
  return response.data
}

export type { ApiError }
export { api, request }
