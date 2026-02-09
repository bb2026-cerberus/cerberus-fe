import { useContext } from 'react'

import { LoadingOverlayContext } from '@/store/ui/LoadingOverlayContext'

const useLoadingOverlay = () => {
  const context = useContext(LoadingOverlayContext)
  if (!context) {
    throw new Error('useLoadingOverlay must be used within LoadingOverlayProvider')
  }
  return context
}

export default useLoadingOverlay
