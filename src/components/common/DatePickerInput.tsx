import * as React from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/common/Icon'
import { Text } from '@/components/common/Text'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type DatePickerInputProps = {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  closeOnSelect?: boolean
}

const formatDate = (date?: Date) => {
  if (!date) return ''
  return date.toLocaleDateString('sv-SE')
}

function DatePickerInput({
  value,
  onChange,
  placeholder = '날짜를 선택해주세요',
  className,
  closeOnSelect = true,
}: DatePickerInputProps) {
  const [open, setOpen] = React.useState(false)
  const handleSelect = React.useCallback(
    (date: Date | undefined) => {
      onChange?.(date)
      if (closeOnSelect && date) {
        setOpen(false)
      }
    },
    [closeOnSelect, onChange],
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'flex h-[52px] w-full items-center justify-between rounded-[14px] bg-white px-4 text-left',
            className,
          )}
        >
          <Text
            as="span"
            className={cn(
              'text-[14px] font-semibold leading-6',
              value ? 'text-figma-typo-black' : 'text-figma-typo-gray',
            )}
          >
            {value ? formatDate(value) : placeholder}
          </Text>
          <Icon icon={CalendarIcon} size={20} className="text-figma-typo-black" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[calc(100vw-48px)] max-w-[370px] rounded-[20px] border-0 bg-white px-[5px] pb-[20px] pt-[10px] shadow-[0px_8px_20px_0px_rgba(0,0,0,0.1)]"
      >
        <Calendar mode="single" selected={value} onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  )
}

export type { DatePickerInputProps }
export default DatePickerInput
