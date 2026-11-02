import { BrandMark } from './Headr.jsx'

export default function Footer() {
  return (
    <footer className="site-footer">
      <BrandMark />
      <div className="footer-info">
        <p><strong>UNPLAN</strong><span>대표자 김지혜</span><span>사업자등록번호 999-99-99999</span></p>
        <p>주소 : 서울특별시 관악구 신림로 340&nbsp;&nbsp;&nbsp; 이메일 : unplan@naver.com</p>
      </div>
      <div className="footer-right"><strong>© 2026 UNPLAN. All rights reserved.</strong><small>STYLE FITS YOU</small></div>
    </footer>
  )
}
