import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import MenteeHeader from '@/components/layout/MenteeHeader'
import MenteeMenu from '@/components/layout/MenteeMenu'
import MenteePageHeader from '@/components/layout/MenteePageHeader'
import AppShell from '@/components/layout/AppShell'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { formatKoreanDate } from '@/lib/date'
import { cn } from '@/lib/utils'
import routePaths from '@/routes/routePaths'

function MenteeLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
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
  const isQna = location.pathname === routePaths.menteeQna

  const menteeMenuActiveLabel =
    isTasks || isTodoCreate || isAssignmentDetail || isTodoDetail
      ? '과제 피드백'
      : isTimeBlock
        ? '타임블록'
        : isWeeklyReport
          ? '주간 리포트'
          : isQna
            ? 'Q&A'
            : '홈'

  return (
    <>
      <AppShell
        header={
          isNotifications ||
          isTasks ||
          isTodoCreate ||
          isAssignmentDetail ||
          isTodoDetail ||
          isMyPage ||
          isWeeklyReport ||
          isTimeBlock ||
          isQna ? (
            <MenteePageHeader
              title={
                isTodoCreate
                  ? '할 일'
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
                              : isQna
                                ? 'Q&A'
                                : '알림'
              }
              onMenuClick={() => setMenuOpen(true)}
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
              onMenuClick={() => setMenuOpen(true)}
              onNotificationClick={() => navigate(routePaths.menteeNotifications)}
            />
          )
        }
        headerClassName={cn(
          'sticky top-0 z-50 border-b border-figma-card-gray bg-figma-white pb-4 pt-[calc(env(safe-area-inset-top)+1rem)]',
          isNotifications ||
            isTasks ||
            isTodoCreate ||
            isAssignmentDetail ||
            isTodoDetail ||
            isMyPage ||
            isWeeklyReport ||
            isQna
            ? 'bg-figma-light-gray'
            : 'bg-figma-white',
        )}
        className="min-h-dvh bg-figma-light-gray"
        mainClassName="mx-0 w-full max-w-none px-0 py-0 pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
      >
        <Outlet />
      </AppShell>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          side="right"
          hideClose
          className="w-[260px] border-0 bg-transparent p-0 shadow-none"
        >
          <MenteeMenu
            name="김수험"
            subline="D-282 · 목표 1등급"
            activeLabel={menteeMenuActiveLabel}
            side="right"
            onNavigateClick={() => setMenuOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </>
  )
}

export default MenteeLayout
