import * as React from 'react'

import FormSection from '@/components/common/FormSection'
import FormSectionGroup from '@/components/common/FormSectionGroup'
import TaskDateMeta from '@/components/common/TaskDateMeta'
import TaskDetailHeader from '@/components/common/TaskDetailHeader'
import StudyMaterialCard from '@/components/common/StudyMaterialCard'
import UploadBox from '@/components/common/UploadBox'
import UploadPreview from '@/components/common/UploadPreview'
import SubjectChip from '@/components/common/SubjectChip'

function MenteeAssignmentDetail() {
  const [uploadedImageUrl, setUploadedImageUrl] = React.useState<string | undefined>(
    undefined,
  )
  const demoImageUrl =
    'http://localhost:3845/assets/6c95fc68c0f1ef4707cd3d969bb54246db835a65.png'

  return (
    <div className="flex w-full flex-col items-center gap-0">
      <div className="w-full px-4 pb-[36px] pt-[8px]">
        <FormSectionGroup className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 px-1 pt-2">
            <TaskDetailHeader title="문학 1지문 정리" subtitle="핵심 표현 5개" />
            <div className="flex items-center gap-2">
              <TaskDateMeta dateText="2026.02.02" />
              <SubjectChip label="국어" subject="korean" />
            </div>
          </div>

          <FormSection title="학습지">
            <StudyMaterialCard title="문학 요약문 작성 가이드" />
          </FormSection>

          <FormSection title="과제 인증 업로드">
            {uploadedImageUrl ? (
              <UploadPreview
                imageUrl={uploadedImageUrl}
                onEdit={() => setUploadedImageUrl(demoImageUrl)}
                onDelete={() => setUploadedImageUrl(undefined)}
              />
            ) : (
              <UploadBox onClick={() => setUploadedImageUrl(demoImageUrl)} />
            )}
          </FormSection>
        </FormSectionGroup>
      </div>
    </div>
  )
}

export default MenteeAssignmentDetail
