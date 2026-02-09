import { cn } from '@/lib/utils'

type TaskDateMetaProps = {
  dateText: string
  badgeText?: string
  dateClassName?: string
  badgeClassName?: string
  className?: string
}

function TaskDateMeta({
  dateText,
  badgeText,
  dateClassName,
  badgeClassName,
  className,
}: TaskDateMetaProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span
        className={cn(
          'rounded-[6px] bg-figma-card-gray px-2 py-1 text-[12px] font-medium leading-tight text-[#6d6c6a]',
          dateClassName,
        )}
      >
        {dateText}
      </span>
      {badgeText ? (
        <span
          className={cn(
            'min-w-[48px] rounded-[6px] bg-figma-point-color-2 px-2 py-1 text-center text-[12px] font-medium leading-tight text-white',
            badgeClassName,
          )}
        >
          {badgeText}
        </span>
      ) : null}
    </div>
  )
}

export type { TaskDateMetaProps }
export default TaskDateMeta
