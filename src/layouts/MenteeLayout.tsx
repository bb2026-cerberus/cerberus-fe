import { Outlet } from 'react-router-dom'

import MenteeHeader from '@/components/common/MenteeHeader'
import AppShell from '@/components/layout/AppShell'
import { formatKoreanDate } from '@/lib/date'

function MenteeLayout() {
  const dateText = formatKoreanDate(new Date())

  return (
    <AppShell
      header={<MenteeHeader name="김수험님" dateText={dateText} />}
      headerClassName="border-0 bg-white"
      className="min-h-dvh bg-figma-light-gray"
      mainClassName="mx-0 w-full max-w-none px-0 py-0 pb-[calc(2.5rem+env(safe-area-inset-bottom))]"
    >
      <Outlet />
    </AppShell>
  )
}

export default MenteeLayout
