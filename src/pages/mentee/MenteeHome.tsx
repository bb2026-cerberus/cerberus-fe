import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { CalendarToggle } from '@/components/ui/calendar-toggle'
import ChecklistGroup from '@/components/common/ChecklistGroup'
import ChecklistItem from '@/components/common/ChecklistItem'
import EmptyState from '@/components/common/EmptyState'
import FloatingChatButton from '@/components/common/FloatingChatButton'
import FormSectionGroup from '@/components/common/FormSectionGroup'
import { ChevronRight } from 'lucide-react'
import FormSection from '@/components/common/FormSection'
import MenteeTimeline from '@/components/common/MenteeTimeline'
import { Skeleton } from '@/components/ui/skeleton'
import type { TaskItem } from '@/types/ui/task'
import routePaths from '@/routes/routePaths'
import useApiRequest from '@/hooks/useApiRequest'
import useAuth from '@/store/auth/useAuth'
import todosApi from '@/services/api/todos'
import type {
  TodoDailyOverviewResponseDto,
  TodoTimerSessionDto,
} from '@/types/api/todos'
import type { SubjectWithNeutral } from '@/types/ui/subject'
import useMonthlyTaskMarkers from '@/hooks/useMonthlyTaskMarkers'

function MenteeHome() {
  const navigate = useNavigate()
  const { userId } = useAuth()
  const { loading, error, run } = useApiRequest()
  const today = React.useMemo(() => new Date(), [])
  const [overview, setOverview] = React.useState<TodoDailyOverviewResponseDto | null>(null)
  const [hasFetched, setHasFetched] = React.useState(false)
  const [selected, setSelected] = React.useState<Date | undefined>(today)
  const [viewMode, setViewMode] = React.useState<'month' | 'week'>('week')
  const [now, setNow] = React.useState(() => new Date())
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])
  const displayDate = React.useMemo(() => {
    const selectedOrToday = selected ?? today
    const currentDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const selectedDay = new Date(
      selectedOrToday.getFullYear(),
      selectedOrToday.getMonth(),
      selectedOrToday.getDate(),
    )
    const isViewingToday = selectedDay.getTime() === currentDay.getTime()
    const fiveAM = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 5, 0, 0, 0)
    if (isViewingToday && now.getTime() < fiveAM.getTime()) {
      const yesterday = new Date(currentDay)
      yesterday.setDate(yesterday.getDate() - 1)
      return yesterday
    }
    return selectedOrToday
  }, [now, selected, today])
  const displayDateKey = React.useMemo(() => format(displayDate, 'yyyy-MM-dd'), [displayDate])
  const markerBaseMonth = selected ?? today
  const { markers } = useMonthlyTaskMarkers({
    menteeId: userId ?? null,
    baseMonth: markerBaseMonth,
  })

  const toSubjectValue = (subject?: string): SubjectWithNeutral | undefined => {
    const normalized = subject?.toLowerCase()
    if (normalized === 'korean' || subject === '국어' || subject === 'KOREAN') return 'korean'
    if (normalized === 'english' || subject === '영어' || subject === 'ENGLISH') return 'english'
    if (normalized === 'math' || subject === '수학' || subject === 'MATH') return 'math'
    return undefined
  }

  const toSubjectLabel = (subject?: string) => subject ?? ''

  const formatMinutesToHms = (minutes?: number) => {
    const totalSeconds = Math.max(0, Math.floor((minutes ?? 0) * 60))
    const hours = Math.floor(totalSeconds / 3600)
    const remaining = totalSeconds % 3600
    const mins = Math.floor(remaining / 60)
    const secs = remaining % 60
    return `${hours}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const toDateValue = (value?: string) => {
    if (!value) return null
    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) return null
    return parsed
  }

  const toTimelineSegments = React.useMemo(() => {
    const colorMap: Record<SubjectWithNeutral, string> = {
      korean: 'bg-figma-sub-color-1',
      english: 'bg-figma-sub-color-3',
      math: 'bg-figma-sub-color-2',
      neutral: 'bg-figma-card-color',
    }

    const items = overview?.timerSummary?.items ?? []
    const segments = items.flatMap((item) => {
      const subjectValue = toSubjectValue(item.subject) ?? 'neutral'
      const colorClass = colorMap[subjectValue]
      return (item.sessions ?? []).flatMap((session: TodoTimerSessionDto) => {
        const start = toDateValue(session.startAt)
        const end = toDateValue(session.endAt)
        if (!start || !end) return []
        return [{ start, end, colorClass }]
      })
    })
    return segments
  }, [overview])

  const assignments = React.useMemo<TaskItem[]>(() => {
    const items = overview?.todoDetail?.items ?? []
    return items
      .filter((item) => item.assignYn?.toUpperCase() === 'N')
      .map((item) => ({
        id: item.todoId?.toString(),
        title: item.title ?? item.name ?? '-',
        subtitle: item.note ?? undefined,
        subject: toSubjectValue(item.subject),
        subjectLabel: toSubjectLabel(item.subject),
        completed: item.completeYn?.toUpperCase() === 'Y',
      }))
  }, [overview])

  const todos = React.useMemo<TaskItem[]>(() => {
    const items = overview?.todoDetail?.items ?? []
    return items
      .filter((item) => item.assignYn?.toUpperCase() === 'Y')
      .map((item) => ({
        id: item.todoId?.toString(),
        title: item.title ?? item.name ?? '-',
        subtitle: item.note ?? undefined,
        subject: toSubjectValue(item.subject),
        subjectLabel: toSubjectLabel(item.subject),
        completed: item.completeYn?.toUpperCase() === 'Y',
      }))
  }, [overview])

  React.useEffect(() => {
    if (!userId) return
    run(() => todosApi.getDailyOverview({ menteeId: userId, date: displayDateKey }), {
      errorMessage: '홈 정보를 불러오지 못했어요.',
      onSuccess: (response) => {
        setOverview(response.data ?? null)
        setHasFetched(true)
      },
      onError: () => setHasFetched(true),
    })
  }, [userId, displayDateKey, run])

  if (error) {
    throw new Error(error)
  }

  const isFetching = loading || !hasFetched

  return (
    <div className="flex w-full flex-col items-center gap-0">
      <div className="flex w-full flex-col gap-4 bg-white px-4 pb-4 pt-[8px]">
        <FormSectionGroup>
          <Calendar
            mode="single"
            viewMode={viewMode}
            selected={selected}
            onSelect={setSelected}
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
      </div>
      <div className="flex w-full flex-col gap-4 bg-transparent px-4 pb-[24px] pt-[18px]">
        <FormSectionGroup className="flex flex-col gap-4">
          <FormSection
            title={formatMinutesToHms(overview?.timerSummary?.totalMinutes)}
            actionIcon={<ChevronRight className="size-5" />}
            onActionClick={() => navigate(routePaths.menteeTimeBlock)}
            subtitle="오늘 누적시간"
          >
            {isFetching ? (
              <Skeleton className="h-[84px] w-full rounded-[18px]" />
            ) : (
              <MenteeTimeline baseDate={displayDate} segments={toTimelineSegments} />
            )}
          </FormSection>
        </FormSectionGroup>
        <FormSectionGroup className="flex flex-col gap-4">
          <FormSection
            title="과제"
            actionIcon={<ChevronRight className="size-5" />}
            onActionClick={() => navigate(`${routePaths.menteeTasks}?tab=assignments`)}
          >
            {isFetching ? (
              <div className="flex flex-col gap-2">
                <Skeleton className="h-[54px] w-full rounded-[14px]" />
                <Skeleton className="h-[54px] w-full rounded-[14px]" />
              </div>
            ) : assignments.length > 0 ? (
              <ChecklistGroup>
                {assignments.map((item) => (
                  <ChecklistItem
                    key={item.id ?? item.title}
                    title={item.title}
                    subtitle={item.subtitle}
                    subject={item.subject}
                    subjectLabel={item.subjectLabel}
                    completed={item.completed}
                  />
                ))}
              </ChecklistGroup>
            ) : (
              <EmptyState
                title="오늘 과제가 없어요"
                description="캘린더 날짜를 선택해서 다른 날도 확인해보세요."
                className="bg-figma-white"
              />
            )}
          </FormSection>
        </FormSectionGroup>
        <FormSectionGroup className="flex flex-col gap-4">
          <FormSection
            title="할 일"
            actionIcon={<ChevronRight className="size-5" />}
            onActionClick={() => navigate(`${routePaths.menteeTasks}?tab=todos`)}
          >
            {isFetching ? (
              <div className="flex flex-col gap-2">
                <Skeleton className="h-[54px] w-full rounded-[14px]" />
                <Skeleton className="h-[54px] w-full rounded-[14px]" />
              </div>
            ) : todos.length > 0 ? (
              <ChecklistGroup>
                {todos.map((item) => (
                  <ChecklistItem
                    key={item.id ?? item.title}
                    title={item.title}
                    subtitle={item.subtitle}
                    subject={item.subject}
                    subjectLabel={item.subjectLabel}
                    completed={item.completed}
                  />
                ))}
              </ChecklistGroup>
            ) : (
              <EmptyState
                title="오늘 할 일이 없어요"
                description="캘린더 날짜를 선택해서 다른 날도 확인해보세요."
                className="bg-figma-white"
              />
            )}
          </FormSection>
        </FormSectionGroup>
      </div>
      <FloatingChatButton onClick={() => navigate(routePaths.menteeQna)} />
    </div>
  )
}

export default MenteeHome
