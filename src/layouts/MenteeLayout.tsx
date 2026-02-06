import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import MenteeHeader from '@/components/common/MenteeHeader'
import MenteePageHeader from '@/components/common/MenteePageHeader'
import AppShell from '@/components/layout/AppShell'
import { formatKoreanDate } from '@/lib/date'
import routePaths from '@/routes/routePaths'

function MenteeLayout() {
  const dateText = formatKoreanDate(new Date())
  const location = useLocation()
  const navigate = useNavigate()
  const isNotifications = location.pathname === routePaths.menteeNotifications

  return (
    <AppShell
      header={
        isNotifications ? (
          <MenteePageHeader
            title="알림"
            menuName="김수험"
            onBackClick={() => navigate(routePaths.mentee)}
          />
        ) : (
          <MenteeHeader
            name="김수험님"
            dateText={dateText}
            onNotificationClick={() => navigate(routePaths.menteeNotifications)}
          />
        )
      }
      headerClassName={isNotifications ? 'border-0 bg-figma-light-gray' : 'border-0 bg-white'}
      className="min-h-dvh bg-figma-light-gray"
      mainClassName="mx-0 w-full max-w-none px-0 py-0 pb-[calc(2.5rem+env(safe-area-inset-bottom))]"
    >
      <Outlet />
    </AppShell>
  )
}

export default MenteeLayout
