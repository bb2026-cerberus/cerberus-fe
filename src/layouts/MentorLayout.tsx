import { Outlet } from 'react-router-dom'
import AppShell from '../components/layout/AppShell'

function MentorLayout() {
  return (
    <AppShell title="멘토">
      <Outlet />
    </AppShell>
  )
}

export default MentorLayout
