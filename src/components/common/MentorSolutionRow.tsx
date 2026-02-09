import { PencilLine, Trash2, Plus, ChevronDown, FileText } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/common/Icon'
import { Text } from '@/components/common/Text'

type MentorSolutionRowProps = {
  improvement: string
  subject: string
  attachment: string
  isPlaceholder?: boolean
  showActions?: boolean
  showAdd?: boolean
  className?: string
}

function MentorSolutionRow({
  improvement,
  subject,
  attachment,
  isPlaceholder = false,
  showActions = true,
  showAdd = false,
  className,
}: MentorSolutionRowProps) {
  const textClass = isPlaceholder ? 'text-figma-typo-gray' : 'text-figma-typo-black'

  return (
    <div
      className={cn(
        'grid w-full gap-[10px] rounded-[18px] bg-figma-white p-[16px] lg:items-center lg:gap-[20px] lg:bg-transparent lg:p-0 lg:grid-cols-[1fr_220px_260px_64px]',
        className,
      )}
    >
      <div className="flex h-[56px] items-center rounded-[14px] bg-figma-white px-[16px] lg:h-[70px] lg:rounded-[18px] lg:px-[24px]">
        <Text as="p" className={cn('text-[20px] font-semibold leading-6', textClass)}>
          {improvement}
        </Text>
      </div>

      <div className="flex h-[56px] items-center justify-between rounded-[14px] bg-figma-white px-[16px] lg:h-[70px] lg:rounded-[18px] lg:px-[24px]">
        <Text as="p" className={cn('text-[20px] font-semibold leading-6', textClass)}>
          {subject}
        </Text>
        {isPlaceholder ? (
          <Icon icon={ChevronDown} size={20} className="text-figma-typo-gray" />
        ) : null}
      </div>

      <div className="flex h-[56px] items-center gap-[6px] rounded-[14px] bg-figma-white px-[16px] lg:h-[70px] lg:rounded-[18px] lg:px-[24px]">
        {isPlaceholder ? <Icon icon={FileText} size={18} className="text-figma-typo-gray" /> : null}
        <Text as="p" className={cn('text-[20px] font-semibold leading-6', textClass)}>
          {attachment}
        </Text>
      </div>

      <div className="flex items-center gap-[8px] justify-end lg:justify-center">
        {showActions ? (
          <>
            <button
              type="button"
              className="flex size-[36px] items-center justify-center rounded-full bg-figma-card-gray lg:size-auto lg:rounded-none lg:bg-transparent"
              aria-label="수정"
            >
              <Icon icon={PencilLine} size={20} className="text-figma-typo-gray" />
            </button>
            <button
              type="button"
              className="flex size-[36px] items-center justify-center rounded-full bg-figma-card-gray lg:size-auto lg:rounded-none lg:bg-transparent"
              aria-label="삭제"
            >
              <Icon icon={Trash2} size={20} className="text-figma-typo-gray" />
            </button>
          </>
        ) : null}
        {showAdd ? (
          <button
            type="button"
            className="flex size-[36px] items-center justify-center rounded-full bg-figma-card-gray lg:size-auto lg:rounded-none lg:bg-transparent"
            aria-label="추가"
          >
            <Icon icon={Plus} size={20} className="text-figma-typo-gray" />
          </button>
        ) : null}
      </div>
    </div>
  )
}

export type { MentorSolutionRowProps }
export default MentorSolutionRow
