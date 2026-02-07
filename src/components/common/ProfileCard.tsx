import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'

type ProfileCardProps = {
  name: string
  subline: string
  avatarUrl?: string
  className?: string
}

function ProfileCard({ name, subline, avatarUrl, className }: ProfileCardProps) {
  return (
    <div className={cn('flex w-full items-center gap-4 rounded-[14px] bg-white px-4 py-3', className)}>
      <div className="size-[55px] overflow-hidden rounded-full bg-figma-card-gray">
        {avatarUrl ? (
          <img
            alt=""
            className="h-full w-full object-cover"
            src={avatarUrl}
            width={55}
            height={55}
          />
        ) : null}
      </div>
      <div className="flex flex-col">
        <Text as="p" className="text-[18px] font-bold leading-6 text-figma-typo-black">
          {name}
        </Text>
        <Text as="p" className="text-[14px] font-semibold leading-6 text-figma-typo-gray">
          {subline}
        </Text>
      </div>
    </div>
  )
}

export type { ProfileCardProps }
export default ProfileCard
