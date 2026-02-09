import DatePickerInput from '@/components/common/DatePickerInput'
import FormSection from '@/components/common/FormSection'
import FormSectionGroup from '@/components/common/FormSectionGroup'
import FormSelectInput from '@/components/common/FormSelectInput'
import FormTextInput from '@/components/common/FormTextInput'
import ActionButtons, { type ActionMode } from '@/components/common/ActionButtons'
import { Text } from '@/components/common/Text'
import UploadBox from '@/components/common/UploadBox'
import { cn } from '@/lib/utils'

type MentorTaskDetailPanelProps = {
  title: string
  mode: ActionMode
  mentee: string
  onMenteeChange: (value: string) => void
  date: Date | undefined
  onDateChange: (value: Date | undefined) => void
  subject: '국어' | '영어' | '수학'
  onSubjectChange: (value: '국어' | '영어' | '수학') => void
  taskTitle: string
  onTitleChange: (value: string) => void
  description: string
  onDescriptionChange: (value: string) => void
  solution: string
  onSolutionChange: (value: string) => void
  worksheetText: string
  onWorksheetTextChange: (value: string) => void
  onPrimary?: () => void
  onSecondary?: () => void
  tempSaveCount?: number
  onTempSaveClick?: () => void
  readOnly?: boolean
}

function MentorTaskDetailPanel({
  title,
  mode,
  mentee,
  onMenteeChange,
  date,
  onDateChange,
  subject,
  onSubjectChange,
  taskTitle,
  onTitleChange,
  description,
  onDescriptionChange,
  solution,
  onSolutionChange,
  worksheetText,
  onWorksheetTextChange,
  onPrimary,
  onSecondary,
  tempSaveCount,
  onTempSaveClick,
  readOnly = false,
}: MentorTaskDetailPanelProps) {
  return (
    <section className="flex flex-col gap-[20px] pt-[20px] lg:pt-[44px] xl:pt-[69px]">
      <div className="flex items-center justify-between">
        <Text as="h2" className="text-[18px] font-semibold leading-6 text-figma-typo-black">
          {title}
        </Text>
        <ActionButtons
          mode={mode}
          onPrimary={onPrimary}
          onSecondary={onSecondary}
          useTempSaveButton={mode === 'create'}
          tempSaveCount={tempSaveCount}
          onTempSaveListOpen={onTempSaveClick}
          primaryLabel={mode === 'detail' ? '수정' : '등록'}
          secondaryLabel={mode === 'detail' ? '삭제' : mode === 'edit' ? '취소' : '임시저장'}
          size="mobile"
          className="hidden lg:flex"
        />
      </div>

      <FormSectionGroup
        className={cn('flex flex-col gap-4 pl-[10px]', readOnly && 'pointer-events-none opacity-90')}
      >
        <FormSection title="멘티 선택">
          <FormSelectInput
            value={mentee}
            onChange={onMenteeChange}
            options={['김수험', '박모의']}
            placeholder="멘티 선택"
            readOnly={readOnly}
          />
        </FormSection>

        <FormSection title="날짜 선택">
          <DatePickerInput value={date} onChange={onDateChange} readOnly={readOnly} />
        </FormSection>

        <FormSection title="과목">
          <div className="grid w-full grid-cols-3 gap-[10px]">
            {(['국어', '영어', '수학'] as const).map((item) => {
              const isActive = subject === item
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => onSubjectChange(item)}
                  className={`h-[48px] rounded-[14px] px-[16px] text-[14px] font-semibold leading-6 transition-colors ${
                    isActive
                      ? 'bg-figma-sub-color-1 text-white'
                      : 'bg-figma-white text-figma-typo-gray hover:bg-figma-card-gray'
                  }`}
                  disabled={readOnly}
                >
                  {item}
                </button>
              )
            })}
          </div>
        </FormSection>

        <FormSection title="정보">
          <div className="flex flex-col gap-[10px]">
            <FormTextInput
              placeholder="제목"
              value={taskTitle}
              onChange={onTitleChange}
              readOnly={readOnly}
            />
            <FormTextInput
              placeholder="설명"
              value={description}
              onChange={onDescriptionChange}
              readOnly={readOnly}
            />
            <FormSelectInput
              value={solution}
              onChange={onSolutionChange}
              options={['솔루션 방안']}
              readOnly={readOnly}
            />
          </div>
        </FormSection>

        <FormSection title="학습지 등록">
          <div className="flex flex-col gap-[8px]">
            <FormTextInput
              placeholder="| 학습지를 작성해주세요"
              value={worksheetText}
              onChange={onWorksheetTextChange}
              readOnly={readOnly}
            />
            <UploadBox
              label="파일을 선택하거나 여기로 끌어다 놓으세요"
              size="lg"
              className={readOnly ? 'bg-figma-card-gray text-figma-typo-gray-b' : undefined}
            />
          </div>
        </FormSection>
      </FormSectionGroup>
    </section>
  )
}

export type { MentorTaskDetailPanelProps }
export default MentorTaskDetailPanel
