import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MenteeLayout from '../layouts/MenteeLayout'
import MentorLayout from '../layouts/MentorLayout'
import RootLayout from '../layouts/RootLayout'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import MenteeHome from '../pages/mentee/MenteeHome'
import MenteeNotifications from '../pages/mentee/MenteeNotifications'
import MenteeTasks from '../pages/mentee/MenteeTasks'
import MenteeTodoCreate from '../pages/mentee/MenteeTodoCreate'
import MenteeAssignmentDetail from '../pages/mentee/MenteeAssignmentDetail'
import MentorHome from '../pages/mentor/MentorHome'
import RoleGuard from './RoleGuard'
import routePaths from './routePaths'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routePaths.root} element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* <Route element={<RoleGuard allow="mentee" />}>
          <Route path={routePaths.mentee} element={<MenteeLayout />}>
            <Route index element={<MenteeHome />} />
          </Route>
        </Route>

        <Route element={<RoleGuard allow="mentor" />}>
          <Route path={routePaths.mentor} element={<MentorLayout />}>
            <Route index element={<MentorHome />} />
          </Route>
        </Route> */}

        <Route path={routePaths.mentee} element={<MenteeLayout />}>
          <Route index element={<MenteeHome />} />
          <Route path="notifications" element={<MenteeNotifications />} />
          <Route path="tasks" element={<MenteeTasks />} />
          <Route path="todos/new" element={<MenteeTodoCreate />} />
          <Route path="assignments/:assignmentId" element={<MenteeAssignmentDetail />} />
        </Route>

        <Route path={routePaths.mentor} element={<MentorLayout />}>
          <Route index element={<MentorHome />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
