import { useMemo, useState } from 'react'

import DeleteConfirmModal from '@/components/common/DeleteConfirmModal'
import MentorQnaCard from '@/components/common/MentorQnaCard'
import MentorWeeklyReportDetailPanel from '@/components/common/MentorWeeklyReportDetailPanel'
import MentorWeeklyReportEmptyCard from '@/components/common/MentorWeeklyReportEmptyCard'
import MentorTwoColumnLayout from '@/components/common/MentorTwoColumnLayout'
import TempSavePanel from '@/components/common/TempSavePanel'
import { Text } from '@/components/common/Text'
import WeekSelector from '@/components/common/WeekSelector'
import { cn } from '@/lib/utils'

type ReportMode = 'empty' | 'detail' | 'edit'

type WeeklyReportSummary = {
  id: string
  mentee: string
  title: string
  hasReport: boolean
}

function MentorReports() {
  const selectedItemClass =
    "relative overflow-hidden border border-figma-point-color-2/30 bg-figma-card-gray before:absolute before:left-0 before:top-0 before:h-full before:w-[4px] before:bg-figma-point-color-2 before:rounded-l-[18px] before:content-['']"
  const [mode, setMode] = useState<ReportMode>('empty')
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [tempSaveOpen, setTempSaveOpen] = useState(false)

  const weekLabel = '2026년 2월 1주차'

  const reportItems = useMemo<WeeklyReportSummary[]>(
    () => [
      {
        id: 'r-1',
        mentee: '김수험',
        title: '영어 모의고사 시간 분배 잘하기',
        hasReport: true,
      },
      {
        id: 'r-2',
        mentee: '박모의',
        title: '수학 오답노트 꼼꼼히 하기',
        hasReport: true,
      },
      {
        id: 'r-3',
        mentee: '정모의',
        title: '',
        hasReport: false,
      },
    ],
    [],
  )

  const [summary, setSummary] = useState(
    '이번 주 학습 기록을 보면 전반적인 참여도와 지속성이 안정적으로 유지된 점이 인상적입니다. 계획한 학습 시간을 크게 벗어나지 않았고, 질문을 통해 이해가 부족한 부분을 점검하려는 태도도 긍정적으로 보입니다. 특히 학습 내용을 단순 수행에 그치지 않고 스스로 점검하려는 시도가 나타난 점은 좋은 성장 신호입니다. 다만 일부 구간에서는 학습 밀도가 일정하지 않아 집중도가 흔들리는 패턴이 보이며, 시간 활용의 효율성을 조금 더 개선할 여지가 있습니다. 다음 주에는 현재의 꾸준함을 유지하면서 학습 전 목표 설정과 학습 후 간단한 정리 과정을 추가한다면 이해도와 성취감이 더 높아질 것으로 기대됩니다.',
  )
  const [strengths, setStrengths] = useState<string[]>([
    '계획한 학습 시간의 안정적인 유지',
    '궁금한 점을 질문으로 정리하는 적극적인 태도',
    '학습 기록을 빠짐없이 남긴 점',
    '과제 수행 마감 준수',
  ])
  const [improvements, setImprovements] = useState<string[]>([
    '학습 시작 전 목표 범위 명확히 설정',
    '집중이 흐트러지는 구간 시간 관리 개선',
    '풀이/정리 과정 기록 습관 강화',
    '복습 시간 별도 확보',
  ])

  const tempSaveItems = useMemo(
    () => [
      { title: '수학 학습 리포트', dateText: '2026.02.02' },
      { title: '영어 학습 리포트', dateText: '2026.02.01' },
    ],
    [],
  )

  const handleSelectReport = (item: WeeklyReportSummary) => {
    setSelectedReportId(item.id)
    setMode(item.hasReport ? 'detail' : 'edit')
  }

  const handleCreate = (item: WeeklyReportSummary) => {
    setSelectedReportId(item.id)
    setSummary('')
    setStrengths([])
    setImprovements([])
    setMode('edit')
  }

  const handleEdit = () => {
    setMode('edit')
  }

  const handleSave = () => {
    setMode('detail')
  }

  const handleDelete = () => {
    setSelectedReportId(null)
    setMode('empty')
  }

  const showDetail = mode !== 'empty'

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
                주간 리포트
              </Text>
            </div>

            <WeekSelector
              label={weekLabel}
              buttonClassName="size-[32px] rounded-[9px] bg-figma-card-gray"
              labelClassName="rounded-[6px] bg-figma-card-gray px-2 py-1"
              labelTextClassName="text-[14px] font-semibold leading-6 text-figma-typo-gray-b"
              className="gap-[10px]"
            />

            <div className="flex flex-col gap-[10px]">
              {reportItems.map((item) =>
                item.hasReport ? (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectReport(item)}
                    className="text-left"
                  >
                    <MentorQnaCard
                      name={item.mentee}
                      question={item.title}
                      className={cn(item.id === selectedReportId && selectedItemClass)}
                    />
                  </button>
                ) : (
                  <MentorWeeklyReportEmptyCard
                    key={item.id}
                    name={item.mentee}
                    onCreate={() => handleCreate(item)}
                    className={cn(item.id === selectedReportId && selectedItemClass)}
                  />
                ),
              )}
            </div>
          </section>
        }
        right={
          showDetail ? (
            <MentorWeeklyReportDetailPanel
              title="주간리포트 작성"
              mode={mode === 'detail' ? 'detail' : 'edit'}
              summary={summary}
              onSummaryChange={setSummary}
              strengths={strengths}
              onStrengthsChange={setStrengths}
              improvements={improvements}
              onImprovementsChange={setImprovements}
              onPrimary={mode === 'detail' ? handleEdit : handleSave}
              onSecondary={() => setDeleteOpen(true)}
              tempSaveCount={tempSaveItems.length}
              onTempSave={() => setTempSaveOpen(false)}
              onTempSaveListOpen={() => setTempSaveOpen(true)}
            />
          ) : undefined
        }
      />

      <TempSavePanel
        open={tempSaveOpen}
        items={tempSaveItems}
        onClose={() => setTempSaveOpen(false)}
      />

      <DeleteConfirmModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="주간 리포트를 삭제하시겠습니까?"
        description={['해당 리포트는 삭제 후 복구할 수 없습니다.']}
        onConfirm={handleDelete}
      />
    </div>
  )
}

export default MentorReports
