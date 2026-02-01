import type { ReactNode } from 'react'
import ErrorBoundary from '../../components/common/ErrorBoundary'
import AuthProvider from '../../store/auth/AuthProvider'

type AppProvidersProps = {
  children: ReactNode
}

function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary>
      <AuthProvider>{children}</AuthProvider>
    </ErrorBoundary>
  )
}

export default AppProviders
