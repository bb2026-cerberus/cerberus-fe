import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'

type TimeSummaryCardProps = {
  totalLabel: string
  totalValue: string
  averageLabel: string
  averageValue: string
  className?: string
}

function TimeSummaryCard({
  totalLabel,
  totalValue,
  averageLabel,
  averageValue,
  className,
}: TimeSummaryCardProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-[10px] rounded-[14px] bg-white px-[10px]',
        className,
      )}
    >
      <div className="flex flex-col gap-1 px-[10px] py-[12px]">
        <Text as="p" className="text-[14px] font-medium leading-[1.4] text-figma-typo-gray">
          {totalLabel}
        </Text>
        <Text as="p" className="text-[20px] font-semibold leading-6 text-figma-typo-black">
          {totalValue}
        </Text>
      </div>
      <div className="flex h-[40px] items-center justify-center">
        <div className="h-[40px] w-px bg-figma-card-gray" />
      </div>
      <div className="flex flex-col gap-1 px-[10px] py-[12px]">
        <Text as="p" className="text-[14px] font-medium leading-[1.4] text-figma-typo-gray">
          {averageLabel}
        </Text>
        <Text as="p" className="text-[20px] font-semibold leading-6 text-figma-typo-black">
          {averageValue}
        </Text>
      </div>
    </div>
  )
}

export type { TimeSummaryCardProps }
export default TimeSummaryCard
