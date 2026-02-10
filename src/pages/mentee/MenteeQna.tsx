import * as React from 'react'
import { Calendar } from '@/components/ui/calendar'
import { CalendarToggle } from '@/components/ui/calendar-toggle'
import FormSectionGroup from '@/components/common/FormSectionGroup'
import FloatingActionButton from '@/components/common/FloatingActionButton'
import Modal from '@/components/common/Modal'
import ModalHeader from '@/components/common/ModalHeader'
import Loading from '@/components/common/Loading'
import { Text } from '@/components/common/Text'
import { Paperclip, X, MoreHorizontal } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import useAuth from '@/store/auth/useAuth'
import useApiRequest from '@/hooks/useApiRequest'
import commentsApi from '@/services/api/comments'
import type { components } from '@/types/api'

type CommonResponseQna = components['schemas']['CommonResponseQnaResponseDto']

type QnaAnswer = {
  id: string
  content: string
}
type QnaItem = {
  id: string
  qnaId?: number
  question: string
  attachments: string[]
  answers: QnaAnswer[]
}
type DraftAttachment = {
  id: string
  name: string
  url: string
  file: File
}
type ExistingAttachment = {
  id: string
  name: string
  url: string
}

function MenteeQna() {
  const { userId } = useAuth()
  const { loading, error, setError, run } = useApiRequest()
  const today = React.useMemo(() => new Date(), [])
  const [selected, setSelected] = React.useState<Date | undefined>(today)
  const [viewMode, setViewMode] = React.useState<'month' | 'week'>('week')
  const [mode, setMode] = React.useState<'create' | 'edit'>('create')
  const [modalOpen, setModalOpen] = React.useState(false)
  const [editingId, setEditingId] = React.useState<number | null>(null)
  const [draftText, setDraftText] = React.useState('')
  const [draftAttachments, setDraftAttachments] = React.useState<DraftAttachment[]>([])
  const [existingAttachments, setExistingAttachments] = React.useState<ExistingAttachment[]>([])
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [qnaItems, setQnaItems] = React.useState<QnaItem[]>([])

  const formattedDate = React.useMemo(() => {
    if (!selected) return ''
    const year = selected.getFullYear()
    const month = String(selected.getMonth() + 1).padStart(2, '0')
    const day = String(selected.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }, [selected])

  const handleAddClick = () => {
    setMode('create')
    setDraftText('')
    setEditingId(null)
    setDraftAttachments([])
    setExistingAttachments([])
    setModalOpen(true)
  }

  const handleEditClick = (id: number) => {
    const target = qnaItems.find((item) => item.qnaId === id)
    if (!target) return
    setMode('edit')
    setEditingId(id)
    setDraftText(target.question)
    setDraftAttachments([])
    setExistingAttachments(
      target.attachments.map((url, index) => ({
        id: `${id}-existing-${index}`,
        name: `첨부 ${index + 1}`,
        url,
      })),
    )
    setModalOpen(true)
  }

  const handleSubmit = async () => {
    if (!draftText.trim()) return
    if (!userId) {
      setError('로그인 후 이용해주세요.')
      return
    }
    const formData = new FormData()
    draftAttachments.forEach((item) => formData.append('files', item.file))

    if (editingId) {
      await run(
        () =>
          commentsApi.updateQna(
            { qnaId: editingId, questionContent: draftText.trim() },
            formData,
          ),
        {
          useOverlay: true,
          overlayMessage: '질문을 수정하는 중...',
        },
      )
    } else {
      await run(
        () =>
          commentsApi.createQna(
            {
              menteeId: userId,
              questionContent: draftText.trim(),
              date: formattedDate,
            },
            formData,
          ),
        {
          useOverlay: true,
          overlayMessage: '질문을 등록하는 중...',
        },
      )
    }
    setModalOpen(false)
    setDraftText('')
    setDraftAttachments([])
    setExistingAttachments([])
    setEditingId(null)
    fetchQna()
  }

  const handleDelete = async (id: number) => {
    await run(() => commentsApi.deleteQna({ qnaId: id }), {
      useOverlay: true,
      overlayMessage: '질문을 삭제하는 중...',
    })
    fetchQna()
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setDraftText('')
    setDraftAttachments([])
    setExistingAttachments([])
    setEditingId(null)
  }

  const handleFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return
    const nextFiles = Array.from(files).map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
      name: file.name,
      url: URL.createObjectURL(file),
      file,
    }))
    setDraftAttachments((prev) => [...prev, ...nextFiles])
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemoveDraftAttachment = (id: string) => {
    setDraftAttachments((prev) => {
      const target = prev.find((item) => item.id === id)
      if (target) URL.revokeObjectURL(target.url)
      return prev.filter((item) => item.id !== id)
    })
  }

  const handleRemoveExistingAttachment = (id: string) => {
    setExistingAttachments((prev) => prev.filter((item) => item.id !== id))
  }

  React.useEffect(() => {
    if (modalOpen) return
    setDraftAttachments((prev) => {
      prev.forEach((item) => URL.revokeObjectURL(item.url))
      return []
    })
  }, [modalOpen])

  const fetchQna = React.useCallback(async () => {
    if (!userId || !formattedDate) {
      setQnaItems([])
      return
    }
    await run(() => commentsApi.getQna({ menteeId: userId, date: formattedDate }), {
      errorMessage: 'Q&A 정보를 불러오지 못했어요.',
      onSuccess: (response) => {
        const qna = (response as CommonResponseQna)?.data
        if (!qna?.qnaId) {
          setQnaItems([])
          return
        }
        setQnaItems([
          {
            id: `q-${qna.qnaId}`,
            qnaId: qna.qnaId,
            question: qna.questionContent ?? '',
            attachments:
              qna.qnaFiles
                ?.map((file) => file.fileUrl)
                .filter((url): url is string => Boolean(url)) ?? [],
            answers: qna.answerContent
              ? [
                {
                  id: `a-${qna.qnaId}`,
                  content: qna.answerContent,
                },
              ]
              : [],
          },
        ])
      },
    })
  }, [formattedDate, run, setQnaItems, userId])

  React.useEffect(() => {
    fetchQna()
  }, [fetchQna])

  return (
    <div className="relative flex w-full flex-col items-center gap-0 pb-[24px]">
      <div className="flex w-full flex-col gap-4 bg-figma-white px-4 pb-4 pt-[8px]">
        <FormSectionGroup>
          <Calendar
            mode="single"
            viewMode={viewMode}
            selected={selected}
            navButtonClassName="rounded-[9px]"
            navButtonStyle={{ backgroundColor: 'var(--figma-card-gray)' }}
            onSelect={setSelected}
            defaultMonth={today}
          />
        </FormSectionGroup>
        <FormSectionGroup className="flex items-center justify-end">
          <CalendarToggle
            label={viewMode === 'week' ? '캘린더 펼치기' : '캘린더 접기'}
            isExpanded={viewMode === 'month'}
            onClick={() => setViewMode((prev) => (prev === 'week' ? 'month' : 'week'))}
          />
        </FormSectionGroup>
      </div>

      <div className="w-full bg-figma-light-gray px-4 pb-[90px] pt-[18px]">
        <FormSectionGroup className="flex flex-col gap-4">
          <div className="flex flex-col gap-[18px]">
            <Text as="h3" className="text-[18px] font-bold leading-6 text-figma-typo-black">
              멘티 질문
            </Text>
            {loading ? (
              <Loading message="Q&A 정보를 불러오는 중..." />
            ) : qnaItems.length ? (
              qnaItems.map((item) => (
                <div key={item.id} className="flex flex-col gap-[12px]">
                  <div className="flex items-center gap-[10px]">
                    <div className="flex-1 rounded-[14px] bg-figma-white px-4 py-[14px]">
                      <Text
                        as="p"
                        className="text-[14px] font-medium leading-[1.4] text-figma-typo-black"
                      >
                        {item.question}
                      </Text>
                    </div>
                    <div className="flex shrink-0 items-center">
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className="flex size-[32px] items-center justify-center text-figma-typo-gray-b"
                            aria-label="질문 메뉴"
                          >
                            <MoreHorizontal className="size-[18px]" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent
                          align="end"
                          sideOffset={8}
                          className="w-[140px] rounded-[16px] border-none bg-figma-white p-[14px] shadow-[0px_2px_20px_0px_rgba(0,0,0,0.1)]"
                        >
                          <div className="flex flex-col gap-[10px]">
                            <button
                              type="button"
                              onClick={() => item.qnaId && handleEditClick(item.qnaId)}
                              className={cn(
                                'text-left text-[14px] font-medium leading-tight text-figma-typo-black',
                              )}
                            >
                              수정
                            </button>
                            <div className="h-px w-full bg-figma-card-gray" />
                            <button
                              type="button"
                              onClick={() => item.qnaId && handleDelete(item.qnaId)}
                              className="text-left text-[14px] font-medium leading-tight text-figma-typo-black"
                            >
                              삭제
                            </button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  {item.attachments.length ? (
                    <div className="overflow-x-auto">
                      <div className="flex gap-[6px]">
                        {item.attachments.map((src, index) => (
                          <div
                            key={`${item.id}-attachment-${index}`}
                            className="h-[70px] w-[70px] shrink-0 overflow-hidden rounded-[10px] bg-figma-white"
                          >
                            <img src={src} alt="" className="h-full w-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {item.answers.length ? (
                    <div className="flex flex-col gap-[10px] pl-[24px]">
                      {item.answers.map((answer) => (
                        <div
                          key={answer.id}
                          className="flex w-full flex-col rounded-[18px] bg-figma-card-gray px-[18px] py-[14px]"
                        >
                          <Text
                            as="p"
                            className="text-[14px] font-medium leading-[1.4] text-figma-typo-black"
                          >
                            {answer.content}
                          </Text>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))
            ) : (
              <Text as="p" className="text-[14px] font-medium text-figma-typo-gray">
                아직 등록된 질문이 없어요.
              </Text>
            )}
            {error ? (
              <Text as="p" className="text-[12px] font-semibold text-figma-sub-color-2">
                {error}
              </Text>
            ) : null}
          </div>
        </FormSectionGroup>
      </div>

      <FloatingActionButton label="질문 추가" onClick={handleAddClick} />

      <Modal
        open={modalOpen}
        onOpenChange={handleCloseModal}
        contentClassName="max-h-[80vh]"
        contentPaddingClassName="px-[5px] py-[12px]"
      >
        <div className="flex max-h-[80vh] flex-col">
          <ModalHeader
            title={mode === 'edit' ? '질문 수정' : '질문 등록'}
            onClose={handleCloseModal}
          />
          <div className="flex-1 overflow-y-auto px-[10px] pb-[12px]">
            <div className="relative">
              <textarea
                value={draftText}
                placeholder="질문을 작성해주세요"
                onChange={(event) => setDraftText(event.target.value)}
                rows={4}
                className="w-full resize-none rounded-[14px] border-none bg-figma-white px-4 pb-[12px] pt-[12px] pr-11 text-[14px] font-medium leading-[1.4] text-figma-typo-black placeholder:text-figma-typo-gray focus:outline-none focus:ring-0"
              />
              <button
                type="button"
                className="absolute right-3 top-[14px] flex size-[28px] items-center justify-center text-figma-typo-gray-b"
                aria-label="첨부 파일"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="size-[20px]" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(event) => handleFilesSelected(event.target.files)}
              />
            </div>
            {existingAttachments.length || draftAttachments.length ? (
              <div className="mt-[10px] max-h-[180px] overflow-y-auto">
                <div className="flex flex-wrap gap-[6px]">
                  {existingAttachments.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleRemoveExistingAttachment(item.id)}
                      className="flex items-center gap-2 rounded-[10px] bg-figma-white px-3 py-2 text-[12px] font-medium text-figma-typo-black"
                    >
                      <span className="truncate">{item.name}</span>
                      <X className="size-[14px] text-figma-typo-gray-b" />
                    </button>
                  ))}
                  {draftAttachments.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleRemoveDraftAttachment(item.id)}
                      className="flex items-center gap-2 rounded-[10px] bg-figma-white px-3 py-2 text-[12px] font-medium text-figma-typo-black"
                    >
                      <span className="truncate">{item.name}</span>
                      <X className="size-[14px] text-figma-typo-gray-b" />
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="mt-[16px] flex items-center justify-end gap-[6px] pb-[6px]">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex h-[48px] w-[120px] items-center justify-center rounded-[14px] bg-figma-point-color-2 text-[14px] font-semibold leading-6 text-white"
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default MenteeQna
