import { cn } from '@/lib/utils'
import TempSaveItem, { type TempSaveItemProps } from '@/components/common/TempSaveItem'

type TempSaveListProps = {
  items: TempSaveItemProps[]
  className?: string
}

function TempSaveList({ items, className }: TempSaveListProps) {
  return (
    <div className={cn('mx-auto flex w-full max-w-[302px] flex-col gap-[9px]', className)}>
      {items.map((item) => (
        <TempSaveItem key={`${item.title}-${item.dateText}`} {...item} />
      ))}
    </div>
  )
}

export type { TempSaveListProps }
export default TempSaveList
