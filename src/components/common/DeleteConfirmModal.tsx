import { AlertCircle } from 'lucide-react'

import Modal from '@/components/common/Modal'
import { Text } from '@/components/common/Text'
import { cn } from '@/lib/utils'

type DeleteConfirmModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string[]
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void
}

function DeleteConfirmModal({
  open,
  onOpenChange,
  title = '삭제하시겠습니까?',
  description = ['삭제된 내용은 복구할 수 없습니다.'],
  confirmLabel = '삭제',
  cancelLabel = '취소',
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      contentClassName="w-[calc(100vw-56px)] max-w-[360px] rounded-[20px] bg-figma-white"
      contentPaddingClassName="px-[12px] py-[22px]"
    >
      <div className="flex flex-col items-center gap-[8px]">
        <div className="flex size-[34px] items-center justify-center rounded-full bg-figma-sub-color-1 text-white">
          <AlertCircle className="size-[18px]" />
        </div>
        <Text as="p" className="text-[20px] font-semibold leading-6 text-figma-typo-black">
          {title}
        </Text>
        <div className="text-center">
          {description.map((line) => (
            <Text
              key={line}
              as="p"
              className="text-[14px] font-medium leading-[1.4] text-figma-typo-black"
            >
              {line}
            </Text>
          ))}
        </div>
        <div className="flex gap-[6px] pt-[5px]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className={cn(
              'flex h-[55px] w-[150px] items-center justify-center rounded-[14px] bg-figma-card-gray',
            )}
          >
            <Text as="span" className="text-[16px] font-semibold leading-6 text-figma-point-color-2">
              {cancelLabel}
            </Text>
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm?.()
              onOpenChange(false)
            }}
            className="flex h-[55px] w-[150px] items-center justify-center rounded-[14px] bg-figma-point-color-2"
          >
            <Text as="span" className="text-[16px] font-semibold leading-6 text-white">
              {confirmLabel}
            </Text>
          </button>
        </div>
      </div>
    </Modal>
  )
}

export type { DeleteConfirmModalProps }
export default DeleteConfirmModal
