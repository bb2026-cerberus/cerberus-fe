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
    <div className="flex w-full flex-col items-center gap-4 px-5 py-6">
      <div className="flex w-full max-w-[386px] flex-col gap-1">
        <h2 className="text-[18px] font-bold leading-6 text-[#232323]">멘티 홈</h2>
        <p className="text-[14px] leading-6 text-[#7a7a7a]">
          모바일 플래너/캘린더 화면이 들어갈 자리입니다.
        </p>
      </div>
      <div className="w-full max-w-[386px]">
        <Calendar
          mode="single"
          viewMode={viewMode}
          selected={selected}
          onSelect={setSelected}
          modifiers={dummyMarkers}
          defaultMonth={today}
        />
      </div>
      <div className="flex w-full max-w-[386px] items-center justify-end">
        <CalendarToggle
          label={viewMode === 'week' ? '캘린더 펼치기' : '캘린더 접기'}
          isExpanded={viewMode === 'month'}
          onClick={() => setViewMode((prev) => (prev === 'week' ? 'month' : 'week'))}
        />
      </div>
      <div className="flex w-full max-w-[386px] flex-col gap-1">
        <h2 className="text-[18px] font-bold leading-6 text-[#232323]">멘티 홈</h2>
        <p className="text-[14px] leading-6 text-[#7a7a7a]">
          모바일 플래너/캘린더 화면이 들어갈 자리입니다.
        </p>
      </div>
    </div>
  )
}

export default MenteeHome
