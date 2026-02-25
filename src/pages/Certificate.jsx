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
    title: 'Letter of Recommendation - HR Internship',
    issuer: 'The Entrepreneurship Network',
    issuerIcon: 'fas fa-briefcase',
    issuerIconBg: 'rgba(124,58,237,0.1)',
    issuerIconColor: '#a78bfa',
    date: 'Jan 2024',
    category: 'other',
    description:
      '💼 Internship | Human Resource – Business Domain Exposure. 🏢 The Entrepreneurship Network (Limitless Technologies LLP). 🔍 Completed a 3-month internship focused on exploring the business and organizational domain, not core technical development. 📊 Gained practical exposure to startup operations, including HR processes, professional communication, coordination, and internal workflows. 🤝 Developed an understanding of how business strategy, people management, and operational processes integrate with technical teams. 💡 This experience strengthened my business perspective as a tech professional, helping me better align technical work with real-world organizational needs. 📌 Primary focus: Business & organizational exposure | Career path: Technology',
    image: '/img/certificates/certificate1.jpeg',
    badge: 'verified',
    credentialLink: '#',
    skills: [
      { name: 'HR', icon: 'fas fa-users', color: '#a78bfa' },
      { name: 'Business', icon: 'fas fa-briefcase', color: '#7c3aed' },
    ],
  },
  {
    id: 2,
    title: 'Certificate of Completion - HR Internship',
    issuer: 'The Entrepreneurship Network',
    issuerIcon: 'fas fa-certificate',
    issuerIconBg: 'rgba(168,87,255,0.1)',
    issuerIconColor: '#a857ff',
    date: 'Mar 2024',
    category: 'other',
    description:
      '💼 Internship | Human Resource – Business Domain Exposure. 🏢 The Entrepreneurship Network (Limitless Technologies LLP). 🔍 Completed a 3-month internship focused on exploring the business and organizational domain, not core technical development. 📊 Gained practical exposure to startup operations, including HR processes, professional communication, coordination, and internal workflows. 🤝 Developed an understanding of how business strategy, people management, and operational processes integrate with technical teams. 💡 This experience strengthened my business perspective as a tech professional, helping me better align technical work with real-world organizational needs. 📌 Primary focus: Business & organizational exposure | Career path: Technology',
    image: '/img/certificates/certificate2.jpeg',
    badge: 'verified',
    credentialLink: '#',
    skills: [
      { name: 'HR', icon: 'fas fa-users', color: '#a857ff' },
      { name: 'Business', icon: 'fas fa-briefcase', color: '#7c3aed' },
    ],
  },
  {
    id: 3,
    title: 'Generative AI Foundations Certificate',
    issuer: 'upGrad x Microsoft',
    issuerIcon: 'fas fa-robot',
    issuerIconBg: 'rgba(6,214,160,0.1)',
    issuerIconColor: '#06d6a0',
    date: 'Jul 2025',
    category: 'programming',
    description:
      '🚀 Thrilled to Share! 🎉 Successfully completed the Generative AI Foundations Certificate Program offered by upGrad in collaboration with Microsoft on 4th July 2025. Throughout this program, I explored: 🔹 Introduction to Generative AI 🔹 Prompt Engineering (Basic & Advanced) 🔹 AI-Powered Research & Content Creation 🔹 AI for Analysis, Presentation & Automation 🔹 Generative AI for Problem-Solving. This learning journey has significantly deepened my understanding of how to effectively apply Generative AI in real-world scenarios. Excited to leverage these skills in upcoming projects! #GenerativeAI #AI #PromptEngineering #upGrad #Microsoft',
    image: '/img/certificates/certificate3.jpeg',
    badge: 'featured',
    credentialLink: '#',
    skills: [
      { name: 'AI', icon: 'fas fa-brain', color: '#06d6a0' },
      { name: 'Prompt Eng', icon: 'fas fa-robot', color: '#00BFA5' },
    ],
  },
  {
    id: 4,
    title: 'Building Your First AI App Masterclass',
    issuer: 'upGrad',
    issuerIcon: 'fas fa-graduation-cap',
    issuerIconBg: 'rgba(255,212,59,0.1)',
    issuerIconColor: '#FFD43B',
    date: 'Jul 2025',
    category: 'programming',
    description:
      '🚀 Just completed the "Building Your First AI App Masterclass" by upGrad! This masterclass provided valuable insights into AI development and how to build practical, real-world AI applications. Excited to apply this knowledge to future projects and continue exploring the potential of artificial intelligence. Big thanks to upGrad and the instructor for the engaging content and learning experience. Let\'s keep growing and building! 💡🤖 #AI #ArtificialIntelligence #upGrad #LearningJourney #AIAppDevelopment #TechInnovation',
    image: '/img/certificates/certificate4.jpeg',
    badge: 'verified',
    credentialLink: '#',
    skills: [
      { name: 'AI Dev', icon: 'fas fa-code', color: '#FFD43B' },
      { name: 'App Dev', icon: 'fas fa-mobile-alt', color: '#F7DF1E' },
    ],
  },
  {
    id: 5,
    title: 'Fundamentals of Cybersecurity',
    issuer: 'upGrad',
    issuerIcon: 'fas fa-shield-alt',
    issuerIconBg: 'rgba(76,201,240,0.1)',
    issuerIconColor: '#4cc9f0',
    date: 'Jul 2025',
    category: 'other',
    description:
      '🛡️ Completed the Fundamentals of Cybersecurity Course. Excited to share that I\'ve successfully completed the "Fundamentals of Cybersecurity" course from upGrad! This program strengthened my understanding of key cybersecurity concepts, including: 🔐 Threat analysis 🧠 Security architecture 🛠️ Vulnerability assessment 🕵️‍♂️ Cyber attack prevention techniques. Grateful for the opportunity to build a solid foundation in this critical field. Looking forward to applying these skills in real-world projects and continuing my journey in cybersecurity. 📅 Issued on: 16 July, 2025 🎓 Verified by upGrad Education Private Limited #CyberSecurity #upGrad #LifelongLearning',
    image: '/img/certificates/certificate5.jpeg',
    badge: 'featured',
    credentialLink: '#',
    skills: [
      { name: 'Security', icon: 'fas fa-shield-alt', color: '#4cc9f0' },
      { name: 'Cyber', icon: 'fas fa-lock', color: '#7c3aed' },
    ],
  },
  {
    id: 6,
    title: 'Software Engineering Job Simulation',
    issuer: 'Forage',
    issuerIcon: 'fas fa-laptop-code',
    issuerIconBg: 'rgba(240,80,50,0.1)',
    issuerIconColor: '#F05032',
    date: 'Jun 2025',
    category: 'programming',
    description:
      '🚀 Excited to share that I\'ve successfully completed the Software Engineering Job Simulation by Forage! Over the course of this program, I gained practical experience in key areas such as: 🔹 Software Architecture 🔹 Programming 🔹 Agile Methodologies 🔹 Testing 🔹 Security. This simulation gave me real-world insight into what it\'s like to work as a software engineer — from problem-solving to secure coding practices — and strengthened my passion for building scalable, high-quality software. Big thanks to Forage and the team behind this initiative for empowering aspiring professionals! #SoftwareEngineering #Forage #LearningByDoing',
    image: '/img/certificates/certificate6.jpeg',
    badge: 'verified',
    credentialLink: '#',
    skills: [
      { name: 'Software Eng', icon: 'fas fa-code', color: '#F05032' },
      { name: 'Agile', icon: 'fas fa-sync', color: '#68A063' },
    ],
  },
  {
    id: 7,
    title: 'JavaScript for Beginners',
    issuer: 'Simplilearn SkillUp',
    issuerIcon: 'fab fa-js-square',
    issuerIconBg: 'rgba(247,223,30,0.1)',
    issuerIconColor: '#F7DF1E',
    date: 'May 2025',
    category: 'web',
    description:
      'Excited to share my latest achievement! 🎉 I have successfully completed the "JavaScript for Beginners" course from Simplilearn SkillUp. This course helped me build a strong foundation in JavaScript, covering essential concepts such as variables, functions, loops, and DOM manipulation. Looking forward to applying these skills in real-world projects and continuing my learning journey in web development and beyond! 🚀 #JavaScript #WebDevelopment #Learning #Certification #Simplilearn',
    image: '/img/certificates/certificate7.jpeg',
    badge: 'verified',
    credentialLink: '#',
    skills: [
      { name: 'JavaScript', icon: 'fab fa-js-square', color: '#F7DF1E' },
      { name: 'Web Dev', icon: 'fas fa-globe', color: '#E44D26' },
    ],
  },
  {
    id: 8,
    title: 'Cybersecurity Analyst Job Simulation',
    issuer: 'Tata x Forage',
    issuerIcon: 'fas fa-user-shield',
    issuerIconBg: 'rgba(124,58,237,0.1)',
    issuerIconColor: '#7c3aed',
    date: 'Jun 2025',
    category: 'other',
    description:
      '🛡️ Proud to share that I\'ve completed the Cybersecurity Analyst Job Simulation with Tata through Forage! This hands-on experience helped me build practical skills in: 🔐 Identity and Access Management (IAM) Fundamentals 🧠 IAM Strategy Assessment 🛠️ Crafting Custom IAM Solutions 🔗 Platform Integration. It was a great opportunity to dive deeper into cybersecurity concepts and understand how professionals tackle real-world challenges in digital security. Grateful to Tata and Forage for providing this incredible learning experience! 📅 Completed: June 16th, 2025 #Cybersecurity #IAM #JobSimulation #Tata #Forage',
    image: '/img/certificates/certificate8.jpeg',
    badge: 'verified',
    credentialLink: '#',
    skills: [
      { name: 'IAM', icon: 'fas fa-key', color: '#7c3aed' },
      { name: 'Security', icon: 'fas fa-shield-alt', color: '#4cc9f0' },
    ],
  },
  {
    id: 9,
    title: 'REST API Micro Experience',
    issuer: 'Crio.Do',
    issuerIcon: 'fas fa-server',
    issuerIconBg: 'rgba(104,160,99,0.1)',
    issuerIconColor: '#68A063',
    date: 'May 2025',
    category: 'programming',
    description:
      'Successfully Completed REST API Micro Experience! I\'m excited to share that I have successfully completed the Micro Experience on REST API as part of the Accelerate Workshop by Crio.Do. This experience helped me gain hands-on knowledge in designing, developing, and working with RESTful APIs, enhancing my backend development skills. Looking forward to applying these skills to real-world projects! #RESTAPI #BackendDevelopment #CrioDo #Learning #WebDevelopment',
    image: '/img/certificates/certificate9.jpeg',
    badge: 'verified',
    credentialLink: '#',
    skills: [
      { name: 'REST API', icon: 'fas fa-server', color: '#68A063' },
      { name: 'Backend', icon: 'fas fa-database', color: '#4DB33D' },
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
    const ctx = gsap.context(() => {
      document.querySelectorAll('.cert-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      // CTA
      gsap.from('.cert-cta-card', {
        opacity: 0,
        y: 50,
        duration: 0.9,
        scrollTrigger: {
          trigger: '.cert-cta-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    }, gridRef)

    return () => ctx.revert()
  }, [filteredCerts])

  /* ─────────────────────────────────────────────
     FILTER CHANGE RE-ANIMATION
  ───────────────────────────────────────────── */

  useEffect(() => {
    document.querySelectorAll('.cert-card').forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          delay: i * 0.05,
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
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Search */}
            <div className="relative flex items-center gap-3 flex-1 max-w-full md:max-w-[400px] w-full">
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
                  : 'grid gap-6 md:gap-8'
              }`}
              style={{
                gridTemplateColumns:
                  viewMode === 'grid'
                    ? 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))'
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
          isOpen={lightboxOpen}
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