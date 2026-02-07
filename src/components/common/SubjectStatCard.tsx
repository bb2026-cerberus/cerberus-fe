import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'
import SubjectChip from '@/components/common/SubjectChip'
import type { SubjectWithNeutral } from '@/types/ui/subject'

type SubjectStatCardProps = {
  subjectLabel: string
  subject?: SubjectWithNeutral
  value: string
  className?: string
}

function SubjectStatCard({
  subjectLabel,
  subject = 'neutral',
  value,
  className,
}: SubjectStatCardProps) {
  return (
    <div className={cn('flex w-full items-center rounded-[18px] bg-white px-[10px]', className)}>
      <div className="flex flex-col gap-1 px-[5px] py-[12px]">
        <SubjectChip label={subjectLabel} subject={subject} />
        <Text as="p" className="text-[20px] font-semibold leading-6 text-figma-typo-black">
          {value}
        </Text>
      </div>
    </div>
  )
}

export type { SubjectStatCardProps }
export default SubjectStatCard
