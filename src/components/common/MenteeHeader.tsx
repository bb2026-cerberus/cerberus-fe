import { Bell, Menu } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/common/Icon'
import { Text } from '@/components/common/Text'

type MenteeHeaderProps = {
  name: string
  dateText: string
  onNotificationClick?: () => void
  onMenuClick?: () => void
  className?: string
}

function MenteeHeader({
  name,
  dateText,
  onNotificationClick,
  onMenuClick,
  className,
}: MenteeHeaderProps) {
  return (
    <div className={cn('flex w-full flex-col items-center px-4 sm:px-4', className)}>
      <div className="flex w-full flex-col gap-1 overflow-hidden">
        <div className="flex w-full items-center justify-between gap-5">
          <Text
            as="p"
            variant="headline1"
            className="text-[24px] font-semibold leading-[1.2] text-figma-typo-black"
          >
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
            <button
              className="flex size-6 items-center justify-center rounded-md text-figma-icon-color focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-figma-point-color-1 focus-visible:ring-offset-2 focus-visible:ring-offset-figma-white"
              type="button"
              onClick={onMenuClick}
              aria-label="메뉴"
            >
              <Icon icon={Menu} size={24} />
            </button>
          </div>
        </div>
        <Text as="p" variant="caption" className="leading-[1.2] text-figma-typo-gray">
          {dateText}
        </Text>
      </div>
    </div>
  )
}

export type { MenteeHeaderProps }
export default MenteeHeader
