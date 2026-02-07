import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'

type FeedbackItemProps = {
  title: string
  subtitle?: string
  className?: string
}

function FeedbackItem({ title, subtitle, className }: FeedbackItemProps) {
  return (
    <div className={cn('flex h-[90px] w-full items-center bg-white px-4', className)}>
      <div className="flex flex-col gap-1">
        <Text as="p" className="text-[16px] font-semibold leading-6 text-figma-typo-black">
          {title}
        </Text>
        {subtitle ? (
          <Text as="p" className="text-[12px] font-medium leading-tight text-figma-typo-gray">
            {subtitle}
          </Text>
        ) : null}
      </div>
    </div>
  )
}

export type { FeedbackItemProps }
export default FeedbackItem
