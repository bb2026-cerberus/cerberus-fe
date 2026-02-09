import { request } from '@/services/api/http'
import type { operations } from '@/types/api'

type LoginRequest =
  operations['login']['requestBody']['content']['application/json']
type LoginResponse = operations['login']['responses']['200']['content']['*/*']

const login = (payload: LoginRequest) => {
  return request<LoginResponse>({
    method: 'POST',
    url: '/api/member/login',
    data: payload,
  })
}

const authApi = {
  login,
}

export default authApi
