import { Link, useNavigate } from 'react-router-dom'
import Headr from '../components/Headr.jsx'
import Footer from '../components/Footer.jsx'
import ProfilePhoto from '../components/ProfilePhoto.jsx'
import useFavorites from '../hooks/useFavorites.js'
import { signOut } from '../utils/auth.js'

export default function MyFavorites() {
  const { favorites, removeFavorite } = useFavorites()
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
            <Link to="/my-trips"><span aria-hidden="true">♧</span>내 여행 목록</Link>
            <Link className="active" to="/my-favorites"><span aria-hidden="true">♡</span>찜한 장소</Link>
            <button type="button" onClick={handleLogout}><span aria-hidden="true">⇦</span>로그아웃</button>
          </nav>
        </aside>

        <section className="account-content favorites-content" aria-label="찜한 장소 목록">
          {favorites.length ? favorites.map((place) => (
            <article className="saved-place-row" key={place.id}>
              <img src={place.image} alt={`${place.name} 사진`} />
              <div className="saved-place-info">
                <h1>{place.name}</h1>
                {place.category && <span className="saved-place-category">{place.category}</span>}
                <p>{place.address || place.description || `${place.destination}에서 저장한 추천 장소`}</p>
              </div>
              <Link className="account-view-button" to={`/travel-plan?destination=${encodeURIComponent(place.destination)}`}>여행 계획</Link>
              <button className="account-delete-button" type="button" onClick={() => removeFavorite(place.id)} aria-label={`${place.name} 찜 목록에서 삭제`}>삭제</button>
            </article>
          )) : (
            <div className="account-empty">
              <strong>찜한 장소가 아직 없어요.</strong>
              <span>여행지 카드의 하트 아이콘을 눌러 저장해 보세요.</span>
              <Link to="/destinations">여행지 탐색하기</Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
