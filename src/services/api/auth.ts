import { request } from './http'

const basePath = '/auth'

const login = <TResponse>(payload: Record<string, unknown>) => {
  return request<TResponse>({
    method: 'POST',
    url: `${basePath}/login`,
    data: payload,
  })
}

const logout = <TResponse>() => {
  return request<TResponse>({
    method: 'POST',
    url: `${basePath}/logout`,
  })
}

const authApi = {
  login,
  logout,
}

export default authApi
