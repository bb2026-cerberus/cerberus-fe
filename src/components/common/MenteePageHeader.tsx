import { ChevronLeft, Menu } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/common/Icon'
import { Text } from '@/components/common/Text'

type MenteePageHeaderProps = {
  title: string
  onBackClick?: () => void
  onMenuClick?: () => void
  className?: string
}

function MenteePageHeader({ title, onBackClick, onMenuClick, className }: MenteePageHeaderProps) {
  return (
    <div className={cn('flex w-full flex-col items-center px-4', className)}>
      <div className="grid w-full grid-cols-[30px_1fr_30px] items-center">
        <button
          className={cn(
            'flex size-[30px] items-center justify-center text-figma-typo-gray-b',
            !onBackClick && 'opacity-50',
          )}
          type="button"
          onClick={onBackClick}
          disabled={!onBackClick}
          aria-disabled={!onBackClick}
          aria-label="뒤로가기"
        >
          <Icon icon={ChevronLeft} size={24} />
        </button>
        <Text
          as="p"
          className="justify-self-center text-center text-[20px] font-semibold leading-6 text-figma-typo-black"
        >
          {title}
        </Text>
        <button
          className="flex size-6 items-center justify-center justify-self-end rounded-md text-figma-icon-color focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-figma-point-color-1 focus-visible:ring-offset-2 focus-visible:ring-offset-figma-white"
          type="button"
          onClick={onMenuClick}
          aria-label="메뉴"
        >
          <Icon icon={Menu} size={24} />
        </button>
      </div>
    </div>
  )
}

export type { MenteePageHeaderProps }
export default MenteePageHeader
