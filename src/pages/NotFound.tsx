import { Link } from 'react-router-dom'
import routePaths from '../routes/routePaths'

function NotFound() {
  return (
    <div>
      <h2>페이지를 찾을 수 없습니다.</h2>
      <Link to={routePaths.root}>홈으로</Link>
    </div>
  )
}

export default NotFound
