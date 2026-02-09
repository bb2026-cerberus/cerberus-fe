import { createContext, useCallback, useMemo, useState } from 'react'

import Loading from '@/components/common/Loading'

type LoadingOverlayContextValue = {
  show: (message?: string) => void
  hide: () => void
}

const LoadingOverlayContext = createContext<LoadingOverlayContextValue | null>(null)

type LoadingOverlayProviderProps = {
  children: React.ReactNode
}

function LoadingOverlayProvider({ children }: LoadingOverlayProviderProps) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('처리 중...')

  const show = useCallback((nextMessage?: string) => {
    if (nextMessage) setMessage(nextMessage)
    setOpen(true)
  }, [])

  const hide = useCallback(() => {
    setOpen(false)
  }, [])

  const value = useMemo(() => ({ show, hide }), [show, hide])

  return (
    <LoadingOverlayContext.Provider value={value}>
      {children}
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <Loading message={message} className="min-h-0 text-figma-typo-black" />
        </div>
      ) : null}
    </LoadingOverlayContext.Provider>
  )
}

export type { LoadingOverlayContextValue }
export { LoadingOverlayContext, LoadingOverlayProvider }
