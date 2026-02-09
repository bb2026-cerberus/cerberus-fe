import FormTextInput from '@/components/common/FormTextInput'
import MentorActionButtons from '@/components/common/MentorActionButtons'
import SubjectChip from '@/components/common/SubjectChip'
import { Text } from '@/components/common/Text'

type FeedbackTaskInfo = {
  title: string
  subtitle: string
  subjectLabel: string
  subject: 'korean' | 'math' | 'english' | 'neutral'
}

type MentorFeedbackDetailPanelProps = {
  title: string
  task: FeedbackTaskInfo
  studyImageUrl: string
  feedback: string
  onFeedbackChange: (value: string) => void
  summary: string
  onSummaryChange: (value: string) => void
  overall: string
  onOverallChange: (value: string) => void
  onSubmit?: () => void
  onTempSave?: () => void
  tempSaveCount?: number
  onTempSaveListOpen?: () => void
}

function MentorFeedbackDetailPanel({
  title,
  task,
  studyImageUrl,
  feedback,
  onFeedbackChange,
  summary,
  onSummaryChange,
  overall,
  onOverallChange,
  onSubmit,
  onTempSave,
  tempSaveCount = 0,
  onTempSaveListOpen,
}: MentorFeedbackDetailPanelProps) {
  return (
    <section className="flex flex-col gap-[20px] pt-[20px] lg:pt-[44px] xl:pt-[69px]">
      <div className="flex items-center justify-between">
        <Text as="h2" className="text-[22px] font-semibold leading-6 text-figma-typo-black">
          {title}
        </Text>
        <MentorActionButtons
          mode="create"
          onPrimary={onSubmit}
          onSecondary={onTempSave}
          useTempSaveButton
          tempSaveCount={tempSaveCount}
          onTempSaveListOpen={onTempSaveListOpen}
          primaryLabel="등록"
          secondaryLabel="임시저장"
          size="mobile"
          className="hidden lg:flex"
        />
      </div>

      <div className="flex flex-col gap-[20px] pl-[10px]">
        <div className="flex flex-col gap-[8px]">
          <Text as="p" className="text-[20px] font-semibold leading-6 text-figma-typo-black">
            {task.title}
          </Text>
          <div className="flex items-center gap-[8px]">
            <SubjectChip label={task.subjectLabel} subject={task.subject} />
            <Text as="p" className="text-[16px] font-semibold leading-6 text-figma-typo-gray">
              {task.subtitle}
            </Text>
          </div>
        </div>

        <div className="flex flex-col gap-[10px]">
          <Text as="p" className="text-[22px] font-medium leading-[1.2] text-figma-typo-black">
            공부 인증 업로드
          </Text>
          <div className="h-[305px] w-full overflow-hidden rounded-[18px] bg-figma-white">
            <img src={studyImageUrl} alt="" className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="flex flex-col gap-[10px]">
          <Text as="p" className="text-[22px] font-medium leading-[1.2] text-figma-typo-black">
            피드백
          </Text>
          <FormTextInput
            placeholder="자유 작성"
            value={feedback}
            onChange={onFeedbackChange}
            size="lg"
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <Text as="p" className="text-[22px] font-medium leading-[1.2] text-figma-typo-black">
            중요 요약
          </Text>
          <FormTextInput
            placeholder="요약 포인트 3개 이내"
            value={summary}
            onChange={onSummaryChange}
            size="lg"
          />
        </div>

        <div className="flex flex-col gap-[10px]">
          <Text as="p" className="text-[22px] font-medium leading-[1.2] text-figma-typo-black">
            총평
          </Text>
          <FormTextInput
            placeholder="자유 작성"
            value={overall}
            onChange={onOverallChange}
            size="lg"
          />
        </div>
      </div>
    </section>
  )
}

export type { MentorFeedbackDetailPanelProps, FeedbackTaskInfo }
export default MentorFeedbackDetailPanel
