import * as React from 'react'
import { Calendar } from '@/components/ui/calendar'

function MenteeHome() {
  const today = React.useMemo(() => new Date(), [])
  const [selected, setSelected] = React.useState<Date | undefined>(today)
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
      <div className="flex w-full max-w-[320px] flex-col gap-1">
        <h2 className="text-[18px] font-bold leading-6 text-[#232323]">멘티 홈</h2>
        <p className="text-[14px] leading-6 text-[#7a7a7a]">
          모바일 플래너/캘린더 화면이 들어갈 자리입니다.
        </p>
      </div>
      <div className="w-full max-w-[320px]">
        <Calendar
          mode="single"
          viewMode="week"
          selected={selected}
          onSelect={setSelected}
          modifiers={dummyMarkers}
          defaultMonth={today}
        />
      </div>
    </div>
  )
}

export default MenteeHome
