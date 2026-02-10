import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import FormSection from '@/components/common/FormSection'
import FormSectionGroup from '@/components/common/FormSectionGroup'
import FixedActionBar from '@/components/common/FixedActionBar'
import TaskDateMeta from '@/components/common/TaskDateMeta'
import TaskDetailHeader from '@/components/common/TaskDetailHeader'
import UploadBox from '@/components/common/UploadBox'
import SubjectChip from '@/components/common/SubjectChip'
import ActionButtons from '@/components/common/ActionButtons'
import { Text } from '@/components/common/Text'
import { Skeleton } from '@/components/ui/skeleton'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import ImageViewer from '@/components/common/ImageViewer'
import FileDownloadCard from '@/components/common/FileDownloadCard'
import ConfirmModal from '@/components/common/ConfirmModal'
import todosApi from '@/services/api/todos'
import useApiRequest from '@/hooks/useApiRequest'
import type { components } from '@/types/api'
import type { SubjectWithNeutral } from '@/types/ui/subject'
import { toDateText } from '@/lib/date'
import { cn } from '@/lib/utils'
import { MoreHorizontal } from 'lucide-react'
import routePaths from '@/routes/routePaths'
import useTimer from '@/store/timer/useTimer'

function MenteeTodoDetail() {
  const navigate = useNavigate()
  const { todoId } = useParams()
  const { loading, error, run } = useApiRequest()
  const [detail, setDetail] = React.useState<components['schemas']['TodoDetailResponseDto'] | null>(
    null,
  )
  const [uploadedImageUrl, setUploadedImageUrl] = React.useState<string | undefined>(undefined)
  const [isUploading, setIsUploading] = React.useState(false)
  const [uploadError, setUploadError] = React.useState('')
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [timerError, setTimerError] = React.useState('')
  const { activeTodoId, startedAtMs, start, stop } = useTimer()
  const [nowMs, setNowMs] = React.useState(() => Date.now())
  const [pendingSession, setPendingSession] = React.useState<{
    startAt: Date
    endAt: Date
    minutes: number
  } | null>(null)
  const [saveConfirmOpen, setSaveConfirmOpen] = React.useState(false)
  const [shortConfirmOpen, setShortConfirmOpen] = React.useState(false)
  const handleSaveConfirmChange = (open: boolean) => {
    setSaveConfirmOpen(open)
    if (!open) setPendingSession(null)
  }
  const handleShortConfirmChange = (open: boolean) => {
    setShortConfirmOpen(open)
    if (!open) setPendingSession(null)
  }
  const [errorMessage, setErrorMessage] = React.useState('')

  const toSubjectValue = (subject?: string): SubjectWithNeutral | undefined => {
    const normalized = subject?.toLowerCase()
    if (normalized === 'korean' || subject === '국어' || subject === 'KOREAN') return 'korean'
    if (normalized === 'english' || subject === '영어' || subject === 'ENGLISH') return 'english'
    if (normalized === 'math' || subject === '수학' || subject === 'MATH') return 'math'
    return undefined
  }

  const handleEdit = () => {
    if (!todoId) return
    navigate(`${routePaths.menteeTodoCreate}?todoId=${todoId}`)
  }

  const handleDelete = () => {
    setErrorMessage('삭제 기능은 아직 준비 중입니다.')
  }

  React.useEffect(() => {
    if (!todoId) return
    const parsedId = Number(todoId)
    if (Number.isNaN(parsedId)) return
    run(() => todosApi.getTodoDetail({ todoId: parsedId }), {
      errorMessage: '할 일 정보를 불러오지 못했어요.',
      onSuccess: (response) => setDetail(response.data ?? null),
    })
  }, [todoId, run])

  React.useEffect(() => {
    setUploadedImageUrl(detail?.studyVerificationImages?.[0]?.fileUrl)
  }, [detail])

  React.useEffect(() => {
    if (!startedAtMs) return
    const id = setInterval(() => setNowMs(Date.now()), 1000)
    return () => clearInterval(id)
  }, [startedAtMs])

  const fetchDetail = React.useCallback(() => {
    if (!todoId) return
    const parsedId = Number(todoId)
    if (Number.isNaN(parsedId)) return
    run(() => todosApi.getTodoDetail({ todoId: parsedId }), {
      errorMessage: '할 일 정보를 불러오지 못했어요.',
      onSuccess: (response) => setDetail(response.data ?? null),
    })
  }, [todoId, run])

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click()
  }

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    if (!todoId) return
    const parsedId = Number(todoId)
    if (Number.isNaN(parsedId)) return

    const formData = new FormData()
    Array.from(files).forEach((file) => formData.append('images', file))

    setIsUploading(true)
    setUploadError('')
    const hasExisting = (detail?.studyVerificationImages?.length ?? 0) > 0
    try {
      if (hasExisting) {
        await todosApi.updateTodoVerification({ todoId: parsedId }, formData)
      } else {
        await todosApi.uploadTodoVerification({ todoId: parsedId }, formData)
      }
      fetchDetail()
    } catch {
      setUploadError('인증 사진을 업로드하지 못했어요.')
    }
    setIsUploading(false)
  }

  const handleDeleteVerification = async () => {
    if (!todoId) return
    const parsedId = Number(todoId)
    if (Number.isNaN(parsedId)) return
    setIsUploading(true)
    setUploadError('')
    try {
      await todosApi.deleteTodoVerification({ todoId: parsedId })
      fetchDetail()
    } catch {
      setUploadError('인증 사진을 삭제하지 못했어요.')
    }
    setIsUploading(false)
  }

  const formatLocalDateTime = (date: Date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    const hh = String(date.getHours()).padStart(2, '0')
    const mm = String(date.getMinutes()).padStart(2, '0')
    const ss = String(date.getSeconds()).padStart(2, '0')
    return `${y}-${m}-${d}T${hh}:${mm}:${ss}`
  }

  const formatElapsed = (startMs: number, endMs: number) => {
    const totalSeconds = Math.max(0, Math.floor((endMs - startMs) / 1000))
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  const todoIdValue = React.useMemo(() => {
    if (!todoId) return null
    const parsed = Number(todoId)
    return Number.isNaN(parsed) ? null : parsed
  }, [todoId])
  const isRunning = todoIdValue != null && activeTodoId === todoIdValue && startedAtMs != null
  const isOtherRunning = todoIdValue != null && activeTodoId != null && activeTodoId !== todoIdValue
  const timeText = isRunning && startedAtMs ? formatElapsed(startedAtMs, nowMs) : isOtherRunning ? '진행중' : '00:00:00'

  const handleStartTimer = () => {
    if (!todoIdValue) return
    setTimerError('')
    const result = start(todoIdValue)
    if (!result.ok && result.reason === 'other-task') {
      setTimerError('이미 다른 과제를 진행 중이에요.')
    }
  }

  const handleStopTimer = async () => {
    if (!todoIdValue) return
    setTimerError('')
    const session = stop(todoIdValue)
    if (!session) return
    const minutes = (session.endAt.getTime() - session.startAt.getTime()) / 60000
    setPendingSession({ ...session, minutes })
    if (minutes < 10) {
      setShortConfirmOpen(true)
    } else {
      setSaveConfirmOpen(true)
    }
  }

  const handleConfirmSave = async () => {
    if (!todoIdValue || !pendingSession) return
    await run(
      () =>
        todosApi.addTimerSession(
          { todoId: todoIdValue },
          {
            startAt: formatLocalDateTime(pendingSession.startAt),
            endAt: formatLocalDateTime(pendingSession.endAt),
          },
        ),
      { errorMessage: '타이머 저장에 실패했어요.' },
    )
    setPendingSession(null)
  }

  const handleDiscardSession = () => {
    setPendingSession(null)
  }

  const handleContinueSession = () => {
    if (!todoIdValue || !pendingSession) return
    start(todoIdValue, pendingSession.startAt.getTime())
    setPendingSession(null)
  }

  if (error) {
    throw new Error(error)
  }

  return (
    <div className="flex w-full flex-col items-center gap-0">
      <div className="w-full px-4 pb-[120px] pt-[8px]">
        <FormSectionGroup className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 px-1 pt-2">
            {loading ? (
              <>
                <Skeleton className="h-[26px] w-[220px] rounded-[8px]" />
                <Skeleton className="h-[18px] w-[160px] rounded-[8px]" />
              </>
            ) : (
              <>
                <TaskDetailHeader
                  title={detail?.title ?? '-'}
                  subtitle={detail?.content ?? ''}
                  timeText={timeText}
                  onStart={handleStartTimer}
                  onStop={handleStopTimer}
                  isRunning={isRunning}
                  disabled={!todoIdValue}
                />
                <div className="flex items-center gap-2">
                  <TaskDateMeta dateText={toDateText(detail?.date)} />
                  {detail?.subject ? (
                    <SubjectChip
                      label={detail.subject}
                      subject={toSubjectValue(detail.subject) ?? 'neutral'}
                    />
                  ) : null}
                </div>
              </>
            )}
          </div>

          {loading ? (
            <Skeleton className="h-[80px] w-full rounded-[18px]" />
          ) : detail?.workbooks?.length ? (
            <FormSection title="학습지">
              <div className="flex flex-col gap-2">
                {detail.workbooks.map((item) => (
                  <FileDownloadCard
                    key={item.fileUrl ?? item.fileName ?? 'workbook'}
                    title={item.fileName ?? '학습지'}
                    fileUrl={item.fileUrl}
                    fileName={item.fileName}
                  />
                ))}
              </div>
            </FormSection>
          ) : null}

          <FormSection title="공부 인증 업로드">
            <div className="flex flex-col gap-2">
              <p className="text-[13px] font-medium leading-6 text-figma-typo-gray">
                멘토의 피드백을 원하는 경우 사진 업로드하기
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(event) => {
                  void handleUpload(event.target.files)
                  event.currentTarget.value = ''
                }}
              />
              {uploadedImageUrl ? (
                <ImageViewer
                  imageUrl={uploadedImageUrl}
                  overlay={
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="flex size-[28px] items-center justify-center rounded-full bg-figma-white/80 text-figma-typo-gray-b shadow-sm backdrop-blur"
                          aria-label="인증 사진 메뉴"
                        >
                          <MoreHorizontal className="size-[18px]" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent
                        align="end"
                        sideOffset={8}
                        className="w-[165px] rounded-[18px] border-none bg-figma-white p-[16px] shadow-[0px_2px_20px_0px_rgba(0,0,0,0.1)]"
                      >
                        <div className="flex flex-col gap-[10px]">
                          <button
                            type="button"
                            onClick={handleOpenFilePicker}
                            className="text-left text-[16px] font-medium leading-tight text-figma-typo-black"
                          >
                            수정
                          </button>
                          <div className="h-px w-full bg-figma-card-gray" />
                          <button
                            type="button"
                            onClick={handleDeleteVerification}
                            className={cn(
                              'text-left text-[16px] font-medium leading-tight text-figma-typo-black',
                              isUploading && 'cursor-not-allowed opacity-50',
                            )}
                            disabled={isUploading}
                          >
                            삭제
                          </button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  }
                />
              ) : (
                <UploadBox onClick={handleOpenFilePicker} />
              )}
            </div>
          </FormSection>
          {isUploading ? (
            <Text as="p" className="px-1 text-[12px] font-semibold text-figma-typo-gray">
              업로드 중...
            </Text>
          ) : uploadError ? (
            <Text as="p" className="px-1 text-[12px] font-semibold text-figma-sub-color-2">
              {uploadError}
            </Text>
          ) : null}
          {timerError ? (
            <Text as="p" className="px-1 text-[12px] font-semibold text-figma-sub-color-2">
              {timerError}
            </Text>
          ) : null}
          {errorMessage ? (
            <Text as="p" className="px-1 text-[12px] font-semibold text-figma-sub-color-2">
              {errorMessage}
            </Text>
          ) : null}
        </FormSectionGroup>
        <ConfirmModal
          open={saveConfirmOpen}
          onOpenChange={handleSaveConfirmChange}
          title="공부 기록을 저장할까요?"
          description={['확인 버튼을 누르면 기록이 저장됩니다.']}
          primaryLabel="저장하기"
          secondaryLabel="취소"
          onPrimary={handleConfirmSave}
          onSecondary={handleDiscardSession}
        />
        <ConfirmModal
          open={shortConfirmOpen}
          onOpenChange={handleShortConfirmChange}
          title="10분 미만 기록은 저장되지 않아요."
          description={['조금 더 공부해서 기록할까요?']}
          primaryLabel="더 공부하기"
          secondaryLabel="기록하지 않기"
          onPrimary={handleContinueSession}
          onSecondary={handleDiscardSession}
        />
      </div>
      <FixedActionBar>
        <ActionButtons
          mode="detail"
          size="mobile"
          primaryLabel="수정"
          secondaryLabel="삭제"
          onPrimary={handleEdit}
          onSecondary={handleDelete}
          useTempSaveButton={false}
          className="w-full gap-[8px]"
          primaryButtonClassName="w-full"
          secondaryButtonClassName="w-full"
        />
      </FixedActionBar>
    </div>
  )
}

export default MenteeTodoDetail
