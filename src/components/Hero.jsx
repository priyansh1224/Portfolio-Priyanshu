import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const Hero = ({ isLoading }) => {
  const sectionRef = useRef(null)
  const particlesRef = useRef(null)
  const contentRef = useRef(null)
  const animatedRef = useRef(false)

  // ── Floating Tags Data ──────────────────────
  const floatingTags = [
    { icon: 'fab fa-html5', color: '#E44D26', label: 'HTML5', className: 'tag-1' },
    { icon: 'fab fa-react', color: '#61DAFB', label: 'React', className: 'tag-2' },
    { icon: 'fab fa-js-square', color: '#F7DF1E', label: 'JS', className: 'tag-3' },
    { icon: 'fab fa-css3-alt', color: '#264de4', label: 'CSS3', className: 'tag-4' },
    { icon: 'fab fa-node-js', color: '#68A063', label: 'Node', className: 'tag-5' },
  ]

  // ── Social Links Data ───────────────────────
  const socialLinks = [
    { href: 'https://github.com/priyansh1224', icon: 'fab fa-github', title: 'GitHub' },
    { href: 'https://www.linkedin.com/in/priyanshu-oli-13a913290', icon: 'fab fa-linkedin-in', title: 'LinkedIn' },
    { href: 'https://twitter.com/priyansh1224', icon: 'fab fa-twitter', title: 'Twitter' },
    { href: 'https://instagram.com/priyansh1224', icon: 'fab fa-instagram', title: 'Instagram' },
  ]

  // ── Init Particles (Canvas) ─────────────────
  const initParticles = useCallback(() => {
    const container = particlesRef.current
    if (!container) return

    const canvas = document.createElement('canvas')
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;'
    container.appendChild(canvas)
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = []
    const count = Math.min(60, Math.floor(window.innerWidth / 25))
    const colors = ['#7c3aed', '#4cc9f0', '#06d6a0', '#f72585']

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    let rafId = null

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
      })

      // Draw connections
      ctx.globalAlpha = 0.04
      ctx.strokeStyle = '#7c3aed'
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1

      rafId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas)
    }
  }, [])

  // ── Hero Entrance Animations ────────────────
  const initHeroAnimations = useCallback(() => {
    if (animatedRef.current) return
    animatedRef.current = true

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.to('.hero-badge', { opacity: 1, y: 0, duration: 0.8 })
      .to(
        '.title-word, .title-ampersand',
        { y: 0, duration: 1.1, stagger: 0.08, ease: 'power4.out' },
        '-=0.4'
      )
      .to('.hero-bottom', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to('.hero-scroll-indicator', { opacity: 1, duration: 0.6 }, '-=0.3')
      .to(
        '.floating-tag',
        { opacity: 0.7, y: 0, duration: 0.5, stagger: 0.08 },
        '-=0.5'
      )
      .to(
        '.hero-social-sidebar a, .social-line',
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 },
        '-=0.6'
      )

    // ── Floating tag parallax ─────────────────
    gsap.utils.toArray('.floating-tag').forEach((tag, i) => {
      gsap.to(tag, {
        y: -20 - i * 10,
        x: i % 2 === 0 ? 10 : -10,
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    })

    // ── Orb parallax ──────────────────────────
    gsap.to('.hero-orb-1', {
      y: -120,
      x: -60,
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 2,
      },
    })

    gsap.to('.hero-orb-2', {
      y: -80,
      x: 40,
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 2,
      },
    })

    // ── Content fade out on scroll ────────────
    gsap.to('.hero-content-inner', {
      opacity: 0,
      y: -60,
      scrollTrigger: {
        trigger: '#hero',
        start: '55% top',
        end: 'bottom top',
        scrub: 1,
      },
    })
  }, [])

  // ── Initialize everything ───────────────────
  useEffect(() => {
    const cleanupParticles = initParticles()

    return () => {
      if (cleanupParticles) cleanupParticles()
    }
  }, [initParticles])

  // ── Trigger hero animations after preloader ──
  useEffect(() => {
    if (!isLoading) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        initHeroAnimations()
        ScrollTrigger.refresh()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isLoading, initHeroAnimations])

  // ── Handle CTA clicks ──────────────────────
  const handleScrollTo = (e, target) => {
    e.preventDefault()
    gsap.to(window, {
      scrollTo: { y: target, offsetY: 80 },
      duration: 1,
      ease: 'power3.inOut',
    })
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{ padding: '120px 0 80px' }}
    >
      {/* ── Background Layers ──────────────── */}
      <div className="hero-bg-grid" />
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Gradient Orbs */}
      <div
        className="hero-orb-1 absolute rounded-full pointer-events-none animate-orb-float-1"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(124,58,237,0.25), transparent 65%)',
          top: '-15%',
          right: '-15%',
          filter: 'blur(100px)',
        }}
      />
      <div
        className="hero-orb-2 absolute rounded-full pointer-events-none animate-orb-float-2"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(6,214,160,0.15), transparent 65%)',
          bottom: '-10%',
          left: '-10%',
          filter: 'blur(100px)',
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none animate-orb-float-3"
        style={{
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(247,37,133,0.12), transparent 65%)',
          top: '35%',
          left: '25%',
          filter: 'blur(100px)',
        }}
      />

      {/* Aurora */}
      <div className="hero-aurora" />

      {/* ── Hero Content ───────────────────── */}
      <div
        ref={contentRef}
        className="hero-content-inner container-custom relative z-[2]"
      >
        {/* Badge */}
        <div
          className="hero-badge inline-flex items-center gap-3 px-6 py-2.5 rounded-full mb-12 relative overflow-hidden opacity-0"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Shimmer */}
          <span
            className="absolute top-0 h-full w-full animate-shimmer"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
              left: '-100%',
            }}
          />
          <span
            className="w-2 h-2 rounded-full animate-pulse-dot"
            style={{
              background: '#06d6a0',
              boxShadow: '0 0 10px #06d6a0',
            }}
          />
          <span className="text-light-secondary" style={{ fontSize: '0.82rem' }}>
            Available for opportunities
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-12">
          <div className="overflow-hidden flex items-baseline gap-3 md:gap-5">
            <span className="title-word" data-text="Creative">
              Creative
            </span>
          </div>
          <div className="overflow-hidden flex items-baseline gap-3 md:gap-5">
            <span className="title-word" data-text="Developer">
              Developer
            </span>
            <span className="title-ampersand">&amp;</span>
          </div>
          <div className="overflow-hidden flex items-baseline gap-3 md:gap-5">
            <span className="title-word title-outline" data-text="Problem">
              Problem
            </span>
            <span className="title-word" data-text="Solver">
              Solver
            </span>
          </div>
        </h1>

        {/* Bottom Section */}
        <div className="hero-bottom flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-16 mt-8 opacity-0">
          {/* Description */}
          <div className="max-w-[460px] flex gap-6 items-start">
            <div
              className="w-[3px] rounded flex-shrink-0 mt-1"
              style={{
                height: '60px',
                background: 'linear-gradient(135deg, #7c3aed, #4cc9f0)',
              }}
            />
            <p className="text-light-secondary leading-relaxed" style={{ fontSize: '1.02rem', lineHeight: '1.85' }}>
              I'm <strong className="text-light font-bold">Priyanshu Oli</strong>, a passionate web developer from
              Uttarakhand, India. Building digital experiences with clean code and creative thinking.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 flex-shrink-0">
            {/* Primary CTA */}
            <a
              href="#projects"
              className="cta-primary group flex items-center gap-3.5 py-[18px] px-9 rounded-full text-white font-semibold relative overflow-hidden transition-all duration-400 hover:shadow-neon hover:-translate-y-[3px] hover:scale-[1.02]"
              style={{
                background: '#7c3aed',
                fontSize: '0.95rem',
                boxShadow: '0 4px 20px rgba(124,58,237,0.3)',
              }}
              onClick={(e) => handleScrollTo(e, '#projects')}
            >
              <span
                className="cta-bg absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #4cc9f0)' }}
              />
              <span className="cta-text relative z-[1]">Explore Work</span>
              <div
                className="w-[34px] h-[34px] rounded-full flex items-center justify-center relative z-[1] transition-transform duration-300 group-hover:translate-x-1.5"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  fontSize: '0.8rem',
                }}
              >
                <i className="fas fa-arrow-right" />
              </div>
            </a>

            {/* Secondary CTA */}
            <a
              href="#contact"
              className="group text-light-secondary font-medium relative py-[18px]"
              style={{ fontSize: '0.95rem' }}
              onClick={(e) => handleScrollTo(e, '#contact')}
            >
              <span className="group-hover:text-light transition-colors duration-300">
                Let's Talk
              </span>
              <div
                className="absolute left-0 w-full h-px transition-all duration-400 group-hover:h-0.5 group-hover:shadow-neon"
                style={{
                  bottom: '14px',
                  background: '#5a5a78',
                }}
              />
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-3 opacity-0 hidden md:flex">
          <div
            className="flex justify-center pt-2 rounded-[14px]"
            style={{
              width: '26px',
              height: '42px',
              border: '2px solid #5a5a78',
            }}
          >
            <div
              className="rounded animate-scroll-wheel"
              style={{
                width: '3px',
                height: '10px',
                background: '#7c3aed',
              }}
            />
          </div>
          <span
            className="text-light-muted uppercase"
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.25em',
            }}
          >
            Scroll Down
          </span>
        </div>
      </div>

      {/* ── Floating Tags ──────────────────── */}
      <div className="hero-floating-elements absolute inset-0 pointer-events-none z-[1] hidden md:block">
        {floatingTags.map((tag, i) => (
          <div
            key={i}
            className={`floating-tag absolute flex items-center gap-2 px-[18px] py-2.5 rounded-custom-sm font-mono opacity-0 ${tag.className}`}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              fontSize: '0.78rem',
              color: '#9898b8',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            <i className={tag.icon} style={{ color: tag.color, fontSize: '1rem' }} />
            {tag.label}
          </div>
        ))}
      </div>

      {/* ── Social Sidebar ─────────────────── */}
      {!isLoading && (
        <div className="hero-social-sidebar fixed left-10 bottom-0 hidden md:flex flex-col items-center gap-5 z-[9999]" style={{ opacity: 1 }}>
          {socialLinks.map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              title={social.title}
              className="text-light-muted transition-all duration-300 relative hover:text-accent-1 hover:-translate-y-1 group"
              style={{ fontSize: '1.1rem' }}
            >
              <i className={social.icon} />
              <span
                className="absolute rounded-full transition-all duration-300 group-hover:border-accent-1/30"
                style={{
                  inset: '-8px',
                  border: '1px solid transparent',
                  borderRadius: '50%',
                }}
              />
            </a>
          ))}
          <div
            className="mt-2 social-line"
            style={{
              width: '1px',
              height: '100px',
              background: 'linear-gradient(to bottom, #5a5a78, transparent)',
            }}
          />
        </div>
      )}
    </section>
  )
}

export default Hero