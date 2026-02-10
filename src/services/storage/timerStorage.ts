type ActiveTimerState = {
  todoId: number
  startedAtMs: number
}

const TIMER_KEY = 'activeTimer'

const getActiveTimer = (): ActiveTimerState | null => {
  const raw = localStorage.getItem(TIMER_KEY)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as ActiveTimerState
    if (typeof parsed.todoId !== 'number' || typeof parsed.startedAtMs !== 'number') {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

const setActiveTimer = (todoId: number, startedAtMs: number) => {
  localStorage.setItem(TIMER_KEY, JSON.stringify({ todoId, startedAtMs }))
}

const clearActiveTimer = () => {
  localStorage.removeItem(TIMER_KEY)
}

export type { ActiveTimerState }
export { getActiveTimer, setActiveTimer, clearActiveTimer }
