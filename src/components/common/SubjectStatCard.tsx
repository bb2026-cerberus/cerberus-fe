import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'
import SubjectChip from '@/components/common/SubjectChip'
import type { SubjectWithNeutral } from '@/types/ui/subject'

type SubjectStatCardProps = {
  subjectLabel: string
  subject?: SubjectWithNeutral
  value: string
  size?: 'md' | 'sm'
  className?: string
}

function SubjectStatCard({
  subjectLabel,
  subject = 'neutral',
  value,
  size = 'md',
  className,
}: SubjectStatCardProps) {
  return (
    <div
      className={cn(
        'flex w-full items-center rounded-[18px] bg-white',
        size === 'sm' ? 'px-[8px]' : 'px-[10px]',
        className,
      )}
    >
      <div
        className={cn(
          'flex flex-col gap-1',
          size === 'sm' ? 'px-[5px] py-[10px]' : 'px-[5px] py-[12px]',
        )}
      >
        <SubjectChip label={subjectLabel} subject={subject} />
        <Text
          as="p"
          className={cn(
            'font-semibold leading-6 text-figma-typo-black',
            size === 'sm' ? 'text-[16px]' : 'text-[20px]',
          )}
        >
          {value}
        </Text>
      </div>
    </div>
  )
}

export type { SubjectStatCardProps }
export default SubjectStatCard
