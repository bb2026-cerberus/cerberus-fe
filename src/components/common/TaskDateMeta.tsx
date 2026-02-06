import { cn } from '@/lib/utils'

type TaskDateMetaProps = {
  dateText: string
  badgeText?: string
  className?: string
}

function TaskDateMeta({ dateText, badgeText, className }: TaskDateMetaProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="rounded-[6px] bg-figma-card-gray px-2 py-1 text-[12px] font-medium leading-[1.25] text-[#6d6c6a]">
        {dateText}
      </span>
      {badgeText ? (
        <span className="min-w-[48px] rounded-[6px] bg-figma-point-color-2 px-2 py-1 text-center text-[12px] font-medium leading-[1.25] text-white">
          {badgeText}
        </span>
      ) : null}
    </div>
  )
}

export type { TaskDateMetaProps }
export default TaskDateMeta
