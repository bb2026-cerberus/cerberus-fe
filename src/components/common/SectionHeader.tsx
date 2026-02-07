import { ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'

type SectionHeaderProps = {
  title: string
  subtitle?: string
  onClick?: () => void
  className?: string
}

function SectionHeader({ title, subtitle, onClick, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex w-full items-center justify-between', className)}>
      <div className={subtitle ? 'flex flex-col' : undefined}>
        <Text
          as="h3"
          variant="title3"
          className="text-[20px] font-semibold leading-6 text-figma-typo-black"
        >
          {title}
        </Text>
        {subtitle != null && (
          <Text as="p" variant="caption" className="text-figma-typo-gray">
            {subtitle}
          </Text>
        )}
      </div>
      <button
        type="button"
        onClick={onClick}
        disabled={onClick == null}
        aria-disabled={onClick == null}
        className={cn(
          'flex size-[30px] items-center justify-center text-figma-typo-black',
          onClick == null && 'opacity-50',
        )}
        aria-label={onClick ? `${title} 더보기` : undefined}
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  )
}

export type { SectionHeaderProps }
export default SectionHeader
