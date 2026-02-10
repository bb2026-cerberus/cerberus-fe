import { useEffect, useMemo, useState } from 'react'
import { format, isToday, startOfWeek } from 'date-fns'

import ChecklistGroup from '@/components/common/ChecklistGroup'
import ChecklistItem from '@/components/common/ChecklistItem'
import DeleteConfirmModal from '@/components/common/DeleteConfirmModal'
import FloatingActionButton from '@/components/common/FloatingActionButton'
import FormSelectInput from '@/components/common/FormSelectInput'
import MentorTaskDetailPanel from '@/components/common/MentorTaskDetailPanel'
import MentorTwoColumnLayout from '@/components/layout/MentorTwoColumnLayout'
import SubjectChip from '@/components/common/SubjectChip'
import TaskDateMeta from '@/components/common/TaskDateMeta'
import TempSavePanel from '@/components/common/TempSavePanel'
import { Text } from '@/components/common/Text'
import WeekSelector from '@/components/common/WeekSelector'
import ActionButtons from '@/components/common/ActionButtons'
import { cn } from '@/lib/utils'
import useApiRequest from '@/hooks/useApiRequest'
import useAuth from '@/store/auth/useAuth'
import mypageApi from '@/services/api/mypage'
import todosApi from '@/services/api/todos'
import { toDateText } from '@/lib/date'
import { Skeleton } from '@/components/ui/skeleton'

type MentorTask = {
  id: string
  title: string
  subtitle: string
  subjectLabel: string
  subject: 'korean' | 'math' | 'english' | 'neutral'
  menteeId?: number
  menteeName?: string
}

type MentorTaskGroup = {
  name: string
  menteeId?: number
  tasks: MentorTask[]
}

type MentorTaskDate = {
  date: string
  isToday?: boolean
  groups: MentorTaskGroup[]
}

type DetailMode = 'create' | 'detail' | 'edit'

