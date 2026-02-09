import * as React from 'react'

import { cn } from '@/lib/utils'
import { Text } from '@/components/common/Text'
import Modal from '@/components/common/Modal'
import ModalHeader from '@/components/common/ModalHeader'
import TempSaveButton from '@/components/common/TempSaveButton'
import TempSaveList from '@/components/common/TempSaveList'

type FormActionBarProps = {
  tempCount?: number
  onTempSave?: () => void
  onSubmit?: () => void
  className?: string
}

function FormActionBar({ tempCount = 0, onTempSave, onSubmit, className }: FormActionBarProps) {
  const [open, setOpen] = React.useState(false)
  const items = React.useMemo(
    () => [
      { title: '비문학 12지문 정리', dateText: '2026.02.02' },
      { title: '제목없음', dateText: '2026.02.01' },
    ],
    [],
  )

  return (
    <div className={cn('flex w-full gap-1 px-2', className)}>
      <TempSaveButton
        count={tempCount}
        size="mobile"
        onSave={onTempSave}
        onOpenList={() => setOpen(true)}
        className="w-full"
      />
      <button
        type="button"
        onClick={onSubmit}
        className="flex h-[55px] w-full items-center justify-center rounded-[14px] bg-figma-point-color-2 px-5 py-2"
      >
        <Text as="span" className="text-[16px] font-semibold leading-6 text-white">
          등록하기
        </Text>
      </button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        contentPaddingClassName="px-[16px] py-[18px] pb-[30px]"
      >
        <ModalHeader title={`임시저장 목록 (${items.length})`} onClose={() => setOpen(false)} />
        <TempSaveList items={items} />
      </Modal>
    </div>
  )
}

export type { FormActionBarProps }
export default FormActionBar
