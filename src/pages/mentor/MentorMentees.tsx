import { useMemo, useState } from 'react'

import MentorCommentCard from '@/components/common/MentorCommentCard'
import MentorMenteeListItem from '@/components/common/MentorMenteeListItem'
import MentorMenteeProgressCard from '@/components/common/MentorMenteeProgressCard'
import MentorTwoColumnLayout from '@/components/common/MentorTwoColumnLayout'
import StatCard from '@/components/common/StatCard'
import SubjectStatCard from '@/components/common/SubjectStatCard'
import { Text } from '@/components/common/Text'
import { cn } from '@/lib/utils'

type MentorMenteeSummary = {
  id: string
  name: string
  subtitle: string
  avatarUrl?: string
  submitted: number
  total: number
  pendingLabel: string
  mentorRate: string
  todoRate: string
  subjectRates: {
    label: string
    subject: 'korean' | 'english' | 'math'
    value: string
  }[]
  feedbackSummary: string
}

function MentorMentees() {
  const selectedItemClass =
    "relative overflow-hidden border border-figma-point-color-2/30 bg-figma-card-gray before:absolute before:left-0 before:top-0 before:h-full before:w-[4px] before:bg-figma-point-color-2 before:rounded-l-[18px] before:content-['']"
  const mentees = useMemo<MentorMenteeSummary[]>(
    () => [
      {
        id: 'm-1',
        name: '김수험',
        subtitle: '최근 제출: 2/3 · 오늘 3건',
        avatarUrl: 'http://localhost:3845/assets/b1a0de0961a1c4b537a0bfd6c2ca0fc8821cb2fa.png',
        submitted: 2,
        total: 3,
        pendingLabel: '미제출 : 영어 지문 2개 요약',
        mentorRate: '79%',
        todoRate: '82%',
        subjectRates: [
          { label: '국어', subject: 'korean', value: '79%' },
          { label: '영어', subject: 'english', value: '82%' },
          { label: '수학', subject: 'math', value: '82%' },
        ],
        feedbackSummary:
          '영어 요약은 문단 구조를 먼저 잡고, 핵심 문장 6개를 분류해 정리하도록 지도.',
      },
      {
        id: 'm-2',
        name: '박모의',
        subtitle: '최근 제출: 1/3 · 오늘 3건',
        avatarUrl: 'http://localhost:3845/assets/0099dfd5b8049e8967ad451e680ca0f193e16d09.png',
        submitted: 1,
        total: 3,
        pendingLabel: '미제출 : 영어 지문 2개 요약',
        mentorRate: '65%',
        todoRate: '70%',
        subjectRates: [
          { label: '국어', subject: 'korean', value: '60%' },
          { label: '영어', subject: 'english', value: '68%' },
          { label: '수학', subject: 'math', value: '74%' },
        ],
        feedbackSummary:
          '학습 시작 전 오늘 목표를 먼저 설정하고, 기록을 간단히 남기는 루틴을 강화하기.',
      },
    ],
    [],
  )

  const [selectedId, setSelectedId] = useState(mentees[0]?.id ?? '')
  const selectedMentee = mentees.find((mentee) => mentee.id === selectedId) ?? mentees[0]

  return (
    <div className="relative flex w-full flex-col gap-[25px] pb-[80px]">
      <MentorTwoColumnLayout
        left={
          <section className="flex flex-col gap-[25px]">
            <div className="flex items-center">
              <Text
                as="h1"
                className="text-[34px] font-bold leading-[1.35] text-figma-typo-black"
              >
                멘티 관리
              </Text>
            </div>

            <div className="flex flex-col gap-[10px]">
              {mentees.map((mentee) => (
                <MentorMenteeListItem
                  key={mentee.id}
                  name={mentee.name}
                  subtitle={mentee.subtitle}
                  avatarUrl={mentee.avatarUrl}
                  onClick={() => setSelectedId(mentee.id)}
                  className={cn(mentee.id === selectedId && selectedItemClass)}
                />
              ))}
            </div>
          </section>
        }
        right={
          selectedMentee ? (
            <section className="flex flex-col gap-[20px] pt-[44px] xl:pt-[69px]">
              <div className="flex items-center justify-between">
                <Text as="h2" className="text-[22px] font-semibold leading-6 text-figma-typo-black">
                  {selectedMentee.name}
                </Text>
              </div>

              <div className="flex flex-col gap-[10px]">
                <Text as="p" className="text-[22px] font-medium leading-[1.2] text-figma-typo-black">
                  과제 제출 상태
                </Text>
                <MentorMenteeProgressCard
                  name={selectedMentee.name}
                  submitted={selectedMentee.submitted}
                  total={selectedMentee.total}
                  pendingLabel={selectedMentee.pendingLabel}
                  showNameChip={false}
                />
              </div>

              <div className="flex flex-col gap-[10px]">
                <Text as="p" className="text-[22px] font-medium leading-[1.2] text-figma-typo-black">
                  이번주 달성률
                </Text>
                <div className="flex gap-[10px]">
                  <StatCard label="멘토 과제" value={selectedMentee.mentorRate} />
                  <StatCard label="할 일" value={selectedMentee.todoRate} />
                </div>
              </div>

              <div className="flex flex-col gap-[10px]">
                <Text as="p" className="text-[22px] font-medium leading-[1.2] text-figma-typo-black">
                  이번주 과목별 달성률
                </Text>
                <div className="flex gap-[10px]">
                  {selectedMentee.subjectRates.map((item) => (
                    <SubjectStatCard
                      key={item.label}
                      subjectLabel={item.label}
                      subject={item.subject}
                      value={item.value}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-[10px]">
                <Text as="p" className="text-[22px] font-medium leading-[1.2] text-figma-typo-black">
                  이번주 피드백 요약
                </Text>
                <MentorCommentCard comment={selectedMentee.feedbackSummary} size="lg" />
              </div>
            </section>
          ) : undefined
        }
      />
    </div>
  )
}

export default MentorMentees
