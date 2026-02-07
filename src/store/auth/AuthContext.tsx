import { createContext, useMemo, useState } from 'react'
import { clearUserRole, getUserRole, setUserRole } from '../../services/storage/authStorage'
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from '../../services/storage/tokenStorage'
import type { UserRole } from '../../types/shared/auth'

type AuthState = {
  role: UserRole | null
  accessToken: string | null
}

type AuthContextValue = AuthState & {
  setRole: (role: UserRole | null) => void
  setToken: (token: string | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const useAuthState = (): AuthContextValue => {
  const [role, setRoleState] = useState<UserRole | null>(() => getUserRole())
  const [accessToken, setAccessTokenState] = useState<string | null>(() =>
    getAccessToken(),
  )

  const setRole = (nextRole: UserRole | null) => {
    if (nextRole) {
      setUserRole(nextRole)
    } else {
      clearUserRole()
    }
    setRoleState(nextRole)
  }

  const setToken = (nextToken: string | null) => {
    if (nextToken) {
      setAccessToken(nextToken)
    } else {
      clearAccessToken()
    }
    setAccessTokenState(nextToken)
  }

  const logout = () => {
    clearAccessToken()
    clearUserRole()
    setAccessTokenState(null)
    setRoleState(null)
  }

  return useMemo(
    () => ({ role, accessToken, setRole, setToken, logout }),
    [role, accessToken],
  )
}

export type { AuthContextValue }
export { AuthContext, useAuthState }
