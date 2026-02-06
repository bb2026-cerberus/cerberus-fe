import { Bell, Menu } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/common/Icon'
import MenteeMenu from '@/components/common/MenteeMenu'
import { Text } from '@/components/common/Text'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

type MenteeHeaderProps = {
  name: string
  dateText: string
  onNotificationClick?: () => void
  onMenuOpenChange?: (open: boolean) => void
  onMenuClick?: () => void
  className?: string
}

function MenteeHeader({
  name,
  dateText,
  onNotificationClick,
  onMenuOpenChange,
  onMenuClick,
  className,
}: MenteeHeaderProps) {
  return (
    <div className={cn('flex flex-col items-center px-4 pt-4 sm:px-4', className)}>
      <div className="flex w-full flex-col gap-2 overflow-hidden">
        <div className="flex w-full items-center justify-between gap-5">
          <Text as="p" variant="headline1" className="text-figma-typo-black">
            {name}
          </Text>
          <div className="flex items-center gap-4">
            <button
              className="flex size-6 items-center justify-center text-figma-icon-color"
              type="button"
              onClick={onNotificationClick}
              aria-label="알림"
            >
              <Icon icon={Bell} size={24} />
            </button>
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
                  name={name.replace('님', '')}
                  subline="D-282 · 목표 1등급"
                  activeLabel="홈"
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <Text as="p" variant="title3" className="text-figma-typo-gray">
          {dateText}
        </Text>
      </div>
    </div>
  )
}

export type { MenteeHeaderProps }
export default MenteeHeader
