import { useCallback, useState } from 'react'

type RunOptions<T> = {
  errorMessage?: string
  onSuccess?: (data: T) => void
  onError?: (error: unknown) => void
}

const useApiRequest = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const run = useCallback(
    async <T>(fn: () => Promise<T>, options?: RunOptions<T>): Promise<T | null> => {
      setLoading(true)
      setError(null)
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
      }
    },
    [],
  )

  return { loading, error, setError, run }
}

export default useApiRequest
export type { RunOptions }
