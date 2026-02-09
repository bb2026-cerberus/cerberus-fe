import { useMemo, useState } from 'react'

import ActionButton from '@/components/common/ActionButton'
import ChecklistGroup from '@/components/common/ChecklistGroup'
import ChecklistItem from '@/components/common/ChecklistItem'
import DatePickerInput from '@/components/common/DatePickerInput'
import FloatingActionButton from '@/components/common/FloatingActionButton'
import FormSelectInput from '@/components/common/FormSelectInput'
import FormTextInput from '@/components/common/FormTextInput'
import SubjectChip from '@/components/common/SubjectChip'
import TaskDateMeta from '@/components/common/TaskDateMeta'
import { Text } from '@/components/common/Text'
import UploadBox from '@/components/common/UploadBox'
import WeekSelector from '@/components/common/WeekSelector'

type MentorTask = {
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

function MentorTasks() {
  const [filter, setFilter] = useState<string>('전체')
  const weekLabel = '2026년 2월 1주차'
  const [selectedMentee, setSelectedMentee] = useState<string>('김수험')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date('2026-02-02'),
  )
  const [selectedSubject, setSelectedSubject] = useState<'국어' | '영어' | '수학'>('국어')

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
                title: '문학 1지문 정리',
                subtitle: '핵심 표현 5개',
                subjectLabel: '국어',
                subject: 'korean',
              },
              {
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
                title: '문학 1지문 정리',
                subtitle: '핵심 표현 5개',
                subjectLabel: '국어',
                subject: 'korean',
              },
              {
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
                title: '문학 1지문 정리',
                subtitle: '핵심 표현 5개',
                subjectLabel: '국어',
                subject: 'korean',
              },
              {
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
                title: '문학 1지문 정리',
                subtitle: '핵심 표현 5개',
                subjectLabel: '국어',
                subject: 'korean',
              },
              {
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

  return (
    <div className="relative flex w-full flex-col gap-[25px] pb-[80px]">
      <div className="grid gap-[30px] xl:grid-cols-[800px_810px]">
        <section className="flex flex-col gap-[25px]">
          <div className="flex items-center">
            <Text
              as="h1"
              className="text-[34px] font-bold leading-[1.25] text-figma-typo-black"
            >
              과제
            </Text>
          </div>

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
              options={['전체', '김수험', '박모의']}
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
                          <ChecklistItem
                            key={`${group.name}-${task.title}`}
                            title={task.title}
                            subtitle={task.subtitle}
                            subjectLabel={task.subjectLabel}
                            subject={task.subject}
                            className="h-[100px] px-[24px]"
                          />
                        ))}
                      </ChecklistGroup>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-[20px] pt-[44px] xl:pt-[69px]">
          <div className="flex items-center justify-between">
            <Text as="h2" className="text-[22px] font-semibold leading-6 text-figma-typo-black">
              과제 등록
            </Text>
            <div className="flex items-center gap-[8px]">
              <ActionButton
                label="임시저장"
                variant="secondary"
                className="h-[44px] w-[96px] rounded-[12px] text-[18px]"
              />
              <ActionButton
                label="등록"
                className="h-[44px] w-[96px] rounded-[12px] text-[18px]"
              />
            </div>
          </div>

          <FormSelectInput
            value={selectedMentee}
            onChange={setSelectedMentee}
            options={['김수험', '박모의']}
            placeholder="멘티 선택"
            size="lg"
          />

          <div className="flex flex-col gap-[10px]">
            <Text as="p" className="text-[20px] font-medium leading-[1.2] text-figma-typo-black">
              날짜 선택
            </Text>
            <DatePickerInput
              value={selectedDate}
              onChange={setSelectedDate}
              size="lg"
            />
          </div>

          <div className="flex flex-col gap-[10px]">
            <Text as="p" className="text-[20px] font-medium leading-[1.2] text-figma-typo-black">
              과목
            </Text>
            <div className="grid w-full grid-cols-3 gap-[10px]">
              {(['국어', '영어', '수학'] as const).map((subject) => {
                const isActive = selectedSubject === subject
                return (
                  <button
                    key={subject}
                    type="button"
                    onClick={() => setSelectedSubject(subject)}
                    className={`h-[60px] rounded-[16px] px-[18px] text-[17px] font-semibold leading-6 transition-colors ${isActive
                      ? 'bg-figma-sub-color-1 text-white'
                      : 'bg-figma-white text-figma-typo-gray hover:bg-figma-card-gray'
                      }`}
                  >
                    {subject}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <Text as="p" className="text-[20px] font-medium leading-[1.2] text-figma-typo-black">
              정보
            </Text>
            <FormTextInput
              placeholder="제목"
              size="lg"
            />
            <FormTextInput
              placeholder="설명"
              size="lg"
            />
            <FormSelectInput
              value="솔루션 방안"
              onChange={() => {}}
              options={['솔루션 방안']}
              size="lg"
            />
          </div>

          <div className="flex flex-col gap-[8px]">
            <Text as="p" className="text-[20px] font-medium leading-[1.2] text-figma-typo-black">
              학습지 등록
            </Text>
            <FormTextInput
              placeholder="| 학습지를 작성해주세요"
              size="lg"
            />
            <UploadBox
              label="파일을 선택하거나 여기로 끌어다 놓으세요"
              size="lg"
            />
          </div>
        </section>
      </div >

      <FloatingActionButton
        label="과제 추가"
        positionClassName="fixed bottom-[48px] right-[24px] z-30"
        className="h-[57px] px-[16px]"
      />
    </div >
  )
}

export default MentorTasks
