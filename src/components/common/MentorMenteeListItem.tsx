import { Text } from '@/components/common/Text'
import { cn } from '@/lib/utils'

type MentorMenteeListItemProps = {
  name: string
  subtitle: string
  avatarUrl?: string
  className?: string
  onClick?: () => void
}

function MentorMenteeListItem({
  name,
  subtitle,
  avatarUrl,
  className,
  onClick,
}: MentorMenteeListItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-[100px] w-full items-center gap-[16px] rounded-[18px] bg-figma-white px-[24px] text-left',
        className,
      )}
    >
      <div className="flex size-[44px] items-center justify-center overflow-hidden rounded-full bg-figma-icon-color">
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
        ) : null}
      </div>
      <div className="flex flex-col gap-[8px]">
        <Text as="p" className="text-[20px] font-semibold leading-6 text-figma-typo-black">
          {name}
        </Text>
        <Text as="p" className="text-[16px] font-semibold leading-6 text-figma-typo-gray">
          {subtitle}
        </Text>
      </div>
    </button>
  )
}

export type { MentorMenteeListItemProps }
export default MentorMenteeListItem
