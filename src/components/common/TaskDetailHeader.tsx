import { Play, Square } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/common/Icon'
import { Text } from '@/components/common/Text'

type TaskDetailHeaderProps = {
  title: string
  subtitle?: string
  timeText?: string
  onStart?: () => void
  onStop?: () => void
  isRunning?: boolean
  disabled?: boolean
  className?: string
}

function TaskDetailHeader({
  title,
  subtitle,
  timeText = '00:00:00',
  onStart,
  onStop,
  isRunning = false,
  disabled = false,
  className,
}: TaskDetailHeaderProps) {
  return (
    <div className={cn('flex w-full items-start justify-between', className)}>
      <div className="flex flex-1 flex-col gap-2">
        <Text as="h2" className="text-[24px] font-bold leading-[1.2] text-figma-typo-black">
          {title}
        </Text>
        {subtitle ? (
          <Text as="p" className="text-[16px] font-medium leading-tight text-figma-typo-gray">
            {subtitle}
          </Text>
        ) : null}
      </div>
      <div className="flex w-[76px] flex-col items-center gap-1">
        <button
          type="button"
          onClick={isRunning ? onStop : onStart}
          disabled={disabled}
          className={cn(
            'flex size-[48px] items-center justify-center rounded-full bg-figma-point-color-2 transition',
            disabled && 'cursor-not-allowed opacity-50',
          )}
          aria-label={isRunning ? '타이머 종료' : '타이머 시작'}
        >
          <Icon
            icon={isRunning ? Square : Play}
            size={18}
            className={cn('text-white', isRunning && 'timer-wiggle')}
          />
        </button>
        <Text as="span" className="text-[12px] font-medium leading-tight text-figma-typo-gray">
          {timeText}
        </Text>
      </div>
    </div>
  )
}

export type { TaskDetailHeaderProps }
export default TaskDetailHeader
