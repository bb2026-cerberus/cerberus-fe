import { useMemo, useState } from 'react'

import ChecklistGroup from '@/components/common/ChecklistGroup'
import ChecklistItem from '@/components/common/ChecklistItem'
import FormSelectInput from '@/components/common/FormSelectInput'
import MentorFeedbackDetailPanel, {
  type FeedbackTaskInfo,
} from '@/components/common/MentorFeedbackDetailPanel'
import MentorTwoColumnLayout from '@/components/common/MentorTwoColumnLayout'
import SegmentedTabs from '@/components/common/SegmentedTabs'
import SubjectChip from '@/components/common/SubjectChip'
import TaskDateMeta from '@/components/common/TaskDateMeta'
import TempSavePanel from '@/components/common/TempSavePanel'
import { Text } from '@/components/common/Text'
import WeekSelector from '@/components/common/WeekSelector'
import MentorActionButtons from '@/components/common/MentorActionButtons'
import { cn } from '@/lib/utils'

type FeedbackTask = FeedbackTaskInfo & {
  id: string
}

type FeedbackTaskGroup = {
  name: string
  tasks: FeedbackTask[]
}

type FeedbackTaskDate = {
  date: string
  isToday?: boolean
  groups: FeedbackTaskGroup[]
}

type FeedbackTab = 'assignments' | 'todos'

function MentorFeedback() {
  const selectedItemClass =
    "relative overflow-hidden border border-figma-point-color-2/30 bg-figma-card-gray before:absolute before:left-0 before:top-0 before:h-full before:w-[4px] before:bg-figma-point-color-2 before:rounded-l-[18px] before:content-['']"
  const [activeTab, setActiveTab] = useState<FeedbackTab>('assignments')
  const [filter, setFilter] = useState<string>('전체')
  const weekLabel = '2026년 2월 1주차'
  const [tempSaveOpen, setTempSaveOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)

  const [selectedTask, setSelectedTask] = useState<FeedbackTask>({
    id: 't-2',
    title: '미적분 1단원 개념 정리',
    subtitle: '목표 30문제',
    subjectLabel: '수학',
    subject: 'math',
  })

  const [feedback, setFeedback] = useState('')
  const [summary, setSummary] = useState('')
  const [overall, setOverall] = useState('')

  const taskDates = useMemo<FeedbackTaskDate[]>(
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
        ],
      },
      {
        date: '2026.02.01',
        groups: [
          {
            name: '김수험',
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
    ],
    [],
  )

  const tempSaveItems = useMemo(
    () => [
      { title: '문학 요약 피드백', dateText: '2026.02.02' },
      { title: '미적분 개념 피드백', dateText: '2026.02.01' },
    ],
    [],
  )

  const handleTaskSelect = (task: FeedbackTask) => {
    setSelectedTask(task)
    setDetailOpen(true)
  }

  const handleTempSaveToggle = () => {
    setTempSaveOpen((prev) => !prev)
  }

  const handleTempSave = () => {
    setTempSaveOpen(false)
  }

  const handleSubmit = () => {
    setFeedback('')
    setSummary('')
    setOverall('')
  }

  return (
    <div className="relative flex w-full flex-col gap-[25px] pb-[80px]">
      <MentorTwoColumnLayout
        mobileDetailOpen={detailOpen}
        onMobileDetailClose={() => setDetailOpen(false)}
        mobileDetailTitle="피드백"
        mobileActionBar={
          <MentorActionButtons
            mode="create"
            onPrimary={handleSubmit}
            onSecondary={handleTempSave}
            useTempSaveButton
            tempSaveCount={tempSaveItems.length}
            onTempSaveListOpen={handleTempSaveToggle}
            primaryLabel="등록"
            secondaryLabel="임시저장"
            size="mobile"
            className="w-full gap-[8px]"
            primaryButtonClassName="w-full"
            secondaryButtonClassName="w-full"
            tempSaveClassName="w-full h-[var(--mentor-action-button-height-mobile)]"
          />
        }
        left={
          <section className="flex flex-col gap-[25px]">
            <div className="flex items-center">
              <Text
                as="h1"
                className="text-[34px] font-bold leading-tight text-figma-typo-black"
              >
                피드백
              </Text>
            </div>

            <SegmentedTabs
              value={activeTab}
              items={[
                { label: '과제', value: 'assignments' },
                { label: '할 일', value: 'todos' },
              ]}
              onChange={setActiveTab}
              className="h-[71px] rounded-[18px] bg-figma-white p-[8px]"
              buttonClassName="rounded-[10px] text-[20px] font-semibold leading-6"
              activeClassName="bg-figma-point-color-2 text-white"
              inactiveClassName="text-figma-typo-gray"
            />

            <div className="flex w-full flex-col gap-[15px]">
              <WeekSelector
                label={weekLabel}
                buttonClassName="size-[32px] rounded-[9px] bg-figma-card-gray"
                labelClassName="rounded-[6px] bg-figma-card-gray px-2 py-1"
                labelTextClassName="text-[14px] font-semibold leading-6 text-figma-typo-gray-b"
              />
              <FormSelectInput
                value={filter}
                onChange={setFilter}
                options={['전체', '김수험']}
                size="lg"
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
                    <div key={group.name} className="flex flex-col gap-[10px]">
                      <div>
                        <SubjectChip label={group.name} tone="muted" />
                        <ChecklistGroup>
                          {group.tasks.map((task) => (
                            <button
                              key={`${group.name}-${task.title}`}
                              type="button"
                              onClick={() => handleTaskSelect(task)}
                              className="text-left"
                            >
                              <ChecklistItem
                                title={task.title}
                                subtitle={task.subtitle}
                                subjectLabel={task.subjectLabel}
                                subject={task.subject}
                                className={cn(
                                  'h-[100px] px-[24px]',
                                  selectedTask.id === task.id && selectedItemClass,
                                )}
                              />
                            </button>
                          ))}
                        </ChecklistGroup>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        }
        right={
          <MentorFeedbackDetailPanel
            title="피드백 작성"
            task={selectedTask}
            studyImageUrl="/pwa-512.png"
            feedback={feedback}
            onFeedbackChange={setFeedback}
            summary={summary}
            onSummaryChange={setSummary}
            overall={overall}
            onOverallChange={setOverall}
            onSubmit={handleSubmit}
            onTempSave={handleTempSave}
            tempSaveCount={tempSaveItems.length}
            onTempSaveListOpen={handleTempSaveToggle}
          />
        }
      />

      <TempSavePanel
        open={tempSaveOpen}
        items={tempSaveItems}
        onClose={() => setTempSaveOpen(false)}
      />
    </div>
  )
}

export default MentorFeedback
