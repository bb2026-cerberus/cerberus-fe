import { Trash2 } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/common/Icon'
import { Text } from '@/components/common/Text'

type TempSaveItemProps = {
  title: string
  dateText: string
  onDelete?: () => void
  className?: string
}

function TempSaveItem({ title, dateText, onDelete, className }: TempSaveItemProps) {
  return (
    <div
      className={cn(
        'flex h-[90px] w-full items-center gap-6 rounded-[18px] bg-white px-4',
        className,
      )}
    >
      <div className="flex w-full flex-col items-start gap-1">
        <Text as="p" className="text-[16px] font-semibold leading-6 text-figma-typo-black">
          {title}
        </Text>
        <div className="inline-flex items-center rounded-[6px] bg-figma-card-gray px-2 py-1">
          <Text as="span" className="text-[12px] font-medium leading-[1.25] text-[#6d6c6a]">
            {dateText}
          </Text>
        </div>
      </div>
      <button
        type="button"
        onClick={onDelete}
        className="flex size-6 items-center justify-center text-figma-typo-gray-b"
        aria-label="삭제"
      >
        <Icon icon={Trash2} size={20} />
      </button>
    </div>
  )
}

export type { TempSaveItemProps }
export default TempSaveItem
