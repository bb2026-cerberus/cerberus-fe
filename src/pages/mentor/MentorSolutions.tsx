import * as React from 'react'

import FormSection from '@/components/common/FormSection'
import FormSectionGroup from '@/components/common/FormSectionGroup'
import FormSelectInput from '@/components/common/FormSelectInput'
import MentorSingleColumnLayout from '@/components/layout/MentorSingleColumnLayout'
import MentorSolutionTable, {
  type MentorSolutionItem,
} from '@/components/common/MentorSolutionTable'
import Modal from '@/components/common/Modal'
import ActionButtons from '@/components/common/ActionButtons'
import FormTextInput from '@/components/common/FormTextInput'
import FloatingActionButton from '@/components/common/FloatingActionButton'
import { Text } from '@/components/common/Text'
import { Skeleton } from '@/components/ui/skeleton'
import solutionsApi from '@/services/api/solutions'
import mentorMenteesApi from '@/services/api/mentor-mentees'
import useApiRequest from '@/hooks/useApiRequest'
import useAuth from '@/store/auth/useAuth'

type MenteeOption = {
  menteeId: number
  menteeName: string
}

function MentorSolutions() {
  const { userId } = useAuth()
  const { run } = useApiRequest()
  const [menteeOptions, setMenteeOptions] = React.useState<MenteeOption[]>([])
  const [selectedMenteeName, setSelectedMenteeName] = React.useState('')
  const [solutionItems, setSolutionItems] = React.useState<MentorSolutionItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [draftImprovement, setDraftImprovement] = React.useState('')
  const [draftSubject, setDraftSubject] = React.useState('국어')
  const [draftAttachment, setDraftAttachment] = React.useState('')

  const selectedMentee = menteeOptions.find((m) => m.menteeName === selectedMenteeName)

  // 멘티 목록 로드
  React.useEffect(() => {
    if (!userId) return

    run(
      () => mentorMenteesApi.getMentorMentees(userId),
      {
        errorMessage: '멘티 목록을 불러오지 못했어요.',
        onSuccess: (response) => {
          const list = response.data.mentees.map((m) => ({
            menteeId: m.menteeId,
            menteeName: m.menteeName,
          }))
          setMenteeOptions(list)
          if (list.length > 0) setSelectedMenteeName(list[0].menteeName)
        },
      },
    )
  }, [userId, run])

  // 솔루션 목록 로드
  React.useEffect(() => {
    if (!userId) return

    setLoading(true)
    run(
      () =>
        solutionsApi.getWeaknessSolutionsByMentor(
          { mentorId: userId },
          selectedMentee ? { menteeId: selectedMentee.menteeId } : undefined,
        ),
      {
        errorMessage: '솔루션 목록을 불러오지 못했어요.',
        onSuccess: (response) => {
          const items: MentorSolutionItem[] = (response.data ?? []).map((item) => ({
            id: String(item.id),
            improvement: item.solutionContent ?? '',
            subject: item.subject ?? '',
            attachment: item.solutionFile?.fileName ?? '-',
            showActions: true,
          }))
          setSolutionItems(items)
        },
      },
    ).finally(() => setLoading(false))
  }, [userId, selectedMentee?.menteeId, run])

  const handleMenteeChange = (name: string) => {
    setSelectedMenteeName(name)
  }

  const handleEditItem = (id: string) => {
    const target = solutionItems.find((item) => item.id === id)
    if (!target) return
    setEditingId(id)
    setDraftImprovement(target.improvement)
    setDraftSubject(target.subject)
    setDraftAttachment(target.attachment)
    setModalOpen(true)
  }

  const isNewItem = (id: string) => id.startsWith('s-')

  const handleSaveDraft = async () => {
    if (!editingId || !userId) return

    if (isNewItem(editingId)) {
      if (!selectedMentee) return

      const formData = new FormData()
      formData.append(
        'request',
        new Blob(
          [JSON.stringify({
            menteeId: selectedMentee.menteeId,
            mentorId: userId,
            subject: draftSubject,
            content: draftImprovement,
          })],
          { type: 'application/json' },
        ),
      )

      await run(
        () => solutionsApi.createWeaknessSolution({ mentorId: userId }, formData),
        {
          useOverlay: true,
          overlayMessage: '등록 중...',
          errorMessage: '등록에 실패했어요.',
          onSuccess: (response) => {
            const created = response.data
            if (created) {
              setSolutionItems((prev) =>
                prev.map((item) =>
                  item.id === editingId
                    ? {
                      ...item,
                      id: String(created.id),
                      improvement: created.solutionContent ?? draftImprovement,
                      subject: created.subject ?? draftSubject,
                      attachment: created.solutionFile?.fileName ?? '-',
                    }
                    : item,
                ),
              )
            }
            setModalOpen(false)
            setEditingId(null)
          },
        },
      )
    } else {
      const solutionId = Number(editingId)
      const formData = new FormData()
      formData.append(
        'request',
        new Blob(
          [JSON.stringify({ solutionId, subject: draftSubject, content: draftImprovement })],
          { type: 'application/json' },
        ),
      )

      await run(
        () => solutionsApi.updateWeaknessSolution({ mentorId: userId }, formData),
        {
          useOverlay: true,
          overlayMessage: '수정 중...',
          errorMessage: '수정에 실패했어요.',
          onSuccess: (response) => {
            const updated = response.data
            if (updated) {
              setSolutionItems((prev) =>
                prev.map((item) =>
                  item.id === editingId
                    ? {
                      ...item,
                      improvement: updated.solutionContent ?? draftImprovement,
                      subject: updated.subject ?? draftSubject,
                      attachment: updated.solutionFile?.fileName ?? draftAttachment,
                    }
                    : item,
                ),
              )
            }
            setModalOpen(false)
            setEditingId(null)
          },
        },
      )
    }
  }

  const handleDeleteItem = async (id: string) => {
    if (!userId) return

    await run(
      () => solutionsApi.deleteWeaknessSolution({ mentorId: userId, weaknessSolutionId: Number(id) }),
      {
        useOverlay: true,
        overlayMessage: '삭제 중...',
        errorMessage: '삭제에 실패했어요.',
        onSuccess: () => {
          setSolutionItems((prev) => prev.filter((item) => item.id !== id))
          if (editingId === id) setEditingId(null)
        },
      },
    )
  }

  const handleAddItem = () => {
    const nextId = `s-${solutionItems.length + 1}`
    setEditingId(nextId)
    setDraftImprovement('')
    setDraftSubject('국어')
    setDraftAttachment('')
    setSolutionItems((prev) => [
      ...prev,
      {
        id: nextId,
        improvement: '',
        subject: '국어',
        attachment: '',
        showActions: true,
      },
    ])
    setModalOpen(true)
  }

  return (
    <div className="relative flex w-full flex-col gap-[25px] pb-[80px]">
      <MentorSingleColumnLayout>
        <FormSectionGroup className="flex flex-col gap-4">
          <div className="hidden items-center lg:flex">
            <Text
              as="h1"
              className="text-[28px] font-bold leading-[1.3] text-figma-typo-black"
            >
              약점 맞춤 솔루션
            </Text>
          </div>

          <FormSection title="멘티 선택">
            <FormSelectInput
              value={selectedMenteeName}
              onChange={handleMenteeChange}
              options={menteeOptions.map((m) => m.menteeName)}
            />
          </FormSection>

          {loading ? (
            <div className="flex flex-col gap-[10px]">
              <Skeleton className="h-[60px] w-full rounded-[16px]" />
              <Skeleton className="h-[60px] w-full rounded-[16px]" />
              <Skeleton className="h-[60px] w-full rounded-[16px]" />
            </div>
          ) : (
            <MentorSolutionTable
              title="보완점"
              items={solutionItems}
              onEditItem={handleEditItem}
              onDeleteItem={handleDeleteItem}
              onAddItem={undefined}
            />
          )}
        </FormSectionGroup>
      </MentorSingleColumnLayout>

      <FloatingActionButton
        label="보완점 추가"
        positionClassName="fixed bottom-[48px] right-[24px] z-30"
        className="h-[57px] px-[16px]"
        onClick={handleAddItem}
      />

      <Modal
        open={modalOpen}
        onOpenChange={(open) => {
          setModalOpen(open)
          if (!open) setEditingId(null)
        }}
        contentPaddingClassName="px-[24px] py-[24px] pb-[28px]"
        contentClassName="max-w-[720px]"
      >
        <div className="flex flex-col gap-[12px]">
          <FormSelectInput
            value={draftSubject}
            onChange={setDraftSubject}
            options={['국어', '영어', '수학']}
          />
          <FormTextInput
            value={draftImprovement}
            onChange={setDraftImprovement}
            placeholder="보완점 입력"
          />
          <FormTextInput
            value={draftAttachment}
            onChange={setDraftAttachment}
            placeholder="파일을 업로드해주세요"
          />
        </div>
        <div className="mt-[16px]">
          <ActionButtons
            mode="edit"
            onPrimary={handleSaveDraft}
            onSecondary={() => setModalOpen(false)}
            primaryLabel="저장"
            secondaryLabel="취소"
            size="mobile"
            className="w-full gap-[8px]"
            primaryButtonClassName="w-full"
            secondaryButtonClassName="w-full"
          />
        </div>
      </Modal>
    </div>
  )
}

export default MentorSolutions
