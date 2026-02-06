import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type CalendarToggleProps = {
  label: string
  isExpanded: boolean
  onClick: () => void
  className?: string
}

function CalendarToggle({ label, isExpanded, onClick, className }: CalendarToggleProps) {
  return (
    <button
      type="button"
      className={cn('flex items-center justify-end gap-1 text-figma-typo-gray', className)}
      onClick={onClick}
    >
      <span className="text-[12px] font-medium leading-[24px]">{label}</span>
      <ChevronDownIcon className={cn('transition-transform duration-200', isExpanded ? 'rotate-180' : 'rotate-0')} size={16} />
    </button>
  )
}

export { CalendarToggle }
