import { PencilLine, Trash2, Plus, FileText } from 'lucide-react'

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
  onEdit?: () => void
  onDelete?: () => void
  onAdd?: () => void
  className?: string
}

function MentorSolutionRow({
  improvement,
  subject,
  attachment,
  isPlaceholder = false,
  showActions = true,
  showAdd = false,
  onEdit,
  onDelete,
  onAdd,
  className,
}: MentorSolutionRowProps) {
  const textClass = isPlaceholder ? 'text-figma-typo-gray' : 'text-figma-typo-black'

  const rowContainerClass = 'bg-figma-white'

  return (
    <div
      className={cn(
        'grid w-full gap-[10px] rounded-[18px] p-[16px] lg:items-center lg:gap-[20px] lg:bg-transparent lg:p-0 lg:grid-cols-[1fr_1fr_1fr_64px]',
        rowContainerClass,
        className,
      )}
    >
      <div className="flex h-[56px] w-full items-center rounded-[14px] bg-figma-white px-[16px] lg:h-[60px] lg:rounded-[16px] lg:px-[20px]">
        <Text as="p" className={cn('text-[16px] font-medium leading-6', textClass)}>
          {subject}
        </Text>
      </div>

      <div className="flex h-[56px] w-full items-center rounded-[14px] bg-figma-white px-[16px] lg:h-[60px] lg:rounded-[16px] lg:px-[20px]">
        <Text as="p" className={cn('text-[16px] font-medium leading-6', textClass)}>
          {improvement}
        </Text>
      </div>

      <div className="flex h-[56px] w-full items-center gap-[6px] rounded-[14px] bg-figma-white px-[16px] lg:h-[60px] lg:rounded-[16px] lg:px-[20px]">
        {isPlaceholder ? (
          <Icon icon={FileText} size={18} className="text-figma-typo-gray" />
        ) : null}
        <Text as="p" className={cn('text-[16px] font-medium leading-6', textClass)}>
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
              onClick={onEdit}
            >
              <Icon icon={PencilLine} size={20} className="text-figma-typo-gray" />
            </button>
            <button
              type="button"
              className="flex size-[36px] items-center justify-center rounded-full bg-figma-card-gray lg:size-auto lg:rounded-none lg:bg-transparent"
              aria-label="삭제"
              onClick={onDelete}
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
            onClick={onAdd}
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
