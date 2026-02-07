import { Upload } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/common/Icon'
import { Text } from '@/components/common/Text'

type UploadBoxProps = {
  label?: string
  onClick?: () => void
  className?: string
}

function UploadBox({
  label = '사진을 업로드해주세요',
  onClick,
  className,
}: UploadBoxProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-[117px] w-full items-center justify-center rounded-[18px] border-[1.5px] border-dashed border-figma-icon-color bg-white px-4',
        className,
      )}
    >
      <div className="flex flex-col items-center gap-1">
        <Icon icon={Upload} size={20} className="text-figma-typo-gray" />
        <Text as="span" className="text-[16px] font-semibold leading-6 text-figma-typo-gray">
          {label}
        </Text>
      </div>
    </button>
  )
}

export type { UploadBoxProps }
export default UploadBox
