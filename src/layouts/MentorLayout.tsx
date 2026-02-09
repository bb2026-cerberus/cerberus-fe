import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AppShell from '@/components/layout/AppShell'
import MentorSidebar from '@/components/layout/MentorSidebar'

function MentorLayout() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  return (
    <AppShell
      hideHeader
      className="min-h-dvh bg-figma-light-gray"
      mainClassName="relative w-full max-w-none px-0 py-0"
    >
      <div className="relative min-h-dvh">
        <div className="mx-auto w-full max-w-[1600px] px-[24px] pb-[60px] pt-[48px]">
          <Outlet />
        </div>
        <div className="fixed left-[24px] top-[48px] z-50 h-[calc(100vh-96px)]">
          <MentorSidebar
            expanded={sidebarExpanded}
            onToggle={() => setSidebarExpanded((prev) => !prev)}
          />
        </div>
      </div>
    </AppShell>
  )
}

export default MentorLayout
