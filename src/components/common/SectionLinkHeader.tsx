import { ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/common/Icon'
import { Text } from '@/components/common/Text'

type SectionLinkHeaderProps = {
  title: string
  onClick?: () => void
  className?: string
}

function SectionLinkHeader({ title, onClick, className }: SectionLinkHeaderProps) {
  return (
    <div className={cn('flex w-full items-center justify-between', className)}>
      <Text as="h3" className="text-[20px] font-semibold leading-6 text-figma-typo-black">
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
