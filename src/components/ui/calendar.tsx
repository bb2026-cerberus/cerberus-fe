import * as React from 'react'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import {
  DayButton,
  DayPicker,
  type DateRange,
  Week as DayPickerWeek,
  getDefaultClassNames,
} from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'

type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant']
  viewMode?: 'month' | 'week'
  selected?: Date | Date[] | DateRange | undefined
  onSelect?: (date: Date | undefined) => void
  navButtonClassName?: string
  navButtonStyle?: React.CSSProperties
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  viewMode = 'month',
  navButtonClassName,
  navButtonStyle,
  formatters,
  components,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames()
  const { month: monthProp, defaultMonth, onMonthChange } = props
  const [internalMonth, setInternalMonth] = React.useState<Date>(
    () => monthProp ?? defaultMonth ?? new Date(),
  )
  const [containerHeight, setContainerHeight] = React.useState<number>(0)
  const prevHeightRef = React.useRef<number | null>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const lastMeasuredHeightRef = React.useRef<number>(0)

  React.useEffect(() => {
    if (monthProp) setInternalMonth(monthProp)
  }, [monthProp])

  const currentMonth = monthProp ?? internalMonth
  const handleMonthChange = React.useCallback(
    (nextMonth: Date) => {
      if (!monthProp) setInternalMonth(nextMonth)
      onMonthChange?.(nextMonth)
    },
    [monthProp, onMonthChange],
  )

  const selectedDate = React.useMemo(() => {
    const selected = props.selected
    if (!selected) return undefined
    if (selected instanceof Date) return selected
    if (Array.isArray(selected)) return selected[0]
    if (typeof selected === 'object' && 'from' in selected) return selected.from
    return undefined
  }, [props.selected])

  const isSameMonth = (left: Date, right: Date) =>
    left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth()
  const isSameDay = (left: Date, right: Date) =>
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  const today = React.useMemo(() => new Date(), [])
  const focusDate =
    viewMode === 'week'
      ? selectedDate && isSameMonth(selectedDate, currentMonth)
        ? selectedDate
        : new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
      : undefined
  React.useEffect(() => {
    const content = contentRef.current
    if (!content || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const nextHeight = entry.contentRect.height
      lastMeasuredHeightRef.current = nextHeight
      setContainerHeight(nextHeight)
    })
    observer.observe(content)
    return () => observer.disconnect()
  }, [])

  React.useLayoutEffect(() => {
    const content = contentRef.current
    if (!content) return
    const prevHeight = prevHeightRef.current ?? lastMeasuredHeightRef.current
    const nextHeight = content.getBoundingClientRect().height
    if (prevHeight === 0) {
      prevHeightRef.current = nextHeight
      setContainerHeight(nextHeight)
      return
    }
    setContainerHeight(prevHeight)
    const rafId = requestAnimationFrame(() => {
      const measured = content.getBoundingClientRect().height
      setContainerHeight(measured)
      prevHeightRef.current = measured
    })
    return () => cancelAnimationFrame(rafId)
  }, [viewMode, currentMonth])

  const UserWeek = components?.Week
  const UserWeeks = components?.Weeks
  const handleWeekChange = React.useCallback(
    (direction: 'prev' | 'next') => {
      const baseDate = selectedDate ?? currentMonth
      const delta = direction === 'prev' ? -7 : 7
      const nextDate = new Date(baseDate)
      nextDate.setDate(baseDate.getDate() + delta)
      handleMonthChange(nextDate)
      props.onSelect?.(nextDate)
    },
    [currentMonth, handleMonthChange, props.onSelect, selectedDate],
  )

  return (
    <div
      className="overflow-y-hidden overflow-x-visible transition-[height] duration-300 ease-in-out"
      style={{ height: `${containerHeight}px` }}
    >
      <div ref={contentRef}>
        <DayPicker
          showOutsideDays={showOutsideDays}
          className={cn(
            'bg-background group/calendar mx-auto px-0 pb-[14px] pt-[18px] text-figma-typo-black [--cell-size:38px] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent',
            String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
            String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
            className,
          )}
          captionLayout={captionLayout}
          styles={{
            ...props.styles,
            button_previous: {
              ...(props.styles?.button_previous ?? {}),
              ...(navButtonStyle ?? {}),
            },
            button_next: {
              ...(props.styles?.button_next ?? {}),
              ...(navButtonStyle ?? {}),
            },
          }}
          formatters={{
            formatCaption: (date) => {
              if (viewMode === 'week') {
                const targetDate = selectedDate ?? date
                if (isSameDay(targetDate, today)) return '오늘'
                return targetDate.toLocaleDateString('ko-KR', {
                  month: 'long',
                  day: 'numeric',
                })
              }
              return date.toLocaleString('ko-KR', { month: 'long' })
            },
            formatMonthDropdown: (date) => date.toLocaleString('ko-KR', { month: 'long' }),
            formatWeekdayName: (date) =>
              date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0),
            ...formatters,
          }}
          classNames={{
            root: cn('w-full', defaultClassNames.root),
            months: cn('relative flex flex-col gap-[12px]', defaultClassNames.months),
            month: cn('flex w-full flex-col gap-[6px]', defaultClassNames.month),
            nav: cn(
              'absolute inset-x-0 top-0 z-10 flex h-[44px] w-full items-center justify-between',
              defaultClassNames.nav,
            ),
            button_previous: cn(
              buttonVariants({ variant: buttonVariant }),
              'h-9 w-9 select-none p-0 text-figma-typo-black hover:bg-transparent aria-disabled:opacity-50',
              defaultClassNames.button_previous,
              navButtonClassName,
            ),
            button_next: cn(
              buttonVariants({ variant: buttonVariant }),
              'h-9 w-9 select-none p-0 text-figma-typo-black hover:bg-transparent aria-disabled:opacity-50',
              defaultClassNames.button_next,
              navButtonClassName,
            ),
            month_caption: cn(
              'relative flex h-[44px] w-full shrink-0 items-center justify-center',
              defaultClassNames.month_caption,
            ),
            dropdowns: cn(
              'flex w-full items-center justify-center gap-1.5 text-[18px] font-bold',
              defaultClassNames.dropdowns,
            ),
            dropdown_root: cn(
              'has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border',
              defaultClassNames.dropdown_root,
            ),
            dropdown: cn('bg-popover absolute inset-0 opacity-0', defaultClassNames.dropdown),
            caption_label: cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[18px] font-bold leading-[24px] text-figma-typo-black',
              captionLayout === 'label'
                ? 'pointer-events-none'
                : '[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5',
              defaultClassNames.caption_label,
            ),
            table: 'w-full border-collapse',
            weekdays: cn(
              'mt-[8px] bg-figma-light-gray flex h-[39px] items-center justify-between rounded-[31px]',
              defaultClassNames.weekdays,
            ),
            weekday: cn(
              'flex w-[38px] select-none items-center justify-center text-[14px] font-semibold text-figma-typo-gray',
              defaultClassNames.weekday,
            ),
            week: cn('mt-[29px] flex w-full items-center justify-between', defaultClassNames.week),
            day: cn(
              'group/day relative h-full w-full select-none p-0 text-center',
              defaultClassNames.day,
            ),
            range_start: cn(
              'bg-figma-point-color-2 text-white rounded-[25px]',
              defaultClassNames.range_start,
            ),
            range_middle: cn('rounded-none', defaultClassNames.range_middle),
            range_end: cn(
              'bg-figma-point-color-2 text-white rounded-[25px]',
              defaultClassNames.range_end,
            ),
            today: cn(
              'rounded-[25px] data-[selected=true]:rounded-[25px]',
              defaultClassNames.today,
            ),
            outside: cn(
              'text-muted-foreground aria-selected:text-muted-foreground',
              defaultClassNames.outside,
            ),
            disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
            hidden: cn('invisible', defaultClassNames.hidden),
            ...classNames,
          }}
          components={{
            ...components,
            Root: ({ className, rootRef, ...props }) => {
              return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />
            },
            Chevron: ({ className, orientation, ...props }) => {
              if (orientation === 'left') {
                return <ChevronLeftIcon className={cn('size-4', className)} {...props} />
              }

              if (orientation === 'right') {
                return <ChevronRightIcon className={cn('size-4', className)} {...props} />
              }

              return <ChevronDownIcon className={cn('size-4', className)} {...props} />
            },
            Nav: ({
              className,
              onNextClick,
              onPreviousClick,
              nextMonth,
              previousMonth,
              ...navProps
            }) => {
              const isWeekMode = viewMode === 'week'
              return (
                <nav className={cn(className)} {...navProps}>
                  <button
                    type="button"
                    className={cn(
                      buttonVariants({ variant: buttonVariant }),
                      'h-9 w-9 select-none p-0 text-figma-typo-black hover:bg-transparent aria-disabled:opacity-50',
                      navButtonClassName,
                    )}
                    style={navButtonStyle}
                    aria-label="Previous"
                    disabled={!isWeekMode && !previousMonth}
                    onClick={(e) => {
                      if (isWeekMode) {
                        handleWeekChange('prev')
                        return
                      }
                      onPreviousClick?.(e)
                    }}
                  >
                    <ChevronLeftIcon className="size-4" />
                  </button>
                  <button
                    type="button"
                    className={cn(
                      buttonVariants({ variant: buttonVariant }),
                      'h-9 w-9 select-none p-0 text-figma-typo-black hover:bg-transparent aria-disabled:opacity-50',
                      navButtonClassName,
                    )}
                    style={navButtonStyle}
                    aria-label="Next"
                    disabled={!isWeekMode && !nextMonth}
                    onClick={(e) => {
                      if (isWeekMode) {
                        handleWeekChange('next')
                        return
                      }
                      onNextClick?.(e)
                    }}
                  >
                    <ChevronRightIcon className="size-4" />
                  </button>
                </nav>
              )
            },
            Weeks: ({ className, ...weeksProps }) => {
              const WeeksComponent = UserWeeks ?? 'tbody'
              return (
                <WeeksComponent
                  {...weeksProps}
                  className={cn(className, viewMode === 'week' && 'min-h-[67px]')}
                  data-view-mode={viewMode}
                />
              )
            },
            Week: ({ week, ...weekProps }) => {
              const shouldRender =
                viewMode !== 'week' ||
                (focusDate ? week.days.some((day) => isSameDay(day.date, focusDate)) : true)
              const WeekComponent = UserWeek ?? DayPickerWeek
              return (
                <WeekComponent
                  week={week}
                  {...weekProps}
                  className={cn(weekProps.className, !shouldRender && 'hidden')}
                  aria-hidden={!shouldRender}
                />
              )
            },
            DayButton: (dayButtonProps) => (
              <CalendarDayButton
                {...dayButtonProps}
                selectedDate={selectedDate instanceof Date ? selectedDate : undefined}
              />
            ),
            WeekNumber: ({ children, ...props }) => {
              return (
                <td {...props}>
                  <div className="flex size-[--cell-size] items-center justify-center text-center">
                    {children}
                  </div>
                </td>
              )
            },
          }}
          {...props}
          month={currentMonth}
          onMonthChange={handleMonthChange}
        />
      </div>
    </div>
  )
}

