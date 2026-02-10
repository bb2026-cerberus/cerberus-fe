import Modal from '@/components/common/Modal'
import { Text } from '@/components/common/Text'
import { cn } from '@/lib/utils'

type ConfirmModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string[]
  primaryLabel: string
  secondaryLabel: string
  onPrimary?: () => void
  onSecondary?: () => void
  primaryClassName?: string
  secondaryClassName?: string
}

function ConfirmModal({
  open,
  onOpenChange,
  title,
  description = [],
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
  primaryClassName,
  secondaryClassName,
}: ConfirmModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      contentClassName="w-[calc(100vw-56px)] max-w-[360px] rounded-[20px] bg-figma-white"
      contentPaddingClassName="px-[12px] py-[22px]"
    >
      <div className="flex flex-col items-center gap-[8px]">
        <Text as="p" className="text-[20px] font-semibold leading-6 text-figma-typo-black">
          {title}
        </Text>
        {description.length ? (
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
        ) : null}
        <div className="flex gap-[6px] pt-[5px]">
          <button
            type="button"
            onClick={() => {
              onSecondary?.()
              onOpenChange(false)
            }}
            className={cn(
              'flex h-[55px] w-[150px] items-center justify-center rounded-[14px] bg-figma-card-gray',
              secondaryClassName,
            )}
          >
            <Text as="span" className="text-[16px] font-semibold leading-6 text-figma-point-color-2">
              {secondaryLabel}
            </Text>
          </button>
          <button
            type="button"
            onClick={() => {
              onPrimary?.()
              onOpenChange(false)
            }}
            className={cn(
              'flex h-[55px] w-[150px] items-center justify-center rounded-[14px] bg-figma-point-color-2',
              primaryClassName,
            )}
          >
            <Text as="span" className="text-[16px] font-semibold leading-6 text-white">
              {primaryLabel}
            </Text>
          </button>
        </div>
      </div>
    </Modal>
  )
}

export type { ConfirmModalProps }
export default ConfirmModal
