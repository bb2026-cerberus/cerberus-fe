import { Bell, Menu } from 'lucide-react'

import { cn } from '../../lib/utils'
import { Icon } from './Icon'
import { Text } from './Text'

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
    <div className={cn('flex flex-col items-center px-4 pt-4', className)}>
      <div className="flex w-full flex-col gap-2 overflow-hidden">
        <div className="flex w-full items-center justify-between gap-5">
          <Text as="p" variant="headline1" className="text-[#232323]">
            {name}
          </Text>
          <div className="flex items-center gap-4">
            <button
              className="flex size-6 items-center justify-center text-[#b6b6b6]"
              type="button"
              onClick={onNotificationClick}
              aria-label="알림"
            >
              <Icon icon={Bell} size={24} />
            </button>
            <button
              className="flex size-6 items-center justify-center text-[#b6b6b6]"
              type="button"
              onClick={onMenuClick}
              aria-label="메뉴"
            >
              <Icon icon={Menu} size={24} />
            </button>
          </div>
        </div>
        <Text as="p" variant="title3" className="text-[#aeaeae]">
          {dateText}
        </Text>
      </div>
    </div>
  )
}

export type { MenteeHeaderProps }
export default MenteeHeader
