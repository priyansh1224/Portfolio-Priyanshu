import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const Header = ({ menuOpen, setMenuOpen }) => {
  const headerRef = useRef(null)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isCerts = location.pathname === '/certificates'
  const lastScrollRef = useRef(0)

  // ── Nav Items Config ─────────────────────────
  const navItems = isHome
    ? [
        { href: '#hero', label: 'Home', index: '01' },
        { href: '#about', label: 'About', index: '02' },
        { href: '#skills', label: 'Skills', index: '03' },
        { href: '#projects', label: 'Work', index: '04' },
        { href: '#journey', label: 'Journey', index: '05' },
        { href: '/certificates', label: 'Certificates', index: '06', isRoute: true },
        { href: '#contact', label: 'Contact', index: '07' },
      ]
    : [
        { href: '/', label: 'Home', index: '01', isRoute: true },
        { href: '/#about', label: 'About', index: '02', isRoute: true },
        { href: '/#skills', label: 'Skills', index: '03', isRoute: true },
        { href: '/#projects', label: 'Work', index: '04', isRoute: true },
        {
          href: '/certificates',
          label: 'Certificates',
          index: '05',
          isRoute: true,
          active: isCerts,
        },
        { href: '/#contact', label: 'Contact', index: '06', isRoute: true },
      ]

  // ── Header scroll behavior ──────────────────
  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const handleScroll = () => {
      const current = window.pageYOffset

      if (current > 100) header.classList.add('scrolled')
      else header.classList.remove('scrolled')

      if (current > lastScrollRef.current && current > 400) {
        gsap.to(header, { y: -100, duration: 0.3 })
      } else {
        gsap.to(header, { y: 0, duration: 0.3 })
      }

      lastScrollRef.current = current
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ── Scrolled class styling ──────────────────
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      #header.scrolled {
        background: rgba(5, 5, 16, 0.85);
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  // ── Handle nav click ────────────────────────
  const handleNavClick = (e, item) => {
    if (item.isRoute) return // Let React Router handle it

    e.preventDefault()
    const target = item.href

    if (target.startsWith('#')) {
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 80 },
        duration: 1,
        ease: 'power3.inOut',
      })
    }
  }

  // ── Handle logo click ───────────────────────
  const handleLogoClick = (e) => {
    if (isHome) {
      e.preventDefault()
      gsap.to(window, { scrollTo: 0, duration: 1, ease: 'power3.inOut' })
    }
  }

  // ── Toggle hamburger ────────────────────────
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header
      id="header"
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-[1000] px-4 md:px-10 transition-all duration-400"
    >
      <div className="flex justify-between items-center h-[70px] md:h-[80px] max-w-[1400px] mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="z-[1001]"
          onClick={handleLogoClick}
        >
          <div className="font-mono text-xl md:text-2xl font-bold text-light tracking-wide transition-all duration-400 hover:rotate-y-10 hover:text-shadow-neon"
            style={{ transformStyle: 'preserve-3d', perspective: '500px' }}
          >
            <span className="text-accent-1 transition-colors duration-300 hover:text-accent-3">
              &lt;
            </span>
            PO
            <span className="text-accent-1 transition-colors duration-300 hover:text-accent-3">
              /&gt;
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-0">
          {navItems.map((item) =>
            item.isRoute ? (
              <Link
                key={item.index}
                to={item.href}
                className={`nav-item ${item.active ? 'nav-active' : ''}`}
                data-index={item.index}
              >
                <span className="nav-text">{item.label}</span>
                <span className="nav-hover-text">{item.label}</span>
              </Link>
            ) : (
              <a
                key={item.index}
                href={item.href}
                className="nav-item"
                data-index={item.index}
                onClick={(e) => handleNavClick(e, item)}
              >
                <span className="nav-text">{item.label}</span>
                <span className="nav-hover-text">{item.label}</span>
              </a>
            )
          )}
        </nav>

        {/* Header Right */}
        <div className="flex items-center gap-3 md:gap-6 z-[1001]">
          {/* Resume Button */}
          <a
            href="https://drive.google.com/file/d/1BhFwsdcHosDtsI_be2yXrniiztjQ9Kjy/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 py-2 px-4 md:px-[22px] border border-accent-1/50 rounded-full text-xs md:text-sm font-medium text-accent-2 transition-all duration-400 relative overflow-hidden hover:text-white hover:border-transparent hover:shadow-neon hover:-translate-y-0.5"
          >
            {/* Gradient BG on hover */}
            <span className="absolute inset-0 bg-gradient-main opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-full" />
            <span className="relative z-10 hidden md:inline">Resume</span>
            <div className="relative z-10">
              <i className="fas fa-arrow-down text-xs group-hover:animate-bounce-down" />
            </div>
          </a>

          {/* Hamburger */}
          <div
            className={`hamburger flex lg:hidden flex-col justify-center gap-[7px] w-8 h-8 z-[1001] cursor-none ${
              menuOpen ? 'active' : ''
            }`}
            onClick={toggleMenu}
          >
            <span className="block w-full h-0.5 bg-light rounded transition-all duration-400 origin-center" />
            <span className="block w-full h-0.5 bg-light rounded transition-all duration-400 origin-center" />
            <span className="block w-full h-0.5 bg-light rounded transition-all duration-400 origin-center" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header