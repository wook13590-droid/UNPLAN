import { Link } from 'react-router-dom'
import { isAuthenticated } from '../utils/auth.js'

function BrandMark() {
  return (
    <Link className="brand" to="/" aria-label="UNPLAN 홈">
      <svg className="brand-symbol" viewBox="0 0 54 42" aria-hidden="true">
        <path d="M8 29a20 20 0 0 1 27-22" fill="none" stroke="#28a6db" strokeWidth="4" strokeLinecap="round" />
        <path d="M10 30 30 8l-3 13 15-9-14 20-2-10-16 8Z" fill="#f47b45" stroke="#269ed2" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M32 7a18 18 0 0 1 14 16" fill="none" stroke="#f47b45" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span className="brand-copy"><strong>UNPLAN</strong><small>여행 계획을 쉽고 자유롭게</small></span>
    </Link>
  )
}

export { BrandMark }

export default function Headr() {
  const profilePath = isAuthenticated() ? '/my-trips' : '/login'

  return (
    <header className="site-header">
      <BrandMark />
      <nav className="main-nav" aria-label="주요 메뉴">
        <Link to="/">홈</Link>
        <Link to="/travel-plan">여행 계획</Link>
        <Link to="/destinations">여행지 탐색</Link>
      </nav>
      <Link className="profile-link" to={profilePath} aria-label={profilePath === '/login' ? '로그인' : '내 계정'}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor"/><circle cx="12" cy="9" r="3.2" fill="white"/><path d="M5.7 19c.7-3 3-4.6 6.3-4.6s5.6 1.6 6.3 4.6" fill="white"/></svg>
      </Link>
    </header>
  )
}
