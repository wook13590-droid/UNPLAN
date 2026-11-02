
import { useState } from 'react'
import Headr from '../components/Headr.jsx'
import Footer from '../components/Footer.jsx'

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    birth: '',
    phone: '',
    id: '',
    password: '',
    passwordConfirm: '',
  })

  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    setMessage('')
    setSuccess(false)
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (Object.values(form).some((value) => !value.trim())) {
      setMessage('모든 항목을 입력해 주세요.')
      return
    }

    if (form.password !== form.passwordConfirm) {
      setMessage('비밀번호가 일치하지 않습니다.')
      return
    }

    setMessage('회원가입이 완료되었습니다')
    setSuccess(true)

    setForm({
      name: '',
      birth: '',
      phone: '',
      id: '',
      password: '',
      passwordConfirm: '',
    })
  }

  return (
    <div className="site-shell signup-shell">
      <Headr />

      <main className="signup-main">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-row">
            <label htmlFor="name">이름</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="이름을 입력하세요"
            />
          </div>

          <div className="signup-row">
            <label htmlFor="birth">생년월일</label>
            <input
              id="birth"
              name="birth"
              type="text"
              value={form.birth}
              onChange={handleChange}
              placeholder="생년월일을 입력하세요 (예: 2003-11-05)"
            />
          </div>

          <div className="signup-row">
            <label htmlFor="phone">번호</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="번호를 입력하세요"
            />
          </div>

          <div className="signup-row">
            <label htmlFor="id">아이디</label>
            <input
              id="id"
              name="id"
              value={form.id}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
            />
          </div>

          <div className="signup-row">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <div className="signup-row">
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              value={form.passwordConfirm}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <button type="submit" className="signup-submit">
            회원 가입
          </button>

          {message && (
            <p
              className={`signup-message ${success ? 'success' : 'error'}`}
              role="status"
              aria-live="polite"
            >
              {message}
            </p>
          )}
        </form>
      </main>

      <Footer />
    </div>
  )
}
