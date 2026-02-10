import ActionButtons from '@/components/common/ActionButtons'
import { Text } from '@/components/common/Text'
import { cn } from '@/lib/utils'

type MentorWeeklyReportMode = 'detail' | 'edit'

type MentorWeeklyReportDetailPanelProps = {
  title: string
  mode: MentorWeeklyReportMode
  summary: string
  onSummaryChange: (value: string) => void
  strengths: string[]
  onStrengthsChange: (value: string[]) => void
  improvements: string[]
  onImprovementsChange: (value: string[]) => void
  onPrimary?: () => void
  onSecondary?: () => void
  tempSaveCount?: number
  onTempSave?: () => void
  onTempSaveListOpen?: () => void
  className?: string
}

const textAreaBase =
  'w-full rounded-[16px] bg-figma-white px-[20px] py-[16px] text-[16px] font-medium leading-[1.4] text-figma-typo-black outline-none placeholder:text-figma-typo-gray'

function MentorWeeklyReportDetailPanel({
  title,
  mode,
  summary,
  onSummaryChange,
  strengths,
  onStrengthsChange,
  improvements,
  onImprovementsChange,
  onPrimary,
  onSecondary,
  tempSaveCount = 0,
  onTempSave,
  onTempSaveListOpen,
  className,
}: MentorWeeklyReportDetailPanelProps) {
  const strengthsText = strengths.join('\n')
  const improvementsText = improvements.join('\n')

  return (
    <section className={cn('flex flex-col gap-[20px] pt-[20px] lg:pt-[44px] xl:pt-[69px]', className)}>
      <div className="flex items-center justify-between">
        <Text as="h2" className="text-[18px] font-semibold leading-6 text-figma-typo-black">
          {title}
        </Text>
        <ActionButtons
          mode={mode}
          onPrimary={onPrimary}
          onSecondary={mode === 'edit' ? onTempSave : onSecondary}
          useTempSaveButton={mode === 'edit'}
          tempSaveCount={tempSaveCount}
          onTempSaveListOpen={onTempSaveListOpen}
          primaryLabel={mode === 'edit' ? '저장' : '수정'}
          secondaryLabel={mode === 'edit' ? '임시저장' : '삭제'}
          size="pc"
          className="hidden lg:flex"
        />
      </div>

      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[10px]">
          <Text as="p" className="text-[18px] font-medium leading-[1.2] text-figma-typo-black">
            멘토 총평
          </Text>
          {mode === 'detail' ? (
            <div className="rounded-[16px] bg-figma-white p-[20px]">
              <Text as="p" className="text-[16px] font-medium leading-[1.4] text-figma-typo-black">
                {summary}
              </Text>
            </div>
          ) : (
            <textarea
              value={summary}
              onChange={(event) => onSummaryChange(event.target.value)}
              className={textAreaBase}
              rows={5}
              placeholder="멘토 총평을 작성하세요"
            />
          )}
        </div>

        <div className="flex flex-col gap-[10px]">
          <Text as="p" className="text-[18px] font-medium leading-[1.2] text-figma-typo-black">
            이번주 잘한점
          </Text>
          {mode === 'detail' ? (
            <div className="rounded-[16px] bg-figma-white p-[20px]">
              <ul className="list-disc pl-[20px] text-[16px] font-medium leading-[1.4] text-figma-typo-black">
                {strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : (
            <textarea
              value={strengthsText}
              onChange={(event) =>
                onStrengthsChange(
                  event.target.value
                    .split('\n')
                    .map((item) => item.trim())
                    .filter(Boolean),
                )
              }
              className={textAreaBase}
              rows={4}
              placeholder="줄바꿈으로 항목을 구분해주세요"
            />
          )}
        </div>

        <div className="flex flex-col gap-[10px]">
          <Text as="p" className="text-[18px] font-medium leading-[1.2] text-figma-typo-black">
            다음주 보완점
          </Text>
          {mode === 'detail' ? (
            <div className="rounded-[16px] bg-figma-white p-[20px]">
              <ul className="list-disc pl-[20px] text-[16px] font-medium leading-[1.4] text-figma-typo-black">
                {improvements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : (
            <textarea
              value={improvementsText}
              onChange={(event) =>
                onImprovementsChange(
                  event.target.value
                    .split('\n')
                    .map((item) => item.trim())
                    .filter(Boolean),
                )
              }
              className={textAreaBase}
              rows={4}
              placeholder="줄바꿈으로 항목을 구분해주세요"
            />
          )}
        </div>
      </div>
    </section>
  )
}

export type { MentorWeeklyReportDetailPanelProps, MentorWeeklyReportMode }
export default MentorWeeklyReportDetailPanel
