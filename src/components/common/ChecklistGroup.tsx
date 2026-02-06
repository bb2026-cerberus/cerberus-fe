import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type ChecklistGroupProps = {
  children: ReactNode
  className?: string
}

function ChecklistGroup({ children, className }: ChecklistGroupProps) {
  return <div className={cn('flex w-full flex-col gap-2.5', className)}>{children}</div>
}

export type { ChecklistGroupProps }
export default ChecklistGroup
