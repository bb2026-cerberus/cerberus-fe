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
  className?: string
}

function MentorSolutionTable({ title, items, className }: MentorSolutionTableProps) {
  return (
    <section className={cn('flex flex-col gap-[10px]', className)}>
      <Text as="p" className="text-[22px] font-medium leading-[1.2] text-figma-typo-black">
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
          />
        ))}
      </div>
    </section>
  )
}

export type { MentorSolutionTableProps, MentorSolutionItem }
export default MentorSolutionTable
