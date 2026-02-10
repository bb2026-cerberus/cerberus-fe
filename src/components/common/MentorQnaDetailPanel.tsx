import * as React from 'react'
import FormSectionGroup from '@/components/common/FormSectionGroup'
import { Text } from '@/components/common/Text'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { MoreHorizontal, Send } from 'lucide-react'

type MentorQnaDetailPanelProps = {
  title: string
  question: string
  questionImageUrls?: string[]
  comment: string
  commentThread?: { id: string; role: 'mentee' | 'mentor'; content: string }[]
  showQuestionSection?: boolean
  onCommentChange: (value: string) => void
  onSubmit?: () => void
  onCommentEdit?: () => void
  onCommentDelete?: () => void
  isEditingComment?: boolean
  editValue?: string
  onEditChange?: (value: string) => void
  onEditCancel?: () => void
  onEditSave?: () => void
}

function MentorQnaDetailPanel({
  title,
  question,
  questionImageUrls = [],
  comment,
  commentThread,
  showQuestionSection = true,
  onCommentChange,
  onSubmit,
  onCommentEdit,
  onCommentDelete,
  isEditingComment = false,
  editValue = '',
  onEditChange,
  onEditCancel,
  onEditSave,
}: MentorQnaDetailPanelProps) {
  const fallbackThread = React.useMemo(
    () => [
      {
        id: 'mentor-comment',
        role: 'mentor' as const,
        content: comment || '멘토 코멘트를 작성해주세요.',
      },
    ],
    [comment],
  )
  const hasThread = Boolean(commentThread?.length)
  const thread = hasThread ? commentThread! : fallbackThread
  const lastMentorIndex = React.useMemo(() => {
    for (let i = thread.length - 1; i >= 0; i -= 1) {
      if (thread[i].role === 'mentor') return i
    }
    return -1
  }, [thread])

  const canDelete = hasThread ? Boolean(onCommentDelete) : true
  const handleDeleteComment = () => {
    if (onCommentDelete) {
      onCommentDelete()
    } else if (!hasThread) {
      onCommentChange('')
    }
  }

  return (
    <section className="flex flex-col gap-[20px] pt-[20px] lg:pt-[44px] xl:pt-[69px]">
      <div className="flex items-center justify-between">
        <Text as="h2" className="text-[18px] font-semibold leading-6 text-figma-typo-black">
          {title}
        </Text>
      </div>

      <FormSectionGroup className="flex flex-col gap-4 pl-[10px]">
        {showQuestionSection ? (
          <div className="flex flex-col gap-[10px]">
            <Text as="p" className="text-[18px] font-medium leading-[1.2] text-figma-typo-black">
              멘티 질문
            </Text>
            <div className="flex min-h-[60px] items-center rounded-[18px] bg-figma-white px-[24px] py-[14px]">
              <Text as="p" className="text-[16px] font-semibold leading-6 text-figma-typo-black">
                {question}
              </Text>
            </div>
            {questionImageUrls.length ? (
              <div className="overflow-x-auto">
                <div className="flex gap-[10px]">
                  {questionImageUrls.map((url, index) => (
                    <div
                      key={`${url}-${index}`}
                      className="h-[150px] w-[150px] shrink-0 overflow-hidden rounded-[18px] bg-figma-white"
                    >
                      <img src={url} alt="" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {hasThread ? (
        <div className="flex flex-col gap-[10px]">
          {thread.map((item, index) => {
            const isMentor = item.role === 'mentor'
            const isEditingTarget = isEditingComment && index === lastMentorIndex
            return (
              <div
                key={item.id}
                className={cn(
                  'flex',
                  isMentor ? 'justify-end pr-[60px]' : 'justify-start pl-[60px]',
                )}
              >
                <div
                  className={cn(
                    'relative w-full rounded-[18px] px-[18px] py-[18px]',
                    isEditingTarget || isMentor ? 'bg-figma-white' : 'bg-figma-card-gray',
                  )}
                >
                  <div className="flex justify-end">
                    {!isEditingTarget && isMentor ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className="flex size-[28px] items-center justify-center text-figma-typo-gray-b"
                            aria-label="코멘트 메뉴"
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
                              onClick={onCommentEdit}
                              className={cn(
                                'text-left text-[16px] font-medium leading-tight text-figma-typo-black',
                                !onCommentEdit && 'cursor-default opacity-50',
                              )}
                              disabled={!onCommentEdit}
                            >
                              수정
                            </button>
                            <div className="h-px w-full bg-figma-card-gray" />
                            <button
                              type="button"
                              onClick={handleDeleteComment}
                              disabled={!canDelete}
                              className={cn(
                                'text-left text-[16px] font-medium leading-tight text-figma-typo-black',
                                !canDelete && 'cursor-not-allowed opacity-50',
                              )}
                            >
                              삭제
                            </button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    ) : null}
                  </div>
                  {isEditingTarget ? (
                    <>
                      <textarea
                        value={editValue}
                        onChange={(event) => onEditChange?.(event.target.value)}
                        rows={4}
                        className="w-full resize-none bg-transparent text-[16px] font-medium leading-[1.4] text-figma-typo-black focus:outline-none"
                        placeholder="멘토 코멘트를 작성해주세요."
                      />
                      <div className="mt-[10px] flex items-center justify-end gap-[5px]">
                        <button
                          type="button"
                          onClick={onEditCancel}
                          className="flex h-[36px] w-[65px] items-center justify-center rounded-[10px] bg-figma-card-gray text-[14px] font-bold leading-6 text-figma-typo-gray-b"
                          aria-label="편집 취소"
                        >
                          취소
                        </button>
                        <button
                          type="button"
                          onClick={onEditSave}
                          className="flex h-[36px] w-[65px] items-center justify-center rounded-[10px] bg-figma-point-color-2 text-[14px] font-bold leading-6 text-white"
                          aria-label="편집 내용 등록"
                        >
                          등록
                        </button>
                      </div>
                    </>
                  ) : (
                    <Text as="p" className="text-[16px] font-medium leading-[1.4] text-figma-typo-black">
                      {item.content}
                    </Text>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        ) : null}

        {!isEditingComment ? (
        <div className="flex flex-col gap-[10px]">
          <Text as="p" className="text-[18px] font-medium leading-[1.2] text-figma-typo-black">
            멘토 코멘트
          </Text>
          <div className="flex h-[71px] items-center gap-[16px] rounded-[18px] bg-figma-white px-[24px]">
            <Input
              value={comment}
              placeholder="멘토 코멘트를 작성해주세요."
              onChange={(event) => onCommentChange(event.target.value)}
              className="h-[40px] border-none bg-transparent px-0 text-[16px] font-semibold leading-6 text-figma-typo-black placeholder:text-figma-typo-gray focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <button
              type="button"
              onClick={onSubmit}
              disabled={!onSubmit}
              className={cn(
                'flex size-[31px] items-center justify-center text-figma-typo-gray-b',
                !onSubmit && 'cursor-not-allowed opacity-50',
              )}
              aria-label="코멘트 등록"
            >
              <Send className="size-[20px]" />
            </button>
          </div>
        </div>
        ) : null}
      </FormSectionGroup>
    </section>
  )
}

export type { MentorQnaDetailPanelProps }
export default MentorQnaDetailPanel
