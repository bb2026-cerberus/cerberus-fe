import MentorSolutionRow from '@/components/common/MentorSolutionRow'
import { Text } from '@/components/common/Text'
import { cn } from '@/lib/utils'

type MentorSolutionItem = {
  id: string
  improvement: string
  subject: string
  attachment: string
  isPlaceholder?: boolean
  showActions?: boolean
  showAdd?: boolean
}

type MentorSolutionTableProps = {
  title: string
  items: MentorSolutionItem[]
  onEditItem?: (id: string) => void
  onDeleteItem?: (id: string) => void
  onAddItem?: () => void
  className?: string
}

function MentorSolutionTable({
  title,
  items,
  onEditItem,
  onDeleteItem,
  onAddItem,
  className,
}: MentorSolutionTableProps) {
  return (
    <section className={cn('flex flex-col gap-[10px]', className)}>
      <Text as="p" className="text-[18px] font-medium leading-[1.2] text-figma-typo-black">
        {title}
      </Text>
      <div className="flex flex-col gap-[10px]">
        {items.map((item) => (
          <MentorSolutionRow
            key={item.id}
            improvement={item.improvement}
            subject={item.subject}
            attachment={item.attachment}
            isPlaceholder={item.isPlaceholder}
            showActions={item.showActions}
            showAdd={item.showAdd}
            onEdit={() => onEditItem?.(item.id)}
            onDelete={() => onDeleteItem?.(item.id)}
            onAdd={item.showAdd ? onAddItem : undefined}
          />
        ))}
      </div>
    </section>
  )
}

export type { MentorSolutionTableProps, MentorSolutionItem }
export default MentorSolutionTable
