import { useEffect, useMemo, useState } from 'react'
import {
  addDays,
  addMonths,
  addWeeks,
  differenceInCalendarWeeks,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameWeek,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
} from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/common/Icon'
import { Text } from '@/components/common/Text'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type WeekSelectorProps = {
  label?: string
  value?: Date
  onChange?: (date: Date) => void
  weekStartsOn?: 0 | 1
  onPrev?: () => void
  onNext?: () => void
  buttonClassName?: string
  iconClassName?: string
  labelClassName?: string
  labelTextClassName?: string
  className?: string
}

function WeekSelector({
  label,
  value,
  onChange,
  weekStartsOn = 1,
  onPrev,
  onNext,
  buttonClassName,
  iconClassName,
  labelClassName,
  labelTextClassName,
  className,
}: WeekSelectorProps) {
  const pickerEnabled = Boolean(value && onChange)
  const displayDate = value ?? new Date()
  const displayLabel = useMemo(() => {
    if (label) return label
    // 한 주의 "기준 달"은 주의 가운데(예: 목요일)를 기준으로 판단한다.
    // 이렇게 하면 월 경계에 걸친 주가 항상 한 달에만 속하도록 정리된다.
    const weekStart = startOfWeek(displayDate, { weekStartsOn })
    const midWeekDate = addDays(weekStart, 3)
    const monthStart = startOfMonth(midWeekDate)

    // 해당 달에서 "첫 번째 주"는, 가운데 요일이 그 달에 속하는 첫 번째 주로 정의한다.
    const monthStartWeekStart = startOfWeek(monthStart, { weekStartsOn })
    const monthStartWeekMid = addDays(monthStartWeekStart, 3)
    const firstWeekStartInMonth =
      monthStartWeekMid.getMonth() === monthStart.getMonth()
        ? monthStartWeekStart
        : addWeeks(monthStartWeekStart, 1)

    const weekIndex =
      differenceInCalendarWeeks(
        startOfWeek(midWeekDate, { weekStartsOn }),
        firstWeekStartInMonth,
        { weekStartsOn },
      ) + 1

    return `${format(midWeekDate, 'M월')} ${weekIndex}주차`
  }, [displayDate, label, weekStartsOn])

  const [pickerOpen, setPickerOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState<Date>(() =>
    startOfMonth(addDays(startOfWeek(displayDate, { weekStartsOn }), 3)),
  )

  useEffect(() => {
    setCurrentMonth(startOfMonth(addDays(startOfWeek(displayDate, { weekStartsOn }), 3)))
  }, [displayDate, weekStartsOn])

  const handlePrev = onPrev ?? (value && onChange ? () => onChange(subWeeks(value, 1)) : undefined)
  const handleNext = onNext ?? (value && onChange ? () => onChange(addWeeks(value, 1)) : undefined)
  const prevDisabled = !handlePrev
  const nextDisabled = !handleNext

  const weeksInMonth = useMemo(() => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const start = startOfWeek(monthStart, { weekStartsOn })
    const end = startOfWeek(monthEnd, { weekStartsOn })
    const allWeeks = eachWeekOfInterval({ start, end }, { weekStartsOn })

    // 주의 "가운데 날짜"가 해당 달에 속하는 주만 남기고, 그 순서대로 1주차, 2주차...를 매긴다.
    const targetMonth = monthStart.getMonth()
    const weeksWithIndex = allWeeks
      .filter((weekStart) => addDays(weekStart, 3).getMonth() === targetMonth)
      .map((weekStart, index) => ({
        weekStart,
        weekIndex: index + 1,
      }))

    return weeksWithIndex
  }, [currentMonth, weekStartsOn])

  return (
    <div className={cn('flex items-center gap-[10px]', className)}>
      <button
        type="button"
        onClick={handlePrev}
        disabled={prevDisabled}
        className={cn(
          'flex size-[32px] items-center justify-center rounded-[9px] bg-figma-card-gray transition-opacity disabled:cursor-not-allowed disabled:opacity-50',
          buttonClassName,
        )}
        aria-label="이전 주"
      >
        <Icon
          icon={ChevronLeft}
          size={16}
          className={cn(
            prevDisabled ? 'text-figma-typo-gray-b' : 'text-figma-typo-black',
            iconClassName,
          )}
        />
      </button>
      <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
        <PopoverTrigger asChild disabled={!pickerEnabled}>
          <button
            type="button"
            className={cn(
              'flex min-w-[170px] items-center justify-center gap-1 rounded-[6px] bg-figma-card-gray px-2 py-1 transition-colors disabled:cursor-default',
              labelClassName,
            )}
            aria-label="주차 선택"
          >
            <Text
              as="span"
              className={cn(
                'text-[14px] font-semibold leading-6 text-figma-typo-black',
                labelTextClassName,
              )}
            >
              {displayLabel}
            </Text>
          </button>
        </PopoverTrigger>
        {pickerEnabled ? (
          <PopoverContent
            align="center"
            sideOffset={8}
            className="w-[260px] rounded-[16px] border-0 bg-white p-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
          >
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentMonth((prev) => subMonths(prev, 1))}
                className="flex size-[28px] items-center justify-center rounded-[8px] bg-figma-card-gray"
                aria-label="이전 달"
              >
                <Icon icon={ChevronLeft} size={16} className="text-figma-typo-black" />
              </button>
              <Text as="span" className="text-[16px] font-semibold leading-6 text-figma-typo-black">
                {format(currentMonth, 'yyyy년 M월')}
              </Text>
              <button
                type="button"
                onClick={() => setCurrentMonth((prev) => addMonths(prev, 1))}
                className="flex size-[28px] items-center justify-center rounded-[8px] bg-figma-card-gray"
                aria-label="다음 달"
              >
                <Icon icon={ChevronRight} size={16} className="text-figma-typo-black" />
              </button>
            </div>
            <div className="mt-3 flex flex-col gap-2">
              {weeksInMonth.map(({ weekStart, weekIndex }) => {
                const weekEnd = endOfWeek(weekStart, { weekStartsOn })
                const selected = value ? isSameWeek(value, weekStart, { weekStartsOn }) : false
                return (
                  <button
                    key={weekStart.toISOString()}
                    type="button"
                    onClick={() => {
                      onChange?.(weekStart)
                      setPickerOpen(false)
                    }}
                    className={cn(
                      'flex w-full items-center justify-between rounded-[12px] px-3 py-2 text-left transition-colors',
                      selected ? 'bg-figma-card-gray' : 'hover:bg-figma-light-gray',
                    )}
                  >
                    <Text as="span" className="text-[14px] font-medium text-figma-typo-black">
                      {weekIndex}주차
                    </Text>
                    <Text as="span" className="text-[12px] text-figma-typo-gray-b">
                      {format(weekStart, 'M/d')} ~ {format(weekEnd, 'M/d')}
                    </Text>
                  </button>
                )
              })}
            </div>
          </PopoverContent>
        ) : null}
      </Popover>
      <button
        type="button"
        onClick={handleNext}
        disabled={nextDisabled}
        className={cn(
          'flex size-[32px] items-center justify-center rounded-[9px] bg-figma-card-gray transition-opacity disabled:cursor-not-allowed disabled:opacity-50',
          buttonClassName,
        )}
        aria-label="다음 주"
      >
        <Icon
          icon={ChevronRight}
          size={16}
          className={cn(
            nextDisabled ? 'text-figma-typo-gray-b' : 'text-figma-typo-black',
            iconClassName,
          )}
        />
      </button>
    </div>
  )
}

export type { WeekSelectorProps }
export default WeekSelector
