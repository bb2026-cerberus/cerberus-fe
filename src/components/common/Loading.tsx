import cn from '../../utils/cn'

type LoadingProps = {
  message?: string
  className?: string
}

function Loading({ message = '불러오는 중...', className }: LoadingProps) {
  return (
    <div
      className={cn(
        'flex min-h-[40vh] flex-col items-center justify-center gap-3 text-sm text-muted-foreground',
        className,
      )}
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground/20 border-t-muted-foreground" />
      <span>{message}</span>
    </div>
  )
}

export default Loading
