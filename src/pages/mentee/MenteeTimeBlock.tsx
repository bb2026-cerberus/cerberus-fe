import * as React from 'react'

import FormSectionGroup from '@/components/common/FormSectionGroup'
import { Calendar } from '@/components/ui/calendar'
import { CalendarToggle } from '@/components/ui/calendar-toggle'
import TimeBlockSchedule from '@/components/common/TimeBlockSchedule'
import type { TimeBlockScheduleItem } from '@/components/common/TimeBlockSchedule'
import TimeLabelColumn from '@/components/common/TimeLabelColumn'
import TimeSummaryCard from '@/components/common/TimeSummaryCard'
import { Skeleton } from '@/components/ui/skeleton'
import type { SubjectWithNeutral } from '@/types/ui/subject'
import useAuth from '@/store/auth/useAuth'
import useMonthlyTaskMarkers from '@/hooks/useMonthlyTaskMarkers'

const TimeLabels = [
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
]

function toApiDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function toSubjectValue(subject?: string): SubjectWithNeutral {
  const n = subject?.toLowerCase()
  if (n === 'korean' || subject === '국어') return 'korean'
  if (n === 'english' || subject === '영어') return 'english'
  if (n === 'math' || subject === '수학') return 'math'
  return 'neutral'
}

function toSubjectLabel(subject?: string): string {
  return subject ?? ''
}

function formatTotalMinutes(minutes?: number): string {
  if (minutes == null || minutes < 0) return '0h 0m'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h}h ${m}m`
}

function formatAverageMinutes(minutes?: number): string {
  if (minutes == null || minutes < 0) return '0분'
  return `${minutes}분`
}

function MenteeTimeBlock() {
  const today = React.useMemo(() => new Date(), [])
  const [selected, setSelected] = React.useState<Date | undefined>(today)
  const [viewMode, setViewMode] = React.useState<'month' | 'week'>('week')
  const [currentMonth, setCurrentMonth] = React.useState<Date>(today)
  const { userId } = useAuth()
  const [timerItems, setTimerItems] = React.useState<TimeBlockScheduleItem[]>([])
  const [assignmentItems, setAssignmentItems] = React.useState<TimeBlockScheduleItem[]>([])
  const [totalMinutes, setTotalMinutes] = React.useState<number | undefined>()
  const [averageMinutes, setAverageMinutes] = React.useState<number | undefined>()
  const scheduleLoading = false

  const scheduleItems = React.useMemo(
    () => [...timerItems, ...assignmentItems],
    [timerItems, assignmentItems],
  )

  const { markers, getAssignmentsByRange, getTimeSummaryByRange } = useMonthlyTaskMarkers({
    menteeId: userId,
    baseMonth: currentMonth,
  })

  const selectedDateStr = React.useMemo(
    () => (selected ? toApiDate(selected) : null),
    [selected],
  )

  React.useEffect(() => {
    if (!selectedDateStr) return
    setTimerItems([])
    setAssignmentItems([])
    setTotalMinutes(undefined)
    setAverageMinutes(undefined)
  }, [selectedDateStr])

  React.useEffect(() => {
    if (!selectedDateStr) return
    const summary = getTimeSummaryByRange(selectedDateStr, true)
    setTotalMinutes(summary.totalMinutes)
    setAverageMinutes(summary.averageMinutes)
    setTimerItems([])
  }, [getTimeSummaryByRange, selectedDateStr])

  React.useEffect(() => {
    if (!selectedDateStr) return
    const assignments = getAssignmentsByRange(selectedDateStr, true)
    const blocks: TimeBlockScheduleItem[] = assignments.map((a, index) => {
      const startHour = 22
      const startMin = index * 30
      const h = startHour + Math.floor(startMin / 60)
      const m = startMin % 60
      const startTime = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
      const endTime = `${String(h).padStart(2, '0')}:${String(m + 30).padStart(2, '0')}`
      return {
        title: a.title ?? '',
        subtitle: a.solution,
        subjectLabel: toSubjectLabel(a.subject),
        subject: toSubjectValue(a.subject),
        startTime,
        endTime,
      }
    })
    setAssignmentItems(blocks)
  }, [getAssignmentsByRange, selectedDateStr])

  return (
    <div className="flex w-full flex-col items-center gap-0">
      <div className="w-full pb-[36px] pt-0">
        <div className="w-full bg-white pb-4 pt-0">
          <FormSectionGroup className="flex flex-col gap-4 px-4">
            <FormSectionGroup>
              <Calendar
                mode="single"
                viewMode={viewMode}
                navButtonClassName="rounded-[9px]"
                navButtonStyle={{ backgroundColor: 'var(--figma-card-gray)' }}
                selected={selected}
                onSelect={setSelected}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                modifiers={markers}
                defaultMonth={today}
              />
            </FormSectionGroup>
            <FormSectionGroup className="flex items-center justify-end">
              <CalendarToggle
                label={viewMode === 'week' ? '캘린더 펼치기' : '캘린더 접기'}
                isExpanded={viewMode === 'month'}
                onClick={() => setViewMode((prev) => (prev === 'week' ? 'month' : 'week'))}
              />
            </FormSectionGroup>
          </FormSectionGroup>
        </div>
        <div className="w-full bg-figma-light-gray px-4 pt-[16px]">
          <FormSectionGroup className="flex flex-col gap-4">
            <div className="px-[10px]">
              <TimeSummaryCard
                totalLabel="총 공부 시간"
                totalValue={formatTotalMinutes(totalMinutes)}
                averageLabel="평균 집중"
                averageValue={formatAverageMinutes(averageMinutes)}
                className="w-full max-w-[260px]"
              />
            </div>
            <div className="flex gap-[10px] px-[10px]">
              <TimeLabelColumn labels={TimeLabels} />
              {scheduleLoading && scheduleItems.length === 0 ? (
                <div className="flex w-full flex-col gap-[10px]">
                  <Skeleton className="h-[80px] w-full rounded-[18px]" />
                  <Skeleton className="h-[80px] w-full rounded-[18px]" />
                  <Skeleton className="h-[80px] w-full rounded-[18px]" />
                </div>
              ) : (
                <TimeBlockSchedule items={scheduleItems} className="w-full" />
              )}
            </div>
          </FormSectionGroup>
        </div>
      </div>
    </div>
  )
}

export default MenteeTimeBlock
