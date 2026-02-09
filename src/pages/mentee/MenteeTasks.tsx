import * as React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import FormSectionGroup from '@/components/common/FormSectionGroup'
import FloatingActionButton from '@/components/common/FloatingActionButton'
import FeedbackItem from '@/components/common/FeedbackItem'
import FeedbackSummaryCard from '@/components/common/FeedbackSummaryCard'
import PillFilterTabs, { type PillFilterItem } from '@/components/common/PillFilterTabs'
import TaskDateMeta from '@/components/common/TaskDateMeta'
import TaskItem from '@/components/common/TaskItem'
import SegmentedTabs, { type SegmentedTabItem } from '@/components/common/SegmentedTabs'
import { Skeleton } from '@/components/ui/skeleton'
import type { Subject, SubjectWithNeutral } from '@/types/ui/subject'
import type { TaskGroup, TaskItem as TaskItemType } from '@/types/ui/task'
import routePaths from '@/routes/routePaths'
import { toDateText } from '@/lib/date'
import assignmentsApi from '@/services/api/assignments'
import todosApi from '@/services/api/todos'
import useApiRequest from '@/hooks/useApiRequest'
import useAuth from '@/store/auth/useAuth'
import { Text } from '@/components/common/Text'

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
  const [activeSubject, setActiveSubject] = React.useState<SubjectFilterValue>('korean')
  const [assignmentGroups, setAssignmentGroups] = React.useState<TaskGroup[]>([])
  const [todoGroups, setTodoGroups] = React.useState<TaskGroup[]>([])

  const toSubjectValue = (subject?: string): SubjectWithNeutral | undefined => {
    const normalized = subject?.toLowerCase()
    if (normalized === 'korean' || subject === '국어' || subject === 'KOREAN') return 'korean'
    if (normalized === 'english' || subject === '영어' || subject === 'ENGLISH') return 'english'
    if (normalized === 'math' || subject === '수학' || subject === 'MATH') return 'math'
    return undefined
  }

  const toSubjectLabel = (subject?: string) => subject ?? ''

  React.useEffect(() => {
    if (activeTab !== 'todos') return
    if (!userId) return
    runTodos(() => todosApi.getTodos({ menteeId: userId }), {
      errorMessage: '할 일 정보를 불러오지 못했어요.',
      onSuccess: (response) => {
        const groups: TaskGroup[] =
          response?.data?.map((group) => ({
            dateText: toDateText(group.date),
            items:
              group.todos?.map((todo): TaskItemType => ({
                id: todo.todoId ? String(todo.todoId) : undefined,
                title: todo.title ?? '',
                subtitle: todo.solution,
                subject: toSubjectValue(todo.subject),
                subjectLabel: toSubjectLabel(todo.subject),
                completed: Boolean(todo.completed),
              })) ?? [],
          })) ?? []
        setTodoGroups(groups)
      },
    })
  }, [activeTab, runTodos, setTodosError, userId])

  React.useEffect(() => {
    if (activeTab !== 'assignments') return
    if (!userId) {
      setAssignmentsError('로그인 후 이용해주세요.')
      setAssignmentGroups([])
      return
    }
    runAssignments(() => assignmentsApi.getAssignments({ menteeId: userId }), {
      errorMessage: '과제 정보를 불러오지 못했어요.',
      onSuccess: (response) => {
        const groups: TaskGroup[] =
          response?.data?.map((group) => ({
            dateText: toDateText(group.date),
            items:
              group.assignments?.map((assignment): TaskItemType => ({
                id: assignment.assignmentId ? String(assignment.assignmentId) : undefined,
                title: assignment.title ?? '',
                subtitle: assignment.solution,
                subject: toSubjectValue(assignment.subject),
                subjectLabel: toSubjectLabel(assignment.subject),
                completed: Boolean(assignment.completed),
              })) ?? [],
          })) ?? []
        setAssignmentGroups(groups)
      },
    })
  }, [activeTab, runAssignments, setAssignmentsError, userId])

  const groups = activeTab === 'todos' ? todoGroups : assignmentGroups

  const feedbackSummary = React.useMemo(
    () => ({
      korean: '문학은 핵심 표현을 문장으로 정리하고, 선택지 오답 근거를 반드시 적어두기',
      english: '오답 노트에 지문 핵심 문장과 근거를 반드시 정리하기',
      math: '풀이과정의 핵심 단계마다 왜 그런지 설명을 적어두기',
    }),
    [],
  )

  const feedbackGroups = React.useMemo(
    () => ({
      korean: [
        {
          dateText: '2026.02.02',
          items: [{ id: 'f-k-1', title: '풀이과정을 자세히 쓰기', subtitle: '비문학 1지문 정리' }],
        },
        {
          dateText: '2026.01.31',
          items: [
            {
              id: 'f-k-2',
              title: '핵심 표현 한 문장으로 정리하기',
              subtitle: '비문학 1지문 정리',
            },
            { id: 'f-k-3', title: '오답 근거 확실히 적기', subtitle: '문학 1지문 정리' },
          ],
        },
      ],
      english: [
        {
          dateText: '2026.02.01',
          items: [{ id: 'f-e-1', title: '어휘 정리 꼼꼼히 하기', subtitle: '1단원 단어리스트' }],
        },
      ],
      math: [
        {
          dateText: '2026.01.31',
          items: [{ id: 'f-m-1', title: '오답 풀이에 조건 적기', subtitle: '미적분 1단원 문제' }],
        },
      ],
    }),
    [],
  )

  return (
    <div className="flex w-full flex-col items-center gap-0">
      <div className="w-full px-4 pb-4 pt-[8px]">
        <FormSectionGroup className="flex flex-col gap-4">
          <SegmentedTabs
            value={activeTab}
            items={taskTabItems}
            onChange={(next) => setSearchParams({ tab: next })}
          />
          {activeTab === 'feedback' ? (
            <div className="flex flex-col gap-3">
              <PillFilterTabs
                value={activeSubject}
                items={subjectFilterItems}
                onChange={setActiveSubject}
              />
              <FeedbackSummaryCard
                title="이번주 멘토 피드백 요약"
                summary={feedbackSummary[activeSubject]}
              />
              <div className="flex flex-col gap-[10px] pt-[8px]">
                {feedbackGroups[activeSubject].map((group) => (
                  <div key={group.dateText} className="flex flex-col gap-[10px] px-[4px] pt-[12px]">
                    <TaskDateMeta
                      dateText={group.dateText}
                      badgeText={isToday(group.dateText) ? '오늘' : undefined}
                    />
                    <div className="flex w-full flex-col gap-[2px] overflow-hidden rounded-[18px]">
                      {group.items.map((item) => (
                        <FeedbackItem key={item.id} title={item.title} subtitle={item.subtitle} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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
                  {groups.map((group) => (
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
                  ))}
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
