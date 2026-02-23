import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import Header from './components/Header'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import NoiseOverlay from './components/NoiseOverlay'
import BackToTop from './components/BackToTop'
import Preloader from './components/Preloader'
import MobileMenu from './components/MobileMenu'

import Home from './pages/Home'
import Certificate from './pages/Certificate'
import Contact from './pages/Contact'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const isHomePage = location.pathname === '/'

  /* ─────────────────────────────────────────────
     PRELOADER LOGIC
     Only show on home page.
     If user opens non-home page directly,
     skip loading state immediately.
  ───────────────────────────────────────────── */

  useEffect(() => {
    if (!isHomePage && isLoading) {
      setIsLoading(false)
    }
  }, [isHomePage, isLoading])

  const handlePreloaderComplete = () => {
    setIsLoading(false)
  }

  /* ─────────────────────────────────────────────
     BODY OVERFLOW LOCK
  ───────────────────────────────────────────── */

  useEffect(() => {
    if (isLoading && isHomePage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isLoading, isHomePage])

  /* ─────────────────────────────────────────────
     SCROLL TO TOP + HASH SCROLL ON ROUTE CHANGE
  ───────────────────────────────────────────── */

  useEffect(() => {
    setMenuOpen(false)
    document.body.style.overflow = ''

    if (location.hash) {
      // Wait for page to render, then scroll to hash target
      setTimeout(() => {
        const target = document.querySelector(location.hash)
        if (target) {
          gsap.to(window, {
            scrollTo: { y: target, offsetY: 80 },
            duration: 1,
            ease: 'power3.inOut',
          })
        }
      }, 600)
    } else {
      window.scrollTo(0, 0)
    }

    // Refresh ScrollTrigger after route change
    setTimeout(() => ScrollTrigger.refresh(), 100)
  }, [location])

  /* ─────────────────────────────────────────────
     RESIZE + VISIBILITY HANDLERS
  ───────────────────────────────────────────── */

  useEffect(() => {
    let resizeTimer

    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 300)
    }

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibility)
      clearTimeout(resizeTimer)
    }
  }, [])

  /* ─────────────────────────────────────────────
     REDUCED MOTION PREFERENCE
  ───────────────────────────────────────────── */

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.globalTimeline.timeScale(3)
    }
  }, [])

  /* ─────────────────────────────────────────────
     COPYRIGHT YEAR
  ───────────────────────────────────────────── */

  const currentYear = new Date().getFullYear()

  return (
    <>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Noise & Grain Overlays */}
      <NoiseOverlay />

      {/* Preloader — Home Page Only */}
      {isHomePage && isLoading && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {/* Header */}
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Mobile Menu */}
      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<Home isLoading={isLoading} />} />
          <Route path="/certificates" element={<Certificate />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer currentYear={currentYear} />

      {/* Back to Top */}
      <BackToTop />
    </>
  )
}

export default App