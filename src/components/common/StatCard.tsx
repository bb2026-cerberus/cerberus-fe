import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'

type StatCardProps = {
  label: string
  value: string
  className?: string
}

function StatCard({ label, value, className }: StatCardProps) {
  return (
    <div className={cn('flex w-full items-center rounded-[18px] bg-white px-[10px]', className)}>
      <div className="flex w-full flex-col gap-1 px-[10px] py-[12px]">
        <Text as="p" className="text-[14px] font-medium leading-[1.4] text-figma-typo-gray">
          {label}
        </Text>
        <Text as="p" className="text-[20px] font-semibold leading-6 text-figma-typo-black">
          {value}
        </Text>
      </div>
    </div>
  )
}

export type { StatCardProps }
export default StatCard
