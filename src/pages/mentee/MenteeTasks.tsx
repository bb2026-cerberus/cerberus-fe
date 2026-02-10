import * as React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { format, startOfWeek } from 'date-fns'

import FormSectionGroup from '@/components/common/FormSectionGroup'
import FloatingActionButton from '@/components/common/FloatingActionButton'
import FeedbackItem from '@/components/common/FeedbackItem'
import FeedbackSummaryCard from '@/components/common/FeedbackSummaryCard'
import PillFilterTabs, { type PillFilterItem } from '@/components/common/PillFilterTabs'
import EmptyState from '@/components/common/EmptyState'
import TaskDateMeta from '@/components/common/TaskDateMeta'
import TaskItem from '@/components/common/TaskItem'
import SegmentedTabs, { type SegmentedTabItem } from '@/components/common/SegmentedTabs'
import { Skeleton } from '@/components/ui/skeleton'
import type { Subject, SubjectWithNeutral } from '@/types/ui/subject'
import type { TaskGroup, TaskItem as TaskItemType } from '@/types/ui/task'
import routePaths from '@/routes/routePaths'
import { toDateText } from '@/lib/date'
import todosApi from '@/services/api/todos'
import feedbacksApi from '@/services/api/feedbacks'
import useApiRequest from '@/hooks/useApiRequest'
import useAuth from '@/store/auth/useAuth'
import { Text } from '@/components/common/Text'
import WeekSelector from '@/components/common/WeekSelector'

type TaskTabValue = 'assignments' | 'todos' | 'feedback'
type SubjectFilterValue = Subject

const taskTabItems: SegmentedTabItem<TaskTabValue>[] = [
  { label: '과제', value: 'assignments' },
  { label: '할 일', value: 'todos' },
  { label: '과목별 피드백', value: 'feedback' },
]

const subjectFilterItems: PillFilterItem<SubjectFilterValue>[] = [
  { label: '국어', value: 'korean', activeClassName: 'bg-figma-sub-color-1 text-white' },
  { label: '영어', value: 'english', activeClassName: 'bg-figma-sub-color-3 text-white' },
  { label: '수학', value: 'math', activeClassName: 'bg-figma-sub-color-2 text-white' },
]

function isToday(dateText: string) {
  const [year, month, day] = dateText.split('.').map((value) => Number(value))
  if (!year || !month || !day) return false
  const today = new Date()
  return today.getFullYear() === year && today.getMonth() + 1 === month && today.getDate() === day
}

function getTabValue(raw: string | null): TaskTabValue {
  if (raw && taskTabItems.some((item) => item.value === raw)) {
    return raw as TaskTabValue
  }
  return 'assignments'
}

