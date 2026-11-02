import { useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Headr from '../components/Headr.jsx'
import Footer from '../components/Footer.jsx'

const destinationOptions = [
  { name: '제주도', image: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=600&q=85' },
  { name: '강릉', image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=600&q=85' },
  { name: '부산', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=85' },
  { name: '대전', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=85' },
]

const initialSchedule = [
  { id: 1, day: 1, time: '11:00', name: '함덕해수욕장', location: '제주도', description: '에메랄드빛 바다를 감상하고 해변 산책하기', image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=700&q=85' },
  { id: 2, day: 1, time: '13:00', name: '올래국수', location: '제주도', description: '제주 향토 음식인 고기국수 맛보기', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=85' },
  { id: 3, day: 1, time: '15:00', name: '성산일출봉', location: '제주도', description: '제주의 대표 자연경관 감상하기', image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=700&q=85' },
  { id: 4, day: 1, time: '17:00', name: '광치기 해변', location: '제주도', description: '독특한 현무암 해변에서 사진 남기기', image: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=700&q=85' },
  { id: 5, day: 2, time: '10:00', name: '비자림', location: '제주도', description: '울창한 비자나무 숲길 산책하기', image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=700&q=85' },
  { id: 6, day: 2, time: '12:00', name: '월정리 해수욕장', location: '제주도', description: '아름다운 바다를 바라보며 여유 즐기기', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=700&q=85' },
  { id: 7, day: 2, time: '14:00', name: '월정리 감성 카페', location: '제주도', description: '오션뷰 카페에서 커피와 디저트 즐기기', image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=700&q=85' },
  { id: 10, day: 2, time: '16:30', name: '섭지코지', location: '제주도', description: '탁 트인 해안 절경과 산책로 구경하기', image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=700&q=85' },
  { id: 8, day: 3, time: '10:00', name: '애월한담해안산책로', location: '제주도', description: '푸른 바다를 따라 해안 산책하기', image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=700&q=85' },
  { id: 9, day: 3, time: '12:00', name: '애월 맛집', location: '제주도', description: '제주 해산물 요리로 마지막 점심 즐기기', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=700&q=85' },
  { id: 11, day: 3, time: '14:00', name: '협재 해수욕장', location: '제주도', description: '에메랄드빛 바다와 비양도 풍경 감상하기', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=700&q=85' },
  { id: 12, day: 3, time: '17:00', name: '애월 오션뷰 카페', location: '제주도', description: '카페에서 쉬면서 여행 마무리하기', image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=700&q=85' },
]

const destinationSchedules = {
  강릉: [
    { id: 'gang-1', day: 1, time: '10:00', name: '경포해변', location: '강릉', description: '넓은 백사장을 따라 동해 바다 산책하기', image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=700&q=85' },
    { id: 'gang-2', day: 1, time: '12:00', name: '초당순두부 거리', location: '강릉', description: '강릉의 부드럽고 고소한 순두부 맛보기', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=85' },
    { id: 'gang-3', day: 1, time: '15:00', name: '오죽헌', location: '강릉', description: '신사임당과 율곡 이이의 이야기를 둘러보기', image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=700&q=85' },
    { id: 'gang-4', day: 2, time: '10:00', name: '안목해변', location: '강릉', description: '바다 풍경을 보며 해변 카페거리 걷기', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=700&q=85' },
    { id: 'gang-5', day: 2, time: '13:00', name: '강릉 중앙시장', location: '강릉', description: '시장 먹거리와 지역 간식 즐기기', image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=700&q=85' },
    { id: 'gang-6', day: 2, time: '16:00', name: '경포호 산책로', location: '강릉', description: '호수와 솔숲을 따라 느긋하게 산책하기', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=700&q=85' },
    { id: 'gang-7', day: 3, time: '10:00', name: '정동진 해변', location: '강릉', description: '탁 트인 바다와 해안 풍경 감상하기', image: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=700&q=85' },
    { id: 'gang-8', day: 3, time: '12:00', name: '장칼국수 맛집', location: '강릉', description: '얼큰하고 구수한 강릉식 장칼국수 맛보기', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=85' },
    { id: 'gang-9', day: 3, time: '15:00', name: '안목 커피거리', location: '강릉', description: '오션뷰 카페에서 커피와 함께 여행 마무리하기', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=85' },
  ],
  대전: [
    { id: 'dae-1', day: 1, time: '10:00', name: '한밭수목원', location: '대전', description: '도심 속 정원과 산책로를 여유롭게 둘러보기', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=700&q=85' },
    { id: 'dae-2', day: 1, time: '12:00', name: '성심당 본점', location: '대전', description: '대전 대표 빵집에서 인기 빵과 간식 고르기', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=85' },
    { id: 'dae-3', day: 1, time: '15:00', name: '엑스포과학공원', location: '대전', description: '한빛탑과 공원을 둘러보며 과학 도시 즐기기', image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=85' },
    { id: 'dae-4', day: 2, time: '10:00', name: '국립중앙과학관', location: '대전', description: '다양한 과학 전시와 체험 공간 둘러보기', image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=700&q=85' },
    { id: 'dae-5', day: 2, time: '13:00', name: '대전 칼국수', location: '대전', description: '대전에서 사랑받는 칼국수로 든든한 점심', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=85' },
    { id: 'dae-6', day: 2, time: '16:00', name: '으능정이 문화의거리', location: '대전', description: '원도심 거리의 상점과 야경 구경하기', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=700&q=85' },
    { id: 'dae-7', day: 3, time: '10:00', name: '대청호 오백리길', location: '대전', description: '호수 전망과 숲길을 따라 가볍게 산책하기', image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=700&q=85' },
    { id: 'dae-8', day: 3, time: '13:00', name: '두부두루치기', location: '대전', description: '매콤한 양념의 대전 향토 음식 맛보기', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=85' },
    { id: 'dae-9', day: 3, time: '15:00', name: '대전역 주변 산책', location: '대전', description: '기념품과 간식을 챙기며 여행 마무리하기', image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=700&q=85' },
  ],
}

function dateAtOffset(startDate, offset) {
  const [year, month, day] = startDate.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  date.setDate(date.getDate() + offset)
  return date
}

function dateDifference(startDate, endDate) {
  const toUtc = (value) => {
    const [year, month, day] = value.split('-').map(Number)
    return Date.UTC(year, month - 1, day)
  }
  return Math.round((toUtc(endDate) - toUtc(startDate)) / 86400000)
}

function formatDate(date) {
  return `${date.getMonth() + 1}월 ${date.getDate()}일 (${new Intl.DateTimeFormat('ko-KR', { weekday: 'short' }).format(date)})`
}

function formatTripDate(date) {
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}(${new Intl.DateTimeFormat('ko-KR', { weekday: 'short' }).format(date)})`
}

function dateValue(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function ItineraryDialog({ mode, currentDestination, initialDate, onClose, onSave }) {
  const [date, setDate] = useState(initialDate)
  const [destination, setDestination] = useState(currentDestination)
  const [name, setName] = useState('')
  const [time, setTime] = useState('11:00')
  const [description, setDescription] = useState('')

  function submit(event) {
    event.preventDefault()
    onSave({ date, destination, name: name.trim(), time, description: description.trim() })
  }

  return (
    <div className="plan-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="plan-modal" role="dialog" aria-modal="true" aria-labelledby="plan-modal-title">
        <button className="plan-modal-close" type="button" onClick={onClose} aria-label="닫기">×</button>
        <span className="plan-modal-kicker">YOUR TRIP, YOUR WAY</span>
        <h2 id="plan-modal-title">{mode === 'destination' ? '여행지 변경하기' : '일정 추가하기'}</h2>
        <form onSubmit={submit}>
          <label className="plan-field"><span>날짜</span><input type="date" value={date} onChange={(event) => setDate(event.target.value)} required /></label>
          <label className="plan-field"><span>지역</span><select value={destination} onChange={(event) => setDestination(event.target.value)}>{destinationOptions.map((option) => <option key={option.name} value={option.name}>{option.name}</option>)}</select></label>
          {mode === 'schedule' && <>
            <label className="plan-field"><span>장소 / 일정</span><input value={name} onChange={(event) => setName(event.target.value)} placeholder="예: 함덕해수욕장" required /></label>
            <label className="plan-field"><span>시간</span><input type="time" value={time} onChange={(event) => setTime(event.target.value)} required /></label>
            <label className="plan-field"><span>메모</span><input value={description} onChange={(event) => setDescription(event.target.value)} placeholder="일정에 대한 간단한 메모" /></label>
          </>}
          <div className="plan-modal-actions"><button type="button" className="plan-cancel" onClick={onClose}>취소</button><button className="plan-save" type="submit">{mode === 'destination' ? '변경하기' : '일정 추가'}</button></div>
        </form>
      </section>
    </div>
  )
}

export default function TravelPlan() {
  const [searchParams] = useSearchParams()
  const requestedDestination = searchParams.get('destination')
  const initialDestination = destinationOptions.some((item) => item.name === requestedDestination) ? requestedDestination : '제주도'
  const [startDate, setStartDate] = useState('2026-10-27')
  const [tripDays, setTripDays] = useState(3)
  const [destination, setDestination] = useState(initialDestination)
  const [selectedDay, setSelectedDay] = useState(1)
  const [schedule, setSchedule] = useState(() => destinationSchedules[initialDestination] ?? initialSchedule)
  const [modalMode, setModalMode] = useState(null)
  const [removingId, setRemovingId] = useState(null)
  const [notice, setNotice] = useState('')
  const [dayMoveMenu, setDayMoveMenu] = useState(null)
  const touchStartX = useRef(null)
  const dayPressTimer = useRef(null)
  const longPressHandled = useRef(false)
  const currentDestination = destinationOptions.find((item) => item.name === destination) ?? destinationOptions[0]

  const dayDates = useMemo(
    () => Array.from({ length: tripDays }, (_, index) => dateAtOffset(startDate, index)),
    [startDate, tripDays],
  )

  const visibleSchedule = schedule
    .filter((item) => item.day === selectedDay)
    .sort((a, b) => a.time.localeCompare(b.time))

  function saveModal(values) {
    if (modalMode === 'destination') {
      setDestination(values.destination)
      setStartDate(values.date)
      setNotice(`${values.destination} 여행으로 변경했어요.`)
    } else {
      const offset = dateDifference(startDate, values.date)
      if (offset < 0) {
        const shift = Math.abs(offset)
        setStartDate(values.date)
        setSchedule((items) => items.map((item) => ({ ...item, day: item.day + shift })))
        setTripDays((days) => days + shift)
        setSelectedDay(1)
      }
      const day = Math.max(1, offset + 1)
      const placeImage = destinationOptions.find((item) => item.name === values.destination)?.image ?? currentDestination.image
      setSchedule((items) => [...items, {
        id: Date.now(), day, time: values.time, name: values.name,
        location: values.destination, description: values.description || `${values.destination}에서 즐기는 나만의 일정`, image: placeImage,
      }])
      setTripDays((days) => Math.max(days, day))
      setSelectedDay(day)
      setDestination(values.destination)
      setNotice(`${values.date} 일정을 추가했어요.`)
    }
    setModalMode(null)
    window.setTimeout(() => setNotice(''), 3000)
  }

  function removeSchedule(id) {
    setRemovingId(id)
    window.setTimeout(() => {
      setSchedule((items) => items.filter((item) => item.id !== id))
      setRemovingId(null)
    }, 220)
  }

  function handleTouchEnd(event, id) {
    if (touchStartX.current === null) return
    const distance = event.changedTouches[0].clientX - touchStartX.current
    if (distance < -70) removeSchedule(id)
    touchStartX.current = null
  }

  function startDayLongPress(day) {
    window.clearTimeout(dayPressTimer.current)
    longPressHandled.current = false
    dayPressTimer.current = window.setTimeout(() => {
      longPressHandled.current = true
      setDayMoveMenu(day)
    }, 550)
  }

  function moveDaySchedule(day, targetDay) {
    if (targetDay === day) {
      setDayMoveMenu(null)
      return
    }
    setSchedule((items) => items.map((item) => item.day === day
      ? { ...item, day: targetDay }
      : item.day === targetDay ? { ...item, day } : item))
    setSelectedDay(targetDay)
    setDayMoveMenu(null)
    setNotice(`${day}일차와 ${targetDay}일차 일정을 서로 바꿨어요.`)
    window.setTimeout(() => setNotice(''), 3000)
  }

  function finishDayLongPress() {
    window.clearTimeout(dayPressTimer.current)
  }

  function selectDay(day) {
    if (longPressHandled.current) {
      longPressHandled.current = false
      return
    }
    setSelectedDay(day)
  }

  return (
    <div className="site-shell travel-shell">
      <Headr />
      <main className="travel-main">
        <div className="travel-heading">
          <span className="section-kicker">MAKE IT YOURS</span>
          <h1>나만의 여행 계획을 만들어 보세요</h1>
          <p>추천 받은 여행지를 바탕으로, 나만의 일정을 계획 할 수 있어요</p>
        </div>

        <section className="trip-summary" aria-label="여행 정보">
          <img src={currentDestination.image} alt={`${destination} 풍경`} />
          <div className="trip-summary-copy"><h2>{destination}</h2><p>{formatTripDate(dayDates[0])} ~ {formatTripDate(dayDates[tripDays - 1])} · {tripDays - 1}박 {tripDays}일</p></div>
          <button className="change-destination" type="button" onClick={() => setModalMode('destination')}>여행지 변경하기</button>
        </section>

        <section className="itinerary-section" aria-labelledby="itinerary-title">
          <div className="itinerary-title-row"><div><span className="section-kicker">YOUR ITINERARY</span><h2 id="itinerary-title">일정표</h2></div></div>
          {notice && <p className="plan-notice" role="status">{notice}</p>}
          <div className="day-picker-row">
            <div className="day-tabs" role="tablist" aria-label="여행 일차 선택">
              {dayDates.map((date, index) => {
                const day = index + 1
                return <div className="day-tab-wrap" key={dateValue(date)}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={selectedDay === day}
                    aria-label={`${day}일차, 길게 누르면 일차 변경 메뉴 열기`}
                    title="길게 눌러 일차 변경"
                    className={`day-tab ${selectedDay === day ? 'active' : ''}`}
                    onPointerDown={() => startDayLongPress(day)}
                    onPointerUp={finishDayLongPress}
                    onPointerLeave={finishDayLongPress}
                    onContextMenu={(event) => event.preventDefault()}
                    onClick={() => selectDay(day)}
                  ><strong>{day}일차</strong><span>{formatDate(date)}</span></button>
                  {dayMoveMenu === day && <label className="day-move-popover">
                    <span>{day}일차 일정을 옮길 날짜</span>
                    <select autoFocus value={day} onChange={(event) => moveDaySchedule(day, Number(event.target.value))} onBlur={() => setDayMoveMenu(null)}>
                      {dayDates.map((_, optionIndex) => <option key={optionIndex + 1} value={optionIndex + 1}>{optionIndex + 1}일차</option>)}
                    </select>
                  </label>}
                </div>
              })}
            </div>
            <button className="add-schedule" type="button" onClick={() => setModalMode('schedule')}><span aria-hidden="true">＋</span> 일정추가</button>
          </div>

          <div className="schedule-list">
            {visibleSchedule.length ? visibleSchedule.map((item) => (
              <article
                key={item.id}
                className={`schedule-card ${removingId === item.id ? 'is-removing' : ''}`}
                onTouchStart={(event) => { touchStartX.current = event.touches[0].clientX }}
                onTouchEnd={(event) => handleTouchEnd(event, item.id)}
              >
                <span className="timeline-dot" aria-hidden="true" />
                <img src={item.image} alt={`${item.name} 사진`} loading="lazy" />
                <time className="schedule-time">{item.time}</time>
                <div className="schedule-copy"><h3>{item.name}</h3><p>{item.description}</p><span className="schedule-location">{item.location}</span></div>
                <button className="remove-schedule" type="button" onClick={() => removeSchedule(item.id)} aria-label={`${item.name} 일정 삭제`}>×</button>
              </article>
            )) : <div className="empty-day"><span>✦</span><strong>아직 등록된 일정이 없어요</strong><p>일정 추가 버튼을 눌러 오늘의 여행을 채워보세요.</p></div>}
          </div>
          <p className="swipe-hint">일정을 왼쪽으로 밀면 목록에서 삭제할 수 있어요.</p>
        </section>
      </main>
      <Footer />
      {modalMode && <ItineraryDialog mode={modalMode} currentDestination={destination} initialDate={dateValue(dayDates[modalMode === 'destination' ? 0 : selectedDay - 1])} onClose={() => setModalMode(null)} onSave={saveModal} />}
    </div>
  )
}
