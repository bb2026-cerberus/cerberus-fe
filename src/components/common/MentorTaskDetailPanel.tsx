import DatePickerInput from '@/components/common/DatePickerInput'
import FormSelectInput from '@/components/common/FormSelectInput'
import FormTextInput from '@/components/common/FormTextInput'
import MentorTaskActionButtons, {
  type MentorTaskActionMode,
} from '@/components/common/MentorTaskActionButtons'
import { Text } from '@/components/common/Text'
import UploadBox from '@/components/common/UploadBox'
import { cn } from '@/lib/utils'

type MentorTaskDetailPanelProps = {
  title: string
  mode: MentorTaskActionMode
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
    <section className="flex flex-col gap-[20px] pt-[44px] xl:pt-[69px]">
      <div className="flex items-center justify-between">
        <Text as="h2" className="text-[22px] font-semibold leading-6 text-figma-typo-black">
          {title}
        </Text>
        <MentorTaskActionButtons
          mode={mode}
          onPrimary={onPrimary}
          onSecondary={onSecondary}
          tempSaveCount={tempSaveCount}
          onTempSaveClick={onTempSaveClick}
        />
      </div>

      <div className={cn('flex flex-col gap-[20px] pl-[10px]', readOnly && 'pointer-events-none opacity-90')}>
        <FormSelectInput
          value={mentee}
          onChange={onMenteeChange}
          options={['김수험', '박모의']}
          placeholder="멘티 선택"
          size="lg"
          readOnly={readOnly}
        />

        <div className="flex flex-col gap-[10px]">
          <Text as="p" className="text-[20px] font-medium leading-[1.2] text-figma-typo-black">
            날짜 선택
          </Text>
          <DatePickerInput value={date} onChange={onDateChange} size="lg" readOnly={readOnly} />
        </div>

        <div className="flex flex-col gap-[10px]">
          <Text as="p" className="text-[20px] font-medium leading-[1.2] text-figma-typo-black">
            과목
          </Text>
          <div className="grid w-full grid-cols-3 gap-[10px]">
            {(['국어', '영어', '수학'] as const).map((item) => {
              const isActive = subject === item
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => onSubjectChange(item)}
                  className={`h-[60px] rounded-[16px] px-[18px] text-[17px] font-semibold leading-6 transition-colors ${
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
        </div>

        <div className="flex flex-col gap-[10px]">
          <Text as="p" className="text-[20px] font-medium leading-[1.2] text-figma-typo-black">
            정보
          </Text>
          <FormTextInput
            placeholder="제목"
            value={taskTitle}
            onChange={onTitleChange}
            size="lg"
            readOnly={readOnly}
          />
          <FormTextInput
            placeholder="설명"
            value={description}
            onChange={onDescriptionChange}
            size="lg"
            readOnly={readOnly}
          />
          <FormSelectInput
            value={solution}
            onChange={onSolutionChange}
            options={['솔루션 방안']}
            size="lg"
            readOnly={readOnly}
          />
        </div>

        <div className="flex flex-col gap-[8px]">
          <Text as="p" className="text-[20px] font-medium leading-[1.2] text-figma-typo-black">
            학습지 등록
          </Text>
          <FormTextInput
            placeholder="| 학습지를 작성해주세요"
            value={worksheetText}
            onChange={onWorksheetTextChange}
            size="lg"
            readOnly={readOnly}
          />
          <UploadBox
            label="파일을 선택하거나 여기로 끌어다 놓으세요"
            size="lg"
            className={readOnly ? 'bg-figma-card-gray text-figma-typo-gray-b' : undefined}
          />
        </div>
      </div>
    </section>
  )
}

export type { MentorTaskDetailPanelProps }
export default MentorTaskDetailPanel