type CalendarDayButtonProps = React.ComponentProps<typeof DayButton> & {
  selectedDate?: Date
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  children,
  selectedDate,
  ...props
}: CalendarDayButtonProps) {
  const defaultClassNames = getDefaultClassNames()
  const modifierMap = modifiers as Record<string, boolean>
  const dotColors = [
    { key: 'dotBlue', className: 'bg-[#3b82f6]' },
    { key: 'dotOrange', className: 'bg-[#f97316]' },
    { key: 'dotRed', className: 'bg-[#ef4444]' },
  ]
  const hasGenericDot = Boolean(modifierMap.dot)
  const activeDots = dotColors.filter(({ key }) => modifierMap[key])
  const ariaSelected = props['aria-selected']
  const isAriaSelected = ariaSelected === true || ariaSelected === 'true'
  const isSelectedByDate =
    selectedDate instanceof Date &&
    selectedDate.getFullYear() === day.date.getFullYear() &&
    selectedDate.getMonth() === day.date.getMonth() &&
    selectedDate.getDate() === day.date.getDate()
  const isSelectedSingle =
    (modifiers.selected || isAriaSelected || isSelectedByDate) &&
    !modifiers.range_start &&
    !modifiers.range_end &&
    !modifiers.range_middle
  const isRangeStart = modifiers.range_start
  const isRangeEnd = modifiers.range_end
  const isRangeMiddle = modifiers.range_middle
  const isSelected =
    isSelectedSingle || isRangeStart || isRangeEnd || isRangeMiddle || isAriaSelected

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'flex h-(--cell-size) w-(--cell-size) flex-col items-center justify-center gap-[4px] rounded-full text-[16px] font-normal leading-tight text-figma-typo-black hover:bg-[#f5f5f5] hover:text-figma-typo-black',
        isSelected && 'bg-figma-point-color-2! text-white! font-medium!',
        defaultClassNames.day,
        className,
      )}
      style={props.style}
      {...props}
    >
      <span className="leading-tight">{children}</span>
      <span className="flex h-[4px] items-center justify-center gap-[4px]" aria-hidden="true">
        {activeDots.length > 0 ? (
          activeDots.map(({ key, className: dotClassName }) => (
            <span key={key} className={cn('block size-[4px] rounded-full', dotClassName)} />
          ))
        ) : hasGenericDot ? (
          <span className="block size-[4px] rounded-full bg-[#3b82f6]" />
        ) : (
          <span className="block size-[4px] rounded-full opacity-0" />
        )}
      </span>
    </Button>
  )
}

export { Calendar, CalendarDayButton }
