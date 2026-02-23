import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { Link } from 'react-router-dom'

import CertificateCard from '../components/CertificateCard'
import Lightbox from '../components/Lightbox'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

/* ─────────────────────────────────────────────
   CERTIFICATES DATA
───────────────────────────────────────────── */

const certificatesData = [
  {
    id: 1,
    title: 'Web Development Fundamentals',
    issuer: 'Coursera',
    issuerIcon: 'fas fa-graduation-cap',
    issuerIconBg: 'rgba(124,58,237,0.1)',
    issuerIconColor: '#a78bfa',
    date: 'Jan 2024',
    category: 'web',
    description:
      'Complete web development bootcamp covering HTML, CSS, JavaScript fundamentals and responsive design principles.',
    image: '/img/certificates/certificate1.jpeg',
    badge: 'verified',
    credentialLink: '#',
    skills: [
      { name: 'HTML5', icon: 'fab fa-html5', color: '#E44D26' },
      { name: 'CSS3', icon: 'fab fa-css3-alt', color: '#264de4' },
      { name: 'JS', icon: 'fab fa-js-square', color: '#F7DF1E' },
    ],
  },
  {
    id: 2,
    title: 'React - The Complete Guide',
    issuer: 'Udemy',
    issuerIcon: 'fab fa-react',
    issuerIconBg: 'rgba(168,87,255,0.1)',
    issuerIconColor: '#a857ff',
    date: 'Mar 2024',
    category: 'programming',
    description:
      'Comprehensive React course covering hooks, state management, routing, and building production-ready applications.',
    image: '/img/certificates/certificate2.jpeg',
    badge: 'verified',
    credentialLink: '#',
    skills: [
      { name: 'React', icon: 'fab fa-react', color: '#61DAFB' },
      { name: 'JS', icon: 'fab fa-js-square', color: '#F7DF1E' },
      { name: 'Redux', icon: 'fas fa-layer-group', color: '#764ABC' },
    ],
  },
  {
    id: 3,
    title: 'Advanced JavaScript',
    issuer: 'freeCodeCamp',
    issuerIcon: 'fas fa-fire',
    issuerIconBg: 'rgba(6,214,160,0.1)',
    issuerIconColor: '#06d6a0',
    date: 'Jun 2024',
    category: 'web',
    description:
      'Deep dive into JavaScript including ES6+, async programming, closures, prototypes, and advanced patterns.',
    image: '/img/certificates/certificate3.jpeg',
    badge: 'featured',
    credentialLink: '#',
    skills: [
      { name: 'JavaScript', icon: 'fab fa-js-square', color: '#F7DF1E' },
      { name: 'Node.js', icon: 'fab fa-node-js', color: '#68A063' },
    ],
  },
  {
    id: 4,
    title: 'Python for Everybody',
    issuer: 'Coursera',
    issuerIcon: 'fab fa-python',
    issuerIconBg: 'rgba(255,212,59,0.1)',
    issuerIconColor: '#FFD43B',
    date: 'Sep 2023',
    category: 'programming',
    description:
      'Python programming specialization covering data structures, web scraping, databases, and data visualization.',
    image: '/img/certificates/certificate4.jpeg',
    badge: 'verified',
    credentialLink: '#',
    skills: [
      { name: 'Python', icon: 'fab fa-python', color: '#FFD43B' },
      { name: 'SQL', icon: 'fas fa-database', color: '#4DB33D' },
    ],
  },
  {
    id: 5,
    title: 'UI/UX Design Fundamentals',
    issuer: 'Google',
    issuerIcon: 'fab fa-google',
    issuerIconBg: 'rgba(76,201,240,0.1)',
    issuerIconColor: '#4cc9f0',
    date: 'Nov 2024',
    category: 'design',
    description:
      "Google's professional certificate in UI/UX design covering user research, wireframing, prototyping and usability testing.",
    image: '/img/certificates/certificate5.jpeg',
    badge: 'featured',
    credentialLink: '#',
    skills: [
      { name: 'UI/UX', icon: 'fas fa-paint-brush', color: '#4cc9f0' },
      { name: 'Figma', icon: 'fas fa-pencil-ruler', color: '#f72585' },
    ],
  },
  {
    id: 6,
    title: 'Git & GitHub Mastery',
    issuer: 'LinkedIn Learning',
    issuerIcon: 'fab fa-linkedin-in',
    issuerIconBg: 'rgba(240,80,50,0.1)',
    issuerIconColor: '#F05032',
    date: 'Feb 2024',
    category: 'other',
    description:
      'Complete guide to version control with Git, branching strategies, collaboration workflows, and GitHub features.',
    image: '/img/certificates/certificate6.jpeg',
    badge: 'verified',
    credentialLink: '#',
    skills: [
      { name: 'Git', icon: 'fab fa-git-alt', color: '#F05032' },
      { name: 'GitHub', icon: 'fab fa-github', color: '#ffffff' },
    ],
  },
  {
    id: 7,
    title: 'Git & GitHub Mastery',
    issuer: 'LinkedIn Learning',
    issuerIcon: 'fab fa-linkedin-in',
    issuerIconBg: 'rgba(240,80,50,0.1)',
    issuerIconColor: '#F05032',
    date: 'Feb 2024',
    category: 'other',
    description:
      'Complete guide to version control with Git, branching strategies, collaboration workflows, and GitHub features.',
    image: '/img/certificates/certificate7.jpeg',
    badge: 'verified',
    credentialLink: '#',
    skills: [
      { name: 'Git', icon: 'fab fa-git-alt', color: '#F05032' },
      { name: 'GitHub', icon: 'fab fa-github', color: '#ffffff' },
    ],
  },
  {
    id: 8,
    title: 'Git & GitHub Mastery',
    issuer: 'LinkedIn Learning',
    issuerIcon: 'fab fa-linkedin-in',
    issuerIconBg: 'rgba(240,80,50,0.1)',
    issuerIconColor: '#F05032',
    date: 'Feb 2024',
    category: 'other',
    description:
      'Complete guide to version control with Git, branching strategies, collaboration workflows, and GitHub features.',
    image: '/img/certificates/certificate8.jpeg',
    badge: 'verified',
    credentialLink: '#',
    skills: [
      { name: 'Git', icon: 'fab fa-git-alt', color: '#F05032' },
      { name: 'GitHub', icon: 'fab fa-github', color: '#ffffff' },
    ],
  },
  {
    id: 9,
    title: 'Git & GitHub Mastery',
    issuer: 'LinkedIn Learning',
    issuerIcon: 'fab fa-linkedin-in',
    issuerIconBg: 'rgba(240,80,50,0.1)',
    issuerIconColor: '#F05032',
    date: 'Feb 2024',
    category: 'other',
    description:
      'Complete guide to version control with Git, branching strategies, collaboration workflows, and GitHub features.',
    image: '/img/certificates/certificate9.jpeg',
    badge: 'verified',
    credentialLink: '#',
    skills: [
      { name: 'Git', icon: 'fab fa-git-alt', color: '#F05032' },
      { name: 'GitHub', icon: 'fab fa-github', color: '#ffffff' },
    ],
  },

]

