import { useState } from 'react'
import './Navbar.css'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'recommendations', label: 'Recommendations' },
  { id: 'wardrobe', label: 'Wardrobe' },
  { id: 'tryon', label: 'Try On' },
  { id: 'profile', label: 'Profile' },
]

export default function Navbar({ page, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function go(id) {
    onNavigate(id)
    setMenuOpen(false)
  }

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <button className="navbar-brand" onClick={() => go('home')} aria-label="Versta home">
          <span className="navbar-mark" aria-hidden="true" />
          <span>Versta</span>
        </button>

        <nav className="navbar-links" aria-label="Main">
          {LINKS.map((link) => (
            <button
              key={link.id}
              className={`navbar-link ${page === link.id ? 'is-active' : ''}`}
              onClick={() => go(link.id)}
              aria-current={page === link.id ? 'page' : undefined}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          className="navbar-burger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <nav className="navbar-mobile" aria-label="Main mobile">
          {LINKS.map((link) => (
            <button
              key={link.id}
              className={`navbar-mobile-link ${page === link.id ? 'is-active' : ''}`}
              onClick={() => go(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}
