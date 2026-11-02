import { Link } from 'react-router-dom'
import Headr from '../components/Headr.jsx'
import Footer from '../components/Footer.jsx'
import beach from '../assets/tropical-beach.png'
import SavePlaceButton from '../components/SavePlaceButton.jsx'

const destinations = [
  {
    name: '강릉',
    description: '바다와 커피가 있는 여행',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=85',
    tag: '바다 여행',
  },
  {
    name: '대전',
    description: '여유롭고 즐기는 도시 여행',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=85',
    tag: '자연과 휴식',
  },
  {
    name: '제주도',
    description: '자연 속에서 쉬어 가기',
    image: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=900&q=85',
    tag: '섬 여행',
  },
]

export default function Main() {
  return (
    <div className="site-shell">
      <Headr />
      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="eyebrow">YOUR NEXT DESTINATION</span>
            <h1 id="hero-title">오늘 어디로 떠나볼까요?</h1>
            <p>계획은 없어도 괜찮아, UNPLAN이 여행지를 골라줄게요.</p>
            <Link className="primary-button" to="/destinations">
              <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 10 4 4 8-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              여행 시작하기
            </Link>
          </div>
          <div className="hero-image-wrap">
            <img src={beach} alt="야자수가 늘어선 맑고 푸른 열대 해변" className="hero-image" />
            <span className="image-caption">잠깐의 여유, 새로운 시작</span>
          </div>
        </section>

        <section className="popular-section" id="popular" aria-labelledby="popular-title">
          <div className="section-heading">
            <div><span className="section-kicker">FIND YOUR PLACE</span><h2 id="popular-title">인기 여행지</h2></div>
            <Link to="/destinations" className="all-link">전체 보기 <span aria-hidden="true">→</span></Link>
          </div>
          <div className="destination-grid">
            {destinations.map((place, index) => (
              <article className="destination-card" key={place.name}>
                <SavePlaceButton place={{ ...place, id: `destination-${place.name}`, destination: place.name }} />
                <Link to={`/destinations/${index + 1}`} className="card-image-link" aria-label={`${place.name} 자세히 보기`}>
                  <img src={place.image} alt={`${place.name}의 풍경`} loading="lazy" />
                  <span className="card-tag">{place.tag}</span>
                </Link>
                <div className="card-content">
                  <h3>{place.name}</h3>
                  <p>{place.description}</p>
                  <Link to={`/destinations/${index + 1}`} className="detail-button">자세히 보기 <span aria-hidden="true">↗</span></Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
