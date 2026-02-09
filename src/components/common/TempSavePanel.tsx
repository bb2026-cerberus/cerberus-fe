import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import TempSaveList from '@/components/common/TempSaveList'
import { Skeleton } from '@/components/ui/skeleton'
import { Text } from '@/components/common/Text'

type TempSavePanelProps = {
  open: boolean
  items: { id?: number | string; title: string; dateText: string; onClick?: () => void }[]
  onDeleteItem?: (id?: number | string) => void
  loading?: boolean
  onClose: () => void
  className?: string
}

function TempSavePanel({
  open,
  items,
  onDeleteItem,
  loading = false,
  onClose,
  className,
}: TempSavePanelProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-60',
        open ? 'pointer-events-auto' : 'pointer-events-none',
        className,
      )}
    >
      {/* 모바일: 배경 클릭 비활성화, PC: 배경 클릭으로 닫기 */}
      <button
        type="button"
        className={cn(
          'absolute inset-0 bg-black/60 transition-opacity duration-300 max-sm:pointer-events-none',
          open ? 'opacity-100 sm:pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        onClick={onClose}
        aria-label="임시저장 닫기"
      />
      <aside
        className={cn(
          'absolute right-0 top-0 z-10 flex h-full w-full max-w-[482px] flex-col bg-figma-light-gray shadow-[0_0_30px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-out sm:w-[482px]',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {/* 모바일: 헤더 영역 구분(배경·하단선), PC: 간단 상단 패딩 */}
        <header
          className={cn(
            'flex shrink-0 items-center justify-between border-b border-figma-card-gray bg-figma-white',
            'min-h-[56px] px-4 pt-[max(12px,env(safe-area-inset-top))] pb-3',
            'sm:border-0 sm:bg-transparent sm:px-[30px] sm:pt-0 sm:pb-[10px] sm:min-h-0',
          )}
        >
          <div className="flex gap-[2px]">
            <Text
              as="p"
              className="text-[18px] font-semibold leading-6 text-figma-typo-black sm:font-bold"
            >
              임시저장 목록
            </Text>
            <Text as="p" className="text-[18px] font-semibold leading-6 text-figma-typo-black sm:font-bold">
              ({items.length})
            </Text>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="-m-2 flex size-10 items-center justify-center rounded-full text-figma-typo-gray transition-colors hover:bg-figma-card-gray hover:text-figma-typo-black active:bg-figma-card-gray sm:size-9"
            aria-label="닫기"
          >
            <X className="size-5 sm:size-[20px]" />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-auto p-4 sm:p-[30px] sm:pt-0">
          {loading ? (
            <div className="mx-0 flex w-full max-w-none flex-col gap-[9px]">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  // eslint-disable-next-line react/no-array-index-key
                  key={`temp-save-skeleton-${index}`}
                  className="h-[90px] w-full rounded-[18px] bg-figma-card-gray"
                />
              ))}
            </div>
          ) : (
            <TempSaveList
              items={items}
              onDeleteItem={onDeleteItem}
              className="mx-0 max-w-none"
            />
          )}
        </div>
      </aside>
    </div>
  )
}

export type { TempSavePanelProps }
export default TempSavePanel
