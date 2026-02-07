import type { ReactNode } from 'react'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/common/Icon'
import { Text } from '@/components/common/Text'

type ModalHeaderProps = {
  title: string
  onClose?: () => void
  rightSlot?: ReactNode
  className?: string
}

function ModalHeader({ title, onClose, rightSlot, className }: ModalHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between px-[10px] pb-[10px] pt-[8px]', className)}>
      <Text as="p" className="text-[18px] font-bold leading-6 text-figma-typo-black">
        {title}
      </Text>
      {rightSlot ??
        (onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="flex size-6 items-center justify-center text-figma-typo-black"
            aria-label="닫기"
          >
            <Icon icon={X} size={20} />
          </button>
        ) : null)}
    </div>
  )
}

export type { ModalHeaderProps }
export default ModalHeader
