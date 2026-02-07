import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar } from '@/components/ui/calendar'
import { CalendarToggle } from '@/components/ui/calendar-toggle'
import ChecklistGroup from '@/components/common/ChecklistGroup'
import ChecklistItem from '@/components/common/ChecklistItem'
import MenteeSection from '@/components/common/MenteeSection'
import SectionHeader from '@/components/common/SectionHeader'
import MenteeTimeline from '@/components/common/MenteeTimeline'
import routePaths from '@/routes/routePaths'

function MenteeHome() {
  const navigate = useNavigate()
  const today = React.useMemo(() => new Date(), [])
  const assignments = React.useMemo(
    () => [
      {
        title: '문학 1지문 정리',
        subtitle: '핵심 표현 5개',
        subject: 'korean' as const,
        subjectLabel: '국어',
        completed: false,
      },
      {
        title: '미적분 1단원 개념 정리',
        subtitle: '목표 30문제',
        subject: 'math' as const,
        subjectLabel: '수학',
        completed: false,
      },
      {
        title: '미적분 30문제',
        subtitle: '목표 30문제',
        subject: 'neutral' as const,
        subjectLabel: '수학',
        completed: true,
      },
    ],
    [],
  )
  const todos = React.useMemo(
    () => [
      {
        title: '미적분 30문제',
        subtitle: '목표 30문제',
        subject: 'math' as const,
        subjectLabel: '수학',
        completed: false,
      },
      {
        title: '단어 시험공부',
        subtitle: '1단원 단어 리스트',
        subject: 'english' as const,
        subjectLabel: '영어',
        completed: true,
      },
    ],
    [],
  )
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
    <div className="flex w-full flex-col items-center gap-0">
      <div className="w-full bg-white px-4 pb-4 pt-2">
        <MenteeSection>
          <Calendar
            mode="single"
            viewMode={viewMode}
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
      </div>
      <div className="w-full bg-transparent px-4 pb-[31px] pt-[26px]">
        <MenteeSection className="flex flex-col gap-2.5">
          <SectionHeader
            title="1:38:54"
            subtitle="오늘 누적시간"
            onClick={() => navigate(routePaths.menteeTimeBlock)}
          />
          <MenteeTimeline
            baseDate={selected ?? today}
            segments={React.useMemo(() => {
              const d = selected ?? today
              const y = d.getFullYear()
              const m = d.getMonth()
              const day = d.getDate()
              return [
                {
                  start: new Date(y, m, day, 8, 0),
                  end: new Date(y, m, day, 10, 30),
                  colorClass: 'bg-figma-sub-color-2',
                },
                {
                  start: new Date(y, m, day, 10, 30),
                  end: new Date(y, m, day, 11, 0),
                  colorClass: 'bg-figma-sub-color-2',
                  type: 'break' as const,
                },
                {
                  start: new Date(y, m, day, 11, 0),
                  end: new Date(y, m, day, 12, 0),
                  colorClass: 'bg-figma-sub-color-1',
                },
                {
                  start: new Date(y, m, day, 13, 0),
                  end: new Date(y, m, day, 14, 30),
                  colorClass: 'bg-figma-sub-color-3',
                },
              ]
            }, [selected, today])}
            markers={React.useMemo(() => {
              const d = selected ?? today
              const y = d.getFullYear()
              const m = d.getMonth()
              const day = d.getDate()
              return [
                {
                  time: new Date(y, m, day, 11, 0),
                  timeLabel: '11:00',
                  title: '미적분 30문제',
                  type: 'assignment' as const,
                  colorClass: 'bg-figma-sub-color-2',
                },
                {
                  time: new Date(y, m, day, 12, 0),
                  timeLabel: '12:00',
                  title: '문학 1지문',
                  type: 'assignment' as const,
                  colorClass: 'bg-figma-sub-color-1',
                },
                {
                  time: new Date(y, m, day, 14, 30),
                  timeLabel: '14:30',
                  title: '단어 시험공부',
                  type: 'todo' as const,
                  colorClass: 'bg-figma-sub-color-3',
                },
              ]
            }, [selected, today])}
          />
        </MenteeSection>
        <MenteeSection className="mt-[14px] flex flex-col gap-2.5">
          <SectionHeader
            title="과제"
            onClick={() => navigate(`${routePaths.menteeTasks}?tab=assignments`)}
          />
          <ChecklistGroup>
            {assignments.map((item) => (
              <ChecklistItem
                key={item.title}
                title={item.title}
                subtitle={item.subtitle}
                subject={item.subject}
                subjectLabel={item.subjectLabel}
                completed={item.completed}
              />
            ))}
          </ChecklistGroup>
        </MenteeSection>
        <MenteeSection className="mt-[14px] flex flex-col gap-2.5">
          <SectionHeader
            title="할 일"
            onClick={() => navigate(`${routePaths.menteeTasks}?tab=todos`)}
          />
          <ChecklistGroup>
            {todos.map((item) => (
              <ChecklistItem
                key={item.title}
                title={item.title}
                subtitle={item.subtitle}
                subject={item.subject}
                subjectLabel={item.subjectLabel}
                completed={item.completed}
              />
            ))}
          </ChecklistGroup>
        </MenteeSection>
      </div>
    </div>
  )
}

export default MenteeHome
