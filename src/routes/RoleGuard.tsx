import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../store/auth/useAuth'
import type { UserRole } from '../types/shared/auth'
import routePaths from './routePaths'

type RoleGuardProps = {
  allow: UserRole
}

function RoleGuard({ allow }: RoleGuardProps) {
  const { role } = useAuth()
  if (role !== allow) {
    return <Navigate to={routePaths.root} replace />
  }
  return <Outlet />
}

export default RoleGuard
