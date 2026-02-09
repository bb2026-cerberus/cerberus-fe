import { useMemo, useState } from 'react'

import FormSelectInput from '@/components/common/FormSelectInput'
import MentorSingleColumnLayout from '@/components/common/MentorSingleColumnLayout'
import MentorSolutionTable, {
  type MentorSolutionItem,
} from '@/components/common/MentorSolutionTable'
import Modal from '@/components/common/Modal'
import MentorActionButtons from '@/components/common/MentorActionButtons'
import FormTextInput from '@/components/common/FormTextInput'
import FloatingActionButton from '@/components/common/FloatingActionButton'
import { Text } from '@/components/common/Text'

function MentorSolutions() {
  const initialItems = useMemo<MentorSolutionItem[]>(
    () => [
      {
        id: 's-1',
        improvement: '문법 강의/오답노트',
        subject: '국어',
        attachment: '언어(문법) 오답노트.pdf',
        showActions: true,
      },
      {
        id: 's-2',
        improvement: '문법 복습지',
        subject: '국어',
        attachment: '문법 개념 복습지.pdf',
        showActions: true,
      },
      {
        id: 's-3',
        improvement: '문학 문풀',
        subject: '국어',
        attachment: '-',
        showActions: true,
      },
      {
        id: 's-4',
        improvement: '유형별 문제',
        subject: '수학',
        attachment: '수학 오답노트 양식.pdf',
        showActions: true,
      },
    ],
    [],
  )
  const [solutionItems, setSolutionItems] = useState(initialItems)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [draftImprovement, setDraftImprovement] = useState('')
  const [draftSubject, setDraftSubject] = useState('국어')
  const [draftAttachment, setDraftAttachment] = useState('')

  const handleEditItem = (id: string) => {
    const target = solutionItems.find((item) => item.id === id)
    if (!target) return
    setEditingId(id)
    setDraftImprovement(target.improvement)
    setDraftSubject(target.subject)
    setDraftAttachment(target.attachment)
    setModalOpen(true)
  }

  const handleSaveDraft = () => {
    if (!editingId) return
    setSolutionItems((prev) =>
      prev.map((item) =>
        item.id === editingId
          ? {
            ...item,
            improvement: draftImprovement,
            subject: draftSubject,
            attachment: draftAttachment,
          }
          : item,
      ),
    )
    setModalOpen(false)
    setEditingId(null)
  }

  const handleDeleteItem = (id: string) => {
    setSolutionItems((prev) => prev.filter((item) => item.id !== id))
    if (editingId === id) setEditingId(null)
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
        <section className="flex flex-col gap-[25px]">
          <div className="flex items-center">
            <Text
              as="h1"
              className="hidden text-[28px] font-bold leading-[1.3] text-figma-typo-black lg:block"
            >
              약점 맞춤 솔루션
            </Text>
          </div>

          <div className="flex flex-col gap-[10px]">
            <Text as="p" className="text-[18px] font-medium leading-[1.2] text-figma-typo-black">
              멘티 선택
            </Text>
            <FormSelectInput
              value="김수험"
              onChange={() => { }}
              options={['김수험', '박모의']}
              size="md"
            />
          </div>

          <MentorSolutionTable
            title="보완점"
            items={solutionItems}
            onEditItem={handleEditItem}
            onDeleteItem={handleDeleteItem}
            onAddItem={undefined}
          />
        </section>
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
            size="md"
          />
          <FormTextInput
            value={draftImprovement}
            onChange={setDraftImprovement}
            placeholder="보완점 입력"
            size="md"
          />
          <FormTextInput
            value={draftAttachment}
            onChange={setDraftAttachment}
            placeholder="파일을 업로드해주세요"
            size="md"
          />
        </div>
        <div className="mt-[16px]">
          <MentorActionButtons
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
