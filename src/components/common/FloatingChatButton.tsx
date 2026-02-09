import { cn } from '@/lib/utils'
import qnaIcon from '@/assets/qna.svg'

type FloatingChatButtonProps = {
  onClick?: () => void
  className?: string
}

function FloatingChatButton({ onClick, className }: FloatingChatButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-6 z-20 flex size-[56px] items-center justify-center rounded-full bg-figma-point-color-2 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.15)]',
        className,
      )}
      aria-label="채팅"
    >
      <span
        aria-hidden
        className="block size-[46px] bg-white"
        style={{
          maskImage: `url("${qnaIcon}")`,
          WebkitMaskImage: `url("${qnaIcon}")`,
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center',
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
        }}
      />
    </button>
  )
}

export type { FloatingChatButtonProps }
export default FloatingChatButton
