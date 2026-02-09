import { useMemo, useState } from 'react'

import ChecklistGroup from '@/components/common/ChecklistGroup'
import ChecklistItem from '@/components/common/ChecklistItem'
import MentorMenteeProgressCard from '@/components/common/MentorMenteeProgressCard'
import MentorQnaCard from '@/components/common/MentorQnaCard'
import SectionLinkHeader from '@/components/common/SectionLinkHeader'
import { Text } from '@/components/common/Text'
import { Calendar } from '@/components/ui/calendar'
import { CalendarToggle } from '@/components/ui/calendar-toggle'

type MentorQnaItem = {
  name: string
  question: string
}

type MentorProgressItem = {
  name: string
  submitted: number
  total: number
  pendingLabel: string
}

function MentorHome() {
  const today = useMemo(() => new Date(), [])
  const [selected, setSelected] = useState<Date | undefined>(today)
  const [viewMode, setViewMode] = useState<'month' | 'week'>('week')

  const assignments = useMemo(
    () => [
      {
        title: '문학 1지문 정리',
        subtitle: '핵심 표현 5개',
        subjectLabel: '국어',
        subject: 'korean' as const,
        completed: false,
      },
      {
        title: '미적분 1단원 개념 정리',
        subtitle: '목표 30문제',
        subjectLabel: '수학',
        subject: 'math' as const,
        completed: false,
      },
      {
        title: '미적분 30문제',
        subtitle: '목표 30문제',
        subjectLabel: '수학',
        subject: 'neutral' as const,
        completed: true,
      },
    ],
    [],
  )

  const feedbacks = useMemo(
    () => [
      {
        title: '미적분 30문제',
        subtitle: '목표 30문제',
        subjectLabel: '수학',
        subject: 'math' as const,
        completed: false,
      },
      {
        title: '문학 1지문 정리',
        subtitle: '핵심 표현 5개',
        subjectLabel: '국어',
        subject: 'korean' as const,
        completed: false,
      },
    ],
    [],
  )

  const qnaItems = useMemo<MentorQnaItem[]>(
    () => [
      {
        name: '김수험',
        question: '수학 모의고사 시간 분배를 어떻게 해야할 지 모르겠어요',
      },
      {
        name: '박모의',
        question: '영어 단어 외우기가 힘들어요. 쉽게 외우는 노하우를 알려주세요.',
      },
    ],
    [],
  )

  const menteeProgress = useMemo<MentorProgressItem[]>(
    () => [
      {
        name: '김수험',
        submitted: 2,
        total: 3,
        pendingLabel: '미제출 : 영어 지문 2개 요약',
      },
      {
        name: '박모의',
        submitted: 1,
        total: 3,
        pendingLabel: '미제출 : 영어 지문 2개 요약, 미적분 30문제',
      },
    ],
    [],
  )

  return (
    <div className="flex flex-col gap-[35px]">
      <div className="grid gap-[30px] xl:grid-cols-2">
        <section className="flex flex-col gap-[35px]">
          <div className="hidden items-center lg:flex">
            <Text
              as="h1"
              className="text-[28px] font-bold leading-[1.3] text-figma-typo-black"
            >
              오늘의 학습 점검을 시작해볼까요?
            </Text>
          </div>

          <div className="flex flex-col gap-[12px]">
            <div className="rounded-[20px] bg-figma-white px-[30px] pb-[36px] pt-[18px]">
              <Calendar
                mode="single"
                viewMode={viewMode}
                selected={selected}
                onSelect={setSelected}
                defaultMonth={today}
                className="pb-[10px]"
                navButtonClassName="text-figma-typo-black"
                navButtonStyle={{ backgroundColor: 'transparent' }}
              />
            </div>

            <CalendarToggle
              label={viewMode === 'week' ? '캘린더 펼치기' : '캘린더 접기'}
              isExpanded={viewMode === 'month'}
              onClick={() => setViewMode((prev) => (prev === 'week' ? 'month' : 'week'))}
              className="justify-end text-figma-typo-gray"
            />
          </div>

          <div className="flex flex-col gap-[20px]">
            <SectionLinkHeader title="과제" size="sm" />
            <ChecklistGroup>
              {assignments.map((item) => (
                <ChecklistItem
                  key={item.title}
                  title={item.title}
                  subtitle={item.subtitle}
                  subjectLabel={item.subjectLabel}
                  subject={item.subject}
                  completed={item.completed}
                  className="h-[84px] px-[20px]"
                />
              ))}
            </ChecklistGroup>
          </div>

          <div className="flex flex-col gap-[20px]">
            <SectionLinkHeader title="피드백" size="sm" />
            <ChecklistGroup>
              {feedbacks.map((item) => (
                <ChecklistItem
                  key={item.title}
                  title={item.title}
                  subtitle={item.subtitle}
                  subjectLabel={item.subjectLabel}
                  subject={item.subject}
                  completed={item.completed}
                  className="h-[84px] px-[20px]"
                />
              ))}
            </ChecklistGroup>
          </div>
        </section>

        <section className="flex flex-col gap-[32px] pt-[34px]">
          <div className="flex flex-col gap-[24px]">
            <SectionLinkHeader title="Q&A" size="sm" />
            <div className="flex flex-col gap-[10px]">
              {qnaItems.map((item) => (
                <MentorQnaCard key={item.name} name={item.name} question={item.question} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-[24px]">
            <SectionLinkHeader title="멘티 관리" size="sm" />
            <div className="flex flex-col gap-[14px]">
              {menteeProgress.map((item) => (
                <MentorMenteeProgressCard
                  key={item.name}
                  name={item.name}
                  submitted={item.submitted}
                  total={item.total}
                  pendingLabel={item.pendingLabel}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default MentorHome
