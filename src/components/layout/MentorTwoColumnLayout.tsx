import type { ReactNode } from 'react'
import { useEffect } from 'react'

import { useMentorMobileHeader } from '@/components/layout/MentorMobileHeaderContext'
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
  mobileActionBar,
}: MentorTwoColumnLayoutProps) {
  const hasRight = Boolean(right)
  const hasMobileActionBar = Boolean(mobileActionBar)
  const { setHeaderState } = useMentorMobileHeader()

  useEffect(() => {
    if (!hasRight) return
    if (mobileDetailOpen && onMobileDetailClose) {
      setHeaderState({ showBack: true, onBack: onMobileDetailClose })
    } else {
      setHeaderState({ showBack: false })
    }

    return () => {
      setHeaderState({ showBack: false })
    }
  }, [hasRight, mobileDetailOpen, onMobileDetailClose, setHeaderState])

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
              'relative flex h-full w-full flex-col bg-figma-light-gray pt-[72px] transition-transform duration-200',
              mobileDetailOpen ? 'translate-y-0' : 'translate-y-full',
            )}
          >
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
