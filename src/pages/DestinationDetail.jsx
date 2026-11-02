import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Headr from '../components/Headr.jsx'
import Footer from '../components/Footer.jsx'
import SavePlaceButton from '../components/SavePlaceButton.jsx'

const destinations = {
  jeju: {
    name: '제주도',
    subtitle: '자연속에서 쉬어 가는 여행',
    image: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1500&q=90',
    season: '3월~5월 (봄)', duration: '2박 3일', theme: '자연, 힐링',
    description: '푸른 바다와 아름다운 자연이 어우러진 제주도는 언제나 여행자들에게 사랑받는 섬입니다. 성산일출봉, 협재해변 등 다양한 명소들이 가득해요.',
    sections: {
      '주요 명소': [
        { name: '성산 일출봉', description: '웅장한 화산 지형과 아름다운 일출을 감상할 수 있는 명소', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=85' },
        { name: '협재 해수욕장', description: '에메랄드 빛 바다와 하얀 모래사장이 매력적인 해변', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=700&q=85' },
        { name: '한라산', description: '사계절마다 아름다운 자연 풍경을 만날 수 있는 제주의 상징', image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=700&q=85' },
      ],
      '추천 활동': [
        { name: '해안도로 드라이브', description: '푸른 바다를 따라 제주의 아름다운 풍경 감상', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=85' },
        { name: '오름 트레킹', description: '자연 속을 걸으며 탁 트인 제주 전경 감상', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=700&q=85' },
        { name: '카페 : 벨롱도르', description: '에메랄드 빛 바다를 바라보며 여유로운 시간을 보낼 수 있는 카페', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=85' },
      ],
      '맛집': [
        { name: '포크80 제주 공항점', category: '흑돼지 구이', description: '육즙 가득한 제주 흑돼지를 맛볼 수 있는 인기 고깃집', address: '37-1 Noyeon-ro, Jeju-si, Jeju-do', image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=700&q=85' },
        { name: '제주미담', category: '고기국수', description: '진한 멸치 육수와 부드러운 고기가 어우러진 제주 향토 음식', address: 'Garyeong-ro, Jeju-si, Jeju-do', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=85' },
        { name: '종가수나들', category: '해산물 한상', description: '제주식 해산물 요리와 다양한 반찬을 푸짐하게 즐길 수 있는 맛집', address: 'Jongdal-ri, Gujwa-eup, Jeju-do', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=85' },
      ],
      '여행 팁': [
        { name: '렌터카 미리 예약', description: '대중교통으로 가기 어려운 곳이 많아 렌터카를 이용하면 편리해요', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=85' },
        { name: '날씨 확인하기', description: '날씨 변화가 잦으니 출발 전에 예보를 확인하고 겉옷을 챙겨요', image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=700&q=85' },
        { name: '운영 시간 확인하기', description: '방문 전 입장 시간과 휴무일을 확인하면 헛걸음을 줄일 수 있어요', image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=700&q=85' },
      ],
    },
  },
  gangneung: {
    name: '강릉', subtitle: '바다와 커피가 있는 여행', image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1500&q=90',
    season: '6월~8월 (여름)', duration: '1박 2일', theme: '바다, 감성',
    description: '푸른 동해와 향긋한 커피가 기다리는 강릉에서 해변 산책과 여유로운 바다 여행을 즐겨보세요.',
    sections: {
      '주요 명소': [
        { name: '경포해변', description: '넓은 백사장과 맑은 동해를 만날 수 있는 강릉 대표 해변', image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=700&q=85' },
        { name: '안목해변', description: '바다를 바라보며 산책하고 해변 카페를 즐기기 좋은 곳', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=700&q=85' },
        { name: '오죽헌', description: '신사임당과 율곡 이이의 이야기를 만나는 역사 명소', image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=700&q=85' },
      ],
      '추천 활동': [
        { name: '정동진 해안 산책', description: '탁 트인 바다와 해안 풍경을 따라 천천히 걸어보세요', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=85' },
        { name: '안목 커피거리', description: '바다 전망 카페에서 강릉의 커피 문화를 즐겨보세요', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=85' },
        { name: '경포호 자전거', description: '호수 둘레길을 달리며 해변과 솔숲 풍경을 감상해요', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=700&q=85' },
      ],
      '맛집': [
        { name: '초당순두부 거리', category: '초당순두부', description: '고소하고 부드러운 순두부와 모두부를 맛보세요', address: '초당동, 강릉시', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=85' },
        { name: '강릉 중앙시장', category: '시장 먹거리', description: '닭강정과 감자전 등 강릉의 다양한 간식을 만나는 시장', address: '금성로 21, 강릉시', image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=700&q=85' },
        { name: '장칼국수', category: '강릉 향토 음식', description: '얼큰하고 구수한 국물로 든든하게 한 끼 즐기기', address: '강릉 시내 일대', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=85' },
      ],
      '여행 팁': [
        { name: '해변 이동 계획하기', description: '해변과 주요 명소가 흩어져 있어 버스 시간이나 주차 위치를 미리 확인하세요', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=85' },
        { name: '주말 카페 대기 확인', description: '안목해변 카페거리는 주말 혼잡 시간대를 피해 방문하면 여유로워요', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=85' },
        { name: '바닷바람 대비하기', description: '여름에도 해 질 무렵에는 바람이 쌀쌀할 수 있으니 얇은 겉옷을 챙기세요', image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=700&q=85' },
      ],
    },
  },
  daejeon: {
    name: '대전', subtitle: '여유롭고 즐기는 도시 여행', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1500&q=90',
    season: '9월~11월 (가을)', duration: '1박 2일', theme: '도시, 자연',
    description: '도시의 편리함과 초록빛 쉼터가 어우러진 대전에서 느긋한 하루를 보내보세요.',
    sections: {
      '주요 명소': [
        { name: '한밭수목원', description: '도심 한가운데서 계절별 정원과 산책로를 만나는 휴식 공간', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=700&q=85' },
        { name: '엑스포과학공원', description: '한빛탑과 넓은 공원을 둘러보며 대전의 과학 도시 분위기를 느껴보세요', image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=85' },
        { name: '으능정이 문화의거리', description: '쇼핑과 먹거리, 야간 조명이 어우러진 대전 원도심 거리', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=700&q=85' },
      ],
      '추천 활동': [
        { name: '성심당 본점 둘러보기', description: '대전의 명물 빵집에서 대표 빵을 고르고 원도심을 산책해요', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=85' },
        { name: '대청호 드라이브', description: '호수 주변 전망대와 산책길을 따라 여유롭게 풍경 감상하기', image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=700&q=85' },
        { name: '수목원 피크닉', description: '날씨 좋은 날 정원과 잔디밭에서 느긋하게 쉬어가세요', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=85' },
      ],
      '맛집': [
        { name: '성심당', category: '베이커리', description: '튀김소보로와 부추빵으로 유명한 대전 대표 빵집', address: '대종로 481, 중구', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=85' },
        { name: '대전 칼국수', category: '칼국수', description: '멸치 육수와 쫄깃한 면이 어우러진 든든한 한 끼', address: '대전 중구 일대', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=85' },
        { name: '두부두루치기', category: '대전 향토 음식', description: '매콤한 양념에 두부와 면을 곁들여 즐기는 별미', address: '대전 원도심 일대', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=85' },
      ],
      '여행 팁': [
        { name: '대중교통 활용하기', description: '대전역과 주요 도심 명소는 지하철과 버스로 편리하게 이동할 수 있어요', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=700&q=85' },
        { name: '월요일 휴관 확인', description: '수목원과 전시 시설은 휴관일이나 운영 시간이 다를 수 있어 방문 전에 확인하세요', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=700&q=85' },
        { name: '빵집은 오전 방문 추천', description: '인기 빵은 늦은 시간에 품절될 수 있어 여유 있게 방문하는 편이 좋아요', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=85' },
      ],
    },
  },
}

const tabs = ['주요 명소', '추천 활동', '맛집', '여행 팁']

export default function DestinationDetail() {
  const { id } = useParams()
  const destinationKey = id === '1' ? 'gangneung' : id === '2' ? 'daejeon' : id === '3' ? 'jeju' : id
  const destination = destinations[destinationKey] ?? destinations.jeju
  const [activeTab, setActiveTab] = useState(tabs[0])
  const items = destination.sections?.[activeTab] ?? [
    { name: `${destination.name} 추천 명소`, description: `${destination.name}에서 둘러보기 좋은 여행 장소`, image: destination.image },
    { name: `${destination.name} 즐기기`, description: destination.description, image: destination.image },
    { name: '여행 계획 세우기', description: '내 취향에 맞는 일정으로 여행을 준비해 보세요', image: destination.image },
  ]

  return (
    <div className="site-shell detail-shell">
      <Headr />
      <main className="destination-detail-main">
        <img className="detail-hero-image" src={destination.image} alt={`${destination.name} 바다와 자연 풍경`} />
        <div className="detail-place-title"><div><h1>{destination.name}</h1><p>{destination.subtitle}</p></div><span>추천 여행지</span></div>

        <section className="destination-facts" aria-label="여행 정보">
          <div className="destination-fact"><span className="fact-icon" aria-hidden="true">☁</span><div><span>추천 계절</span><strong>{destination.season}</strong></div></div>
          <div className="destination-fact"><span className="fact-icon" aria-hidden="true">◷</span><div><span>여행 기간</span><strong>{destination.duration}</strong></div></div>
          <div className="destination-fact"><span className="fact-icon home-icon" aria-hidden="true">⌂</span><div><span>추천 테마</span><strong>{destination.theme}</strong></div></div>
        </section>

        <p className="destination-description">{destination.description}</p>
        <div className="detail-tabs" role="tablist" aria-label="여행 정보 종류">
          {tabs.map((tab) => <button key={tab} type="button" role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>{tab}</button>)}
        </div>
        <div className="detail-card-grid">
          {items.map((item) => <article className="detail-info-card" key={item.name}>
            <SavePlaceButton place={{ ...item, id: `${destinationKey}-${activeTab}-${item.name}`, destination: destination.name, category: item.category || activeTab }} />
            <img src={item.image} alt={`${item.name} 사진`} loading="lazy" />
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </article>)}
        </div>
        <Link className="add-to-plan-button" to={`/travel-plan?destination=${encodeURIComponent(destination.name)}`}>여행 계획에 추가하기</Link>
      </main>
      <Footer />
    </div>
  )
}
