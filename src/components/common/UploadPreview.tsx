import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'

type UploadPreviewProps = {
  imageUrl: string
  onEdit?: () => void
  onDelete?: () => void
  className?: string
}

function UploadPreview({ imageUrl, onEdit, onDelete, className }: UploadPreviewProps) {
  return (
    <div className={cn('flex w-full flex-col gap-1', className)}>
      <div className="flex h-[391px] w-full items-center justify-center overflow-hidden rounded-[18px] bg-white">
        <img src={imageUrl} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="flex gap-1 pt-1">
        <button
          type="button"
          onClick={onEdit}
          className="flex h-[55px] w-full items-center justify-center rounded-[14px] bg-figma-card-gray px-5 py-2"
        >
          <Text as="span" className="text-[16px] font-semibold leading-6 text-figma-point-color-2">
            수정하기
          </Text>
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="flex h-[55px] w-full items-center justify-center rounded-[14px] bg-figma-card-gray px-5 py-2"
        >
          <Text as="span" className="text-[16px] font-semibold leading-6 text-figma-point-color-2">
            삭제하기
          </Text>
        </button>
      </div>
    </div>
  )
}

export type { UploadPreviewProps }
export default UploadPreview
