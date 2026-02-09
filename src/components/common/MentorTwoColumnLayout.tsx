import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type MentorTwoColumnLayoutProps = {
  left: ReactNode
  right?: ReactNode
  className?: string
  leftClassName?: string
  rightClassName?: string
  columnsClassName?: string
  mobileDetailOpen?: boolean
  onMobileDetailClose?: () => void
  mobileDetailTitle?: string
  mobileActionBar?: ReactNode
}

function MentorTwoColumnLayout({
  left,
  right,
  className,
  leftClassName,
  rightClassName,
  columnsClassName,
  mobileDetailOpen = false,
  onMobileDetailClose,
  mobileDetailTitle,
  mobileActionBar,
}: MentorTwoColumnLayoutProps) {
  const hasRight = Boolean(right)
  const hasMobileActionBar = Boolean(mobileActionBar)

  return (
    <>
      <div
        className={cn(
          'grid gap-[30px]',
          hasRight ? 'xl:grid-cols-[800px_810px]' : 'xl:grid-cols-[800px]',
          columnsClassName,
          className,
        )}
      >
        <div className={leftClassName}>{left}</div>
        {hasRight ? <div className={cn('hidden lg:block', rightClassName)}>{right}</div> : null}
      </div>

      {hasRight ? (
        <div
          className={cn(
            'fixed inset-0 z-40 lg:hidden',
            mobileDetailOpen ? 'pointer-events-auto' : 'pointer-events-none',
          )}
        >
          <div
            className={cn(
              'absolute inset-0 bg-black/20 transition-opacity duration-200',
              mobileDetailOpen ? 'opacity-100' : 'opacity-0',
            )}
            onClick={onMobileDetailClose}
            aria-hidden
          />
          <div
            className={cn(
              'relative flex h-full w-full flex-col bg-figma-light-gray transition-transform duration-200',
              mobileDetailOpen ? 'translate-y-0' : 'translate-y-full',
            )}
          >
            <div className="flex items-center gap-2 border-b bg-white px-4 py-3">
              <button
                type="button"
                onClick={onMobileDetailClose}
                className="flex items-center text-figma-typo-black"
                aria-label="뒤로가기"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="size-[20px] text-figma-typo-black"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 4.375L7.5 10L12.5 15.625"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div
              className={cn(
                'flex-1 overflow-y-auto px-4 pt-[16px]',
                hasMobileActionBar ? 'pb-[110px]' : 'pb-[32px]',
              )}
            >
              {right}
            </div>
            {hasMobileActionBar ? (
              <div className="absolute bottom-0 left-0 right-0 border-t bg-white px-4 py-3">
                {mobileActionBar}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}

export type { MentorTwoColumnLayoutProps }
export default MentorTwoColumnLayout
