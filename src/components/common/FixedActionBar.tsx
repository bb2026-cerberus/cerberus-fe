import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type FixedActionBarProps = {
  children: ReactNode
  className?: string
  containerClassName?: string
}

function FixedActionBar({ children, className, containerClassName }: FixedActionBarProps) {
  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-30 border-t bg-white',
        'pb-[calc(12px+env(safe-area-inset-bottom))] pt-3',
        className,
      )}
    >
      <div className={cn('px-4', containerClassName)}>{children}</div>
    </div>
  )
}

export type { FixedActionBarProps }
export default FixedActionBar
