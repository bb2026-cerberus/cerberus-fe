import { Text } from '@/components/common/Text'
import SubjectChip from '@/components/common/SubjectChip'
import { cn } from '@/lib/utils'

type MentorMenteeProgressCardProps = {
  name: string
  submitted: number
  total: number
  pendingLabel: string
  showNameChip?: boolean
  className?: string
}

function MentorMenteeProgressCard({
  name,
  submitted,
  total,
  pendingLabel,
  showNameChip = true,
  className,
}: MentorMenteeProgressCardProps) {
  const progressPercent = Math.round((submitted / total) * 100)

  return (
    <div className={cn('flex flex-col gap-[8px]', className)}>
      {showNameChip ? (
        <div className="flex items-center">
          <SubjectChip label={name} tone="muted" />
        </div>
      ) : null}
      <div className="h-[122px] rounded-[18px] bg-figma-white px-[24px] py-[18px]">
        <div className="flex flex-col gap-[8px]">
          <Text as="p" className="text-[20px] font-semibold leading-6 text-figma-typo-black">
            오늘 제출 {submitted} / {total}
          </Text>
          <div className="h-[6px] w-full rounded-full bg-figma-card-gray">
            <div
              className="h-[6px] rounded-full bg-figma-point-color-2"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <Text as="p" className="text-[16px] font-semibold leading-6 text-figma-typo-gray">
            {pendingLabel}
          </Text>
        </div>
      </div>
    </div>
  )
}

export type { MentorMenteeProgressCardProps }
export default MentorMenteeProgressCard
