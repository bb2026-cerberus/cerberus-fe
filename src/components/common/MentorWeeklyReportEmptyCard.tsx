import { Text } from '@/components/common/Text'
import { cn } from '@/lib/utils'

type MentorWeeklyReportEmptyCardProps = {
  name: string
  onCreate?: () => void
  className?: string
}

function MentorWeeklyReportEmptyCard({
  name,
  onCreate,
  className,
}: MentorWeeklyReportEmptyCardProps) {
  return (
    <div
      className={cn(
        'flex h-[80px] items-center justify-between rounded-[18px] bg-figma-white px-[24px]',
        className,
      )}
    >
      <Text as="p" className="text-[20px] font-semibold leading-6 text-figma-typo-black">
        {name}
      </Text>
      <button
        type="button"
        onClick={onCreate}
        className="flex h-[50px] w-[130px] items-center justify-center rounded-[var(--mentor-action-button-radius)] bg-figma-point-color-2"
      >
        <Text as="span" className="text-[20px] font-semibold leading-6 text-white">
          작성하기
        </Text>
      </button>
    </div>
  )
}

export type { MentorWeeklyReportEmptyCardProps }
export default MentorWeeklyReportEmptyCard
