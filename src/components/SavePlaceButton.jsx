import useFavorites from '../hooks/useFavorites.js'

export default function SavePlaceButton({ place, className = '' }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const saved = isFavorite(place)

  return (
    <button
      className={`save-place-button ${saved ? 'saved' : ''} ${className}`}
      type="button"
      aria-label={saved ? `${place.name} 찜 취소` : `${place.name} 찜하기`}
      aria-pressed={saved}
      title={saved ? '찜 취소' : '찜하기'}
      onClick={() => toggleFavorite(place)}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.8 8.8c0 5.1-8.8 10.1-8.8 10.1S3.2 13.9 3.2 8.8a4.5 4.5 0 0 1 8.8-1.3 4.5 4.5 0 0 1 8.8 1.3Z" />
      </svg>
    </button>
  )
}
