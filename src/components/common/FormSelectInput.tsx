import * as React from 'react'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/common/Icon'
import { Text } from '@/components/common/Text'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type FormSelectInputProps = {
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  options?: string[]
  size?: 'md' | 'lg'
  className?: string
}

const defaultOptions = ['수학 집중', '국어 집중', '영어 집중']

function FormSelectInput({
  value,
  placeholder = '선택해주세요',
  onChange,
  options = defaultOptions,
  size = 'md',
  className,
}: FormSelectInputProps) {
  const [open, setOpen] = React.useState(false)
  const handleSelect = React.useCallback(
    (nextValue: string) => {
      onChange?.(nextValue)
      setOpen(false)
    },
    [onChange],
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'flex w-full items-center justify-between bg-white text-left',
            size === 'lg'
              ? 'h-[64px] rounded-[16px] px-[20px]'
              : 'h-[52px] rounded-[14px] px-4',
            className,
          )}
        >
          <Text
            as="span"
            className={cn(
              size === 'lg'
                ? 'text-[18px] font-semibold leading-6'
                : 'text-[14px] font-medium leading-[1.4]',
              value ? 'text-figma-typo-black' : 'text-figma-typo-gray',
            )}
          >
            {value ?? placeholder}
          </Text>
          <Icon icon={ChevronDown} size={20} className="text-figma-typo-gray" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[calc(100vw-48px)] max-w-[370px] p-2">
        <div className="flex flex-col gap-1">
          {options.map((option) => {
            const isActive = option === value
            return (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                className={cn(
                  'flex w-full items-center rounded-[10px] px-3 py-2 text-left text-[14px] font-medium',
                  isActive
                    ? 'bg-figma-point-color-2 text-white'
                    : 'text-figma-typo-black hover:bg-figma-light-gray',
                )}
              >
                {option}
              </button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export type { FormSelectInputProps }
export default FormSelectInput
