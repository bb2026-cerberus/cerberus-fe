import { cn } from '@/lib/utils'
import TimeBlockItem, { type TimeBlockItemProps } from '@/components/common/TimeBlockItem'
import { diffMinutes, toMinutesFromStart } from '@/utils/timeBlock'

type TimeBlockScheduleItem = TimeBlockItemProps

type TimeBlockScheduleProps = {
  items: TimeBlockScheduleItem[]
  className?: string
  minuteHeight?: number
  startHour?: number
}

function TimeBlockSchedule({
  items,
  className,
  minuteHeight = 0.85,
  startHour = 5,
}: TimeBlockScheduleProps) {
  const sorted = [...items].sort(
    (a, b) => toMinutesFromStart(a.startTime, startHour) - toMinutesFromStart(b.startTime, startHour),
  )
  let cursorMinutes = 0

  return (
    <div className={cn('flex w-full flex-col gap-[10px]', className)}>
      {sorted.map((item, index) => {
        const startOffset = toMinutesFromStart(item.startTime, startHour)
        const gapMinutes = Math.max(0, startOffset - cursorMinutes)
        const spacerHeight = Math.round(gapMinutes * minuteHeight)
        const durationMinutes = diffMinutes(item.startTime, item.endTime)
        cursorMinutes += gapMinutes + durationMinutes

        return (
          <div key={`${item.title}-${item.startTime}-${index}`} className="flex flex-col gap-[10px]">
            {spacerHeight > 0 ? (
              <div
                className="rounded-[18px] bg-white opacity-0"
                style={{ height: spacerHeight }}
              />
            ) : null}
            <TimeBlockItem {...item} minuteHeight={minuteHeight} />
          </div>
        )
      })}
    </div>
  )
}

export type { TimeBlockScheduleProps, TimeBlockScheduleItem }
export default TimeBlockSchedule
