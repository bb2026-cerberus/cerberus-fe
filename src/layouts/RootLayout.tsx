import { Outlet } from 'react-router-dom'
import AppShell from '../components/layout/AppShell'

function RootLayout() {
  return (
    <AppShell title="Cerberus">
      <Outlet />
    </AppShell>
  )
}

export default RootLayout
