import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'

const subjectChipVariants = cva(
  'inline-flex h-[24px] min-w-[47px] items-center justify-center rounded-[25px] px-2',
  {
    variants: {
      subject: {
        korean: 'bg-figma-sub-color-1 text-white',
        math: 'bg-figma-sub-color-2 text-white',
        english: 'bg-[#59c08e] text-white',
        neutral: 'bg-white text-figma-typo-gray-b',
      },
      tone: {
        default: '',
        muted: 'bg-figma-card-gray text-figma-typo-gray-b',
      },
    },
    defaultVariants: {
      subject: 'neutral',
      tone: 'default',
    },
  },
)

type SubjectChipProps = VariantProps<typeof subjectChipVariants> & {
  label: string
  className?: string
}

function SubjectChip({ label, subject, tone, className }: SubjectChipProps) {
  return (
    <span className={cn(subjectChipVariants({ subject, tone }), className)}>
      <Text as="span" variant="title3" className="text-[14px] font-semibold leading-6">
        {label}
      </Text>
    </span>
  )
}

export type { SubjectChipProps }
export default SubjectChip
