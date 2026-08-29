import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Recommendations from './pages/Recommendations.jsx'
import Wardrobe from './pages/Wardrobe.jsx'
import TryOn from './pages/TryOn.jsx'
import Profile from './pages/Profile.jsx'
import './styles/components.css'

const VALID_PAGES = ['home', 'recommendations', 'wardrobe', 'tryon', 'profile']
const ROUTE_ALIASES = {
  'try-on': 'tryon',
  'tryon': 'tryon',
}
const ROUTE_PATHS = {
  home: '/',
  recommendations: '/recommendations',
  wardrobe: '/wardrobe',
  tryon: '/try-on',
  profile: '/profile',
}

function normalizePage(value) {
  const route = String(value ?? '')
    .replace(/^#/, '')
    .replace(/^\//, '')
    .trim()
    .toLowerCase()

  if (!route || route === 'index') return 'home'

  const normalized = ROUTE_ALIASES[route] || route
  return VALID_PAGES.includes(normalized) ? normalized : 'home'
}

function pageFromLocation() {
  const hashPage = window.location.hash ? window.location.hash.replace(/^#/, '') : ''
  const pathPage = window.location.pathname && window.location.pathname !== '/'
    ? window.location.pathname.replace(/^\//, '').replace(/\/$/, '')
    : ''

  return normalizePage(hashPage || pathPage || 'home')
}

function syncLocation(nextPage) {
  const normalizedPage = normalizePage(nextPage)
  const nextPath = ROUTE_PATHS[normalizedPage] || '/'

  if (window.location.pathname !== nextPath) {
    window.history.pushState({}, '', nextPath)
    return
  }

  if (window.location.hash && normalizedPage !== 'home') {
    window.history.replaceState({}, '', nextPath)
  }
}

export default function App() {
  const [page, setPage] = useState(pageFromLocation())
  const [selectedOutfit, setSelectedOutfit] = useState(null)

  // Keep the URL in sync so refresh and browser back/forward work without
  // a routing library. Prefer the path form and fall back to hash only if needed.
  useEffect(() => {
    syncLocation(page)
  }, [page])

  useEffect(() => {
    function onLocationChange() {
      setPage(pageFromLocation())
    }

    window.addEventListener('hashchange', onLocationChange)
    window.addEventListener('popstate', onLocationChange)

    return () => {
      window.removeEventListener('hashchange', onLocationChange)
      window.removeEventListener('popstate', onLocationChange)
    }
  }, [])

  function navigate(nextPage) {
    const canonicalPage = normalizePage(nextPage)
    setPage(canonicalPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app-shell">
      <Navbar page={page} onNavigate={navigate} />

      {page === 'home' && <Home onNavigate={navigate} />}

      {page === 'recommendations' && (
        <Recommendations
          onNavigate={navigate}
          selectedOutfit={selectedOutfit}
          onSelectOutfit={setSelectedOutfit}
        />
      )}

      {page === 'wardrobe' && <Wardrobe />}

      {page === 'tryon' && (
        <TryOn selectedOutfit={selectedOutfit} onSelectOutfit={setSelectedOutfit} />
      )}

      {page === 'profile' && <Profile />}
    </div>
  )
}
