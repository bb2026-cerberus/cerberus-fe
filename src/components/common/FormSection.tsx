import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'

type FormSectionProps = {
  title: string
  children: ReactNode
  className?: string
  contentClassName?: string
}

function FormSection({ title, children, className, contentClassName }: FormSectionProps) {
  return (
    <section className={cn('flex w-full flex-col gap-[14px] px-[10px]', className)}>
      <div className="flex items-center">
        <Text as="h3" className="text-[18px] font-bold leading-6 text-figma-typo-black">
          {title}
        </Text>
      </div>
      <div className={cn('w-full', contentClassName)}>{children}</div>
    </section>
  )
}

export type { FormSectionProps }
export default FormSection
