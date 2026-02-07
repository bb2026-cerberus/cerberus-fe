import { cn } from '@/lib/utils'

type SubjectFilterValue = 'korean' | 'english' | 'math'

type SubjectFilterTabsProps = {
  value: SubjectFilterValue
  onChange: (value: SubjectFilterValue) => void
  className?: string
}

const subjects: { label: string; value: SubjectFilterValue }[] = [
  { label: '국어', value: 'korean' },
  { label: '영어', value: 'english' },
  { label: '수학', value: 'math' },
]

const activeStyle: Record<SubjectFilterValue, string> = {
  korean: 'bg-figma-sub-color-1 text-white',
  english: 'bg-figma-sub-color-3 text-white',
  math: 'bg-figma-sub-color-2 text-white',
}

function SubjectFilterTabs({ value, onChange, className }: SubjectFilterTabsProps) {
  return (
    <div className={cn('flex w-full items-center gap-5', className)}>
      {subjects.map((subject) => {
        const isActive = subject.value === value
        return (
          <button
            key={subject.value}
            type="button"
            onClick={() => onChange(subject.value)}
            className={cn(
              'flex h-[30px] w-[45px] items-center justify-center rounded-[40px] px-[10px] text-[12px] font-medium leading-[1.25]',
              isActive ? activeStyle[subject.value] : 'bg-[#f6f6f6] text-[#555]',
            )}
            aria-pressed={isActive}
          >
            <span className={cn(isActive ? 'font-semibold leading-6' : undefined)}>
              {subject.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export type { SubjectFilterTabsProps, SubjectFilterValue }
export default SubjectFilterTabs
