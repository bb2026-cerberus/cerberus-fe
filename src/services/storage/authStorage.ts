import type { UserRole } from '../../types/shared/auth'

const ROLE_KEY = 'userRole'

const getUserRole = (): UserRole | null => {
  const value = localStorage.getItem(ROLE_KEY)
  if (value === 'mentor' || value === 'mentee') {
    return value
  }
  return null
}

const setUserRole = (role: UserRole) => {
  localStorage.setItem(ROLE_KEY, role)
}

const clearUserRole = () => {
  localStorage.removeItem(ROLE_KEY)
}

export { getUserRole, setUserRole, clearUserRole }
