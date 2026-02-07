import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'

type ActionButtonProps = {
  label: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
}

function ActionButton({
  label,
  onClick,
  variant = 'primary',
  className,
}: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-[55px] w-full items-center justify-center rounded-[14px] px-5 py-2 text-[16px] font-semibold leading-6',
        variant === 'primary'
          ? 'bg-figma-point-color-2 text-white'
          : 'bg-figma-card-gray text-figma-typo-gray',
        className,
      )}
    >
      <Text
        as="span"
        className={cn(
          'text-[16px] font-semibold leading-6',
          variant === 'primary' ? 'text-white' : 'text-figma-typo-gray',
        )}
      >
        {label}
      </Text>
    </button>
  )
}

export type { ActionButtonProps }
export default ActionButton
