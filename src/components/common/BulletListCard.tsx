import { cn } from '@/lib/utils'

type BulletListCardProps = {
  items: string[]
  className?: string
}

function BulletListCard({ items, className }: BulletListCardProps) {
  return (
    <div className={cn('rounded-[18px] bg-white px-[18px] py-[14px]', className)}>
      <ul className="list-disc space-y-1 pl-[21px] text-[14px] font-medium leading-[1.4] text-figma-typo-black">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export type { BulletListCardProps }
export default BulletListCard
