
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Main from './pages/Main.jsx'
import Signup from './pages/Signup.jsx'
import TravelPlan from './pages/TravelPlan.jsx'
import DestinationExplore from './pages/DestinationExplore.jsx'
import DestinationDetail from './pages/DestinationDetail.jsx'
import Mytrips from './pages/Mytrips.jsx'
import MyFavorites from './pages/MyFavorites.jsx'
import { isAuthenticated } from './utils/auth.js'
import './App.css'

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter basename="/UNPLAN">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/travel-plan" element={<TravelPlan />} />
        <Route path="/destinations" element={<DestinationExplore />} />
        <Route path="/destinations/:id" element={<DestinationDetail />} />
        <Route path="/my-trips" element={<ProtectedRoute><Mytrips /></ProtectedRoute>} />
        <Route path="/my-favorites" element={<ProtectedRoute><MyFavorites /></ProtectedRoute>} />
        <Route path="*" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}
