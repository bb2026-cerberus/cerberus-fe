import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'

type PrimaryActionButtonProps = {
  label: string
  onClick?: () => void
  className?: string
}

function PrimaryActionButton({ label, onClick, className }: PrimaryActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-[55px] w-full items-center justify-center rounded-[14px] bg-figma-point-color-2 px-5 py-2',
        className,
      )}
    >
      <Text as="span" className="text-[16px] font-semibold leading-6 text-white">
        {label}
      </Text>
    </button>
  )
}

export type { PrimaryActionButtonProps }
export default PrimaryActionButton
