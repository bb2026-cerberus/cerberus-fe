import { cn } from '@/lib/utils'

type PillFilterItem<T extends string> = {
  label: string
  value: T
  activeClassName?: string
}

type PillFilterTabsProps<T extends string> = {
  value: T
  items: PillFilterItem<T>[]
  onChange: (value: T) => void
  className?: string
}

function PillFilterTabs<T extends string>({
  value,
  items,
  onChange,
  className,
}: PillFilterTabsProps<T>) {
  return (
    <div className={cn('flex w-full items-center gap-5', className)}>
      {items.map((item) => {
        const isActive = item.value === value
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={cn(
              'flex h-[30px] w-[45px] items-center justify-center rounded-[40px] px-[10px] text-[12px] font-medium leading-tight',
              isActive
                ? item.activeClassName ?? 'bg-figma-point-color-2 text-white'
                : 'bg-[#f6f6f6] text-[#555]',
            )}
            aria-pressed={isActive}
          >
            <span className={cn(isActive ? 'font-semibold leading-6' : undefined)}>
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export type { PillFilterTabsProps, PillFilterItem }
export default PillFilterTabs
