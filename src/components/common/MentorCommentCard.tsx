import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'

type MentorCommentCardProps = {
  comment: string
  className?: string
}

function MentorCommentCard({ comment, className }: MentorCommentCardProps) {
  return (
    <div className={cn('rounded-[18px] bg-white px-[18px] py-[14px]', className)}>
      <Text as="p" className="text-[14px] font-medium leading-[1.4] text-figma-typo-black">
        {comment}
      </Text>
    </div>
  )
}

export type { MentorCommentCardProps }
export default MentorCommentCard
