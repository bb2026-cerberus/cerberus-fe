import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type MenteeSectionProps = {
  children: ReactNode
  className?: string
}

function MenteeSection({ children, className }: MenteeSectionProps) {
  return <div className={cn('mx-auto w-full max-w-full', className)}>{children}</div>
}

export type { MenteeSectionProps }
export default MenteeSection
