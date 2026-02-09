import * as React from 'react'

import DatePickerInput from '@/components/common/DatePickerInput'
import FormActionBar from '@/components/common/FormActionBar'
import FormSection from '@/components/common/FormSection'
import FormSelectInput from '@/components/common/FormSelectInput'
import FormTextInput from '@/components/common/FormTextInput'
import FormSectionGroup from '@/components/common/FormSectionGroup'
import SegmentedTabs, { type SegmentedTabItem } from '@/components/common/SegmentedTabs'
import type { Subject } from '@/types/ui/subject'

type SubjectValue = Subject

const subjectItems: SegmentedTabItem<SubjectValue>[] = [
  { label: '국어', value: 'korean' },
  { label: '영어', value: 'english' },
  { label: '수학', value: 'math' },
]

function MenteeTodoCreate() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [subject, setSubject] = React.useState<SubjectValue>('korean')
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [solution, setSolution] = React.useState<string | undefined>(undefined)

  return (
    <div className="flex w-full flex-col items-center gap-0">
      <div className="w-full px-4 pb-[36px] pt-[8px]">
        <FormSectionGroup className="flex flex-col gap-4">
          <FormSection title="날짜 선택">
            <DatePickerInput value={date} onChange={setDate} />
          </FormSection>

          <FormSection title="과목 선택">
            <SegmentedTabs value={subject} items={subjectItems} onChange={setSubject} />
          </FormSection>

          <FormSection title="제목">
            <FormTextInput
              value={title}
              onChange={setTitle}
              placeholder="할 일의 제목을 적어주세요"
            />
          </FormSection>

          <FormSection title="설명">
            <FormTextInput
              value={description}
              onChange={setDescription}
              placeholder="할 일에 대한 설명을 적어주세요"
            />
          </FormSection>

          <FormSection title="솔루션 (선택)">
            <FormSelectInput
              value={solution}
              onChange={setSolution}
              placeholder="솔루션을 선택해주세요"
            />
          </FormSection>

          <FormActionBar tempCount={2} className="pt-3" />
        </FormSectionGroup>
      </div>
    </div>
  )
}

export default MenteeTodoCreate