const filterOptions = [
  { key: 'all', label: 'All', icon: 'fas fa-th' },
  { key: 'web', label: 'Web Dev', icon: 'fas fa-globe' },
  { key: 'programming', label: 'Programming', icon: 'fas fa-code' },
  { key: 'design', label: 'Design', icon: 'fas fa-paint-brush' },
  { key: 'other', label: 'Other', icon: 'fas fa-star' },
]

/* ─────────────────────────────────────────────
   CERTIFICATE PAGE
───────────────────────────────────────────── */

const Certificate = () => {
  const heroRef = useRef(null)
  const gridRef = useRef(null)
  const ctaRef = useRef(null)

  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  /* ─────────────────────────────────────────────
     FILTERED DATA
  ───────────────────────────────────────────── */

  const filteredCerts = useMemo(() => {
    return certificatesData.filter((cert) => {
      const matchFilter =
        activeFilter === 'all' || cert.category === activeFilter
      const searchText =
        `${cert.title} ${cert.description} ${cert.issuer}`.toLowerCase()
      const matchSearch =
        !searchQuery || searchText.includes(searchQuery.toLowerCase())
      return matchFilter && matchSearch
    })
  }, [activeFilter, searchQuery])

  /* ─────────────────────────────────────────────
     STATS (computed dynamically)
  ───────────────────────────────────────────── */

  const stats = useMemo(() => {
    const platforms = new Set(certificatesData.map((c) => c.issuer))
    const skills = new Set(
      certificatesData.flatMap((c) => c.skills.map((s) => s.name))
    )
    return {
      total: certificatesData.length,
      platforms: platforms.size,
      skills: skills.size,
    }
  }, [])

  /* ─────────────────────────────────────────────
     HERO ANIMATIONS
  ───────────────────────────────────────────── */

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.to('.cert-breadcrumb', { opacity: 1, y: 0, duration: 0.6 })
        .to(
          '.cert-title-line',
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power4.out',
          },
          '-=0.3'
        )
        .to('.cert-hero-desc', { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
        .to('.cert-stats', { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
        .to('.cert-hero-scroll', { opacity: 1, duration: 0.5 }, '-=0.3')

      // Counter animation
      const statEls = document.querySelectorAll('.cert-stat-number')
      const counts = [stats.total, stats.platforms, stats.skills]

      statEls.forEach((el, i) => {
        gsap.to(
          { val: 0 },
          {
            val: counts[i],
            duration: 2,
            delay: 1,
            ease: 'power2.out',
            onUpdate: function () {
              el.textContent = Math.round(this.targets()[0].val)
            },
          }
        )
      })
    }, heroRef)

    return () => ctx.revert()
  }, [stats])

  /* ─────────────────────────────────────────────
     CARD ENTRANCE ANIMATIONS
  ───────────────────────────────────────────── */

  useEffect(() => {
    // Simplify animations on mobile
    const isMobile = window.innerWidth <= 768
    
    const ctx = gsap.context(() => {
      document.querySelectorAll('.cert-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: isMobile ? 20 : 40 },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.4 : 0.7,
            delay: isMobile ? i * 0.05 : i * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // CTA
      gsap.from('.cert-cta-card', {
        opacity: 0,
        y: isMobile ? 30 : 50,
        duration: isMobile ? 0.5 : 0.9,
        scrollTrigger: {
          trigger: '.cert-cta-section',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, gridRef)

    return () => ctx.revert()
  }, [filteredCerts])

  /* ─────────────────────────────────────────────
     FILTER CHANGE RE-ANIMATION
  ───────────────────────────────────────────── */

  useEffect(() => {
    const isMobile = window.innerWidth <= 768
    
    document.querySelectorAll('.cert-card').forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: isMobile ? 15 : 30, scale: isMobile ? 1 : 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: isMobile ? 0.3 : 0.5,
          delay: isMobile ? i * 0.03 : i * 0.05,
          ease: 'power3.out',
        }
      )
    })
  }, [activeFilter, searchQuery])

  /* ─────────────────────────────────────────────
     SCROLLTRIGGER REFRESH
  ───────────────────────────────────────────── */

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [])

  /* ─────────────────────────────────────────────
     LIGHTBOX HANDLERS
  ───────────────────────────────────────────── */

  const openLightbox = useCallback(
    (idx) => {
      setLightboxIndex(idx)
      setLightboxOpen(true)
      document.body.style.overflow = 'hidden'
    },
    []
  )

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }, [])

  const nextLightbox = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % filteredCerts.length)
  }, [filteredCerts.length])

  const prevLightbox = useCallback(() => {
    setLightboxIndex(
      (prev) => (prev - 1 + filteredCerts.length) % filteredCerts.length
    )
  }, [filteredCerts.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextLightbox()
      if (e.key === 'ArrowLeft') prevLightbox()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [lightboxOpen, closeLightbox, nextLightbox, prevLightbox])

  /* ─────────────────────────────────────────────
     RESET FILTERS
  ───────────────────────────────────────────── */

  const resetFilters = () => {
    setActiveFilter('all')
    setSearchQuery('')
  }

  return (
    <>
      {/* ── HERO ──────────────────────────── */}
      <section className="cert-hero min-h-[80vh] flex items-center relative overflow-hidden pt-[140px] pb-[80px]" ref={heroRef}>
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute rounded-full"
            style={{
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(124,58,237,0.2), transparent 65%)',
              top: '-15%',
              right: '-10%',
              filter: 'blur(100px)',
              animation: 'orbFloat1 12s ease-in-out infinite',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(247,37,133,0.12), transparent 65%)',
              bottom: '-10%',
              left: '-5%',
              filter: 'blur(100px)',
              animation: 'orbFloat2 15s ease-in-out infinite',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
              maskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, black 20%, transparent 65%)',
              WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, black 20%, transparent 65%)',
            }}
          />
        </div>

        <div className="container-custom relative z-[2]">
          <div className="cert-hero-content">
            {/* Breadcrumb */}
            <div
              className="cert-breadcrumb flex items-center gap-3 mb-10 text-light-muted"
              style={{ fontSize: '0.82rem', opacity: 0, transform: 'translateY(20px)' }}
            >
              <Link to="/" className="text-light-secondary hover:text-accent-2 transition-colors duration-300">
                Home
              </Link>
              <i className="fas fa-chevron-right text-accent-1" style={{ fontSize: '0.55rem' }} />
              <span className="text-accent-2">Certificates</span>
            </div>

            {/* Title */}
            <h1 className="cert-hero-title mb-8">
              <span
                className="cert-title-line block font-display font-bold leading-[1.08] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', opacity: 0, transform: 'translateY(60px)' }}
              >
                My
              </span>
              <span
                className="cert-title-line cert-title-gradient block font-display font-bold leading-[1.08] tracking-[-0.04em] text-gradient"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', opacity: 0, transform: 'translateY(60px)' }}
              >
                Certificates
              </span>
              <span
                className="cert-title-line block font-display font-bold leading-[1.08] tracking-[-0.04em]"
                style={{
                  fontSize: 'clamp(2rem, 5.5vw, 4rem)',
                  WebkitTextStroke: '1.5px #eeeef5',
                  WebkitTextFillColor: 'transparent',
                  opacity: 0,
                  transform: 'translateY(60px)',
                }}
              >
                & Achievements
              </span>
            </h1>

            {/* Description */}
            <p
              className="cert-hero-desc text-light-secondary max-w-[600px] leading-relaxed mb-12"
              style={{ fontSize: '1.05rem', opacity: 0, transform: 'translateY(30px)' }}
            >
              A showcase of my learning journey, certifications, and
              achievements earned through dedication and continuous growth.
            </p>

            {/* Stats */}
            <div
              className="cert-stats flex items-center gap-10 flex-wrap"
              style={{ opacity: 0, transform: 'translateY(30px)' }}
            >
              <div className="flex flex-col gap-1">
                <span
                  className="cert-stat-number font-display font-extrabold text-gradient leading-none"
                  style={{ fontSize: '2.8rem' }}
                >
                  0
                </span>
                <span
                  className="text-light-muted uppercase font-medium"
                  style={{ fontSize: '0.78rem', letterSpacing: '0.05em' }}
                >
                  Total Certificates
                </span>
              </div>

              <div
                className="hidden md:block"
                style={{
                  width: '1px',
                  height: '50px',
                  background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.06), transparent)',
                }}
              />

              <div className="flex flex-col gap-1">
                <span
                  className="cert-stat-number font-display font-extrabold text-gradient leading-none"
                  style={{ fontSize: '2.8rem' }}
                >
                  0
                </span>
                <span
                  className="text-light-muted uppercase font-medium"
                  style={{ fontSize: '0.78rem', letterSpacing: '0.05em' }}
                >
                  Platforms
                </span>
              </div>

              <div
                className="hidden md:block"
                style={{
                  width: '1px',
                  height: '50px',
                  background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.06), transparent)',
                }}
              />

              <div className="flex flex-col gap-1">
                <span
                  className="cert-stat-number font-display font-extrabold text-gradient leading-none"
                  style={{ fontSize: '2.8rem' }}
                >
                  0
                </span>
                <span
                  className="text-light-muted uppercase font-medium"
                  style={{ fontSize: '0.78rem', letterSpacing: '0.05em' }}
                >
                  Skills Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="cert-hero-scroll absolute bottom-[35px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          style={{ opacity: 0 }}
        >
          <div className="scroll-mouse w-[26px] h-[42px] border-2 border-light-muted rounded-[14px] flex justify-center pt-2">
            <div className="scroll-wheel w-[3px] h-[10px] bg-accent-1 rounded-full animate-scrollWheel" />
          </div>
          <span
            className="text-light-muted uppercase"
            style={{ fontSize: '0.65rem', letterSpacing: '0.2em' }}
          >
            Scroll to explore
          </span>
        </div>
      </section>

      {/* ── CONTROLS ──────────────────────── */}
      <section
        className="cert-controls sticky top-0 z-[100] py-[30px] border-b border-glass-border"
        style={{
          background: 'rgba(5,5,16,0.9)',
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
        }}
      >
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 flex-wrap">
            {/* Search */}
            <div className="relative flex items-center gap-3 flex-1 max-w-[320px] w-full">
              <i className="fas fa-search text-light-muted" style={{ fontSize: '0.9rem' }} />
              <input
                type="text"
                placeholder="Search certificates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2.5 bg-transparent border-none border-b border-b-[rgba(255,255,255,0.08)] text-light outline-none font-primary transition-all duration-300 focus:border-b-transparent"
                style={{ fontSize: '0.9rem' }}
              />
              <div
                className="absolute bottom-0 left-7 right-0 h-0.5 origin-left transition-transform duration-400"
                style={{
                  background: 'linear-gradient(90deg, #7c3aed, #4cc9f0)',
                  transform: searchQuery ? 'scaleX(1)' : 'scaleX(0)',
                }}
              />
            </div>

            {/* Filter buttons */}
            <div className="flex gap-2 flex-wrap overflow-x-auto md:overflow-visible pb-1 md:pb-0 scrollbar-hide">
              {filterOptions.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-primary font-medium whitespace-nowrap transition-all duration-300 ${
                    activeFilter === filter.key
                      ? 'text-white bg-accent-1 border-accent-1 shadow-[0_0_18px_rgba(124,58,237,0.35)]'
                      : 'text-light-muted border border-glass-border hover:text-light hover:border-[rgba(124,58,237,0.4)]'
                  }`}
                  style={{ fontSize: '0.78rem' }}
                >
                  <i className={filter.icon} style={{ fontSize: '0.7rem' }} />
                  <span className="hidden sm:inline">{filter.label}</span>
                </button>
              ))}
            </div>

            {/* View toggle */}
            <div className="flex border border-glass-border rounded-[10px] overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`w-10 h-[38px] flex items-center justify-center transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'text-white bg-accent-1'
                    : 'text-light-muted hover:text-light'
                }`}
                style={{ fontSize: '0.85rem' }}
                title="Grid View"
              >
                <i className="fas fa-th-large" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`w-10 h-[38px] flex items-center justify-center border-l border-glass-border transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'text-white bg-accent-1'
                    : 'text-light-muted hover:text-light'
                }`}
                style={{ fontSize: '0.85rem' }}
                title="List View"
              >
                <i className="fas fa-list" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATES GRID ─────────────── */}
      <section className="cert-section py-[60px] pb-[100px] min-h-[50vh]" ref={gridRef}>
        <div className="container-custom">
          {filteredCerts.length > 0 ? (
            <div
              className={`transition-all duration-400 ${
                viewMode === 'list'
                  ? 'grid grid-cols-1 gap-6'
                  : 'grid gap-8'
              }`}
              style={{
                gridTemplateColumns:
                  viewMode === 'grid'
                    ? 'repeat(auto-fill, minmax(370px, 1fr))'
                    : '1fr',
              }}
            >
              {filteredCerts.map((cert, idx) => (
                <CertificateCard
                  key={cert.id}
                  cert={cert}
                  index={idx}
                  viewMode={viewMode}
                  onPreview={() => openLightbox(idx)}
                />
              ))}
            </div>
          ) : (
            /* ── EMPTY STATE ───────────────── */
            <div className="text-center py-20 px-5">
              <div
                className="w-20 h-20 rounded-full glass-card flex items-center justify-center mx-auto mb-6 text-light-muted"
                style={{ fontSize: '1.8rem' }}
              >
                <i className="fas fa-search" />
              </div>
              <h3 className="font-display text-2xl mb-2">
                No certificates found
              </h3>
              <p className="text-light-muted mb-8">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-1 text-white rounded-full font-medium transition-all duration-300 hover:shadow-neon hover:-translate-y-0.5"
                style={{ fontSize: '0.85rem' }}
              >
                <i className="fas fa-redo" />
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA SECTION ───────────────────── */}
      <section className="cert-cta-section py-[60px] pb-[120px]">
        <div className="container-custom" ref={ctaRef}>
          <div className="cert-cta-card glass-card p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
            <div className="cert-cta-content text-center md:text-left">
              <h2
                className="font-display font-bold mb-3 leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)' }}
              >
                Want to see my{' '}
                <span className="text-gradient">projects?</span>
              </h2>
              <p className="text-light-secondary mb-8" style={{ fontSize: '0.95rem' }}>
                Check out the work I've built using these skills and
                technologies.
              </p>

              <div className="flex items-center gap-8 flex-wrap justify-center md:justify-start">
                <Link
                  to="/#projects"
                  className="cta-primary magnetic-btn inline-flex items-center gap-3.5 px-9 py-[18px] bg-accent-1 text-white rounded-full font-semibold relative overflow-hidden transition-all duration-400 hover:shadow-neon hover:-translate-y-[3px] hover:scale-[1.02]"
                  style={{ fontSize: '0.95rem', boxShadow: '0 4px 20px rgba(124,58,237,0.3)' }}
                >
                  <span className="relative z-[1]">View Projects</span>
                  <div className="cta-arrow w-[34px] h-[34px] bg-white/20 rounded-full flex items-center justify-center relative z-[1] transition-transform duration-300 group-hover:translate-x-1.5">
                    <i className="fas fa-arrow-right" style={{ fontSize: '0.8rem' }} />
                  </div>
                </Link>

                <Link
                  to="/#contact"
                  className="cta-secondary relative py-[18px] text-light-secondary font-medium transition-colors duration-300 hover:text-light"
                  style={{ fontSize: '0.95rem' }}
                >
                  <span>Contact Me</span>
                  <div
                    className="absolute bottom-3.5 left-0 w-full h-px transition-all duration-400"
                    style={{ background: '#5a5a78' }}
                  />
                </Link>
              </div>
            </div>

            {/* Decoration */}
            <div className="relative w-[140px] h-[140px] md:w-[180px] md:h-[180px] flex-shrink-0 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full animate-spin-slow"
                style={{ border: '2px dashed rgba(124,58,237,0.2)' }}
              />
              <div
                className="absolute inset-5 rounded-full animate-spin-slow-reverse"
                style={{ border: '2px dashed rgba(6,214,160,0.15)' }}
              />
              <i
                className="fas fa-trophy text-4xl md:text-5xl text-gradient"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(124,58,237,0.3))',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ──────────────────────── */}
      {lightboxOpen && filteredCerts[lightboxIndex] && (
        <Lightbox
          cert={filteredCerts[lightboxIndex]}
          onClose={closeLightbox}
          onNext={nextLightbox}
          onPrev={prevLightbox}
        />
      )}
    </>
  )
}

export default Certificate