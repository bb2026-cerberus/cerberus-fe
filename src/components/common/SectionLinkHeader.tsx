import { ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/common/Icon'
import { Text } from '@/components/common/Text'

type SectionLinkHeaderProps = {
  title: string
  size?: 'md' | 'sm'
  onClick?: () => void
  className?: string
}

function SectionLinkHeader({ title, size = 'md', onClick, className }: SectionLinkHeaderProps) {
  return (
    <div className={cn('flex w-full items-center justify-between', className)}>
      <Text
        as="h3"
        className={cn(
          'font-semibold leading-6 text-figma-typo-black',
          size === 'sm' ? 'text-[16px]' : 'text-[20px]',
        )}
      >
        {title}
      </Text>
      <button
        type="button"
        onClick={onClick}
        className="flex size-[30px] items-center justify-center text-figma-typo-black"
        aria-label={`${title} 이동`}
      >
        <Icon icon={ChevronRight} size={20} />
      </button>
    </div>
  )
}

export type { SectionLinkHeaderProps }
export default SectionLinkHeader
