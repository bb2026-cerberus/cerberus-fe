import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'
import SubjectChip from '@/components/common/SubjectChip'
import type { SubjectWithNeutral } from '@/types/ui/subject'

type ChecklistItemProps = {
  title: string
  subtitle?: string
  subjectLabel?: string
  subject?: SubjectWithNeutral
  completed?: boolean
  className?: string
}

function ChecklistItem({
  title,
  subtitle,
  subjectLabel,
  subject = 'neutral',
  completed = false,
  className,
}: ChecklistItemProps) {
  return (
    <div
      className={cn(
        'flex h-[90px] w-full items-center gap-4 rounded-[18px] px-4',
        completed ? 'bg-figma-card-gray' : 'bg-white',
        className,
      )}
    >
      <div
        className={cn(
          'flex size-[28px] items-center justify-center rounded-full',
          completed ? 'bg-figma-typo-gray-b' : 'border-2 border-figma-typo-gray bg-transparent',
        )}
      >
        {completed ? <Check className="size-4 text-white" /> : null}
      </div>
      <div className="flex flex-col gap-1">
        <Text
          as="p"
          variant="title3"
          className={cn('text-figma-typo-black', completed && 'line-through opacity-80')}
        >
          {title}
        </Text>
        <div className="flex items-center gap-2">
          {subjectLabel ? (
            <SubjectChip
              label={subjectLabel}
              subject={subject}
              tone={completed ? 'muted' : 'default'}
              className={completed ? 'bg-white text-figma-typo-gray-b' : undefined}
            />
          ) : null}
          {subtitle ? (
            <Text
              as="p"
              variant="caption"
              className={cn(completed ? 'text-figma-typo-gray-b' : 'text-figma-typo-gray')}
            >
              {subtitle}
            </Text>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export type { ChecklistItemProps }
export default ChecklistItem
