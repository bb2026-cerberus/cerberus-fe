import { CircleAlert, CircleCheck } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/common/Icon'
import { Text } from '@/components/common/Text'

type NotificationVariant = 'alert' | 'info'

type NotificationItemProps = {
  title: string
  message: string
  timeText: string
  variant?: NotificationVariant
  className?: string
}

const variantStyles: Record<
  NotificationVariant,
  { icon: typeof CircleAlert; bg: string; iconColor: string }
> = {
  alert: {
    icon: CircleAlert,
    bg: 'bg-figma-sub-color-1',
    iconColor: 'text-white',
  },
  info: {
    icon: CircleCheck,
    bg: 'bg-figma-point-color-2',
    iconColor: 'text-white',
  },
}

function NotificationItem({
  title,
  message,
  timeText,
  variant = 'info',
  className,
}: NotificationItemProps) {
  const style = variantStyles[variant]

  return (
    <div
      className={cn(
        'flex w-full items-center gap-4 rounded-[18px] bg-white px-4 py-3',
        className,
      )}
    >
      <div className={cn('flex size-[34px] items-center justify-center rounded-full', style.bg)}>
        <Icon icon={style.icon} size={20} className={style.iconColor} />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <Text as="p" className="text-[16px] font-semibold leading-6 text-figma-typo-black">
          {title}
        </Text>
        <Text as="p" className="text-[14px] font-medium leading-[1.4] text-figma-typo-black">
          {message}
        </Text>
        <Text as="p" className="text-[12px] font-medium leading-[1.25] text-figma-typo-gray">
          {timeText}
        </Text>
      </div>
    </div>
  )
}

export type { NotificationItemProps, NotificationVariant }
export default NotificationItem
