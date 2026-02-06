import { ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'

type SectionHeaderProps = {
  title: string
  onClick?: () => void
  className?: string
}

function SectionHeader({ title, onClick, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex w-full items-center justify-between', className)}>
      <Text as="h3" variant="title3" className="text-[20px] font-semibold leading-6 text-[#232323]">
        {title}
      </Text>
      <button
        type="button"
        onClick={onClick}
        className="flex size-[30px] items-center justify-center text-[#232323]"
        aria-label={`${title} 더보기`}
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  )
}

export type { SectionHeaderProps }
export default SectionHeader
