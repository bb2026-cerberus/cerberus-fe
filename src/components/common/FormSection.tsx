import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'

type FormSectionProps = {
  title: string
  subtitle?: ReactNode
  children: ReactNode
  className?: string
  contentClassName?: string
  subtitleClassName?: string
  actionIcon?: ReactNode
  onActionClick?: () => void
  actionAriaLabel?: string
}

function FormSection({
  title,
  subtitle,
  children,
  className,
  contentClassName,
  subtitleClassName,
  actionIcon,
  onActionClick,
  actionAriaLabel,
}: FormSectionProps) {
  return (
    <section className={cn('flex w-full flex-col gap-[10px]', className)}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[4px]">
          <Text as="h3" className="text-[16px] font-medium leading-[1.2] text-figma-typo-black">
            {title}
          </Text>
          {subtitle ? (
            <Text
              as="p"
              className={cn('text-[12px] leading-[1.2] text-figma-typo-gray', subtitleClassName)}
            >
              {subtitle}
            </Text>
          ) : null}
        </div>
        {actionIcon ? (
          <button
            type="button"
            onClick={onActionClick}
            className="flex size-[30px] items-center justify-center text-figma-typo-black"
            aria-label={actionAriaLabel ?? `${title} 이동`}
          >
            {actionIcon}
          </button>
        ) : null}
      </div>
      <div className={cn('w-full', contentClassName)}>{children}</div>
    </section>
  )
}

export type { FormSectionProps }
export default FormSection