function MentorTasks() {
  const selectedItemClass =
    "relative overflow-hidden border border-figma-point-color-2/30 bg-figma-card-gray before:absolute before:left-0 before:top-0 before:h-full before:w-[4px] before:bg-figma-point-color-2 before:rounded-l-[18px] before:content-['']"
  const { userId: mentorId } = useAuth()
  const { run: runApi } = useApiRequest()
  const { run: runTasks, loading: tasksLoading } = useApiRequest()

  const [filter, setFilter] = useState<string>('전체')
  const [mentees, setMentees] = useState<{ id: number; name: string }[]>([])
  const [weekStart, setWeekStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 }),
  )
  const [taskDates, setTaskDates] = useState<MentorTaskDate[]>([])

  const [detailMode, setDetailMode] = useState<DetailMode>('create')
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [tempSaveOpen, setTempSaveOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const [selectedMenteeId, setSelectedMenteeId] = useState<number | null>(null)
  const [selectedMentee, setSelectedMentee] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedSubject, setSelectedSubject] = useState<'국어' | '영어' | '수학'>('국어')
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskSolution, setTaskSolution] = useState('')
  const [worksheetText, setWorksheetText] = useState('')

  useEffect(() => {
    if (!mentorId) return
    runApi(() => mypageApi.getMentorHomeData({ mentorId }, { date: format(new Date(), 'yyyy-MM-dd') }), {
      onSuccess: (data) => {
        const menteeList = data.data?.menteeManagement?.map(m => ({
          id: m.menteeId!,
          name: m.menteeName!
        })) || []
        setMentees(menteeList)
        if (menteeList.length > 0 && !selectedMenteeId) {
          setSelectedMenteeId(menteeList[0].id)
          setSelectedMentee(menteeList[0].name)
        }
      }
    })
  }, [mentorId, runApi, selectedMenteeId])

  useEffect(() => {
    if (mentees.length === 0) return

    const selectedMenteeIds = filter === '전체' 
      ? mentees.map(m => m.id)
      : [mentees.find(m => m.name === filter)?.id].filter(id => id !== undefined) as number[]

    if (selectedMenteeIds.length === 0) return

    runTasks(() => todosApi.getTodosWeekly({
      menteeId: selectedMenteeIds,
      mondayDate: format(weekStart, 'yyyy-MM-dd')
    }), {
      onSuccess: (data) => {
        if (!data.data) return

        const mapped: MentorTaskDate[] = data.data.map(group => {
          // 멘티별로 다시 그룹화
          const menteeGroups: Record<string, { id: number, tasks: MentorTask[] }> = {}
          group.todos?.forEach(todo => {
            const mName = todo.menteeName || '알 수 없음'
            const mId = todo.menteeId || 0
            if (!menteeGroups[mName]) {
              menteeGroups[mName] = { id: mId, tasks: [] }
            }
            menteeGroups[mName].tasks.push({
              id: String(todo.todoId),
              title: todo.title || '',
              subtitle: todo.solution || '',
              subjectLabel: todo.subject || '',
              subject: (todo.subject === '수학' ? 'math' : todo.subject === '영어' ? 'english' : todo.subject === '국어' ? 'korean' : 'neutral') as any,
              menteeId: mId,
              menteeName: mName
            })
          })

          return {
            date: toDateText(group.date),
            isToday: group.date ? isToday(new Date(group.date)) : false,
            groups: Object.entries(menteeGroups).map(([name, gData]) => ({
              name,
              menteeId: gData.id,
              tasks: gData.tasks
            }))
          }
        })
        setTaskDates(mapped)
      }
    })
  }, [weekStart, filter, mentees, runTasks])

  const tempSaveItems = useMemo(
    () => [
      { title: '단어 시험 공부', dateText: '2026.02.02' },
      { title: '지문 암기', dateText: '2026.02.01' },
    ],
    [],
  )

  const handleTaskSelect = (task: MentorTask, mentee: string) => {
    setSelectedTaskId(task.id)
    setDetailMode('detail')
    
    runTasks(() => todosApi.getTodoDetail({ todoId: Number(task.id) }), {
      useOverlay: true,
      overlayMessage: '과제 상세 정보를 불러오는 중...',
      onSuccess: (data) => {
        if (!data.data) return
        const detail = data.data
        setDetailOpen(true)
        setSelectedMentee(mentee)
        setSelectedMenteeId(task.menteeId || null)
        setSelectedSubject(
          detail.subject === '수학' ? '수학' : detail.subject === '영어' ? '영어' : '국어',
        )
        setTaskTitle(detail.title || '')
        setTaskDescription(detail.content || '')
        setTaskSolution(detail.solution || '')
        setSelectedDate(detail.date ? new Date(detail.date) : new Date())
        setWorksheetText(detail.solution || '') // 예시로 solution을 worksheetText에 넣음 (비즈니스 로직에 따라 수정 가능)
      }
    })
  }

  const handleDelete = () => {
    setSelectedTaskId(null)
    setDetailMode('create')
  }

  const handleEdit = () => {
    setDetailMode('edit')
  }

  const handleCancelEdit = () => {
    setDetailMode('detail')
  }

  const handleSave = () => {
    setDetailMode('detail')
  }

  const handleCreate = () => {
    setSelectedTaskId(null)
    setDetailMode('create')
    setDetailOpen(true)

    const defaultMentee = filter === '전체' ? mentees[0] : mentees.find(m => m.name === filter)
    if (defaultMentee) {
      setSelectedMentee(defaultMentee.name)
      setSelectedMenteeId(defaultMentee.id)
    }

    setSelectedDate(new Date())
    setSelectedSubject('국어')
    setTaskTitle('')
    setTaskDescription('')
    setTaskSolution('솔루션 방안')
    setWorksheetText('| 학습지를 작성해주세요')
  }

  const handleTempSaveToggle = () => {
    setTempSaveOpen((prev) => !prev)
  }

  const handleTempSave = () => {
    setTempSaveOpen(false)
  }

  return (
    <div className="relative flex w-full flex-col gap-[25px] pb-[80px]">
      <MentorTwoColumnLayout
        mobileDetailOpen={detailOpen}
        onMobileDetailClose={() => setDetailOpen(false)}
        mobileDetailTitle="과제"
        mobileActionBar={
          <ActionButtons
            mode={detailMode}
            onPrimary={detailMode === 'detail' ? handleEdit : handleSave}
            onSecondary={
              detailMode === 'create'
                ? handleTempSave
                : detailMode === 'detail'
                  ? () => setDeleteOpen(true)
                  : handleCancelEdit
            }
            useTempSaveButton={detailMode === 'create'}
            tempSaveCount={tempSaveItems.length}
            onTempSaveListOpen={handleTempSaveToggle}
            primaryLabel={detailMode === 'detail' ? '수정' : '등록'}
            secondaryLabel={detailMode === 'detail' ? '삭제' : detailMode === 'edit' ? '취소' : '임시저장'}
            size="mobile"
            className="w-full gap-[8px]"
            primaryButtonClassName="w-full"
            secondaryButtonClassName="w-full"
            tempSaveClassName="w-full h-[var(--mentor-action-button-height-mobile)]"
          />
        }
        left={
          <section className="flex flex-col gap-[25px]">
            <div className="hidden items-center lg:flex">
              <Text
                as="h1"
                className="text-[28px] font-bold leading-[1.3] text-figma-typo-black"
              >
                과제
              </Text>
            </div>

            <div className="flex w-full flex-col gap-[15px]">
              <WeekSelector
                value={weekStart}
                onChange={setWeekStart}
                buttonClassName="size-[32px] rounded-[9px] bg-figma-card-gray"
                labelClassName="rounded-[6px] bg-figma-card-gray px-2 py-1"
                labelTextClassName="text-[14px] font-semibold leading-6 text-figma-typo-gray-b"
              />
              <FormSelectInput
                value={filter}
                onChange={setFilter}
                options={['전체', ...mentees.map(m => m.name)]}
              />
            </div>

            <div className="flex w-full max-w-[800px] flex-col gap-[20px]">
              {tasksLoading ? (
                <div className="flex flex-col gap-[20px]">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex flex-col gap-[10px]">
                      <Skeleton className="h-[24px] w-[100px]" />
                      <Skeleton className="h-[84px] w-full rounded-[18px]" />
                    </div>
                  ))}
                </div>
              ) : taskDates.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-[40px]">
                  <Text className="text-figma-typo-gray">해당 기간에 등록된 과제가 없습니다.</Text>
                </div>
              ) : (
                taskDates.map((dateBlock) => (
                  <div key={dateBlock.date} className="flex flex-col gap-[10px]">
                    <TaskDateMeta
                      dateText={dateBlock.date}
                      badgeText={dateBlock.isToday ? '오늘' : undefined}
                      dateClassName="text-[14px] font-semibold leading-6 text-figma-typo-gray-b"
                      badgeClassName="text-[14px] font-semibold leading-6"
                    />

                    {dateBlock.groups.map((group) => (
                      <div key={group.name} className="flex w-full flex-col items-start gap-[10px]">
                        <SubjectChip label={group.name} tone="muted" />
                        <ChecklistGroup className="w-full">
                          {group.tasks.map((task) => (
                            <button
                              key={`${group.name}-${task.id}`}
                              type="button"
                              onClick={() => handleTaskSelect(task, group.name)}
                              className="text-left"
                            >
                              <ChecklistItem
                                title={task.title}
                                subtitle={task.subtitle}
                                subjectLabel={task.subjectLabel}
                                subject={task.subject}
                                className={cn(
                                  'h-[84px] px-[20px]',
                                  selectedTaskId === task.id && selectedItemClass,
                                )}
                              />
                            </button>
                          ))}
                        </ChecklistGroup>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </section>
        }
        right={
          <MentorTaskDetailPanel
            title="과제 등록"
            mode={detailMode}
            mentee={selectedMentee}
            onMenteeChange={setSelectedMentee}
            date={selectedDate}
            onDateChange={setSelectedDate}
            subject={selectedSubject}
            onSubjectChange={setSelectedSubject}
            taskTitle={taskTitle}
            onTitleChange={setTaskTitle}
            description={taskDescription}
            onDescriptionChange={setTaskDescription}
            solution={taskSolution}
            onSolutionChange={setTaskSolution}
            worksheetText={worksheetText}
            onWorksheetTextChange={setWorksheetText}
            onPrimary={detailMode === 'detail' ? handleEdit : handleSave}
            onSecondary={
              detailMode === 'create'
                ? handleTempSave
                : detailMode === 'detail'
                  ? () => setDeleteOpen(true)
                  : handleCancelEdit
            }
            tempSaveCount={tempSaveItems.length}
            onTempSaveClick={handleTempSaveToggle}
            readOnly={detailMode === 'detail'}
          />
        }
      />

      <FloatingActionButton
        label="과제 추가"
        positionClassName="fixed bottom-[48px] right-[24px] z-30"
        className="h-[57px] px-[16px]"
        onClick={handleCreate}
      />

      <TempSavePanel
        open={tempSaveOpen}
        items={tempSaveItems}
        onClose={() => setTempSaveOpen(false)}
      />

      <DeleteConfirmModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="과제를 삭제하시겠습니까?"
        description={['해당 과제와 내용이 함께 삭제됩니다.', '삭제된 내용은 복구할 수 없습니다.']}
        onConfirm={handleDelete}
      />
    </div>
  )
}

export default MentorTasks
