import type { ReactNode } from 'react'

import emptyImage from '@/assets/empty.png'
import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'

type EmptyStateProps = {
  title: string
  description?: string
  className?: string
  imageClassName?: string
  children?: ReactNode
}

function EmptyState({ title, description, className, imageClassName, children }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center gap-3 rounded-[18px] px-4 py-8',
        className,
      )}
    >
      <img
        src={emptyImage}
        alt={title}
        className={cn('h-auto w-[140px] max-w-full select-none', imageClassName)}
      />
      <Text as="p" className="mt-1 text-center text-[14px] font-semibold text-figma-typo-black">
        {title}
      </Text>
      {description ? (
        <Text as="p" className="text-center text-[12px] leading-relaxed text-figma-typo-gray-b">
          {description}
        </Text>
      ) : null}
      {children}
    </div>
  )
}

export type { EmptyStateProps }
export default EmptyState
