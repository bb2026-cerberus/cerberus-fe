import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/common/Icon'
import { Text } from '@/components/common/Text'

type WeekSelectorProps = {
  label: string
  onPrev?: () => void
  onNext?: () => void
  buttonClassName?: string
  iconClassName?: string
  labelClassName?: string
  labelTextClassName?: string
  className?: string
}

function WeekSelector({
  label,
  onPrev,
  onNext,
  buttonClassName,
  iconClassName,
  labelClassName,
  labelTextClassName,
  className,
}: WeekSelectorProps) {
  return (
    <div className={cn('flex items-center gap-[15px]', className)}>
      <button
        type="button"
        onClick={onPrev}
        className={cn(
          'flex size-[30px] items-center justify-center rounded-[9px] bg-figma-card-gray',
          buttonClassName,
        )}
        aria-label="이전 주"
      >
        <Icon
          icon={ChevronLeft}
          size={16}
          className={cn('text-figma-typo-black', iconClassName)}
        />
      </button>
      <div className={cn('rounded-[34px] bg-white px-[10px] py-[5px]', labelClassName)}>
        <Text
          as="span"
          className={cn(
            'text-[20px] font-semibold leading-6 text-figma-typo-black',
            labelTextClassName,
          )}
        >
          {label}
        </Text>
      </div>
      <button
        type="button"
        onClick={onNext}
        className={cn(
          'flex size-[30px] items-center justify-center rounded-[9px] bg-figma-card-gray',
          buttonClassName,
        )}
        aria-label="다음 주"
      >
        <Icon
          icon={ChevronRight}
          size={16}
          className={cn('text-figma-typo-black', iconClassName)}
        />
      </button>
    </div>
  )
}

export type { WeekSelectorProps }
export default WeekSelector
