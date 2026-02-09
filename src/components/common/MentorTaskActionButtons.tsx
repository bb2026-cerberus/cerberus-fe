import { cn } from '@/lib/utils'
import ActionButton from '@/components/common/ActionButton'
import TempSaveButton from '@/components/common/TempSaveButton'

type MentorTaskActionMode = 'create' | 'detail' | 'edit'

type MentorTaskActionButtonsProps = {
  mode: MentorTaskActionMode
  onPrimary?: () => void
  onSecondary?: () => void
  tempSaveCount?: number
  onTempSaveClick?: () => void
  className?: string
}

function MentorTaskActionButtons({
  mode,
  onPrimary,
  onSecondary,
  tempSaveCount = 0,
  onTempSaveClick,
  className,
}: MentorTaskActionButtonsProps) {
  const secondaryLabel = mode === 'detail' ? '삭제' : mode === 'edit' ? '취소' : '임시저장'
  const primaryLabel = mode === 'detail' ? '수정' : '등록'

  return (
    <div className={cn('flex items-center gap-[8px]', className)}>
      {mode === 'create' ? (
        <TempSaveButton
          count={tempSaveCount}
          label={secondaryLabel}
          size="pc"
          onSave={onSecondary}
          onOpenList={onTempSaveClick}
        />
      ) : (
        <ActionButton
          label={secondaryLabel}
          variant="secondary"
          onClick={onSecondary}
          className="h-[44px] w-[96px] rounded-[12px] text-[18px]"
        />
      )}
      <ActionButton
        label={primaryLabel}
        onClick={onPrimary}
        className="h-[44px] w-[96px] rounded-[12px] text-[18px]"
      />
    </div>
  )
}

export type { MentorTaskActionButtonsProps, MentorTaskActionMode }
export default MentorTaskActionButtons
