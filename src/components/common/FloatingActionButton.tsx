import { Plus } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/common/Icon'
import { Text } from '@/components/common/Text'

type FloatingActionButtonProps = {
  label: string
  onClick?: () => void
  positionClassName?: string
  className?: string
}

function FloatingActionButton({
  label,
  onClick,
  positionClassName,
  className,
}: FloatingActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        positionClassName ??
          'fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-6 z-20',
        'flex h-[51px] items-center gap-2 rounded-[14px] bg-figma-point-color-2 px-4 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.15)]',
        className,
      )}
    >
      <Icon icon={Plus} size={18} className="text-white" />
      <Text as="span" className="text-[16px] font-semibold leading-6 text-white">
        {label}
      </Text>
    </button>
  )
}

export type { FloatingActionButtonProps }
export default FloatingActionButton
