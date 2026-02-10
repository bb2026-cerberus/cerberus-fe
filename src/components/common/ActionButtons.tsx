import ActionButton from '@/components/common/ActionButton'
import TempSaveButton from '@/components/common/TempSaveButton'
import { cn } from '@/lib/utils'

type ActionMode = 'create' | 'detail' | 'edit'

type ActionButtonsProps = {
  mode: ActionMode
  size?: 'pc' | 'mobile'
  primaryLabel?: string
  secondaryLabel?: string
  onPrimary?: () => void
  onSecondary?: () => void
  useTempSaveButton?: boolean
  tempSaveCount?: number
  onTempSaveListOpen?: () => void
  className?: string
  primaryButtonClassName?: string
  secondaryButtonClassName?: string
  tempSaveClassName?: string
}

function ActionButtons({
  mode,
  size = 'pc',
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
  useTempSaveButton = false,
  tempSaveCount = 0,
  onTempSaveListOpen,
  className,
  primaryButtonClassName,
  secondaryButtonClassName,
  tempSaveClassName,
}: ActionButtonsProps) {
  const sizeClass =
    size === 'pc'
      ? 'h-[var(--mentor-action-button-height-pc)] w-[var(--mentor-action-button-width-pc)] rounded-[var(--mentor-action-button-radius)] text-[18px]'
      : 'h-[var(--mentor-action-button-height-mobile)] w-[var(--mentor-action-button-width-mobile)] rounded-[var(--mentor-action-button-radius)] text-[16px]'
  const tempSaveSize = size === 'pc' ? 'pc' : 'mobile'
  const resolvedSecondaryLabel =
    secondaryLabel ?? (mode === 'detail' ? '삭제' : mode === 'edit' ? '취소' : '임시저장')
  const resolvedPrimaryLabel =
    primaryLabel ?? (mode === 'detail' ? '수정' : mode === 'edit' ? '등록' : '등록')

  return (
    <div className={cn('flex items-center gap-[8px]', className)}>
      {useTempSaveButton ? (
        <TempSaveButton
          count={tempSaveCount}
          label={resolvedSecondaryLabel}
          size={tempSaveSize}
          onSave={onSecondary}
          onOpenList={onTempSaveListOpen}
          className={tempSaveClassName}
        />
      ) : (
        <ActionButton
          label={resolvedSecondaryLabel}
          variant="secondary"
          onClick={onSecondary}
          className={cn(
            sizeClass,
            secondaryButtonClassName,
          )}
        />
      )}
      <ActionButton
        label={resolvedPrimaryLabel}
        onClick={onPrimary}
        className={cn(
          sizeClass,
          primaryButtonClassName,
        )}
      />
    </div>
  )
}

export type { ActionButtonsProps, ActionMode }
export default ActionButtons
