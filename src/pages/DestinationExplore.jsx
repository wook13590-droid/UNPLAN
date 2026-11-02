import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Headr from '../components/Headr.jsx'
import Footer from '../components/Footer.jsx'
import SavePlaceButton from '../components/SavePlaceButton.jsx'

const destinations = [
  {
    slug: 'gangneung',
    name: '강릉',
    description: '바다와 커피가 있는 여행',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=85',
    categories: ['바다'],
  },
  {
    slug: 'daejeon',
    name: '대전',
    description: '여유롭고 즐기는 도시 여행',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=85',
    categories: ['도시', '자연'],
  },
  {
    slug: 'jeju',
    name: '제주도',
    description: '자연 속에서 쉬어 가기',
    image: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=800&q=85',
    categories: ['바다', '자연'],
  },
]

const categories = ['전체', '바다', '자연', '도시']

export default function DestinationExplore() {
  const [category, setCategory] = useState('전체')
  const [query, setQuery] = useState('')
  const [showHelp, setShowHelp] = useState(false)

  const filteredDestinations = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    return destinations.filter((destination) => {
      const matchesCategory = category === '전체' || destination.categories.includes(category)
      const matchesQuery = !normalizedQuery || `${destination.name} ${destination.description}`.toLocaleLowerCase().includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })
  }, [category, query])

  return (
    <div className="site-shell explore-shell">
      <Headr />
      <main className="explore-main">
        <div className="explore-heading">
          <span className="section-kicker">FIND YOUR NEXT STOP</span>
          <h1>어떤 여행지를 찾고 있나요?</h1>
          <p>원하는 여행지를 검색하고, 취향에 맞는 여행지를 선택하세요!</p>
        </div>

        <div className="explore-search-row">
          <label className="visually-hidden" htmlFor="destination-search">여행지 검색</label>
          <input
            id="destination-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="여행지 검색하기"
          />
          <button className="explore-help" type="button" onClick={() => setShowHelp(true)} aria-label="검색 도움말">?</button>
        </div>

        <div className="explore-categories" role="group" aria-label="여행지 종류 선택">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              className={`explore-category ${category === item ? 'active' : ''}`}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {filteredDestinations.length ? (
          <div className="explore-grid">
            {filteredDestinations.map((destination, index) => (
              <article className="explore-card" key={destination.name}>
                <SavePlaceButton place={{ ...destination, id: `destination-${destination.name}`, destination: destination.name }} />
                <Link className="explore-card-link" to={`/destinations/${destination.slug}`} aria-label={`${destination.name} 상세 보기`}>
                  <img src={destination.image} alt={`${destination.name} 풍경`} loading="lazy" />
                  <div className="explore-card-content">
                    <h2>{destination.name}</h2>
                    <p>{destination.description}</p>
                    <span className="explore-detail-link">자세히 보기</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="explore-empty"><strong>검색 결과가 없어요.</strong><span>다른 여행지 이름으로 검색해 보세요.</span></div>
        )}
      </main>
      <Footer />

      {showHelp && (
        <div className="explore-help-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setShowHelp(false)}>
          <section className="explore-help-dialog" role="dialog" aria-modal="true" aria-labelledby="explore-help-title">
            <button type="button" className="explore-help-close" onClick={() => setShowHelp(false)} aria-label="닫기">×</button>
            <span className="section-kicker">TRAVEL TIP</span>
            <h2 id="explore-help-title">여행지를 찾아보세요</h2>
            <p>검색창에 지역 이름을 입력하거나 바다, 자연, 도시 버튼을 눌러 원하는 여행지를 찾아보세요.</p>
            <button type="button" className="explore-help-ok" onClick={() => setShowHelp(false)}>확인</button>
          </section>
        </div>
      )}
    </div>
  )
}
