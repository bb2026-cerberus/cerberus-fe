import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'
import SubjectChip from '@/components/common/SubjectChip'
import type { SubjectWithNeutral } from '@/types/ui/subject'
import { diffMinutes } from '@/utils/timeBlock'

type TimeBlockItemProps = {
  title: string
  subtitle?: string
  subjectLabel: string
  subject?: SubjectWithNeutral
  startTime: string
  endTime: string
  className?: string
  minuteHeight?: number
  minHeight?: number
}

function TimeBlockItem({
  title,
  subtitle,
  subjectLabel,
  subject = 'neutral',
  startTime,
  endTime,
  className,
  minuteHeight = 0.85,
  minHeight = 80,
}: TimeBlockItemProps) {
  const durationMinutes = diffMinutes(startTime, endTime)
  const computedHeight = Math.max(Math.round(durationMinutes * minuteHeight), minHeight)

  return (
    <div
      className={cn('flex items-center rounded-[18px] bg-white px-4', className)}
      style={{ height: computedHeight }}
      data-duration-minutes={durationMinutes}
    >
      <div className="flex w-full flex-col gap-1">
        <Text as="p" className="text-[16px] font-semibold leading-6 text-figma-typo-black">
          {title}
        </Text>
        <div className="flex w-full items-center gap-2">
          <SubjectChip label={subjectLabel} subject={subject} />
          {subtitle ? (
            <Text as="p" className="text-[12px] font-medium leading-[1.25] text-figma-typo-gray">
              {subtitle}
            </Text>
          ) : null}
          <div className="ml-auto rounded-[6px] bg-figma-card-gray px-2 py-1">
            <Text as="span" className="text-[12px] font-medium leading-[1.25] text-[#6d6c6a]">
              {startTime}~{endTime}
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export type { TimeBlockItemProps }
export default TimeBlockItem
