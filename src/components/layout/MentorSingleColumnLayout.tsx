import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type MentorSingleColumnLayoutProps = {
  children: ReactNode
  className?: string
}

function MentorSingleColumnLayout({ children, className }: MentorSingleColumnLayoutProps) {
  return (
    <div className={cn('flex w-full flex-col gap-[25px]', className)}>{children}</div>
  )
}

export type { MentorSingleColumnLayoutProps }
export default MentorSingleColumnLayout
