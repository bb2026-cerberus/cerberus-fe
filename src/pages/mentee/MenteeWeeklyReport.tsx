import { useState } from 'react'
import { startOfWeek } from 'date-fns'

import BulletListCard from '@/components/common/BulletListCard'
import MenteeSection from '@/components/common/MenteeSection'
import MentorCommentCard from '@/components/common/MentorCommentCard'
import SectionLinkHeader from '@/components/common/SectionLinkHeader'
import StatCard from '@/components/common/StatCard'
import SubjectStatCard from '@/components/common/SubjectStatCard'
import WeekSelector from '@/components/common/WeekSelector'
import WeeklySummaryCard from '@/components/common/WeeklySummaryCard'

function MenteeWeeklyReport() {
  const [weekStart, setWeekStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 }),
  )

  return (
    <div className="flex w-full flex-col items-center gap-0">
      <div className="w-full px-4 pb-[50px] pt-2">
        <MenteeSection className="flex flex-col gap-6">
          <div className="flex flex-col gap-[10px] px-[10px]">
            <WeekSelector value={weekStart} onChange={setWeekStart} />
            <WeeklySummaryCard summary="이번 주 학습 흐름은 안정적으로 유지되고 있으며, 복습 비중을 조금 더 늘리면 전반적인 이해도 향상에 도움이 될 것으로 보입니다." />
          </div>

          <div className="flex flex-col gap-3 px-[10px]">
            <SectionLinkHeader title="이번주 달성률" />
            <div className="flex gap-1">
              <StatCard label="멘토 과제" value="79%" />
              <StatCard label="할 일" value="82%" />
            </div>
          </div>

          <div className="flex flex-col gap-3 px-[10px]">
            <SectionLinkHeader title="이번주 과목별 달성률" />
            <div className="flex gap-1">
              <SubjectStatCard subjectLabel="국어" subject="korean" value="50%" />
              <SubjectStatCard subjectLabel="영어" subject="english" value="50%" />
              <SubjectStatCard subjectLabel="수학" subject="math" value="50%" />
            </div>
          </div>

          <div className="flex flex-col gap-3 px-[10px]">
            <h3 className="text-[20px] font-semibold leading-6 text-figma-typo-black">
              멘토 총평
            </h3>
            <MentorCommentCard comment="이번 주 학습 기록을 보면 계획된 범위 내에서 꾸준히 단어 정리와 확인이 이루어진 점이 긍정적입니다. 다만 신규 학습에 비해 복습 비중이 다소 낮아 장기 기억으로의 전환을 강화할 필요가 있습니다. 다음 주에는 학습량을 유지하면서 반복 확인 구조를 함께 가져가면 전반적인 학습 안정성이 높아질 것으로 보입니다." />
          </div>

          <div className="flex flex-col gap-3 px-[10px]">
            <h3 className="text-[20px] font-semibold leading-6 text-figma-typo-black">
              이번주 잘한점
            </h3>
            <BulletListCard
              items={[
                '단어 정리를 일정한 기준으로 꾸준히 이어간 점',
                '예문 또는 의미 확인을 병행하려는 학습 태도',
                '기록 누락 없이 학습 흐름을 유지한 점',
              ]}
            />
          </div>

          <div className="flex flex-col gap-3 px-[10px]">
            <h3 className="text-[20px] font-semibold leading-6 text-figma-typo-black">
              다음주 보완점
            </h3>
            <BulletListCard
              items={[
                '신규 단어 학습량 대비 복습 시간 확대',
                '유사 의미 단어 간 차이 정리 추가',
                '실제 문장 활용 연습 비중 강화',
              ]}
            />
          </div>
        </MenteeSection>
      </div>
    </div>
  )
}

export default MenteeWeeklyReport
