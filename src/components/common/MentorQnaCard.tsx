import { ChevronRight } from 'lucide-react'

import { Text } from '@/components/common/Text'
import { cn } from '@/lib/utils'

type MentorQnaCardProps = {
  name: string
  question: string
  className?: string
}

function MentorQnaCard({ name, question, className }: MentorQnaCardProps) {
  return (
    <div
      className={cn(
        'flex h-[84px] items-center justify-between rounded-[16px] bg-figma-white px-[20px]',
        className,
      )}
    >
      <div className="flex flex-col gap-[8px]">
        <Text as="p" className="text-[16px] font-semibold leading-6 text-figma-typo-black">
          {name}
        </Text>
        <Text as="p" className="text-[14px] font-semibold leading-6 text-figma-typo-gray">
          {question}
        </Text>
      </div>
      <ChevronRight className="size-[18px] text-figma-typo-black" />
    </div>
  )
}

export type { MentorQnaCardProps }
export default MentorQnaCard
