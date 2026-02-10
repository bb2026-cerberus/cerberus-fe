import type { ReactNode } from 'react'
import { TimerContext, useTimerState } from '@/store/timer/TimerContext'

type TimerProviderProps = {
  children: ReactNode
}

function TimerProvider({ children }: TimerProviderProps) {
  const value = useTimerState()
  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
}

export default TimerProvider
