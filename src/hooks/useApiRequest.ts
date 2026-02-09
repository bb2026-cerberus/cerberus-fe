import { useCallback, useState } from 'react'
import useLoadingOverlay from '@/store/ui/useLoadingOverlay'

type RunOptions<T> = {
  errorMessage?: string
  onSuccess?: (data: T) => void
  onError?: (error: unknown) => void
  useOverlay?: boolean
  overlayMessage?: string
}

const useApiRequest = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const overlay = useLoadingOverlay()

  const run = useCallback(
    async <T>(fn: () => Promise<T>, options?: RunOptions<T>): Promise<T | null> => {
      setLoading(true)
      setError(null)
      if (options?.useOverlay) {
        overlay.show(options.overlayMessage ?? '처리 중...')
      }
      try {
        const data = await fn()
        options?.onSuccess?.(data)
        return data
      } catch (err) {
        options?.onError?.(err)
        setError(options?.errorMessage ?? '요청에 실패했어요.')
        return null
      } finally {
        setLoading(false)
        if (options?.useOverlay) {
          overlay.hide()
        }
      }
    },
    [overlay],
  )

  return { loading, error, setError, run }
}

export default useApiRequest
export type { RunOptions }
