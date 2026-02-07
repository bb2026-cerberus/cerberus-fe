import MenteeSection from '@/components/common/MenteeSection'
import TaskDateMeta from '@/components/common/TaskDateMeta'
import TaskDetailHeader from '@/components/common/TaskDetailHeader'
import UploadBox from '@/components/common/UploadBox'
import SubjectChip from '@/components/common/SubjectChip'

function MenteeTodoDetail() {
  return (
    <div className="flex w-full flex-col items-center gap-0">
      <div className="w-full px-4 pb-[50px] pt-2">
        <MenteeSection className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 px-1 pt-2">
            <TaskDetailHeader title="단어 시험 공부" subtitle="1단원 단어 리스트" />
            <div className="flex items-center gap-2">
              <TaskDateMeta dateText="2026.02.02" />
              <SubjectChip label="영어" subject="english" />
            </div>
          </div>

          <div className="flex flex-col gap-2 px-[10px]">
            <h3 className="text-[20px] font-semibold leading-6 text-figma-typo-black">
              공부 인증 업로드
            </h3>
            <p className="text-[14px] font-semibold leading-6 text-figma-typo-gray">
              멘토의 피드백을 원하는 경우 사진 업로드하기
            </p>
            <UploadBox />
          </div>
        </MenteeSection>
      </div>
    </div>
  )
}

export default MenteeTodoDetail
