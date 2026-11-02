import { useEffect, useState } from 'react'
import { isAuthenticated } from '../utils/auth.js'

const STORAGE_KEY = 'unplan-favorites'
const CHANGE_EVENT = 'unplan-favorites-changed'
const sampleFavorites = [
  { id: 'jeju-맛집-포크80 제주 공항점', name: '포크80 제주 공항점', category: '흑돼지 구이', description: '37-1 Noyeon-ro, 특별자치도, Jeju-si, Jeju-do, South Korea', image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=700&q=85', destination: '제주도' },
  { id: 'jeju-맛집-제주미담', name: '제주미담', category: '고기국수', description: 'South Korea, Jeju-do, Jeju-si, 특별자치도, Garyeong-ro, 19 KR', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=85', destination: '제주도' },
  { id: 'jeju-맛집-종가수나들', name: '종가수나들', category: '해산물 한상', description: 'South Korea, Jeju-do, Jeju-si, 특별자치도, Gujwa-eup, Jongdal-ri, 2566-6 1 KR', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=85', destination: '제주도' },
]

function readFavorites() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === null) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleFavorites))
      return sampleFavorites
    }
    const value = JSON.parse(stored)
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

function saveFavorites(favorites) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export default function useFavorites() {
  const [favorites, setFavorites] = useState(readFavorites)

  useEffect(() => {
    const syncFavorites = () => setFavorites(readFavorites())
    window.addEventListener(CHANGE_EVENT, syncFavorites)
    window.addEventListener('storage', syncFavorites)
    return () => {
      window.removeEventListener(CHANGE_EVENT, syncFavorites)
      window.removeEventListener('storage', syncFavorites)
    }
  }, [])

  function toggleFavorite(place) {
    if (!isAuthenticated()) {
      window.alert('로그인 후 이용해주세요.')
      return
    }

    const id = String(place.id ?? place.slug ?? place.name)
    const current = readFavorites()
    const exists = current.some((favorite) => favorite.id === id)
    const next = exists
      ? current.filter((favorite) => favorite.id !== id)
      : [...current, {
          id,
          name: place.name,
          description: place.description || '',
          image: place.image,
          category: place.category || '',
          destination: place.destination || place.travelDestination || place.name,
          address: place.address || '',
        }]
    saveFavorites(next)
    setFavorites(next)
  }

  function removeFavorite(id) {
    const next = readFavorites().filter((favorite) => favorite.id !== id)
    saveFavorites(next)
    setFavorites(next)
  }

  function isFavorite(place) {
    const id = String(place.id ?? place.slug ?? place.name)
    return favorites.some((favorite) => favorite.id === id)
  }

  return { favorites, toggleFavorite, removeFavorite, isFavorite }
}
