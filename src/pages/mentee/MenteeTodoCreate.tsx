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
import type { components } from '@/types/api'
import type { Subject } from '@/types/ui/subject'
import routePaths from '@/routes/routePaths'
import { toDateText } from '@/lib/date'
import todosApi from '@/services/api/todos'
import useApiRequest from '@/hooks/useApiRequest'
import useAuth from '@/store/auth/useAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'

type SubjectValue = Subject

type DraftTodosResponse =
  components['schemas']['CommonResponseListGroupedTodosResponseDto']

const subjectItems: SegmentedTabItem<SubjectValue>[] = [
  { label: '국어', value: 'korean' },
  { label: '영어', value: 'english' },
  { label: '수학', value: 'math' },
]

function MenteeTodoCreate() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
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

  const todoIdParam = searchParams.get('todoId')
  const draftIdParam = searchParams.get('draftId')
  const editingTodoId = todoIdParam ? Number(todoIdParam) : undefined
  const editingDraftId = draftIdParam ? Number(draftIdParam) : undefined
  const isEditMode = Boolean(editingTodoId)

  const toApiSubject = (value: SubjectValue) => {
    if (value === 'korean') return 'KOREAN'
    if (value === 'english') return 'ENGLISH'
    return 'MATH'
  }

  const fromApiSubject = (subject?: string): SubjectValue => {
    const normalized = subject?.toLowerCase()
    if (normalized === 'korean' || subject === '국어' || subject === 'KOREAN') return 'korean'
    if (normalized === 'english' || subject === '영어' || subject === 'ENGLISH') return 'english'
    if (normalized === 'math' || subject === '수학' || subject === 'MATH') return 'math'
    return 'korean'
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

    const formData = new FormData()
    formData.append(
      'request',
      new Blob(
        [
          JSON.stringify({
            menteeId: userId,
            subject: toApiSubject(subject),
            title: title.trim(),
            content: description.trim() || undefined,
            dates: [dateText],
            // 솔루션 선택 시 ID 문자열을 숫자로 변환하여 전달
            solutionId: solution ? Number(solution) : undefined,
            assignYn: 'N',
            draftYn: 'N',
          }),
        ],
        { type: 'application/json' },
      ),
    )

    const response = await run(
      () =>
        isEditMode && editingTodoId
          ? todosApi.updateTodo({ todoId: editingTodoId }, formData)
          : todosApi.createTodo(formData),
      {
        errorMessage: isEditMode ? '할 일 수정에 실패했어요.' : '할 일 등록에 실패했어요.',
        useOverlay: true,
        overlayMessage: isEditMode ? '수정 중...' : '등록 중...',
      },
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

  const mapDraftResponseToItems = (response: DraftTodosResponse | undefined) =>
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
      .then((response: DraftTodosResponse) =>
        setTempSaveItems(mapDraftResponseToItems(response)),
      )
      .catch(() => {})
  }, [userId])

  // 기존 할 일 수정 진입 시 상세 조회로 값 세팅
  React.useEffect(() => {
    if (!userId) return
    if (!editingTodoId) return

    run(
      () =>
        todosApi.getTodoDetail({
          todoId: editingTodoId,
        }),
      {
        errorMessage: '할 일 정보를 불러오지 못했어요.',
        onSuccess: (response) => {
          const data = response?.data
          if (!data) return

          if (data.date) {
            const [year, month, day] = data.date.split('-').map((value) => Number(value))
            if (year && month && day) {
              setDate(new Date(year, month - 1, day))
            }
          }
          if (data.subject) {
            setSubject(fromApiSubject(data.subject))
          }
          setTitle(data.title ?? '')
          setDescription(data.content ?? '')
          setSolution(data.solutionId ? String(data.solutionId) : undefined)
        },
      },
    )
  }, [editingTodoId, run, userId])

  // 임시저장 선택 후 진입 시 해당 값 세팅
  React.useEffect(() => {
    if (!userId) return
    if (!editingDraftId) return

    todosApi
      .getDraftTodos({ menteeId: userId })
      .then((response: DraftTodosResponse) => {
        const allTodos =
          response?.data?.flatMap((group) => group.todos ?? []) ?? []
        const target = allTodos.find((todo) => todo.todoId === editingDraftId)
        if (!target) return

        if (target.date) {
          const [year, month, day] = target.date.split('-').map((value) => Number(value))
          if (year && month && day) {
            setDate(new Date(year, month - 1, day))
          }
        }
        if (target.subject) {
          setSubject(fromApiSubject(target.subject))
        }
        setTitle(target.title ?? '')
        setDescription(target.content ?? '')
        // draft 에는 solutionId 정보가 없을 수 있어서 일단 유지
      })
      .catch(() => {})
  }, [editingDraftId, userId])

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
          onSuccess: (response: DraftTodosResponse) =>
            setTempSaveItems(mapDraftResponseToItems(response)),
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
          mode={isEditMode ? 'edit' : 'create'}
          size="mobile"
          primaryLabel={isEditMode ? '수정' : '등록'}
          secondaryLabel={isEditMode ? '취소' : '임시저장'}
          onPrimary={handleSubmit}
          onSecondary={
            isEditMode ? () => navigate(routePaths.menteeTasks + '?tab=todos') : handleTempSave
          }
          useTempSaveButton={!isEditMode}
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
