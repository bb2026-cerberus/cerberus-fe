import { cn } from '@/lib/utils'

type TaskTabValue = 'assignments' | 'todos' | 'feedback'

type TaskTabsProps = {
  value: TaskTabValue
  onChange: (value: TaskTabValue) => void
  className?: string
}

const tabs: { label: string; value: TaskTabValue }[] = [
  { label: '과제', value: 'assignments' },
  { label: '할 일', value: 'todos' },
  { label: '과목별 피드백', value: 'feedback' },
]

function TaskTabs({ value, onChange, className }: TaskTabsProps) {
  return (
    <div
      className={cn(
        'flex h-[44px] w-full gap-[6px] rounded-[40px] bg-white p-[5px]',
        className,
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === value
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={cn(
              'flex flex-1 items-center justify-center rounded-[40px] text-[14px] font-medium leading-[1.4]',
              isActive ? 'bg-figma-point-color-2 text-white' : 'text-figma-typo-gray',
            )}
            aria-pressed={isActive}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

export type { TaskTabsProps, TaskTabValue }
export default TaskTabs
