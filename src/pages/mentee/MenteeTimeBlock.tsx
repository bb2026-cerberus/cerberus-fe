import * as React from 'react'

import MenteeSection from '@/components/common/MenteeSection'
import { Calendar } from '@/components/ui/calendar'
import { CalendarToggle } from '@/components/ui/calendar-toggle'
import TimeBlockSchedule from '@/components/common/TimeBlockSchedule'
import TimeLabelColumn from '@/components/common/TimeLabelColumn'
import TimeSummaryCard from '@/components/common/TimeSummaryCard'

function MenteeTimeBlock() {
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
  const timeLabels = React.useMemo(
    () => [
      '5 AM',
      '6 AM',
      '7 AM',
      '8 AM',
      '9 AM',
      '10 AM',
      '11 AM',
      '12 AM',
      '1 PM',
      '2 PM',
      '3 PM',
      '4 PM',
      '5 PM',
      '6 PM',
      '7 PM',
      '8 PM',
      '9 PM',
      '10 PM',
      '11 PM',
      '12 PM',
      '1 AM',
      '2 AM',
      '3 AM',
      '4 AM',
    ],
    [],
  )
  const scheduleItems = React.useMemo(
    () => [
      {
        title: '문학 1지문 정리',
        subtitle: '핵심 표현 5개',
        subjectLabel: '국어',
        subject: 'korean' as const,
        startTime: '08:02',
        endTime: '09:24',
      },
      {
        title: '단어 시험공부',
        subtitle: '1단원 단어리스트',
        subjectLabel: '영어',
        subject: 'english' as const,
        startTime: '09:25',
        endTime: '12:00',
      },
      {
        title: '미적분 1단원 개념 정리',
        subtitle: '목표 30문제',
        subjectLabel: '수학',
        subject: 'math' as const,
        startTime: '15:10',
        endTime: '19:22',
      },
      {
        title: '단어 시험공부',
        subtitle: '1단원 단어리스트',
        subjectLabel: '영어',
        subject: 'english' as const,
        startTime: '19:25',
        endTime: '21:10',
      },
      {
        title: '미적분 30문제',
        subtitle: '목표 30문제',
        subjectLabel: '수학',
        subject: 'math' as const,
        startTime: '22:30',
        endTime: '01:30',
      },
    ],
    [],
  )

  return (
    <div className="flex w-full flex-col items-center gap-0">
      <div className="w-full pb-[36px] pt-0">
        <div className="w-full bg-white pb-4 pt-0">
          <MenteeSection className="flex flex-col gap-3 px-4">
            <MenteeSection>
              <Calendar
                mode="single"
                viewMode={viewMode}
                navButtonClassName="rounded-[9px]"
                navButtonStyle={{ backgroundColor: 'var(--figma-card-gray)' }}
                selected={selected}
                onSelect={setSelected}
                modifiers={dummyMarkers}
                defaultMonth={today}
              />
            </MenteeSection>
            <MenteeSection className="flex items-center justify-end">
              <CalendarToggle
                label={viewMode === 'week' ? '캘린더 펼치기' : '캘린더 접기'}
                isExpanded={viewMode === 'month'}
                onClick={() => setViewMode((prev) => (prev === 'week' ? 'month' : 'week'))}
              />
            </MenteeSection>
          </MenteeSection>
        </div>
        <div className="w-full bg-figma-light-gray px-4 pt-[16px]">
          <MenteeSection className="flex flex-col gap-3">
            <div className="px-[10px]">
              <TimeSummaryCard
                totalLabel="총 공부 시간"
                totalValue="12h 54m"
                averageLabel="평균 집중"
                averageValue="48분"
                className="w-full max-w-[260px]"
              />
            </div>
            <div className="flex gap-[10px] px-[10px]">
              <TimeLabelColumn labels={timeLabels} />
              <TimeBlockSchedule items={scheduleItems} className="w-full" />
            </div>
          </MenteeSection>
        </div>
      </div>
    </div>
  )
}

export default MenteeTimeBlock
