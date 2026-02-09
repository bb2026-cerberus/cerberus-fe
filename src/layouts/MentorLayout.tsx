import { useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

import { Icon } from '@/components/common/Icon'
import { Text } from '@/components/common/Text'
import AppShell from '@/components/layout/AppShell'
import MentorSidebar from '@/components/layout/MentorSidebar'
import menuIcon from '@/assets/menu.svg'
import {
  MentorMobileHeaderProvider,
  useMentorMobileHeader,
} from '@/components/layout/MentorMobileHeaderContext'
import { cn } from '@/lib/utils'

function MentorMobileHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { headerState } = useMentorMobileHeader()
  const location = useLocation()
  const mobileTitle = useMemo(() => {
    const path = location.pathname
    if (path.startsWith('/mentor/tasks')) return '과제'
    if (path.startsWith('/mentor/feedback')) return '피드백'
    if (path.startsWith('/mentor/qna')) return 'Q&A'
    if (path.startsWith('/mentor/reports')) return '주간 리포트'
    if (path.startsWith('/mentor/solutions')) return '약점 맞춤 솔루션'
    if (path.startsWith('/mentor/mentees')) return '멘티 관리'
    if (path.startsWith('/mentor/settings')) return '환경설정'
    if (path.startsWith('/mentor/profile')) return '프로필'
    return '홈'
  }, [location.pathname])

  return (
    <>
      <div className="lg:hidden">
        <div className="flex items-center justify-between px-4 py-2">
          <button
            type="button"
            aria-label="뒤로가기"
            onClick={headerState.onBack}
            className={cn(
              'flex size-[30px] items-center justify-center rounded-[10px] bg-figma-white',
              headerState.showBack ? 'visible' : 'invisible pointer-events-none',
            )}
          >
            <Icon icon={ChevronLeft} size={18} className="text-figma-typo-black" />
          </button>
          <Text as="span" className="text-[18px] font-semibold leading-6 text-figma-typo-black">
            {mobileTitle}
          </Text>
          <button
            type="button"
            aria-label="open menu"
            onClick={() => setMobileMenuOpen(true)}
            className="flex size-[30px] items-center justify-center rounded-[10px] bg-figma-white"
          >
            <span
              aria-hidden
              className="block size-[18px] bg-figma-typo-black"
              style={{
                maskImage: `url("${menuIcon}")`,
                WebkitMaskImage: `url("${menuIcon}")`,
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
              }}
            />
          </button>
        </div>
      </div>

      <div
        className={cn(
          'fixed inset-0 z-50 flex lg:hidden',
          mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
        <div
          className={cn(
            'absolute inset-0 bg-black/30 transition-opacity duration-200',
            mobileMenuOpen ? 'opacity-100' : 'opacity-0',
          )}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden
        />
        <div
          className={cn(
            'relative ml-auto h-full w-[306px] transition-transform duration-200',
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <MentorSidebar
            expanded
            showToggle={false}
            onNavigate={() => setMobileMenuOpen(false)}
            panelClassName="rounded-r-none"
          />
        </div>
      </div>
    </>
  )
}

function MentorLayout() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  return (
    <MentorMobileHeaderProvider>
      <AppShell
        hideHeader={false}
        className="min-h-dvh bg-figma-light-gray"
        mainClassName="relative w-full max-w-none px-0 py-0"
        headerClassName="border-b bg-card lg:hidden fixed top-0 left-0 right-0 z-50"
        header={<MentorMobileHeader />}
      >
        <div className="relative min-h-dvh">
          <div className="mx-auto w-full max-w-[1600px] px-[16px] pb-[60px] pt-[72px] lg:px-[24px] lg:pt-[48px]">
            <Outlet />
          </div>
          <div className="fixed left-[24px] top-[48px] z-50 hidden h-[calc(100vh-96px)] lg:block">
            <MentorSidebar
              expanded={sidebarExpanded}
              onToggle={() => setSidebarExpanded((prev) => !prev)}
              onNavigate={() => setSidebarExpanded(false)}
            />
          </div>
        </div>
      </AppShell>
    </MentorMobileHeaderProvider>
  )
}

export default MentorLayout
