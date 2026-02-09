import { cn } from '@/lib/utils'
import TempSaveItem, { type TempSaveItemProps } from '@/components/common/TempSaveItem'

type TempSaveListProps = {
  items: (TempSaveItemProps & { id?: number | string })[]
  onDeleteItem?: (id?: number | string) => void
  className?: string
}

function TempSaveList({ items, onDeleteItem, className }: TempSaveListProps) {
  return (
    <div className={cn('mx-auto flex w-full max-w-[302px] flex-col gap-[9px]', className)}>
      {items.map((item) => (
        <TempSaveItem
          key={`${item.id ?? item.title}-${item.dateText}`}
          {...item}
          onDelete={item.onDelete ?? (onDeleteItem ? () => onDeleteItem(item.id) : undefined)}
        />
      ))}
    </div>
  )
}

export type { TempSaveListProps }
export default TempSaveList
