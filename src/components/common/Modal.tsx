import * as React from 'react'

import { cn } from '@/lib/utils'

type ModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  className?: string
  overlayClassName?: string
}

function Modal({ open, onOpenChange, children, className, overlayClassName }: ModalProps) {
  React.useEffect(() => {
    if (!open) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOpenChange(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        className={cn('absolute inset-0 bg-black/60', overlayClassName)}
        onClick={() => onOpenChange(false)}
        aria-label="모달 닫기"
      />
      <div
        className={cn(
          'relative w-[calc(100vw-56px)] max-w-[346px] rounded-[20px] bg-figma-light-gray px-[5px] py-[20px] shadow-[0px_8px_20px_0px_rgba(0,0,0,0.1)]',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}

export type { ModalProps }
export default Modal
