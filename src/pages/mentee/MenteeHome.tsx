import * as React from 'react'
import { Calendar } from '@/components/ui/calendar'
import { CalendarToggle } from '@/components/ui/calendar-toggle'

function MenteeHome() {
  const today = React.useMemo(() => new Date(), [])
  const [selected, setSelected] = React.useState<Date | undefined>(today)
  const [viewMode, setViewMode] = React.useState<'month' | 'week'>('week')
  const dummyMarkers = React.useMemo(
    () => ({
      dotBlue: [
        new Date(today.getFullYear(), today.getMonth(), 1),
        new Date(today.getFullYear(), today.getMonth(), 6),
        new Date(today.getFullYear(), today.getMonth(), 10),
      ],
      dotOrange: [
        new Date(today.getFullYear(), today.getMonth(), 2),
        new Date(today.getFullYear(), today.getMonth(), 4),
        new Date(today.getFullYear(), today.getMonth(), 9),
      ],
      dotRed: [
        new Date(today.getFullYear(), today.getMonth(), 7),
        new Date(today.getFullYear(), today.getMonth(), 13),
      ],
    }),
    [today],
  )

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="w-[386px] max-w-full">
        <Calendar
          mode="single"
          viewMode={viewMode}
          selected={selected}
          onSelect={setSelected}
          modifiers={dummyMarkers}
          defaultMonth={today}
        />
      </div>
      <div className="flex w-[366px] max-w-full items-center justify-end">
        <CalendarToggle
          label={viewMode === 'week' ? '캘린더 펼치기' : '캘린더 접기'}
          isExpanded={viewMode === 'month'}
          onClick={() => setViewMode((prev) => (prev === 'week' ? 'month' : 'week'))}
        />
      </div>
    </div>
  )
}

export default MenteeHome
