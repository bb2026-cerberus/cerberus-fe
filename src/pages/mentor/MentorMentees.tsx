import * as React from 'react'

import MentorCommentCard from '@/components/common/MentorCommentCard'
import MentorMenteeListItem from '@/components/common/MentorMenteeListItem'
import MentorMenteeProgressCard from '@/components/common/MentorMenteeProgressCard'
import MentorTwoColumnLayout from '@/components/layout/MentorTwoColumnLayout'
import StatCard from '@/components/common/StatCard'
import SubjectStatCard from '@/components/common/SubjectStatCard'
import { Text } from '@/components/common/Text'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import mentorMenteesApi from '@/services/api/mentor-mentees'
import type { MenteeItem } from '@/services/api/mentor-mentees'
import useApiRequest from '@/hooks/useApiRequest'
import useAuth from '@/store/auth/useAuth'
import type { SubjectWithNeutral } from '@/types/ui/subject'

const subjectMap: Record<string, { label: string; subject: SubjectWithNeutral }> = {
  국어: { label: '국어', subject: 'korean' },
  영어: { label: '영어', subject: 'english' },
  수학: { label: '수학', subject: 'math' },
}

function MentorMentees() {
  const selectedItemClass =
    "relative overflow-hidden border border-figma-point-color-2/30 bg-figma-card-gray before:absolute before:left-0 before:top-0 before:h-full before:w-[4px] before:bg-figma-point-color-2 before:rounded-l-[18px] before:content-['']"
  const [detailOpen, setDetailOpen] = React.useState(false)
  const { userId } = useAuth()
  const { run } = useApiRequest()
  const [mentees, setMentees] = React.useState<MenteeItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [selectedId, setSelectedId] = React.useState<number | null>(null)

  React.useEffect(() => {
    if (!userId) return

    setLoading(true)
    run(
      () => mentorMenteesApi.getMentorMentees(userId),
      {
        errorMessage: '멘티 목록을 불러오지 못했어요.',
        onSuccess: (response) => {
          const list = response.data.mentees
          setMentees(list)
          if (list.length > 0) setSelectedId(list[0].menteeId)
        },
      },
    ).finally(() => setLoading(false))
  }, [userId, run])

  const selectedMentee = mentees.find((m) => m.menteeId === selectedId) ?? mentees[0]
  const details = selectedMentee?.details

  const buildSubtitle = (item: MenteeItem) => {
    const { completedCount, totalCount } = item.details.todayStatus
    return `최근 제출: ${completedCount}/${totalCount} · 오늘 ${totalCount}건`
  }

  const buildPendingLabel = (item: MenteeItem) => {
    const titles = item.details.todayStatus.unsubmittedTitles
    if (titles.length === 0) return '모두 제출 완료'
    return `미제출 : ${titles.join(', ')}`
  }

  return (
    <div className="relative flex w-full flex-col gap-[25px] pb-[80px]">
      <MentorTwoColumnLayout
        mobileDetailOpen={detailOpen}
        onMobileDetailClose={() => setDetailOpen(false)}
        mobileDetailTitle="멘티 관리"
        left={
          <section className="flex flex-col gap-[25px]">
            <div className="hidden items-center lg:flex">
              <Text
                as="h1"
                className="text-[28px] font-bold leading-[1.3] text-figma-typo-black"
              >
                멘티 관리
              </Text>
            </div>

            <div className="flex flex-col gap-[10px]">
              {loading ? (
                <>
                  <Skeleton className="h-[84px] w-full rounded-[16px]" />
                  <Skeleton className="h-[84px] w-full rounded-[16px]" />
                </>
              ) : (
                mentees.map((mentee) => (
                  <MentorMenteeListItem
                    key={mentee.menteeId}
                    name={mentee.menteeName}
                    subtitle={buildSubtitle(mentee)}
                    onClick={() => {
                      setSelectedId(mentee.menteeId)
                      setDetailOpen(true)
                    }}
                    className={cn(mentee.menteeId === selectedId && selectedItemClass)}
                  />
                ))
              )}
            </div>
          </section>
        }
        right={
          details ? (
            <section className="flex flex-col gap-[20px] pt-[20px] lg:pt-[44px] xl:pt-[69px]">
              <div className="flex items-center justify-between">
                <Text as="h2" className="text-[18px] font-semibold leading-6 text-figma-typo-black">
                  {details.menteeName}
                </Text>
              </div>

              <div className="flex flex-col gap-[10px]">
                <Text as="p" className="text-[18px] font-medium leading-[1.2] text-figma-typo-black">
                  과제 제출 상태
                </Text>
                <MentorMenteeProgressCard
                  name={details.menteeName}
                  submitted={details.todayStatus.completedCount}
                  total={details.todayStatus.totalCount}
                  pendingLabel={buildPendingLabel(selectedMentee)}
                  showNameChip={false}
                />
              </div>

              <div className="flex flex-col gap-[10px]">
                <Text as="p" className="text-[18px] font-medium leading-[1.2] text-figma-typo-black">
                  이번주 달성률
                </Text>
                <div className="flex gap-[10px]">
                  <StatCard label="멘토 과제" value={`${Math.round(details.weeklyAchievement.mentorAssignmentRate)}%`} size="sm" />
                  <StatCard label="할 일" value={`${Math.round(details.weeklyAchievement.generalTodoRate)}%`} size="sm" />
                </div>
              </div>

              <div className="flex flex-col gap-[10px]">
                <Text as="p" className="text-[18px] font-medium leading-[1.2] text-figma-typo-black">
                  이번주 과목별 달성률
                </Text>
                <div className="flex gap-[10px]">
                  {details.subjectAchievement.length > 0 ? (
                    details.subjectAchievement.map((item) => {
                      const mapped = subjectMap[item.subject] ?? { label: item.subject, subject: 'neutral' as const }
                      return (
                        <SubjectStatCard
                          key={item.subject}
                          subjectLabel={mapped.label}
                          subject={mapped.subject}
                          value={`${Math.round(item.progress)}%`}
                          size="sm"
                        />
                      )
                    })
                  ) : (
                    <>
                      <SubjectStatCard subjectLabel="국어" subject="korean" value="-" size="sm" />
                      <SubjectStatCard subjectLabel="영어" subject="english" value="-" size="sm" />
                      <SubjectStatCard subjectLabel="수학" subject="math" value="-" size="sm" />
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-[10px]">
                <Text as="p" className="text-[18px] font-medium leading-[1.2] text-figma-typo-black">
                  이번주 피드백 요약
                </Text>
                <MentorCommentCard comment={details.weeklyFeedbackSummary} size="lg" />
              </div>
            </section>
          ) : undefined
        }
      />
    </div>
  )
}

export default MentorMentees
