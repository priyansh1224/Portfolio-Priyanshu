import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Journey = () => {
  const sectionRef = useRef(null)

  const journeyItems = [
    {
      icon: 'fas fa-terminal',
      color: '#e040fb',
      title: 'Started Learning Programming',
      desc: 'Began with C++ and Python, mastering fundamentals and problem-solving.',
      isNow: false,
    },
    {
      icon: 'fas fa-globe',
      color: '#E44D26',
      title: 'Discovered Web Development',
      desc: 'Fell in love with HTML, CSS, JavaScript and building for the web.',
      isNow: false,
    },
    {
      icon: 'fab fa-react',
      color: '#61DAFB',
      title: 'Dived Into Frontend',
      desc: 'Mastered responsive design, CSS frameworks, and started building with React.',
      isNow: false,
    },
    {
      icon: 'fas fa-server',
      color: '#68A063',
      title: 'Backend Exploration',
      desc: 'Explored Node.js, Express, and databases for full-stack capabilities.',
      isNow: false,
    },
    {
      icon: 'fas fa-rocket',
      color: '#00cec9',
      title: 'Building & Improving',
      desc: 'Creating complex projects, learning More Advance in the Development, refining skills daily.',
      isNow: true,
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const isMobile = window.innerWidth < 768

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Make everything visible on mobile
        const sh = section.querySelector('.section-header')
        if (sh) {
          gsap.set(sh.querySelectorAll('.section-number, .title-reveal, .section-line'), {
            opacity: 1,
            y: 0
          })
        }

        section.querySelectorAll('.journey-item').forEach((item) => {
          gsap.set(item.querySelector('.journey-marker'), {
            opacity: 1,
            scale: 1
          })
          gsap.set(item.querySelector('.journey-card'), {
            opacity: 1,
            x: 0,
            rotateY: 0
          })
        })

        gsap.set('.timeline-progress', { height: '100%' })
        return
      }

      // Desktop animations
      // Section header
      const sh = section.querySelector('.section-header')
      if (sh) {
        gsap.from(sh.querySelectorAll('.section-number, .title-reveal, .section-line'), {
          opacity: 0, y: 35, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sh, start: 'top 82%', toggleActions: 'play none none reverse' },
        })
      }

      // Journey items
      section.querySelectorAll('.journey-item').forEach((item) => {
        gsap.from(item.querySelector('.journey-marker'), {
          opacity: 0, scale: 0, duration: 0.5, ease: 'back.out(2)',
          scrollTrigger: { trigger: item, start: 'top 82%', toggleActions: 'play none none reverse' },
        })
        gsap.from(item.querySelector('.journey-card'), {
          opacity: 0, x: -50, rotateY: 5, duration: 0.9,
          scrollTrigger: { trigger: item, start: 'top 80%', toggleActions: 'play none none reverse' },
        })
      })

      // Timeline progress
      ScrollTrigger.create({
        trigger: '.journey-timeline',
        start: 'top 80%',
        end: 'bottom 25%',
        scrub: 1,
        onUpdate: (self) => {
          gsap.set('.timeline-progress', { height: self.progress * 100 + '%' })
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="journey" ref={sectionRef} className="py-[140px] bg-dark-secondary relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="section-header mb-20 relative">
          <span className="section-number">05</span>
          <h2 className="section-title">
            <span className="title-reveal inline-block">My Journey</span>
          </h2>
          <div className="section-line" />
        </div>

        {/* Timeline */}
        <div className="journey-timeline relative max-w-[920px] mx-auto">
          {/* Track */}
          <div className="timeline-track">
            <div className="timeline-progress" />
          </div>

          {/* Items */}
          {journeyItems.map((item, i) => (
            <div
              key={i}
              className="journey-item relative mb-16 last:mb-0"
              data-year={item.year}
              style={{ paddingLeft: window.innerWidth > 768 ? '85px' : '65px' }}
            >
              {/* Marker */}
              <div className="journey-marker absolute z-[2]" style={{ left: '22px', top: '25px' }}>
                <div
                  className={`w-[22px] h-[22px] rounded-full relative transition-all duration-400 group ${
                    item.isNow ? 'marker-active' : ''
                  }`}
                  style={{
                    background: '#0a0a1a',
                    border: `2px solid ${item.isNow ? '#06d6a0' : '#7c3aed'}`,
                    boxShadow: item.isNow ? '0 0 20px rgba(6,214,160,0.4)' : 'none',
                  }}
                >
                  <span
                    className="absolute rounded-full transition-opacity duration-300"
                    style={{
                      inset: '4px',
                      background: item.isNow ? '#06d6a0' : '#7c3aed',
                      opacity: item.isNow ? 1 : 0,
                    }}
                  />
                </div>
              </div>

              {/* Card */}
              <div
                className="journey-card glass-card transition-all duration-400 relative hover:translate-x-3 hover:-translate-y-[3px]"
                style={{ '--j-color': item.color }}
              >
                {/* Year Badge */}
                <div
                  className={`journey-year-badge ${item.isNow ? 'journey-now' : ''}`}
                >
                  {item.year}
                </div>

                {/* Card Inner */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start p-6 md:p-[2.2rem]">
                  <div className="journey-icon" style={{ '--j-color': item.color }}>
                    <i className={item.icon} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-2" style={{ fontSize: '1.15rem' }}>
                      {item.title}
                    </h3>
                    <p className="text-light-secondary" style={{ fontSize: '0.88rem', lineHeight: '1.75' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Journey