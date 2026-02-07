import { Play } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/common/Icon'
import { Text } from '@/components/common/Text'

type TaskDetailHeaderProps = {
  title: string
  subtitle?: string
  timeText?: string
  onPlay?: () => void
  className?: string
}

function TaskDetailHeader({
  title,
  subtitle,
  timeText = '00:00:00',
  onPlay,
  className,
}: TaskDetailHeaderProps) {
  return (
    <div className={cn('flex w-full items-start justify-between', className)}>
      <div className="flex flex-1 flex-col gap-2">
        <Text as="h2" className="text-[24px] font-bold leading-[1.2] text-figma-typo-black">
          {title}
        </Text>
        {subtitle ? (
          <Text as="p" className="text-[16px] font-medium leading-[1.25] text-figma-typo-gray">
            {subtitle}
          </Text>
        ) : null}
      </div>
      <div className="flex w-[76px] flex-col items-center gap-1">
        <button
          type="button"
          onClick={onPlay}
          className="flex size-[48px] items-center justify-center rounded-full bg-figma-point-color-2"
          aria-label="타이머 시작"
        >
          <Icon icon={Play} size={20} className="text-white" />
        </button>
        <Text as="span" className="text-[12px] font-medium leading-[1.25] text-figma-typo-gray">
          {timeText}
        </Text>
      </div>
    </div>
  )
}

export type { TaskDetailHeaderProps }
export default TaskDetailHeader
