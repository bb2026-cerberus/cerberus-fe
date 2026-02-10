import type { ReactNode } from 'react'
import ErrorBoundary from '../../components/common/ErrorBoundary'
import AuthProvider from '../../store/auth/AuthProvider'
import { LoadingOverlayProvider } from '../../store/ui/LoadingOverlayContext'

type AppProvidersProps = {
  children: ReactNode
}

function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <LoadingOverlayProvider>{children}</LoadingOverlayProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default AppProviders
