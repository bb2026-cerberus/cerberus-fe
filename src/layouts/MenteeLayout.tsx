import { Outlet } from 'react-router-dom'

import MenteeHeader from '../components/common/MenteeHeader'
import AppShell from '../components/layout/AppShell'
import { formatKoreanDate } from '../lib/date'

function MenteeLayout() {
  const dateText = formatKoreanDate(new Date())

  return (
    <AppShell
      header={<MenteeHeader name="김수험님" dateText={dateText} />}
      headerClassName="border-0 bg-transparent"
      className="min-h-dvh"
      mainClassName="mx-0 w-full max-w-none px-3 sm:px-4 pt-2 pb-[calc(2.5rem+env(safe-area-inset-bottom))]"
    >
      <Outlet />
    </AppShell>
  )
}

export default MenteeLayout
