import type { ReactNode } from 'react'
import { AuthContext, useAuthState } from './AuthContext'

type AuthProviderProps = {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const value = useAuthState()
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
