import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/common/Icon'
import { Text } from '@/components/common/Text'

type WeekSelectorProps = {
  label: string
  onPrev?: () => void
  onNext?: () => void
  className?: string
}

function WeekSelector({ label, onPrev, onNext, className }: WeekSelectorProps) {
  return (
    <div className={cn('flex items-center gap-[15px]', className)}>
      <button
        type="button"
        onClick={onPrev}
        className="flex size-[30px] items-center justify-center rounded-[9px] bg-figma-card-gray"
        aria-label="이전 주"
      >
        <Icon icon={ChevronLeft} size={16} className="text-figma-typo-black" />
      </button>
      <div className="rounded-[34px] bg-white px-[10px] py-[5px]">
        <Text as="span" className="text-[20px] font-semibold leading-6 text-figma-typo-black">
          {label}
        </Text>
      </div>
      <button
        type="button"
        onClick={onNext}
        className="flex size-[30px] items-center justify-center rounded-[9px] bg-figma-card-gray"
        aria-label="다음 주"
      >
        <Icon icon={ChevronRight} size={16} className="text-figma-typo-black" />
      </button>
    </div>
  )
}

export type { WeekSelectorProps }
export default WeekSelector
