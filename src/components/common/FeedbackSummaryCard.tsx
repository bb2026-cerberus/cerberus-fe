import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'

type FeedbackSummaryCardProps = {
  title: string
  summary: string
  className?: string
}

function FeedbackSummaryCard({ title, summary, className }: FeedbackSummaryCardProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col gap-1 rounded-[18px] bg-figma-card-gray px-4 py-[14px]',
        className,
      )}
    >
      <Text as="p" className="text-[14px] font-semibold leading-6 text-figma-typo-gray-b">
        {title}
      </Text>
      <Text as="p" className="text-[14px] font-medium leading-[1.4] text-[#1a1918]">
        {summary}
      </Text>
    </div>
  )
}

export type { FeedbackSummaryCardProps }
export default FeedbackSummaryCard
