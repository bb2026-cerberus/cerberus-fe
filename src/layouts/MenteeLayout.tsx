import { Outlet } from 'react-router-dom'
import AppShell from '@/components/layout/AppShell'

function MenteeLayout() {
  return (
    <AppShell title="멘티">
      <Outlet />
    </AppShell>
  )
}

export default MenteeLayout
