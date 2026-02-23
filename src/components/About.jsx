import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const About = () => {
  const sectionRef = useRef(null)

  const details = [
    { icon: 'fas fa-map-marker-alt', label: 'Location', value: 'Uttarakhand, India' },
    { icon: 'fas fa-graduation-cap', label: 'Education', value: 'CS Student' },
    { icon: 'fas fa-envelope', label: 'Email', value: 'priyanshuoli30@gmail.com' },
    { icon: 'fas fa-gamepad', label: 'Interests', value: 'Code, Photo, Gaming' },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Section header
      const sh = section.querySelector('.section-header')
      if (sh) {
        gsap.from(sh.querySelectorAll('.section-number, .title-reveal, .section-line'), {
          opacity: 0, y: 35, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sh, start: 'top 82%', toggleActions: 'play none none reverse' },
        })
      }

      // Image wrapper
      gsap.from('.about-image-wrapper', {
        opacity: 0, x: -70, rotateY: 8, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-grid', start: 'top 72%', toggleActions: 'play none none reverse' },
      })

      // Code badge
      gsap.from('.about-code-badge', {
        opacity: 0, scale: 0, duration: 0.5, delay: 0.4, ease: 'back.out(2)',
        scrollTrigger: { trigger: '.about-grid', start: 'top 72%', toggleActions: 'play none none reverse' },
      })

      // Experience badge
      gsap.from('.about-experience-badge', {
        opacity: 0, scale: 0.5, duration: 0.6, delay: 0.5, ease: 'back.out(2)',
        scrollTrigger: { trigger: '.about-grid', start: 'top 72%', toggleActions: 'play none none reverse' },
      })

      // Text col elements
      gsap.from('.about-text-col .about-intro, .about-text-col .about-description, .about-text-col .about-details, .about-text-col .about-cta-btn', {
        opacity: 0, y: 45, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-grid', start: 'top 68%', toggleActions: 'play none none reverse' },
      })

      // Detail cards
      gsap.from('.detail-card', {
        opacity: 0, y: 25, scale: 0.95, duration: 0.5, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-details', start: 'top 85%', toggleActions: 'play none none reverse' },
      })

      // Photo parallax
      gsap.to('.about-photo', {
        yPercent: -10, ease: 'none',
        scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const handleContactClick = (e) => {
    e.preventDefault()
    gsap.to(window, {
      scrollTo: { y: '#contact', offsetY: 80 },
      duration: 1,
      ease: 'power3.inOut',
    })
  }

  return (
    <section id="about" ref={sectionRef} className="py-[140px] relative bg-dark">
      <div className="container-custom">
        {/* Section Header */}
        <div className="section-header mb-20 relative">
          <span className="section-number">02</span>
          <h2 className="section-title">
            <span className="title-reveal inline-block">About Me</span>
          </h2>
          <div className="section-line" />
        </div>

        {/* About Grid */}
        <div className="about-grid grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-16 items-center">
          {/* Image Column */}
          <div className="about-image-col">
            <div className="about-image-wrapper relative max-w-[420px] mx-auto lg:max-w-none" style={{ perspective: '1000px' }}>
              {/* Image Frame */}
              <div
                className="about-image-frame relative rounded-custom-lg overflow-hidden group"
                style={{
                  aspectRatio: '3/4',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s ease',
                }}
              >
                <img
                  src="/img/me.png"
                  alt="Priyanshu Oli"
                  className="about-photo w-full h-full object-cover transition-all duration-500 group-hover:grayscale-0 group-hover:contrast-110 group-hover:brightness-100"
                  style={{ filter: 'grayscale(20%) contrast(1.05) brightness(0.95)' }}
                />
                {/* Image overlay gradient */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(5,5,16,0.6))' }}
                />
                {/* Glitch overlay */}
                <div className="image-glitch-overlay absolute inset-0 opacity-0 pointer-events-none mix-blend-screen" />
              </div>

              {/* Decorations */}
              <div className="absolute pointer-events-none" style={{ top: '-18px', left: '-18px', right: '-18px', bottom: '-18px' }}>
                <div className="deco-tl" />
                <div className="deco-br" />
                <div className="deco-circle" />
              </div>

              {/* Experience Badge */}
              <div
                className="about-experience-badge absolute flex items-center gap-3.5 z-[3] md:bottom-[-25px] md:right-[-25px] relative md:absolute mt-6 md:mt-0 inline-flex"
                style={{
                  background: '#0a0a1a',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '18px',
                  padding: '22px 28px',
                  boxShadow: '0 20px 60px -15px rgba(0,0,0,0.5)',
                }}
              >
                {/* SVG Ring */}
                <div className="absolute pointer-events-none" style={{ inset: '-2px' }}>
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="45" className="exp-ring-bg" />
                    <circle cx="50" cy="50" r="45" className="exp-ring-fill" />
                  </svg>
                </div>
                <span
                  className="font-display font-bold text-gradient"
                  style={{ fontSize: '2.8rem' }}
                >
                  3+
                </span>
                <span className="text-light-secondary leading-tight" style={{ fontSize: '0.75rem' }}>
                  Years<br />Learning
                </span>
              </div>

              {/* Code Badge */}
              <div
                className="about-code-badge absolute top-[-15px] left-[-15px] z-[3] hidden md:block"
                style={{
                  background: '#111128',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '8px',
                  padding: '8px 16px',
                }}
              >
                <span
                  className="font-mono text-accent-3"
                  style={{
                    fontSize: '0.75rem',
                    textShadow: '0 0 10px rgba(6,214,160,0.3)',
                  }}
                >
                  &lt;developer /&gt;
                </span>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="about-text-col relative">
            <div className="about-intro">
              <h3 className="font-display text-[2rem] font-bold mb-2">
                Web Developer & <span className="text-gradient">Tech Enthusiast</span>
              </h3>
              <p className="text-light-muted mb-8" style={{ fontSize: '1rem' }}>
                Building my skills one project at a time
              </p>
            </div>

            <div className="about-description">
              <p className="text-light-secondary mb-5" style={{ fontSize: '0.95rem', lineHeight: '1.85' }}>
                Hello! I'm Priyanshu, a self-taught web developer from Uttarakhand, India. I'm on an exciting
                journey to master web development and build meaningful projects that make a difference.
              </p>
              <p className="text-light-secondary mb-5" style={{ fontSize: '0.95rem', lineHeight: '1.85' }}>
                While I'm still in the learning phase, I've already completed several projects that showcase
                my growing skills in frontend and backend. I'm passionate about creating clean, functional websites.
              </p>
            </div>

            {/* Detail Cards */}
            <div className="about-details grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
              {details.map((detail, i) => (
                <div
                  key={i}
                  className="detail-card flex items-center gap-3 px-4 py-3.5 rounded-custom-sm transition-all duration-400 hover:-translate-y-[3px] hover:shadow-lg group"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div
                    className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-accent-2 flex-shrink-0 transition-all duration-300 group-hover:bg-accent-1 group-hover:text-white group-hover:shadow-neon"
                    style={{
                      background: 'rgba(124,58,237,0.1)',
                      fontSize: '0.9rem',
                    }}
                  >
                    <i className={detail.icon} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span
                      className="text-accent-1 font-semibold uppercase"
                      style={{ fontSize: '0.65rem', letterSpacing: '0.12em' }}
                    >
                      {detail.label}
                    </span>
                    <span className="text-light-secondary" style={{ fontSize: '0.85rem' }}>
                      {detail.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="about-cta-btn magnetic-btn group inline-flex items-center gap-3 py-[15px] px-[30px] border border-accent-1 rounded-full text-accent-2 font-semibold relative overflow-hidden transition-all duration-400 hover:text-white hover:border-transparent hover:shadow-neon hover:-translate-y-0.5"
              style={{ fontSize: '0.9rem' }}
              onClick={handleContactClick}
            >
              <span className="absolute inset-0 bg-gradient-main opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-full" />
              <span className="relative z-[1]">Get in Touch</span>
              <i className="fas fa-arrow-right relative z-[1] transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About