import * as React from 'react'
import { useSearchParams } from 'react-router-dom'

import MenteeSection from '@/components/common/MenteeSection'
import FloatingActionButton from '@/components/common/FloatingActionButton'
import FeedbackItem from '@/components/common/FeedbackItem'
import FeedbackSummaryCard from '@/components/common/FeedbackSummaryCard'
import SubjectFilterTabs, {
  type SubjectFilterValue,
} from '@/components/common/SubjectFilterTabs'
import TaskDateMeta from '@/components/common/TaskDateMeta'
import TaskItem from '@/components/common/TaskItem'
import TaskTabs, { type TaskTabValue } from '@/components/common/TaskTabs'

const tabValues: TaskTabValue[] = ['assignments', 'todos', 'feedback']

function isToday(dateText: string) {
  const [year, month, day] = dateText.split('.').map((value) => Number(value))
  if (!year || !month || !day) return false
  const today = new Date()
  return (
    today.getFullYear() === year &&
    today.getMonth() + 1 === month &&
    today.getDate() === day
  )
}

function getTabValue(raw: string | null): TaskTabValue {
  if (raw && tabValues.includes(raw as TaskTabValue)) {
    return raw as TaskTabValue
  }
  return 'assignments'
}

function MenteeTasks() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = getTabValue(searchParams.get('tab'))
  const [activeSubject, setActiveSubject] = React.useState<SubjectFilterValue>('korean')

  const assignmentGroups = React.useMemo(
    () => [
      {
        dateText: '2026.02.02',
        items: [
          {
            id: 'a-1',
            title: '미적분 30문제',
            subtitle: '목표 30문제',
            subject: 'math' as const,
            subjectLabel: '수학',
            completed: true,
          },
          {
            id: 'a-2',
            title: '문학 1지문 정리',
            subtitle: '핵심 표현 5개',
            subject: 'korean' as const,
            subjectLabel: '국어',
            completed: false,
          },
        ],
      },
      {
        dateText: '2026.02.01',
        items: [
          {
            id: 'a-3',
            title: '미적분 30문제',
            subtitle: '목표 30문제',
            subject: 'math' as const,
            subjectLabel: '수학',
            completed: true,
          },
          {
            id: 'a-4',
            title: '단어 시험 공부',
            subtitle: '1단원 단어리스트',
            subject: 'english' as const,
            subjectLabel: '영어',
            completed: true,
          },
          {
            id: 'a-5',
            title: '문학 1지문 정리',
            subtitle: '핵심 표현 5개',
            subject: 'korean' as const,
            subjectLabel: '국어',
            completed: false,
          },
        ],
      },
      {
        dateText: '2026.01.31',
        items: [
          {
            id: 'a-6',
            title: '미적분 1단원 개념 정리',
            subtitle: '목표 30문제',
            subject: 'math' as const,
            subjectLabel: '수학',
            completed: true,
          },
          {
            id: 'a-7',
            title: '문학 1지문 정리',
            subtitle: '핵심 표현 5개',
            subject: 'korean' as const,
            subjectLabel: '국어',
            completed: true,
          },
        ],
      },
    ],
    [],
  )

  const todoGroups = React.useMemo(
    () => [
      {
        dateText: '2026.02.02',
        items: [
          {
            id: 't-1',
            title: '단어 시험공부',
            subtitle: '1단원 단어리스트',
            subject: 'english' as const,
            subjectLabel: '영어',
            completed: false,
          },
        ],
      },
      {
        dateText: '2026.02.01',
        items: [
          {
            id: 't-2',
            title: '문학 1지문 정리',
            subtitle: '핵심 표현 5개',
            subject: 'korean' as const,
            subjectLabel: '국어',
            completed: false,
          },
        ],
      },
    ],
    [],
  )

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
          items: [
            { id: 'f-k-1', title: '풀이과정을 자세히 쓰기', subtitle: '비문학 1지문 정리' },
          ],
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
          items: [
            { id: 'f-e-1', title: '어휘 정리 꼼꼼히 하기', subtitle: '1단원 단어리스트' },
          ],
        },
      ],
      math: [
        {
          dateText: '2026.01.31',
          items: [
            { id: 'f-m-1', title: '오답 풀이에 조건 적기', subtitle: '미적분 1단원 문제' },
          ],
        },
      ],
    }),
    [],
  )

  return (
    <div className="flex w-full flex-col items-center gap-0">
      <div className="w-full px-4 pb-4 pt-2">
        <MenteeSection className="flex flex-col gap-4">
          <TaskTabs
            value={activeTab}
            onChange={(next) => setSearchParams({ tab: next })}
          />
          {activeTab === 'feedback' ? (
            <div className="flex flex-col gap-4">
              <SubjectFilterTabs value={activeSubject} onChange={setActiveSubject} />
              <FeedbackSummaryCard
                title="이번주 멘토 피드백 요약"
                summary={feedbackSummary[activeSubject]}
              />
              <div className="flex flex-col gap-[10px] pt-[10px]">
                {feedbackGroups[activeSubject].map((group) => (
                  <div
                    key={group.dateText}
                    className="flex flex-col gap-[10px] px-[4px] pt-[16px]"
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
            </div>
          ) : (
            <div className="flex flex-col gap-6">
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
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </MenteeSection>
      </div>
      {activeTab === 'todos' ? (
        <FloatingActionButton label="할 일 추가" />
      ) : null}
    </div>
  )
}

export default MenteeTasks
