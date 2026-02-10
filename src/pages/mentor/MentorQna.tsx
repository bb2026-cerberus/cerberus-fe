import { useMemo, useState, useCallback, useEffect } from 'react'

import MentorQnaCard from '@/components/common/MentorQnaCard'
import MentorQnaDetailPanel from '@/components/common/MentorQnaDetailPanel'
import MentorTwoColumnLayout from '@/components/layout/MentorTwoColumnLayout'
import Loading from '@/components/common/Loading'
import { Text } from '@/components/common/Text'
import { Calendar } from '@/components/ui/calendar'
import { CalendarToggle } from '@/components/ui/calendar-toggle'
import { cn } from '@/lib/utils'
import useAuth from '@/store/auth/useAuth'
import useApiRequest from '@/hooks/useApiRequest'
import commentsApi from '@/services/api/comments'
import type { components } from '@/types/api'

type ListQnaResponse = components['schemas']['CommonResponseListQnaResponseDto']
type DetailQnaResponse = components['schemas']['CommonResponseQnaResponseDto']

type MentorQnaItem = {
  id: string
  qnaId?: number
  name: string
  question: string
  comment?: string
  attachments?: string[]
}

function MentorQna() {
  const { userId, role } = useAuth()
  const { loading, error, setError, run } = useApiRequest()
  const selectedItemClass =
    "relative overflow-hidden border border-figma-point-color-2/30 bg-figma-card-gray before:absolute before:left-0 before:top-0 before:h-full before:w-[4px] before:bg-figma-point-color-2 before:rounded-l-[18px] before:content-['']"
  const today = useMemo(() => new Date(), [])
  const [selected, setSelected] = useState<Date | undefined>(today)
  const [viewMode, setViewMode] = useState<'month' | 'week'>('week')
  const [detailOpen, setDetailOpen] = useState(false)
  const [qnaItems, setQnaItems] = useState<MentorQnaItem[]>([])
  const [selectedQuestion, setSelectedQuestion] = useState<MentorQnaItem | null>(null)
  const [comment, setComment] = useState('')
  const [savedComment, setSavedComment] = useState('')
  const [isEditingComment, setIsEditingComment] = useState(false)
  const [editDraft, setEditDraft] = useState('')
  const commentThread = useMemo(
    () =>
      selectedQuestion
        ? [
            {
              id: `${selectedQuestion.id}-mentee-1`,
              role: 'mentee' as const,
              content: selectedQuestion.question,
            },
            {
              id: `${selectedQuestion.id}-mentor-1`,
              role: 'mentor' as const,
              content: savedComment || '멘토 코멘트를 작성해주세요.',
            },
          ]
        : [],
    [savedComment, selectedQuestion],
  )

  const handleSelectQuestion = useCallback(
    (item: MentorQnaItem) => {
      setSelectedQuestion(item)
      const initial = item.comment ?? ''
      setComment(initial)
      setSavedComment(initial)
      setIsEditingComment(false)
      setEditDraft(initial)
      setDetailOpen(true)
    },
    [],
  )

  const fetchQnaList = useCallback(async () => {
    if (!userId || !role) {
      setError('로그인 후 이용해주세요.')
      return
    }
    const response = await run(() =>
      commentsApi.getQnasByMentorId({ mentorId: userId, userRole: role }),
    )
    const list = (response as ListQnaResponse)?.data ?? []
    if (!list.length) {
      setQnaItems([])
      setSelectedQuestion(null)
      setComment('')
      setSavedComment('')
      return
    }
    const detailItems = await Promise.all(
      list.map(async (item) => {
        if (!item.qnaId) return null
        const detail = await commentsApi.getQnaDetail({ qnaId: item.qnaId })
        const data = (detail as DetailQnaResponse)?.data
        return {
          id: `q-${item.qnaId}`,
          qnaId: item.qnaId,
          name: (item as { menteeName?: string }).menteeName ?? '멘티',
          question: data?.questionContent ?? '',
          comment: data?.answerContent ?? '',
          attachments:
            data?.qnaFiles
              ?.map((file) => file.fileUrl)
              .filter((url): url is string => Boolean(url)) ?? [],
        } as MentorQnaItem
      }),
    )
    const resolved = detailItems.filter((item): item is MentorQnaItem => Boolean(item))
    setQnaItems(resolved)
    if (resolved.length) {
      handleSelectQuestion(resolved[0])
    }
  }, [handleSelectQuestion, role, run, setError, userId])

  useEffect(() => {
    fetchQnaList()
  }, [fetchQnaList])

  const submitAnswer = useCallback(
    async (nextComment: string) => {
      if (!selectedQuestion || selectedQuestion.qnaId == null || !userId || !role) return
      const { qnaId } = selectedQuestion
      const result = await run(
        () =>
          commentsApi.answerQna(
            { userId, userRole: role },
            { qnaId, answerContent: nextComment },
          ),
        {
          useOverlay: true,
          overlayMessage: '코멘트를 저장하는 중...',
        },
      )
      if (result == null) return
      setComment(nextComment)
      setSavedComment(nextComment)
      setQnaItems((prev) =>
        prev.map((item) =>
          item.qnaId === selectedQuestion.qnaId ? { ...item, comment: nextComment } : item,
        ),
      )
      setSelectedQuestion((prev) => (prev ? { ...prev, comment: nextComment } : prev))
    },
    [role, run, selectedQuestion, userId],
  )

  const handleSubmit = () => {
    submitAnswer(comment)
  }

  const handleEditComment = () => {
    setIsEditingComment(true)
    setEditDraft(comment)
  }

  const handleDeleteComment = () => {
    submitAnswer('')
  }

  const handleCancelEdit = () => {
    setIsEditingComment(false)
    setEditDraft(comment)
  }

  const handleSaveEdit = () => {
    const next = editDraft.trim()
    submitAnswer(next)
    setIsEditingComment(false)
  }

  return (
    <div className="flex flex-col gap-[25px]">
      <MentorTwoColumnLayout
        mobileDetailOpen={detailOpen}
        onMobileDetailClose={() => setDetailOpen(false)}
        mobileDetailTitle="Q&A"
        mobileActionBar={null}
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
              {loading ? (
                <Loading message="Q&A 정보를 불러오는 중..." />
              ) : qnaItems.length ? (
                qnaItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectQuestion(item)}
                    className="text-left"
                  >
                    <MentorQnaCard
                      name={item.name}
                      question={item.question}
                      className={cn(item.id === selectedQuestion?.id && selectedItemClass)}
                    />
                  </button>
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
          </section>
        }
        right={
          selectedQuestion ? (
            <MentorQnaDetailPanel
              title="Q&amp;A 작성"
              question={selectedQuestion.question}
              questionImageUrls={selectedQuestion.attachments ?? []}
              comment={comment}
              commentThread={commentThread}
              showQuestionSection={false}
              onCommentChange={setComment}
              onSubmit={handleSubmit}
              onCommentEdit={handleEditComment}
              onCommentDelete={handleDeleteComment}
              isEditingComment={isEditingComment}
              editValue={editDraft}
              onEditChange={setEditDraft}
              onEditCancel={handleCancelEdit}
              onEditSave={handleSaveEdit}
            />
          ) : (
            <div className="pt-[20px] text-figma-typo-gray">선택된 질문이 없어요.</div>
          )
        }
      />
    </div>
  )
}

export default MentorQna
