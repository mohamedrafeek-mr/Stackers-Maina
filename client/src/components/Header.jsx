import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className={`site-header ${menuOpen ? 'site-header--open' : ''}`}>
      <div className="container header-inner">
        <button
          type="button"
          className="brand-logo"
          onClick={() => scrollToSection('home')}
          aria-label="Go to home"
        >
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
              <rect x="10" y="10" width="64" height="18" rx="10" fill="url(#logoGrad1)" />
              <rect x="10" y="32" width="48" height="18" rx="10" fill="url(#logoGrad2)" />
              <rect x="10" y="54" width="32" height="18" rx="10" fill="url(#logoGrad3)" />
              <defs>
                <linearGradient id="logoGrad1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#7F77DD" />
                  <stop offset="100%" stopColor="#2DDBA0" />
                </linearGradient>
                <linearGradient id="logoGrad2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#7F77DD" />
                  <stop offset="100%" stopColor="#A79AF5" />
                </linearGradient>
                <linearGradient id="logoGrad3" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2DDBA0" />
                  <stop offset="100%" stopColor="#1D9E75" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="brand-text">
            <span className="brand-name">Stackers</span>
            <span className="brand-suffix">Mania</span>
          </span>
        </button>

        <a href="/login" className="nav-login" aria-label="Admin login" title="Admin login">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 2a5 5 0 100 10 5 5 0 000-10z" fill="#7F77DD" />
            <path d="M4 22a8 8 0 0116 0H4z" fill="#2DDBA0" />
          </svg>
        </a>

        <nav className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`}>
            <a onClick={() => scrollToSection('home')} className="site-nav__link">Home</a>
            <a onClick={() => scrollToSection('services')} className="site-nav__link">Services</a>
            <a onClick={() => scrollToSection('work')} className="site-nav__link">Work</a>
            <a onClick={() => scrollToSection('about')} className="site-nav__link">About</a>
            <a onClick={() => scrollToSection('careers')} className="site-nav__link">Careers</a>
            <a onClick={() => scrollToSection('contact')} className="site-nav__link">Contact</a>
            <button onClick={() => scrollToSection('contact')} className="btn btn-primary">Get Started</button>
          </nav>
        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="menu-toggle__bar" />
          <span className="menu-toggle__bar" />
          <span className="menu-toggle__bar" />
        </button>
      </div>
    </header>
  )
}
