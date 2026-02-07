import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'

type WeeklySummaryCardProps = {
  summary: string
  className?: string
}

function WeeklySummaryCard({ summary, className }: WeeklySummaryCardProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col justify-center rounded-[18px] bg-figma-card-gray px-[18px] py-[14px]',
        className,
      )}
    >
      <Text as="p" className="text-[14px] font-medium leading-[1.4] text-figma-typo-black">
        {summary}
      </Text>
    </div>
  )
}

export type { WeeklySummaryCardProps }
export default WeeklySummaryCard
