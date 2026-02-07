import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'

type TimeLabelColumnProps = {
  labels: string[]
  className?: string
  gap?: number
}

function TimeLabelColumn({ labels, className, gap = 35 }: TimeLabelColumnProps) {
  return (
    <div
      className={cn('flex flex-col items-center text-figma-typo-gray', className)}
      style={{ gap }}
    >
      {labels.map((label) => (
        <Text
          key={label}
          as="span"
          className="whitespace-nowrap text-[12px] font-medium leading-tight"
        >
          {label}
        </Text>
      ))}
    </div>
  )
}

export type { TimeLabelColumnProps }
export default TimeLabelColumn
