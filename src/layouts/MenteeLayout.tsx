import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import MenteeHeader from '@/components/common/MenteeHeader'
import MenteePageHeader from '@/components/common/MenteePageHeader'
import AppShell from '@/components/layout/AppShell'
import { formatKoreanDate } from '@/lib/date'
import { cn } from '@/lib/utils'
import routePaths from '@/routes/routePaths'

function MenteeLayout() {
  const dateText = formatKoreanDate(new Date())
  const location = useLocation()
  const navigate = useNavigate()
  const isNotifications = location.pathname === routePaths.menteeNotifications
  const isTasks = location.pathname === routePaths.menteeTasks
  const isTodoCreate = location.pathname === routePaths.menteeTodoCreate

  return (
    <AppShell
      header={
        isNotifications || isTasks || isTodoCreate ? (
          <MenteePageHeader
            title={isTodoCreate ? '할 일 추가' : isTasks ? '과제/할 일' : '알림'}
            menuName="김수험"
            menuActiveLabel={isTasks ? '과제/할 일' : '홈'}
            onBackClick={() => navigate(isTodoCreate ? routePaths.menteeTasks : routePaths.mentee)}
          />
        ) : (
          <MenteeHeader
            name="김수험님"
            dateText={dateText}
            onNotificationClick={() => navigate(routePaths.menteeNotifications)}
          />
        )
      }
      headerClassName={cn(
        'sticky top-0 z-10 border-0',
        isNotifications || isTasks || isTodoCreate ? 'bg-figma-light-gray' : 'bg-white',
      )}
      className="min-h-dvh bg-figma-light-gray"
      mainClassName="mx-0 w-full max-w-none px-0 py-0 pb-[calc(2.5rem+env(safe-area-inset-bottom))]"
    >
      <Outlet />
    </AppShell>
  )
}

export default MenteeLayout
