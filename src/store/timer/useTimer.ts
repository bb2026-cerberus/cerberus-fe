import { useContext } from 'react'
import { TimerContext } from '@/store/timer/TimerContext'

const useTimer = () => {
  const context = useContext(TimerContext)
  if (!context) {
    throw new Error('useTimer must be used within TimerProvider')
  }
  return context
}

export default useTimer
