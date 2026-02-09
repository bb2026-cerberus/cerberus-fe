import FormTextInput from '@/components/common/FormTextInput'
import MentorActionButtons from '@/components/common/MentorActionButtons'
import { Text } from '@/components/common/Text'

type MentorQnaDetailPanelProps = {
  title: string
  question: string
  questionImageUrl: string
  comment: string
  onCommentChange: (value: string) => void
  onTempSave?: () => void
  onSubmit?: () => void
}

function MentorQnaDetailPanel({
  title,
  question,
  questionImageUrl,
  comment,
  onCommentChange,
  onTempSave,
  onSubmit,
}: MentorQnaDetailPanelProps) {
  return (
    <section className="flex flex-col gap-[20px] pt-[44px] xl:pt-[69px]">
      <div className="flex items-center justify-between">
        <Text as="h2" className="text-[22px] font-semibold leading-6 text-figma-typo-black">
          {title}
        </Text>
        <MentorActionButtons
          mode="create"
          onPrimary={onSubmit}
          onSecondary={onTempSave}
          useTempSaveButton={false}
          primaryLabel="등록"
          secondaryLabel="임시저장"
          size="pc"
        />
      </div>

      <div className="flex flex-col gap-[20px] pl-[10px]">
        <div className="flex flex-col gap-[10px]">
          <Text as="p" className="text-[22px] font-medium leading-[1.2] text-figma-typo-black">
            멘티 질문
          </Text>
          <div className="flex h-[71px] items-center rounded-[18px] bg-figma-white px-[24px]">
            <Text as="p" className="text-[20px] font-semibold leading-6 text-figma-typo-black">
              {question}
            </Text>
          </div>
          <div className="h-[305px] w-full overflow-hidden rounded-[18px] bg-figma-white">
            <img src={questionImageUrl} alt="" className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="flex flex-col gap-[10px]">
          <Text as="p" className="text-[22px] font-medium leading-[1.2] text-figma-typo-black">
            멘토 코멘트
          </Text>
          <FormTextInput
            placeholder="자유 작성"
            value={comment}
            onChange={onCommentChange}
            size="lg"
          />
        </div>
      </div>
    </section>
  )
}

export type { MentorQnaDetailPanelProps }
export default MentorQnaDetailPanel
