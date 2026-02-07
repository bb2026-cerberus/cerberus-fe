import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'
import SubjectChip from '@/components/common/SubjectChip'

type TaskItemProps = {
  title: string
  subtitle?: string
  subjectLabel?: string
  subject?: 'korean' | 'math' | 'english' | 'neutral'
  completed?: boolean
  className?: string
  onClick?: () => void
}

function TaskItem({
  title,
  subtitle,
  subjectLabel,
  subject = 'neutral',
  completed = false,
  className,
  onClick,
}: TaskItemProps) {
  const content = (
    <>
      <div
        className={cn(
          'flex size-[28px] items-center justify-center rounded-full',
          completed ? 'bg-figma-typo-gray-b' : 'border-2 border-figma-typo-gray bg-transparent',
        )}
      >
        {completed ? <Check className="size-4 text-white" /> : null}
      </div>
      <div className="flex flex-col gap-1">
        <Text as="p" variant="title3" className="text-figma-typo-black">
          {title}
        </Text>
        <div className="flex items-center gap-2">
          {subjectLabel ? (
            <SubjectChip label={subjectLabel} subject={subject} />
          ) : null}
          {subtitle ? (
            <Text as="p" variant="caption" className="text-figma-typo-gray">
              {subtitle}
            </Text>
          ) : null}
        </div>
      </div>
    </>
  )

  const containerClassName = cn(
    'flex h-[90px] w-full items-center gap-4 rounded-[18px] bg-white px-4',
    onClick ? 'text-left transition-colors hover:bg-figma-light-gray' : undefined,
    className,
  )

  return onClick ? (
    <button type="button" className={containerClassName} onClick={onClick}>
      {content}
    </button>
  ) : (
    <div className={containerClassName}>{content}</div>
  )
}

export type { TaskItemProps }
export default TaskItem
