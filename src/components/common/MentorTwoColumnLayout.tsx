import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type MentorTwoColumnLayoutProps = {
  left: ReactNode
  right?: ReactNode
  className?: string
  leftClassName?: string
  rightClassName?: string
  columnsClassName?: string
}

function MentorTwoColumnLayout({
  left,
  right,
  className,
  leftClassName,
  rightClassName,
  columnsClassName,
}: MentorTwoColumnLayoutProps) {
  const hasRight = Boolean(right)

  return (
    <div
      className={cn(
        'grid gap-[30px]',
        hasRight ? 'xl:grid-cols-[800px_810px]' : 'xl:grid-cols-[800px]',
        columnsClassName,
        className,
      )}
    >
      <div className={leftClassName}>{left}</div>
      {hasRight ? <div className={rightClassName}>{right}</div> : null}
    </div>
  )
}

export type { MentorTwoColumnLayoutProps }
export default MentorTwoColumnLayout
