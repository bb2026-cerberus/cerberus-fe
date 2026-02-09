import { cn } from '@/lib/utils'
import TempSaveList from '@/components/common/TempSaveList'
import { Text } from '@/components/common/Text'

type TempSavePanelProps = {
  open: boolean
  items: { title: string; dateText: string }[]
  onClose: () => void
  className?: string
}

function TempSavePanel({ open, items, onClose, className }: TempSavePanelProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-[60]',
        open ? 'pointer-events-auto' : 'pointer-events-none',
        className,
      )}
    >
      <button
        type="button"
        className={cn(
          'absolute inset-0 bg-black/60 transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        onClick={onClose}
        aria-label="임시저장 닫기"
      />
      <aside
        className={cn(
          'absolute right-0 top-0 h-full w-[482px] bg-figma-light-gray p-[30px] shadow-[0_0_30px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center gap-[2px] pb-[10px] pt-[8px]">
          <Text as="p" className="text-[18px] font-bold leading-6 text-figma-typo-black">
            임시저장 목록
          </Text>
          <Text as="p" className="text-[18px] font-bold leading-6 text-figma-typo-black">
            ({items.length})
          </Text>
        </div>
        <TempSaveList items={items} className="mx-0 max-w-none" />
      </aside>
    </div>
  )
}

export type { TempSavePanelProps }
export default TempSavePanel