function MenteeTasks() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = getTabValue(searchParams.get('tab'))
  const { userId } = useAuth()

  const {
    loading: todosLoading,
    error: todosError,
    run: runTodos,
    setError: setTodosError,
  } = useApiRequest()

  const {
    loading: assignmentsLoading,
    error: assignmentsError,
    run: runAssignments,
    setError: setAssignmentsError,
  } = useApiRequest()
  const {
    loading: feedbackLoading,
    error: feedbackError,
    run: runFeedback,
    setError: setFeedbackError,
  } = useApiRequest()
  const [activeSubject, setActiveSubject] = React.useState<SubjectFilterValue>('korean')
  const [assignmentGroups, setAssignmentGroups] = React.useState<TaskGroup[]>([])
  const [todoGroups, setTodoGroups] = React.useState<TaskGroup[]>([])
  const [weekStart, setWeekStart] = React.useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 }),
  )
  const [feedbackSummaryBySubject, setFeedbackSummaryBySubject] = React.useState<
    Record<SubjectFilterValue, string>
  >({
    korean: '',
    english: '',
    math: '',
  })
  const [feedbackGroupsBySubject, setFeedbackGroupsBySubject] = React.useState<
    Record<SubjectFilterValue, TaskGroup[]>
  >({
    korean: [],
    english: [],
    math: [],
  })

  const toSubjectValue = (subject?: string): SubjectWithNeutral | undefined => {
    const normalized = subject?.toLowerCase()
    if (normalized === 'korean' || subject === '국어' || subject === 'KOREAN') return 'korean'
    if (normalized === 'english' || subject === '영어' || subject === 'ENGLISH') return 'english'
    if (normalized === 'math' || subject === '수학' || subject === 'MATH') return 'math'
    return undefined
  }

  const toSubjectLabel = (subject?: string) => subject ?? ''

  React.useEffect(() => {
    if (activeTab !== 'feedback') return
    if (!userId) {
      setFeedbackError('로그인 후 이용해주세요.')
      setFeedbackSummaryBySubject({
        korean: '',
        english: '',
        math: '',
      })
      setFeedbackGroupsBySubject({
        korean: [],
        english: [],
        math: [],
      })
      return
    }

    runFeedback(
      () =>
        feedbacksApi.getWeeklyFeedbacksBySubject({
          menteeId: userId,
          date: format(weekStart, 'yyyy-MM-dd'),
        }),
      {
        errorMessage: '과목별 피드백을 불러오지 못했어요.',
        onSuccess: (response) => {
          const data = response?.data
          const mondayDateText = data?.mondayDate ? toDateText(data.mondayDate) : ''

          const nextSummaryBySubject: Record<SubjectFilterValue, string> = {
            korean: '',
            english: '',
            math: '',
          }
          const nextGroupsBySubject: Record<SubjectFilterValue, TaskGroup[]> = {
            korean: [],
            english: [],
            math: [],
          }

          if (data?.feedback) {
            Object.entries(data.feedback).forEach(([subjectKey, feedbackList]) => {
              const subject = toSubjectValue(subjectKey)
              if (subject !== 'korean' && subject !== 'english' && subject !== 'math') return

              const items: TaskItemType[] =
                feedbackList?.map((feedbackItem, index) => ({
                  id: feedbackItem.feedbackId
                    ? String(feedbackItem.feedbackId)
                    : `${subject}-${index}`,
                  title: feedbackItem.summary || '피드백',
                  subtitle: feedbackItem.content,
                })) ?? []

              if (items.length > 0) {
                nextGroupsBySubject[subject].push({
                  dateText: mondayDateText,
                  items,
                })
              }

              nextSummaryBySubject[subject] =
                feedbackList?.[0]?.summary ?? data.summary ?? nextSummaryBySubject[subject]
            })
          }

          setFeedbackSummaryBySubject(nextSummaryBySubject)
          setFeedbackGroupsBySubject(nextGroupsBySubject)
        },
      },
    )
  }, [activeTab, runFeedback, setFeedbackError, userId, weekStart])

  React.useEffect(() => {
    if (activeTab !== 'todos') return
    if (!userId) return
    runTodos(
      () =>
        todosApi.getTodosWeekly({
          menteeId: [userId],
          mondayDate: format(weekStart, 'yyyy-MM-dd'),
          assignYn: 'N',
        }),
      {
        errorMessage: '할 일 정보를 불러오지 못했어요.',
        onSuccess: (response) => {
          const groups: TaskGroup[] =
            response?.data?.map((group) => ({
              dateText: toDateText(group.date),
              items:
                group.todos?.map(
                  (todo): TaskItemType => ({
                    id: todo.todoId ? String(todo.todoId) : undefined,
                    title: todo.title ?? '',
                    subtitle: todo.solution,
                    subject: toSubjectValue(todo.subject),
                    subjectLabel: toSubjectLabel(todo.subject),
                    completed: Boolean(todo.completed),
                  }),
                ) ?? [],
            })) ?? []
          setTodoGroups(groups)
        },
      },
    )
  }, [activeTab, runTodos, setTodosError, userId, weekStart])

  React.useEffect(() => {
    if (activeTab !== 'assignments') return
    if (!userId) {
      setAssignmentsError('로그인 후 이용해주세요.')
      setAssignmentGroups([])
      return
    }
    runAssignments(
      () =>
        todosApi.getTodosWeekly({
          menteeId: [userId],
          mondayDate: format(weekStart, 'yyyy-MM-dd'),
          assignYn: 'Y',
        }),
      {
        errorMessage: '과제 정보를 불러오지 못했어요.',
        onSuccess: (response) => {
          const groups: TaskGroup[] =
            response?.data?.map((group) => ({
              dateText: toDateText(group.date),
              items:
                group.todos?.map(
                  (todo): TaskItemType => ({
                    id: todo.todoId ? String(todo.todoId) : undefined,
                    title: todo.title ?? '',
                    subtitle: todo.solution,
                    subject: toSubjectValue(todo.subject),
                    subjectLabel: toSubjectLabel(todo.subject),
                    completed: Boolean(todo.completed),
                  }),
                ) ?? [],
            })) ?? []
          setAssignmentGroups(groups)
        },
      },
    )
  }, [activeTab, runAssignments, setAssignmentsError, userId, weekStart])

  const groups = activeTab === 'todos' ? todoGroups : assignmentGroups
  const hasFeedbackData =
    feedbackGroupsBySubject.korean.length > 0 ||
    feedbackGroupsBySubject.english.length > 0 ||
    feedbackGroupsBySubject.math.length > 0

  return (
    <div className="flex w-full flex-col items-center gap-0">
      <div className="w-full px-4 pb-4 pt-[8px]">
        <FormSectionGroup className="flex flex-col gap-4">
          <SegmentedTabs
            value={activeTab}
            items={taskTabItems}
            onChange={(next) => setSearchParams({ tab: next })}
          />
          <WeekSelector
            value={weekStart}
            onChange={setWeekStart}
            buttonClassName="size-[32px] rounded-[9px] bg-figma-card-gray"
            labelClassName="rounded-[6px] bg-figma-card-gray px-2 py-1"
            labelTextClassName="text-[14px] font-semibold leading-6 text-figma-typo-gray-b"
          />
          {activeTab === 'feedback' ? (
            <div className="flex flex-col gap-3">
              <PillFilterTabs
                value={activeSubject}
                items={subjectFilterItems}
                onChange={setActiveSubject}
              />
              {feedbackLoading ? (
                <div className="flex flex-col gap-3 pt-1">
                  <Skeleton className="h-[80px] w-full rounded-[16px] bg-figma-card-gray" />
                  {Array.from({ length: 2 }).map((_, index) => (
                    <div key={`feedback-skeleton-${index}`} className="flex flex-col gap-2 pt-1">
                      <Skeleton className="h-[18px] w-[110px] rounded-[6px] bg-figma-card-gray" />
                      <Skeleton className="h-[74px] w-full rounded-[18px] bg-figma-card-gray" />
                    </div>
                  ))}
                </div>
              ) : feedbackError ? (
                <Text as="p" className="text-[12px] font-semibold text-figma-sub-color-2">
                  {feedbackError}
                </Text>
              ) : hasFeedbackData ? (
                <>
                  <FeedbackSummaryCard
                    title="이번주 멘토 피드백 요약"
                    summary={feedbackSummaryBySubject[activeSubject]}
                  />
                  <div className="flex flex-col gap-[10px] pt-[8px]">
                    {feedbackGroupsBySubject[activeSubject].map((group) => (
                      <div
                        key={group.dateText}
                        className="flex flex-col gap-[10px] px-[4px] pt-[12px]"
                      >
                        <TaskDateMeta
                          dateText={group.dateText}
                          badgeText={isToday(group.dateText) ? '오늘' : undefined}
                        />
                        <div className="flex w-full flex-col gap-[2px] overflow-hidden rounded-[18px]">
                          {group.items.map((item) => (
                            <FeedbackItem
                              key={item.id}
                              title={item.title}
                              subtitle={item.subtitle}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <EmptyState
                  title="이번 주 등록된 과목별 피드백이 없어요."
                  description="이번 주 학습을 마치면 멘토 피드백이 이곳에 표시돼요."
                />
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {activeTab === 'todos' && todosLoading ? (
                <div className="flex flex-col gap-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={`todo-skeleton-${index}`} className="flex flex-col gap-2">
                      <Skeleton className="h-[18px] w-[110px] rounded-[6px] bg-figma-card-gray" />
                      <div className="flex flex-col gap-2">
                        {Array.from({ length: 2 }).map((__, itemIndex) => (
                          <Skeleton
                            key={`todo-item-skeleton-${index}-${itemIndex}`}
                            className="h-[74px] w-full rounded-[18px] bg-figma-card-gray"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : activeTab === 'assignments' && assignmentsLoading ? (
                <div className="flex flex-col gap-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={`assignment-skeleton-${index}`} className="flex flex-col gap-2">
                      <Skeleton className="h-[18px] w-[110px] rounded-[6px] bg-figma-card-gray" />
                      <div className="flex flex-col gap-2">
                        {Array.from({ length: 2 }).map((__, itemIndex) => (
                          <Skeleton
                            key={`assignment-item-skeleton-${index}-${itemIndex}`}
                            className="h-[74px] w-full rounded-[18px] bg-figma-card-gray"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {activeTab === 'todos' && todosError ? (
                    <Text as="p" className="text-[12px] font-semibold text-figma-sub-color-2">
                      {todosError}
                    </Text>
                  ) : null}
                  {activeTab === 'assignments' && assignmentsError ? (
                    <Text as="p" className="text-[12px] font-semibold text-figma-sub-color-2">
                      {assignmentsError}
                    </Text>
                  ) : null}
                  {groups.length === 0 ? (
                    <EmptyState
                      title={
                        activeTab === 'todos'
                          ? '아직 등록된 할 일이 없어요.'
                          : '아직 등록된 과제가 없어요.'
                      }
                      description={
                        activeTab === 'todos'
                          ? '오른쪽 아래 버튼을 눌러 오늘의 할 일을 추가해보세요.'
                          : '멘토가 과제를 등록하면 이곳에서 확인할 수 있어요.'
                      }
                    />
                  ) : (
                    groups.map((group) => (
                      <div key={group.dateText} className="flex flex-col gap-3">
                        <TaskDateMeta
                          dateText={group.dateText}
                          badgeText={isToday(group.dateText) ? '오늘' : undefined}
                        />
                        <div className="flex flex-col gap-2">
                          {group.items.map((item) => (
                            <TaskItem
                              key={item.id}
                              title={item.title}
                              subtitle={item.subtitle}
                              subject={item.subject}
                              subjectLabel={item.subjectLabel}
                              completed={item.completed}
                              onClick={() => {
                                if (!item.id) return
                                navigate(
                                  activeTab === 'todos'
                                    ? routePaths.menteeTodoDetail.replace(':todoId', item.id)
                                    : routePaths.menteeAssignmentDetail.replace(
                                        ':assignmentId',
                                        item.id,
                                      ),
                                )
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          )}
        </FormSectionGroup>
      </div>
      {activeTab === 'todos' ? (
        <FloatingActionButton
          label="할 일 추가"
          onClick={() => navigate(routePaths.menteeTodoCreate)}
        />
      ) : null}
    </div>
  )
}

export default MenteeTasks
