import { Download } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/common/Icon'
import { Text } from '@/components/common/Text'

type StudyMaterialCardProps = {
  title: string
  onDownload?: () => void
  className?: string
}

function StudyMaterialCard({ title, onDownload, className }: StudyMaterialCardProps) {
  return (
    <div
      className={cn(
        'flex h-[80px] w-full items-center justify-between rounded-[18px] bg-figma-point-color-2 px-4',
        className,
      )}
    >
      <Text as="p" className="text-[16px] font-semibold leading-6 text-white">
        {title}
      </Text>
      <button
        type="button"
        onClick={onDownload}
        className="inline-flex items-center gap-1 rounded-[25px] bg-figma-light-gray px-3 py-1"
      >
        <Text as="span" className="text-[14px] font-bold leading-6 text-figma-point-color-2">
          다운로드
        </Text>
        <Icon icon={Download} size={16} className="text-figma-point-color-2" />
      </button>
    </div>
  )
}

export type { StudyMaterialCardProps }
export default StudyMaterialCard
