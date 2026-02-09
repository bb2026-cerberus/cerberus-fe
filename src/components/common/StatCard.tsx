import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'

type StatCardProps = {
  label: string
  value: string
  size?: 'md' | 'sm'
  className?: string
}

function StatCard({ label, value, size = 'md', className }: StatCardProps) {
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
          'flex w-full flex-col gap-1',
          size === 'sm' ? 'px-[8px] py-[10px]' : 'px-[10px] py-[12px]',
        )}
      >
        <Text
          as="p"
          className={cn(
            'font-medium leading-[1.4] text-figma-typo-gray',
            size === 'sm' ? 'text-[12px]' : 'text-[14px]',
          )}
        >
          {label}
        </Text>
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

export type { StatCardProps }
export default StatCard
