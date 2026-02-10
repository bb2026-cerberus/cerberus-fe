import { createContext, useMemo, useState } from 'react'
import { clearUserRole, getUserRole, setUserRole } from '../../services/storage/authStorage'
import { clearUserId, getUserId, setUserId } from '../../services/storage/userStorage'
import type { UserRole } from '../../types/shared/auth'

type AuthState = {
  role: UserRole | null
  userId: number | null
}

type AuthContextValue = AuthState & {
  setRole: (role: UserRole | null) => void
  setUserId: (userId: number | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const useAuthState = (): AuthContextValue => {
  const [role, setRoleState] = useState<UserRole | null>(() => getUserRole())
  const [userId, setUserIdState] = useState<number | null>(() => getUserId())

  const setRole = (nextRole: UserRole | null) => {
    if (nextRole) {
      setUserRole(nextRole)
    } else {
      clearUserRole()
    }
    setRoleState(nextRole)
  }

  const setUserIdValue = (nextUserId: number | null) => {
    if (nextUserId !== null) {
      setUserId(nextUserId)
    } else {
      clearUserId()
    }
    setUserIdState(nextUserId)
  }

  const logout = () => {
    clearUserRole()
    clearUserId()
    setRoleState(null)
    setUserIdState(null)
  }

  return useMemo(
    () => ({
      role,
      userId,
      setRole,
      setUserId: setUserIdValue,
      logout,
    }),
    [role, userId],
  )
}

export type { AuthContextValue }
export { AuthContext, useAuthState }
