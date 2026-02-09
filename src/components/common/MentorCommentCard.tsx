import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'

type MentorCommentCardProps = {
  comment: string
  size?: 'sm' | 'lg'
  className?: string
}

function MentorCommentCard({ comment, size = 'sm', className }: MentorCommentCardProps) {
  return (
    <div
      className={cn(
        'rounded-[18px] bg-white',
        size === 'lg' ? 'px-[24px] py-[18px]' : 'px-[18px] py-[14px]',
        className,
      )}
    >
      <Text
        as="p"
        className={cn(
          'font-medium leading-[1.4] text-figma-typo-black',
          size === 'lg' ? 'text-[18px]' : 'text-[14px]',
        )}
      >
        {comment}
      </Text>
    </div>
  )
}

export type { MentorCommentCardProps }
export default MentorCommentCard
