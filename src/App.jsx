import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Recommendations from './pages/Recommendations.jsx'
import Wardrobe from './pages/Wardrobe.jsx'
import TryOn from './pages/TryOn.jsx'
import Profile from './pages/Profile.jsx'
import './styles/components.css'

const VALID_PAGES = ['home', 'recommendations', 'wardrobe', 'tryon', 'profile']

function pageFromHash() {
  const hash = window.location.hash.replace('#', '')
  return VALID_PAGES.includes(hash) ? hash : 'home'
}

export default function App() {
  const [page, setPage] = useState(pageFromHash())
  const [selectedOutfit, setSelectedOutfit] = useState(null)

  // Keep the URL hash in sync so refresh/back-forward work, without
  // pulling in a routing library.
  useEffect(() => {
    window.location.hash = page
  }, [page])

  useEffect(() => {
    function onHashChange() {
      setPage(pageFromHash())
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  function navigate(nextPage) {
    setPage(nextPage)
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
