import * as React from 'react'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant']
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'bg-background group/calendar rounded-[30px] px-[18px] pb-[14px] pt-[18px] text-[#232323] [--cell-size:38px] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatCaption: (date) => date.toLocaleString('ko-KR', { month: 'long' }),
        formatMonthDropdown: (date) => date.toLocaleString('ko-KR', { month: 'long' }),
        formatWeekdayName: (date) => date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn('relative flex flex-col gap-[12px]', defaultClassNames.months),
        month: cn('flex w-full flex-col gap-[12px]', defaultClassNames.month),
        nav: cn(
          'absolute inset-x-0 top-0 z-10 flex w-full items-center justify-between',
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'h-[24px] w-[24px] select-none p-0 text-[#232323] hover:bg-transparent aria-disabled:opacity-50',
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'h-[24px] w-[24px] select-none p-0 text-[#232323] hover:bg-transparent aria-disabled:opacity-50',
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          'relative flex w-full items-center justify-center py-[10px]',
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
          'absolute left-1/2 -translate-x-1/2 select-none text-[18px] font-bold leading-[24px] text-[#232323]',
          captionLayout === 'label'
            ? 'pointer-events-none'
            : '[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5',
          defaultClassNames.caption_label,
        ),
        table: 'w-full border-collapse',
        weekdays: cn(
          'mt-[16px] bg-[#fafafa] flex h-[39px] items-center justify-center gap-[14px] rounded-[31px]',
          defaultClassNames.weekdays,
        ),
        weekday: cn(
          'flex w-[38px] select-none items-center justify-center text-[14px] font-semibold text-[#aeaeae]',
          defaultClassNames.weekday,
        ),
        week: cn('mt-[29px] flex w-full items-center justify-center gap-[14px]', defaultClassNames.week),
        week_number_header: cn('w-[--cell-size] select-none', defaultClassNames.week_number_header),
        week_number: cn(
          'text-muted-foreground select-none text-[0.8rem]',
          defaultClassNames.week_number,
        ),
        day: cn(
          'group/day relative h-full w-full select-none p-0 text-center',
          defaultClassNames.day,
        ),
        range_start: cn('bg-[#064092] text-white rounded-[25px]', defaultClassNames.range_start),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('bg-[#064092] text-white rounded-[25px]', defaultClassNames.range_end),
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
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-[--cell-size] items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  children,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()
  const modifierMap = modifiers as Record<string, boolean>
  const dotColors = [
    { key: 'dotBlue', className: 'bg-[#3b82f6]' },
    { key: 'dotOrange', className: 'bg-[#f97316]' },
    { key: 'dotRed', className: 'bg-[#ef4444]' },
  ]
  const hasGenericDot = Boolean(modifierMap.dot)
  const activeDots = dotColors.filter(({ key }) => modifierMap[key])

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
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'data-[selected-single=true]:bg-[#064092] data-[selected-single=true]:text-white data-[selected-single=true]:font-medium data-[range-middle=true]:bg-[#064092] data-[range-middle=true]:text-white data-[range-start=true]:bg-[#064092] data-[range-start=true]:text-white data-[range-end=true]:bg-[#064092] data-[range-end=true]:text-white flex h-[38px] w-[38px] flex-col items-center justify-center gap-[4px] rounded-[25px] p-[10px] text-[16px] font-normal leading-[1.25] text-[#232323] hover:bg-[#f5f5f5] hover:text-[#232323]',
        defaultClassNames.day,
        className,
      )}
      {...props}
    >
      <span className="leading-[1.25]">{children}</span>
      <span className="flex h-[4px] items-center justify-center gap-[4px]" aria-hidden="true">
        {activeDots.length > 0
          ? activeDots.map(({ key, className: dotClassName }) => (
              <span key={key} className={cn('block size-[4px] rounded-full', dotClassName)} />
            ))
          : hasGenericDot
            ? (
                <span className="block size-[4px] rounded-full bg-[#3b82f6]" />
              )
            : (
                <span className="block size-[4px] rounded-full opacity-0" />
              )}
      </span>
    </Button>
  )
}

export { Calendar, CalendarDayButton }
