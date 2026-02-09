import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'

import { Icon } from '@/components/common/Icon'
import { Text } from '@/components/common/Text'
import AppShell from '@/components/layout/AppShell'
import MentorSidebar from '@/components/layout/MentorSidebar'
import { cn } from '@/lib/utils'

function MentorLayout() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <AppShell
      hideHeader={false}
      className="min-h-dvh bg-figma-light-gray"
      mainClassName="relative w-full max-w-none px-0 py-0"
      headerClassName="border-b bg-card lg:hidden"
      header={
        <div className="lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              type="button"
              aria-label="open menu"
              onClick={() => setMobileMenuOpen(true)}
              className="flex size-[40px] items-center justify-center rounded-[12px] bg-figma-white shadow-[0_0_12px_rgba(0,0,0,0.06)]"
            >
              <Icon icon={Menu} size={20} className="text-figma-typo-black" />
            </button>
            <Text as="span" className="text-[18px] font-semibold leading-6 text-figma-typo-black">
              멘토
            </Text>
            <div className="size-[40px]" />
          </div>
        </div>
      }
    >
      <div className="relative min-h-dvh">
        <div className="mx-auto w-full max-w-[1600px] px-[16px] pb-[60px] pt-[20px] lg:px-[24px] lg:pt-[48px]">
          <Outlet />
        </div>
        <div className="fixed left-[24px] top-[48px] z-50 hidden h-[calc(100vh-96px)] lg:block">
          <MentorSidebar
            expanded={sidebarExpanded}
            onToggle={() => setSidebarExpanded((prev) => !prev)}
          />
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
            'relative h-full w-[306px] transition-transform duration-200',
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <MentorSidebar expanded showToggle={false} />
        </div>
      </div>
    </AppShell>
  )
}

export default MentorLayout
