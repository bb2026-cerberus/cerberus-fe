import { useMemo, useState } from 'react'

import MentorQnaCard from '@/components/common/MentorQnaCard'
import MentorQnaDetailPanel from '@/components/common/MentorQnaDetailPanel'
import { Text } from '@/components/common/Text'
import { Calendar } from '@/components/ui/calendar'
import { CalendarToggle } from '@/components/ui/calendar-toggle'

type MentorQnaItem = {
  id: string
  name: string
  question: string
}

function MentorQna() {
  const today = useMemo(() => new Date(), [])
  const [selected, setSelected] = useState<Date | undefined>(today)
  const [viewMode, setViewMode] = useState<'month' | 'week'>('week')
  const [comment, setComment] = useState('')
  const [selectedQuestion, setSelectedQuestion] = useState<MentorQnaItem>({
    id: 'q-1',
    name: '김수험',
    question: '수학 모의고사 시간 분배를 어떻게 해야할 지 모르겠어요',
  })

  const qnaItems = useMemo<MentorQnaItem[]>(
    () => [
      {
        id: 'q-1',
        name: '김수험',
        question: '수학 모의고사 시간 분배를 어떻게 해야할 지 모르겠어요',
      },
      {
        id: 'q-2',
        name: '박모의',
        question: '영어 단어 외우기가 힘들어요. 쉽게 외우는 노하우를 알려주세요.',
      },
    ],
    [],
  )

  const handleSelectQuestion = (item: MentorQnaItem) => {
    setSelectedQuestion(item)
  }

  const handleSubmit = () => {
    setComment('')
  }

  const handleTempSave = () => {
    setComment(comment)
  }

  return (
    <div className="flex flex-col gap-[25px]">
      <div className="grid gap-[30px] xl:grid-cols-[800px_810px]">
        <section className="flex flex-col gap-[25px]">
          <div className="flex items-center">
            <Text
              as="h1"
              className="text-[34px] font-bold leading-[1.35] text-figma-typo-black"
            >
              Q&amp;A
            </Text>
          </div>

          <div className="flex flex-col gap-[12px]">
            <div className="rounded-[20px] bg-figma-white px-[30px] pb-[31px] pt-[13px]">
              <Calendar
                mode="single"
                viewMode={viewMode}
                selected={selected}
                onSelect={setSelected}
                defaultMonth={today}
                className="pb-[10px]"
                navButtonClassName="text-figma-typo-black"
                navButtonStyle={{ backgroundColor: 'transparent' }}
              />
            </div>

            <CalendarToggle
              label={viewMode === 'week' ? '캘린더 펼치기' : '캘린더 접기'}
              isExpanded={viewMode === 'month'}
              onClick={() => setViewMode((prev) => (prev === 'week' ? 'month' : 'week'))}
              className="justify-end text-figma-typo-gray"
            />
          </div>

          <div className="flex flex-col gap-[10px]">
            {qnaItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectQuestion(item)}
                className="text-left"
              >
                <MentorQnaCard name={item.name} question={item.question} />
              </button>
            ))}
          </div>
        </section>

        <MentorQnaDetailPanel
          title="Q&amp;A 작성"
          question={selectedQuestion.question}
          questionImageUrl="/pwa-512.png"
          comment={comment}
          onCommentChange={setComment}
          onSubmit={handleSubmit}
          onTempSave={handleTempSave}
        />
      </div>
    </div>
  )
}

export default MentorQna
