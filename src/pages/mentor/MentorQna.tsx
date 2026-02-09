import { useMemo, useState } from 'react'

import MentorQnaCard from '@/components/common/MentorQnaCard'
import MentorQnaDetailPanel from '@/components/common/MentorQnaDetailPanel'
import MentorTwoColumnLayout from '@/components/common/MentorTwoColumnLayout'
import { Text } from '@/components/common/Text'
import { Calendar } from '@/components/ui/calendar'
import { CalendarToggle } from '@/components/ui/calendar-toggle'
import MentorActionButtons from '@/components/common/MentorActionButtons'
import { cn } from '@/lib/utils'

type MentorQnaItem = {
  id: string
  name: string
  question: string
}

function MentorQna() {
  const selectedItemClass =
    "relative overflow-hidden border border-figma-point-color-2/30 bg-figma-card-gray before:absolute before:left-0 before:top-0 before:h-full before:w-[4px] before:bg-figma-point-color-2 before:rounded-l-[18px] before:content-['']"
  const today = useMemo(() => new Date(), [])
  const [selected, setSelected] = useState<Date | undefined>(today)
  const [viewMode, setViewMode] = useState<'month' | 'week'>('week')
  const [comment, setComment] = useState('')
  const [detailOpen, setDetailOpen] = useState(false)
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
    setDetailOpen(true)
  }

  const handleSubmit = () => {
    setComment('')
  }

  const handleTempSave = () => {
    setComment(comment)
  }

  return (
    <div className="flex flex-col gap-[25px]">
      <MentorTwoColumnLayout
        mobileDetailOpen={detailOpen}
        onMobileDetailClose={() => setDetailOpen(false)}
        mobileDetailTitle="Q&A"
        mobileActionBar={
          <MentorActionButtons
            mode="create"
            onPrimary={handleSubmit}
            onSecondary={handleTempSave}
            useTempSaveButton={false}
            primaryLabel="등록"
            secondaryLabel="임시저장"
            size="mobile"
            className="w-full gap-[8px]"
            primaryButtonClassName="w-full"
            secondaryButtonClassName="w-full"
          />
        }
        left={
          <section className="flex flex-col gap-[25px]">
            <div className="hidden items-center lg:flex">
              <Text
                as="h1"
                className="text-[28px] font-bold leading-[1.3] text-figma-typo-black"
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
                  <MentorQnaCard
                    name={item.name}
                    question={item.question}
                    className={cn(item.id === selectedQuestion.id && selectedItemClass)}
                  />
                </button>
              ))}
            </div>
          </section>
        }
        right={
          <MentorQnaDetailPanel
            title="Q&amp;A 작성"
            question={selectedQuestion.question}
            questionImageUrl="/pwa-512.png"
            comment={comment}
            onCommentChange={setComment}
            onSubmit={handleSubmit}
            onTempSave={handleTempSave}
          />
        }
      />
    </div>
  )
}

export default MentorQna
