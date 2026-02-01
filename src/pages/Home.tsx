import { Link } from 'react-router-dom'
import routePaths from '../routes/routePaths'

function Home() {
  return (
    <div>
      <p>역할을 선택하세요.</p>
      <nav>
        <ul>
          <li>
            <Link to={routePaths.mentee}>멘티 화면</Link>
          </li>
          <li>
            <Link to={routePaths.mentor}>멘토 화면</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Home
