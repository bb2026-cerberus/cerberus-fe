import * as React from 'react'

import DatePickerInput from '@/components/common/DatePickerInput'
import ActionButtons from '@/components/common/ActionButtons'
import FormSection from '@/components/common/FormSection'
import FormSelectInput from '@/components/common/FormSelectInput'
import FormTextInput from '@/components/common/FormTextInput'
import FormSectionGroup from '@/components/common/FormSectionGroup'
import FixedActionBar from '@/components/common/FixedActionBar'
import SegmentedTabs, { type SegmentedTabItem } from '@/components/common/SegmentedTabs'
import { Text } from '@/components/common/Text'
import TempSavePanel from '@/components/common/TempSavePanel'
import DeleteConfirmModal from '@/components/common/DeleteConfirmModal'
import type { Subject } from '@/types/ui/subject'
import routePaths from '@/routes/routePaths'
import { toDateText } from '@/lib/date'
import todosApi from '@/services/api/todos'
import useApiRequest from '@/hooks/useApiRequest'
import useAuth from '@/store/auth/useAuth'
import { useNavigate } from 'react-router-dom'

type SubjectValue = Subject

const subjectItems: SegmentedTabItem<SubjectValue>[] = [
  { label: '국어', value: 'korean' },
  { label: '영어', value: 'english' },
  { label: '수학', value: 'math' },
]

function MenteeTodoCreate() {
  const navigate = useNavigate()
  const { userId } = useAuth()
  const { error, run, setError } = useApiRequest()
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [subject, setSubject] = React.useState<SubjectValue>('korean')
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [solution, setSolution] = React.useState<string | undefined>(undefined)
  const [tempSaveOpen, setTempSaveOpen] = React.useState(false)
  const [tempSaveItems, setTempSaveItems] = React.useState<
    { id?: number; title: string; dateText: string; subject?: string }[]
  >([])
  const [draftsLoading, setDraftsLoading] = React.useState(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)
  const [deleteTargetId, setDeleteTargetId] = React.useState<number | null>(null)

  const toApiSubject = (value: SubjectValue) => {
    if (value === 'korean') return 'KOREAN'
    if (value === 'english') return 'ENGLISH'
    return 'MATH'
  }

  const toDateString = (value?: Date) => {
    if (!value) return ''
    const year = value.getFullYear()
    const month = String(value.getMonth() + 1).padStart(2, '0')
    const day = String(value.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const handleSubmit = async () => {
    if (!userId) {
      setError('로그인 후 이용해주세요.')
      return
    }
    if (!title.trim()) {
      setError('제목을 입력해주세요.')
      return
    }
    const dateText = toDateString(date)
    if (!dateText) {
      setError('날짜를 선택해주세요.')
      return
    }

    const response = await run(
      () =>
        todosApi.createTodo({
          menteeId: userId,
          subject: toApiSubject(subject),
          title: title.trim(),
          content: description.trim() || undefined,
          date: dateText,
        }),
      { errorMessage: '할 일 등록에 실패했어요.', useOverlay: true, overlayMessage: '등록 중...' },
    )

    if (!response) return
    navigate(`${routePaths.menteeTasks}?tab=todos`)
  }

  const handleTempSave = async () => {
    if (!userId) {
      setError('로그인 후 이용해주세요.')
      return
    }
    const dateText = date ? toDateString(date) : undefined
    await run(
      () =>
        todosApi.createDraftTodo({
          menteeId: userId,
          subject: subject ? toApiSubject(subject) : undefined,
          title: title.trim() || undefined,
          content: description.trim() || undefined,
          date: dateText,
        }),
      { errorMessage: '임시저장에 실패했어요.', useOverlay: true, overlayMessage: '임시저장 중...' },
    )
  }

  const mapDraftResponseToItems = (
    response: Awaited<ReturnType<typeof todosApi.getDraftTodos>>,
  ) =>
    response?.data
      ?.flatMap((group) => group.todos ?? [])
      .map((todo) => ({
        id: todo.todoId,
        title: todo.title ?? '제목없음',
        dateText: toDateText(todo.date),
        subject: todo.subject,
      })) ?? []

  React.useEffect(() => {
    if (!userId) return
    todosApi
      .getDraftTodos({ menteeId: userId })
      .then((response) => setTempSaveItems(mapDraftResponseToItems(response)))
      .catch(() => {})
  }, [userId])

  const handleOpenTempSave = async () => {
    if (!userId) {
      setError('로그인 후 이용해주세요.')
      return
    }
    setTempSaveOpen(true)
    setDraftsLoading(true)
    try {
      await run(
        () => todosApi.getDraftTodos({ menteeId: userId }),
        {
          errorMessage: '임시저장 목록을 불러오지 못했어요.',
          onSuccess: (response) => setTempSaveItems(mapDraftResponseToItems(response)),
        },
      )
    } finally {
      setDraftsLoading(false)
    }
  }

  const handleSelectTempSave = (item: { id?: number }) => {
    if (!item.id) return
    setTempSaveOpen(false)
    navigate(`${routePaths.menteeTodoCreate}?draftId=${item.id}`)
  }

  const handleDeleteTempSave = (id?: number | string) => {
    if (!id || typeof id !== 'number') return
    setDeleteTargetId(id)
    setDeleteOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return
    await run(
      () => todosApi.deleteDraftTodo({ todoId: deleteTargetId }),
      {
        errorMessage: '임시저장 삭제에 실패했어요.',
        useOverlay: true,
        overlayMessage: '임시저장 삭제 중...',
        onSuccess: () => {
          setTempSaveItems((prev) => prev.filter((item) => item.id !== deleteTargetId))
        },
      },
    )
  }

  return (
    <div className="flex w-full flex-col items-center gap-0">
      <div className="w-full px-4 pb-[120px] pt-[8px]">
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

          {error ? (
            <Text as="p" className="px-2 text-[12px] font-semibold text-figma-sub-color-2">
              {error}
            </Text>
          ) : null}

        </FormSectionGroup>
      </div>
      <FixedActionBar>
        <ActionButtons
          mode="create"
          size="mobile"
          primaryLabel="등록"
          secondaryLabel="임시저장"
          onPrimary={handleSubmit}
          onSecondary={handleTempSave}
          useTempSaveButton
          tempSaveCount={tempSaveItems.length}
          onTempSaveListOpen={handleOpenTempSave}
          className="w-full gap-[8px]"
          primaryButtonClassName="w-full"
          secondaryButtonClassName="w-full"
        />
      </FixedActionBar>
      <TempSavePanel
        open={tempSaveOpen}
        items={tempSaveItems.map((item) => ({
          id: item.id,
          title: item.title,
          dateText: item.dateText || '-',
          onClick: () => handleSelectTempSave(item),
        }))}
        onDeleteItem={handleDeleteTempSave}
        loading={draftsLoading}
        onClose={() => setTempSaveOpen(false)}
      />
      <DeleteConfirmModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="임시저장을 삭제할까요?"
        description={['삭제된 임시저장은 복구할 수 없습니다.']}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}

export default MenteeTodoCreate
