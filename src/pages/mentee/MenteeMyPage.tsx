import MenteeSection from '@/components/common/MenteeSection'
import ActionButton from '@/components/common/ActionButton'
import FormSection from '@/components/common/FormSection'
import ProfileCard from '@/components/common/ProfileCard'
import StatCard from '@/components/common/StatCard'
import SubjectStatCard from '@/components/common/SubjectStatCard'

function MenteeMyPage() {
  return (
    <div className="flex w-full flex-col items-center gap-0">
      <div className="w-full px-4 pb-[36px] pt-[8px]">
        <MenteeSection className="flex flex-col gap-4">
          <ProfileCard
            name="김수험"
            subline="D-282 · 목표 1등급"
            avatarUrl="http://localhost:3845/assets/f642191510f8e42cc0333351401705bec9b54082.png"
          />

          <FormSection title="이번주 달성률">
            <div className="flex gap-1">
              <StatCard label="멘토 과제" value="79%" />
              <StatCard label="할 일" value="82%" />
            </div>
          </FormSection>

          <FormSection title="이번주 과목별 달성률">
            <div className="flex gap-1">
              <SubjectStatCard subjectLabel="국어" subject="korean" value="50%" />
              <SubjectStatCard subjectLabel="영어" subject="english" value="50%" />
              <SubjectStatCard subjectLabel="수학" subject="math" value="50%" />
            </div>
          </FormSection>

          <p className="px-[10px] text-[12px] font-medium leading-tight text-figma-typo-gray">
            *상담은 외부 링크로 연결됩니다
          </p>

          <div className="flex justify-end px-[10px]">
            <div className="w-full">
              <ActionButton label="상담 받아보기" />
            </div>
          </div>
        </MenteeSection>
      </div>
    </div>
  )
}

export default MenteeMyPage
