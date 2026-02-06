import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'
import SubjectChip from '@/components/common/SubjectChip'

type ChecklistItemProps = {
  title: string
  subtitle?: string
  subjectLabel?: string
  subject?: 'korean' | 'math' | 'english' | 'neutral'
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
        completed ? 'bg-[#edeff3]' : 'bg-white',
        className,
      )}
    >
      <div
        className={cn(
          'flex size-[28px] items-center justify-center rounded-full',
          completed ? 'bg-[#9da9b5]' : 'border-2 border-[#aeaeae] bg-transparent',
        )}
      >
        {completed ? <Check className="size-4 text-white" /> : null}
      </div>
      <div className="flex flex-col gap-1">
        <Text
          as="p"
          variant="title3"
          className={cn(
            'text-[#232323]',
            completed && 'line-through text-[#232323]/80',
          )}
        >
          {title}
        </Text>
        <div className="flex items-center gap-2">
          {subjectLabel ? (
            <SubjectChip
              label={subjectLabel}
              subject={subject}
              tone={completed ? 'muted' : 'default'}
              className={completed ? 'bg-white text-[#9da9b5]' : undefined}
            />
          ) : null}
          {subtitle ? (
            <Text as="p" variant="caption" className={cn(completed ? 'text-[#9da9b5]' : 'text-[#aeaeae]')}>
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
