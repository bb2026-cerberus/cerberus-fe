import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'

type TempSaveButtonProps = {
  count: number
  label?: string
  size?: 'mobile' | 'pc'
  onSave?: () => void
  onOpenList?: () => void
  className?: string
}

function TempSaveButton({
  count,
  label = '임시저장',
  size = 'mobile',
  onSave,
  onOpenList,
  className,
}: TempSaveButtonProps) {
  const isPc = size === 'pc'
  return (
    <div
      className={cn(
        isPc
          ? 'flex h-[44px] items-center gap-[8px] rounded-[12px] bg-figma-card-gray px-[12px]'
          : 'flex h-[55px] w-full items-center justify-between overflow-hidden rounded-[14px] bg-figma-card-gray px-5 py-2',
        className,
      )}
    >
      <button type="button" onClick={onSave} className="flex items-center gap-2">
        <Text
          as="span"
          className={cn(
            isPc
              ? 'text-[18px] font-semibold leading-6 text-figma-typo-gray-b'
              : 'text-[16px] font-semibold leading-6 text-figma-point-color-2',
          )}
        >
          {label}
        </Text>
      </button>
      <span
        className={cn(
          isPc
            ? 'h-[20px] w-px bg-figma-typo-gray/30'
            : 'mx-2 h-[18px] w-px bg-figma-point-color-2/40',
        )}
      />
      <button
        type="button"
        onClick={onOpenList}
        className={cn('flex items-center', isPc ? 'pl-[8px] pr-[10px]' : 'pl-2 pr-3')}
        aria-label="임시저장 목록 열기"
      >
        <Text
          as="span"
          className={cn(
            isPc
              ? 'text-[16px] font-semibold leading-6 text-figma-point-color-2'
              : 'text-[16px] font-semibold leading-6 text-figma-point-color-2',
          )}
        >
          {count}
        </Text>
      </button>
    </div>
  )
}

export type { TempSaveButtonProps }
export default TempSaveButton
