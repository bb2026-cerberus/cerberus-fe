import type { ReactNode } from 'react'
import ErrorBoundary from '../../components/common/ErrorBoundary'
import AuthProvider from '../../store/auth/AuthProvider'
import { LoadingOverlayProvider } from '../../store/ui/LoadingOverlayContext'
import TimerProvider from '../../store/timer/TimerProvider'

type AppProvidersProps = {
  children: ReactNode
}

function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <TimerProvider>
          <LoadingOverlayProvider>{children}</LoadingOverlayProvider>
        </TimerProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default AppProviders
