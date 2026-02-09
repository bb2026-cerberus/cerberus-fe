import FormSection from '@/components/common/FormSection'
import FormSectionGroup from '@/components/common/FormSectionGroup'
import FixedActionBar from '@/components/common/FixedActionBar'
import TaskDateMeta from '@/components/common/TaskDateMeta'
import TaskDetailHeader from '@/components/common/TaskDetailHeader'
import UploadBox from '@/components/common/UploadBox'
import SubjectChip from '@/components/common/SubjectChip'
import ActionButtons from '@/components/common/ActionButtons'
import { Text } from '@/components/common/Text'
import routePaths from '@/routes/routePaths'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

function MenteeTodoDetail() {
  const navigate = useNavigate()
  const { todoId } = useParams()
  const [errorMessage, setErrorMessage] = useState('')

  const handleEdit = () => {
    if (!todoId) return
    navigate(`${routePaths.menteeTodoCreate}?todoId=${todoId}`)
  }

  const handleDelete = () => {
    setErrorMessage('삭제 기능은 아직 준비 중입니다.')
  }

  return (
    <div className="flex w-full flex-col items-center gap-0">
      <div className="w-full px-4 pb-[120px] pt-[8px]">
        <FormSectionGroup className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 px-1 pt-2">
            <TaskDetailHeader title="단어 시험 공부" subtitle="1단원 단어 리스트" />
            <div className="flex items-center gap-2">
              <TaskDateMeta dateText="2026.02.02" />
              <SubjectChip label="영어" subject="english" />
            </div>
          </div>

          <FormSection title="공부 인증 업로드">
            <div className="flex flex-col gap-2">
              <p className="text-[13px] font-medium leading-6 text-figma-typo-gray">
                멘토의 피드백을 원하는 경우 사진 업로드하기
              </p>
              <UploadBox />
            </div>
          </FormSection>
          {errorMessage ? (
            <Text as="p" className="px-1 text-[12px] font-semibold text-figma-sub-color-2">
              {errorMessage}
            </Text>
          ) : null}
        </FormSectionGroup>
      </div>
      <FixedActionBar>
        <ActionButtons
          mode="detail"
          size="mobile"
          primaryLabel="수정"
          secondaryLabel="삭제"
          onPrimary={handleEdit}
          onSecondary={handleDelete}
          useTempSaveButton={false}
          className="w-full gap-[8px]"
          primaryButtonClassName="w-full"
          secondaryButtonClassName="w-full"
        />
      </FixedActionBar>
    </div>
  )
}

export default MenteeTodoDetail
