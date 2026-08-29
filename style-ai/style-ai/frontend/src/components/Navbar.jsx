import { useState } from "react";

function Navbar({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Wardrobe",
      path: "/wardrobe",
    },
    {
      name: "Try On",
      path: "/try-on",
    },
    {
      name: "Profile",
      path: "/profile",
    },
  ];

  const currentPath = window.location.pathname;

  const handleNavigation = (event, path) => {
    event.preventDefault();

    if (onNavigate) {
      onNavigate(path);
    }

    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <a
          href="/"
          className="navbar-logo"
          onClick={(event) => handleNavigation(event, "/")}
        >
          <span className="logo-icon">✦</span>
          <span className="logo-text">STYLE AI</span>
        </a>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className={`navbar-link ${
                currentPath === item.path ? "active" : ""
              }`}
              onClick={(event) =>
                handleNavigation(event, item.path)
              }
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu */}
        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className={`mobile-menu-link ${
                currentPath === item.path ? "active" : ""
              }`}
              onClick={(event) =>
                handleNavigation(event, item.path)
              }
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;