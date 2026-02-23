import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  const menuRef = useRef(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

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
        { href: '/certificates', label: 'Certificates', index: '05', isRoute: true },
        { href: '/#contact', label: 'Contact', index: '06', isRoute: true },
      ]

  const socialLinks = [
    { href: 'https://github.com/priyansh1224', icon: 'fab fa-github' },
    { href: 'https://www.linkedin.com/in/priyanshu-oli-13a913290', icon: 'fab fa-linkedin-in' },
    { href: 'https://twitter.com/priyansh1224', icon: 'fab fa-twitter' },
    { href: 'https://instagram.com/priyansh1224', icon: 'fab fa-instagram' },
  ]

  // ── Animate menu open/close ─────────────────
  useEffect(() => {
    const items = menuRef.current?.querySelectorAll('.mobile-nav-item')
    const footer = menuRef.current?.querySelector('.mobile-menu-footer')

    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.to('.mobile-menu-bg', { opacity: 1, duration: 0.4 })
      gsap.fromTo(
        items,
        { opacity: 0, y: 50, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: 'power3.out',
          delay: 0.2,
        }
      )
      gsap.fromTo(
        footer,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.6 }
      )
    }
  }, [menuOpen])

  // ── Close menu ──────────────────────────────
  const closeMenu = () => {
    const items = menuRef.current?.querySelectorAll('.mobile-nav-item')
    const footer = menuRef.current?.querySelector('.mobile-menu-footer')

    document.body.style.overflow = ''
    gsap.to(items, { opacity: 0, y: 40, duration: 0.3, stagger: 0.03 })
    gsap.to(footer, { opacity: 0, duration: 0.3 })
    gsap.to('.mobile-menu-bg', {
      opacity: 0,
      duration: 0.4,
      delay: 0.2,
      onComplete: () => setMenuOpen(false),
    })
  }

  // ── Handle nav click ────────────────────────
  const handleNavClick = (e, item) => {
    if (item.isRoute) {
      closeMenu()
      return
    }

    e.preventDefault()
    closeMenu()

    setTimeout(() => {
      gsap.to(window, {
        scrollTo: { y: item.href, offsetY: 80 },
        duration: 1,
        ease: 'power3.inOut',
      })
    }, 500)
  }

  // ── Escape key ──────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) closeMenu()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  return (
    <div
      ref={menuRef}
      className={`fixed inset-0 z-[999] ${
        menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className="mobile-menu-bg absolute inset-0 opacity-0"
        style={{
          background: 'rgba(5, 5, 16, 0.96)',
          backdropFilter: 'blur(40px)',
        }}
      />

      {/* Content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-[85%]">
        {navItems.map((item) =>
          item.isRoute ? (
            <Link
              key={item.index}
              to={item.href}
              className="mobile-nav-item block font-display font-bold text-light py-3 opacity-0 transition-colors duration-300 hover:text-accent-2 relative"
              style={{
                fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                transform: 'translateY(40px) rotateX(15deg)',
              }}
              data-index={item.index}
              onClick={() => closeMenu()}
            >
              <span
                className="absolute font-mono text-accent-1"
                style={{ fontSize: '0.65rem', top: '15px', left: '-25px' }}
              >
                {item.index}
              </span>
              {item.label}
            </Link>
          ) : (
            <a
              key={item.index}
              href={item.href}
              className="mobile-nav-item block font-display font-bold text-light py-3 opacity-0 transition-colors duration-300 hover:text-accent-2 relative"
              style={{
                fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                transform: 'translateY(40px) rotateX(15deg)',
              }}
              data-index={item.index}
              onClick={(e) => handleNavClick(e, item)}
            >
              <span
                className="absolute font-mono text-accent-1"
                style={{ fontSize: '0.65rem', top: '15px', left: '-25px' }}
              >
                {item.index}
              </span>
              {item.label}
            </a>
          )
        )}

        {/* Social Links */}
        <div className="mobile-menu-footer mt-12 opacity-0">
          <div className="flex justify-center gap-8">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-muted text-xl w-[50px] h-[50px] flex items-center justify-center border border-glass-border rounded-full transition-all duration-300 hover:text-accent-1 hover:border-accent-1 hover:shadow-neon"
              >
                <i className={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu