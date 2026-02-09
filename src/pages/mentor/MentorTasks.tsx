import { useMemo, useState } from 'react'
import { startOfWeek } from 'date-fns'

import ChecklistGroup from '@/components/common/ChecklistGroup'
import ChecklistItem from '@/components/common/ChecklistItem'
import DeleteConfirmModal from '@/components/common/DeleteConfirmModal'
import FloatingActionButton from '@/components/common/FloatingActionButton'
import FormSelectInput from '@/components/common/FormSelectInput'
import MentorTaskDetailPanel from '@/components/common/MentorTaskDetailPanel'
import MentorTwoColumnLayout from '@/components/common/MentorTwoColumnLayout'
import SubjectChip from '@/components/common/SubjectChip'
import TaskDateMeta from '@/components/common/TaskDateMeta'
import TempSavePanel from '@/components/common/TempSavePanel'
import { Text } from '@/components/common/Text'
import WeekSelector from '@/components/common/WeekSelector'
import MentorActionButtons from '@/components/common/MentorActionButtons'
import { cn } from '@/lib/utils'

type MentorTask = {
  id: string
  title: string
  subtitle: string
  subjectLabel: string
  subject: 'korean' | 'math' | 'english' | 'neutral'
}

type MentorTaskGroup = {
  name: string
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
  const [filter, setFilter] = useState<string>('전체')
  const [weekStart, setWeekStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 }),
  )
  const [detailMode, setDetailMode] = useState<DetailMode>('create')
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [tempSaveOpen, setTempSaveOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const [selectedMentee, setSelectedMentee] = useState<string>('김수험')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date('2026-02-02'),
  )
  const [selectedSubject, setSelectedSubject] = useState<'국어' | '영어' | '수학'>('국어')
  const [taskTitle, setTaskTitle] = useState('문학 1지문 정리')
  const [taskDescription, setTaskDescription] = useState('핵심 표현 5개')
  const [taskSolution, setTaskSolution] = useState('솔루션 방안')
  const [worksheetText, setWorksheetText] = useState('| 학습지를 작성해주세요')

  const taskDates = useMemo<MentorTaskDate[]>(
    () => [
      {
        date: '2026.02.02',
        isToday: true,
        groups: [
          {
            name: '김수험',
            tasks: [
              {
                id: 't-1',
                title: '문학 1지문 정리',
                subtitle: '핵심 표현 5개',
                subjectLabel: '국어',
                subject: 'korean',
              },
              {
                id: 't-2',
                title: '미적분 1단원 개념 정리',
                subtitle: '목표 30문제',
                subjectLabel: '수학',
                subject: 'math',
              },
            ],
          },
          {
            name: '박모의',
            tasks: [
              {
                id: 't-3',
                title: '문학 1지문 정리',
                subtitle: '핵심 표현 5개',
                subjectLabel: '국어',
                subject: 'korean',
              },
              {
                id: 't-4',
                title: '미적분 1단원 개념 정리',
                subtitle: '목표 30문제',
                subjectLabel: '수학',
                subject: 'math',
              },
            ],
          },
        ],
      },
      {
        date: '2026.02.01',
        groups: [
          {
            name: '김수험',
            tasks: [
              {
                id: 't-5',
                title: '문학 1지문 정리',
                subtitle: '핵심 표현 5개',
                subjectLabel: '국어',
                subject: 'korean',
              },
              {
                id: 't-6',
                title: '미적분 1단원 개념 정리',
                subtitle: '목표 30문제',
                subjectLabel: '수학',
                subject: 'math',
              },
            ],
          },
          {
            name: '박모의',
            tasks: [
              {
                id: 't-7',
                title: '문학 1지문 정리',
                subtitle: '핵심 표현 5개',
                subjectLabel: '국어',
                subject: 'korean',
              },
              {
                id: 't-8',
                title: '미적분 1단원 개념 정리',
                subtitle: '목표 30문제',
                subjectLabel: '수학',
                subject: 'math',
              },
            ],
          },
        ],
      },
    ],
    [],
  )

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
    setDetailOpen(true)
    setSelectedMentee(mentee)
    setSelectedSubject(
      task.subjectLabel === '수학' ? '수학' : task.subjectLabel === '영어' ? '영어' : '국어',
    )
    setTaskTitle(task.title)
    setTaskDescription(task.subtitle)
    setSelectedDate(new Date('2026-02-02'))
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
    setSelectedMentee('김수험')
    setSelectedDate(new Date('2026-02-02'))
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
          <MentorActionButtons
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
                options={['전체', '김수험', '박모의']}
                size="md"
              />
            </div>

            <div className="flex w-full max-w-[800px] flex-col gap-[20px]">
              {taskDates.map((dateBlock) => (
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
                            key={`${group.name}-${task.title}`}
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
              ))}
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
