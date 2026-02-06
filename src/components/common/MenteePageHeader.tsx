import { ChevronLeft, Menu } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/common/Icon'
import MenteeMenu from '@/components/common/MenteeMenu'
import { Text } from '@/components/common/Text'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

type MenteePageHeaderProps = {
  title: string
  menuName?: string
  menuSubline?: string
  menuActiveLabel?: string
  onBackClick?: () => void
  onMenuOpenChange?: (open: boolean) => void
  onMenuClick?: () => void
  className?: string
}

function MenteePageHeader({
  title,
  menuName = '멘티',
  menuSubline = 'D-282 · 목표 1등급',
  menuActiveLabel = '홈',
  onBackClick,
  onMenuOpenChange,
  onMenuClick,
  className,
}: MenteePageHeaderProps) {
  return (
    <div className={cn('flex w-full flex-col items-center px-4 pt-4', className)}>
      <div className="flex w-full items-center justify-between">
        <button
          className="flex size-[30px] items-center justify-center text-figma-typo-gray-b"
          type="button"
          onClick={onBackClick}
          aria-label="뒤로가기"
        >
          <Icon icon={ChevronLeft} size={24} />
        </button>
        <Text
          as="p"
          className="text-[20px] font-semibold leading-6 text-figma-typo-black"
        >
          {title}
        </Text>
        <Sheet onOpenChange={onMenuOpenChange}>
          <SheetTrigger asChild>
            <button
              className="flex size-6 items-center justify-center text-figma-icon-color outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0"
              type="button"
              onClick={onMenuClick}
              aria-label="메뉴"
            >
              <Icon icon={Menu} size={24} />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            hideClose
            className="w-[260px] border-0 bg-transparent p-0 shadow-none"
          >
            <MenteeMenu
              name={menuName}
              subline={menuSubline}
              activeLabel={menuActiveLabel}
            />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export type { MenteePageHeaderProps }
export default MenteePageHeader
