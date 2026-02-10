import { createContext, useMemo, useState } from 'react'
import { clearActiveTimer, getActiveTimer, setActiveTimer } from '@/services/storage/timerStorage'

type TimerState = {
  activeTodoId: number | null
  startedAtMs: number | null
}

type TimerContextValue = TimerState & {
  start: (
    todoId: number,
    startedAtOverrideMs?: number,
  ) => { ok: boolean; reason?: 'other-task' | 'already-running' }
  stop: (todoId: number) => { startAt: Date; endAt: Date } | null
  reset: () => void
}

const TimerContext = createContext<TimerContextValue | null>(null)

const useTimerState = (): TimerContextValue => {
  const [activeTodoId, setActiveTodoId] = useState<number | null>(() => getActiveTimer()?.todoId ?? null)
  const [startedAtMs, setStartedAtMs] = useState<number | null>(() => getActiveTimer()?.startedAtMs ?? null)

  const start = (todoId: number, startedAtOverrideMs?: number) => {
    if (activeTodoId && activeTodoId !== todoId) {
      return { ok: false, reason: 'other-task' as const }
    }
    if (activeTodoId === todoId) {
      return { ok: false, reason: 'already-running' as const }
    }
    const startAt = startedAtOverrideMs ?? Date.now()
    setActiveTodoId(todoId)
    setStartedAtMs(startAt)
    setActiveTimer(todoId, startAt)
    return { ok: true }
  }

  const stop = (todoId: number) => {
    if (!activeTodoId || activeTodoId !== todoId || !startedAtMs) return null
    const startAt = new Date(startedAtMs)
    const endAt = new Date()
    setActiveTodoId(null)
    setStartedAtMs(null)
    clearActiveTimer()
    return { startAt, endAt }
  }

  const reset = () => {
    setActiveTodoId(null)
    setStartedAtMs(null)
    clearActiveTimer()
  }

  return useMemo(
    () => ({
      activeTodoId,
      startedAtMs,
      start,
      stop,
      reset,
    }),
    [activeTodoId, startedAtMs],
  )
}

export type { TimerContextValue }
export { TimerContext, useTimerState }
