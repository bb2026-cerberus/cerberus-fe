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
  const isAssignmentDetail = location.pathname.startsWith('/mentee/assignments/')
  const isTodoDetail = location.pathname.startsWith('/mentee/todos/')
  const isMyPage = location.pathname === routePaths.menteeMyPage
  const isWeeklyReport = location.pathname === routePaths.menteeWeeklyReport
  const isTimeBlock = location.pathname === routePaths.menteeTimeBlock

  return (
    <AppShell
      header={
        isNotifications || isTasks || isTodoCreate || isAssignmentDetail || isTodoDetail || isMyPage || isWeeklyReport || isTimeBlock ? (
          <MenteePageHeader
            title={
              isTodoCreate
                ? '할 일 추가'
                : isTasks
                  ? '과제/할 일'
                  : isAssignmentDetail
                    ? '과제'
                    : isTodoDetail
                      ? '할 일'
                      : isMyPage
                        ? '마이페이지'
                        : isWeeklyReport
                          ? '주간학습 리포트'
                          : isTimeBlock
                            ? '타임블록'
                          : '알림'
            }
            menuName="김수험"
            menuActiveLabel={isTasks ? '과제/할 일' : '홈'}
            onBackClick={() =>
              navigate(
                isTodoCreate
                  ? routePaths.menteeTasks
                  : isAssignmentDetail || isTodoDetail
                    ? routePaths.menteeTasks
                    : isMyPage
                      ? routePaths.mentee
                      : isWeeklyReport
                        ? routePaths.mentee
                        : isTimeBlock
                          ? routePaths.mentee
                        : routePaths.mentee,
              )
            }
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
        isNotifications || isTasks || isTodoCreate || isAssignmentDetail || isTodoDetail || isMyPage || isWeeklyReport
          ? 'bg-figma-light-gray'
          : 'bg-white',
      )}
      className="min-h-dvh bg-figma-light-gray"
      mainClassName="mx-0 w-full max-w-none px-0 py-0 pb-[calc(2.5rem+env(safe-area-inset-bottom))]"
    >
      <Outlet />
    </AppShell>
  )
}

export default MenteeLayout
