import { useMemo } from 'react'

import FormSelectInput from '@/components/common/FormSelectInput'
import MentorSolutionTable, {
  type MentorSolutionItem,
} from '@/components/common/MentorSolutionTable'
import MentorTwoColumnLayout from '@/components/common/MentorTwoColumnLayout'
import { Text } from '@/components/common/Text'

function MentorSolutions() {
  const solutionItems = useMemo<MentorSolutionItem[]>(
    () => [
      {
        id: 's-1',
        improvement: '문법 강의/오답노트',
        subject: '국어',
        attachment: '언어(문법) 오답노트.pdf',
        showActions: true,
      },
      {
        id: 's-2',
        improvement: '문법 복습지',
        subject: '국어',
        attachment: '문법 개념 복습지.pdf',
        showActions: true,
      },
      {
        id: 's-3',
        improvement: '문학 문풀',
        subject: '국어',
        attachment: '-',
        showActions: true,
      },
      {
        id: 's-4',
        improvement: '유형별 문제',
        subject: '수학',
        attachment: '수학 오답노트 양식.pdf',
        showActions: true,
      },
      {
        id: 's-5',
        improvement: '직접 입력',
        subject: '과목 선택',
        attachment: '파일을 업로드해주세요',
        isPlaceholder: true,
        showActions: false,
        showAdd: true,
      },
    ],
    [],
  )

  return (
    <div className="relative flex w-full flex-col gap-[25px] pb-[80px]">
      <MentorTwoColumnLayout
        left={
          <section className="flex flex-col gap-[25px]">
            <div className="flex items-center">
              <Text
                as="h1"
                className="text-[34px] font-bold leading-[1.35] text-figma-typo-black"
              >
                약점 맞춤 솔루션
              </Text>
            </div>

            <div className="flex flex-col gap-[10px]">
              <Text as="p" className="text-[22px] font-medium leading-[1.2] text-figma-typo-black">
                멘티 선택
              </Text>
              <FormSelectInput
                value="김수험"
                onChange={() => {}}
                options={['김수험', '박모의']}
                size="lg"
              />
            </div>

            <MentorSolutionTable title="보완점" items={solutionItems} />
          </section>
        }
      />
    </div>
  )
}

export default MentorSolutions
