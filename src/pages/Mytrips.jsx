import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Headr from '../components/Headr.jsx'
import Footer from '../components/Footer.jsx'
import ProfilePhoto from '../components/ProfilePhoto.jsx'
import { signOut } from '../utils/auth.js'

const startingTrips = [
  {
    id: 1,
    destination: '제주도',
    dates: '2026.10.27(화)~2026.10.29(목) 2박 3일',
    image: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=700&q=85',
  },
  {
    id: 2,
    destination: '대전',
    dates: '2026.08.27(목)~2026.08.29(토) 2박 3일',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=700&q=85',
  },
  {
    id: 3,
    destination: '강릉',
    dates: '2026.09.12(토)~2026.09.14(월) 2박 3일',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=700&q=85',
  },
]

export default function Mytrips() {
  const [trips, setTrips] = useState(startingTrips)
  const navigate = useNavigate()

  function handleLogout() {
    signOut()
    navigate('/', { replace: true })
  }

  return (
    <div className="site-shell account-shell">
      <Headr />
      <main className="account-main">
        <aside className="account-sidebar">
          <div className="account-profile">
            <ProfilePhoto />
            <strong>traveler_member</strong>
          </div>
          <nav className="account-menu" aria-label="내 계정 메뉴">
            <Link className="active" to="/my-trips"><span aria-hidden="true">♧</span>내 여행 목록</Link>
            <Link to="/my-favorites"><span aria-hidden="true">♡</span>찜한 장소</Link>
            <button type="button" onClick={handleLogout}><span aria-hidden="true">⇦</span>로그아웃</button>
          </nav>
        </aside>

        <section className="account-content" aria-label="내 여행 목록">
          {trips.length ? trips.map((trip) => (
              <article className="account-trip-card" key={trip.id}>
                <img src={trip.image} alt={`${trip.destination} 풍경`} />
                <div className="account-trip-info"><h1>{trip.destination} 여행</h1><p>{trip.dates}</p></div>
                <Link className="account-view-button" to={`/travel-plan?destination=${encodeURIComponent(trip.destination)}`}>보기</Link>
                <button className="account-delete-button" type="button" onClick={() => setTrips((items) => items.filter((item) => item.id !== trip.id))}>삭제</button>
              </article>
            )) : <div className="account-empty"><strong>아직 저장된 여행이 없어요.</strong><Link to="/destinations">여행지 둘러보기</Link></div>}
        </section>
      </main>
      <Footer />
    </div>
  )
}
