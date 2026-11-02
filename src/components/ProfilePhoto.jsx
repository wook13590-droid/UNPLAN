import { useEffect, useRef, useState } from 'react'

const PHOTO_KEY = 'unplan-profile-photo'
const DEFAULT_PHOTO = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=320&q=85'

export default function ProfilePhoto() {
  const [photo, setPhoto] = useState(() => window.localStorage.getItem(PHOTO_KEY) || DEFAULT_PHOTO)
  const inputRef = useRef(null)

  useEffect(() => {
    function syncPhoto(event) {
      if (event.key === PHOTO_KEY) setPhoto(event.newValue || DEFAULT_PHOTO)
    }
    window.addEventListener('storage', syncPhoto)
    return () => window.removeEventListener('storage', syncPhoto)
  }, [])

  function handlePhotoChange(event) {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      window.alert('이미지 파일을 선택해주세요.')
      event.target.value = ''
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const image = new Image()
      image.onload = () => {
        const canvas = document.createElement('canvas')
        const size = 512
        const scale = Math.min(size / image.width, size / image.height, 1)
        canvas.width = Math.round(image.width * scale)
        canvas.height = Math.round(image.height * scale)
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)
        const resizedPhoto = canvas.toDataURL('image/jpeg', 0.82)
        try {
          window.localStorage.setItem(PHOTO_KEY, resizedPhoto)
          setPhoto(resizedPhoto)
        } catch {
          window.alert('사진을 저장하지 못했습니다. 다른 사진을 선택해주세요.')
        }
      }
      image.src = reader.result
    }
    reader.readAsDataURL(file)
    event.target.value = ''
  }

  return (
    <>
      <button
        className="profile-photo-button"
        type="button"
        onClick={() => inputRef.current?.click()}
        aria-label="프로필 사진 변경"
        title="프로필 사진 변경"
      >
        <img src={photo} alt="프로필 사진. 눌러서 변경" />
        <span aria-hidden="true">변경</span>
      </button>
      <input
        ref={inputRef}
        className="profile-photo-input"
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        tabIndex={-1}
        aria-hidden="true"
      />
    </>
  )
}
