import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type FormSectionGroupProps = {
  children: ReactNode
  className?: string
}

function FormSectionGroup({ children, className }: FormSectionGroupProps) {
  return <div className={cn('mx-auto w-full max-w-full', className)}>{children}</div>
}

export type { FormSectionGroupProps }
export default FormSectionGroup
