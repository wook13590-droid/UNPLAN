import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Headr from '../components/Headr.jsx'
import Footer from '../components/Footer.jsx'
import { signIn } from '../utils/auth.js'

const demoAccount = {
  email: 'text@naver.com',
  password: '13592026@',
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    if (email !== demoAccount.email || password !== demoAccount.password) {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.')
      return
    }

    setError('')
    signIn()
    navigate('/my-trips')
  }

  function handleSocialLogin() {
    signIn()
    navigate('/my-trips')
  }

  return (
    <div className="site-shell login-shell">
      <Headr />
      <main className="login-main">
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="visually-hidden" htmlFor="login-email">이메일 주소</label>
          <input
            id="login-email"
            name="email"
            type="email"
            placeholder="이메일 주소"
            autoComplete="email"
            required
          />

          <div className="password-field">
            <label className="visually-hidden" htmlFor="login-password">비밀번호</label>
            <input
              id="login-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호"
              autoComplete="current-password"
              required
            />
            <button
              className="password-toggle"
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
              aria-pressed={showPassword}
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3 21 21M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 5.2A10.7 10.7 0 0 1 12 5c5.2 0 8.5 5.2 8.5 5.2a9 9 0 0 1-2.2 2.6M6.2 6.3C3.8 8 2.5 10.2 2.5 10.2S5.8 17 12 17c1 0 1.9-.2 2.7-.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.3-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.3 6.5-9.5 6.5S2.5 12 2.5 12Z" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.8"/><path d="m4 4 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
              )}
            </button>
          </div>

          {error && <p className="login-error" role="alert">{error}</p>}
          <button className="visually-hidden" type="submit" tabIndex={-1}>로그인</button>
          <div className="login-divider"><span>OR</span></div>
          <button className="social-login kakao-login" type="button" onClick={handleSocialLogin}>카카오로 시작하기</button>
          <button className="social-login naver-login" type="button" onClick={handleSocialLogin}>네이버로 시작하기</button>
          <Link className="signup-link" to="/signup">회원가입</Link>
        </form>
      </main>
      <Footer />
    </div>
  )
}
