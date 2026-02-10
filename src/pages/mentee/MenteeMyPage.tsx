import * as React from 'react'

import FormSectionGroup from '@/components/common/FormSectionGroup'
import ActionButton from '@/components/common/ActionButton'
import FormSection from '@/components/common/FormSection'
import ProfileCard from '@/components/common/ProfileCard'
import StatCard from '@/components/common/StatCard'
import SubjectStatCard from '@/components/common/SubjectStatCard'
import { Skeleton } from '@/components/ui/skeleton'
import menteeMypageApi from '@/services/api/mentee-mypage'
import type { MenteeMypageResponseDto } from '@/services/api/mentee-mypage'
import useApiRequest from '@/hooks/useApiRequest'
import useAuth from '@/store/auth/useAuth'
import type { SubjectWithNeutral } from '@/types/ui/subject'

const subjectMap: Record<string, { label: string; subject: SubjectWithNeutral }> = {
  국어: { label: '국어', subject: 'korean' },
  영어: { label: '영어', subject: 'english' },
  수학: { label: '수학', subject: 'math' },
}

function MenteeMyPage() {
  const { userId } = useAuth()
  const { run } = useApiRequest()
  const [data, setData] = React.useState<MenteeMypageResponseDto | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (!userId) return

    setLoading(true)
    run(
      () => menteeMypageApi.getMenteeMypage(userId),
      {
        errorMessage: '마이페이지 정보를 불러오지 못했어요.',
        onSuccess: (response) => setData(response.data),
      },
    ).finally(() => setLoading(false))
  }, [userId, run])

  return (
    <div className="flex w-full flex-col items-center gap-0">
      <div className="w-full px-4 pb-[36px] pt-[8px]">
        <FormSectionGroup className="flex flex-col gap-4">
          {loading ? (
            <>
              <Skeleton className="h-[79px] w-full rounded-[14px]" />
              <Skeleton className="h-[100px] w-full rounded-[18px]" />
              <Skeleton className="h-[100px] w-full rounded-[18px]" />
            </>
          ) : (
            <>
              <ProfileCard
                name={data?.menteeName ?? '-'}
                subline="D-282 · 목표 1등급"
                avatarUrl="http://localhost:3845/assets/f642191510f8e42cc0333351401705bec9b54082.png"
              />

              <FormSection title="이번주 달성률">
                <div className="flex gap-1">
                  <StatCard label="멘토 과제" value={data ? `${Math.round(data.weeklyAchievement.mentorAssignmentRate)}%` : '-'} />
                  <StatCard label="할 일" value={data ? `${Math.round(data.weeklyAchievement.generalTodoRate)}%` : '-'} />
                </div>
              </FormSection>

              <FormSection title="이번주 과목별 달성률">
                <div className="flex gap-1">
                  {data?.subjectAchievement.map((item) => {
                    const mapped = subjectMap[item.subject] ?? { label: item.subject, subject: 'neutral' as const }
                    return (
                      <SubjectStatCard
                        key={item.subject}
                        subjectLabel={mapped.label}
                        subject={mapped.subject}
                        value={`${Math.round(item.progress)}%`}
                      />
                    )
                  }) ?? (
                    <>
                      <SubjectStatCard subjectLabel="국어" subject="korean" value="-" />
                      <SubjectStatCard subjectLabel="영어" subject="english" value="-" />
                      <SubjectStatCard subjectLabel="수학" subject="math" value="-" />
                    </>
                  )}
                </div>
              </FormSection>
            </>
          )}

          <p className="px-[10px] text-[12px] font-medium leading-tight text-figma-typo-gray">
            *상담은 외부 링크로 연결됩니다
          </p>

          <div className="flex justify-end px-[10px]">
            <div className="w-full">
              <ActionButton label="상담 받아보기" />
            </div>
          </div>
        </FormSectionGroup>
      </div>
    </div>
  )
}

export default MenteeMyPage
