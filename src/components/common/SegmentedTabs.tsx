import { cn } from '@/lib/utils'

type SegmentedTabItem<T extends string> = {
  label: string
  value: T
}

type SegmentedTabsProps<T extends string> = {
  value: T
  items: SegmentedTabItem<T>[]
  onChange: (value: T) => void
  className?: string
}

function SegmentedTabs<T extends string>({
  value,
  items,
  onChange,
  className,
}: SegmentedTabsProps<T>) {
  return (
    <div
      className={cn(
        'flex h-[44px] w-full gap-[6px] rounded-[40px] bg-white p-[5px]',
        className,
      )}
    >
      {items.map((item) => {
        const isActive = item.value === value
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={cn(
              'flex flex-1 items-center justify-center rounded-[40px] text-[14px] leading-[1.4]',
              isActive
                ? 'bg-figma-point-color-2 font-semibold text-white'
                : 'font-medium text-figma-typo-gray',
            )}
            aria-pressed={isActive}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

export type { SegmentedTabsProps, SegmentedTabItem }
export default SegmentedTabs
