import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import About from '../components/About'
import Skills from '../components/Skills'
import ProjectCard from '../components/ProjectCard'
import Journey from '../components/Journey'
import ContactForm from '../components/ContactForm'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────
   PROJECT DATA
───────────────────────────────────────────── */

const projectsData = [
  {
    id: 1,
    title: 'Snap Thumb - AI Thumbnail Generator',
    category: 'Full Stack Development',
    year: '2025',
    description:
      'Create stunning, professional thumbnails instantly with AI-powered generation, customizable templates, and real-time preview.',
    image: '/img/project1.png',
    liveLink: 'https://thumnel-generator.vercel.app/',
    githubLink: 'https://github.com/priyansh1224',
    tech: [
      { name: 'TypeScript', icon: 'fas fa-code', color: '#3178C6' },
      { name: 'Tailwind', icon: 'fas fa-wind', color: '#06B6D4' },
      { name: 'Express', icon: 'fab fa-node-js', color: '#68A063' },
      { name: 'Node.js', icon: 'fab fa-node-js', color: '#339933' },
      { name: 'MongoDB', icon: 'fas fa-database', color: '#47A248' },
    ],
  },
  {
    id: 2,
    title: 'AI Website Builder',
    category: 'Full Stack Development',
    year: '2025',
    description:
      'Generate complete, responsive websites instantly using simple text prompts powered by advanced AI technology.',
    image: '/img/project2.png',
    liveLink: 'https://website-builder-client-eight.vercel.app/',
    githubLink: 'https://github.com/priyansh1224',
    tech: [
      { name: 'TypeScript', icon: 'fas fa-code', color: '#3178C6' },
      { name: 'Tailwind', icon: 'fas fa-wind', color: '#06B6D4' },
      { name: 'Express', icon: 'fab fa-node-js', color: '#68A063' },
      { name: 'Node.js', icon: 'fab fa-node-js', color: '#339933' },
      { name: 'MongoDB', icon: 'fas fa-database', color: '#47A248' },
    ],
  },
  {
    id: 3,
    title: 'Strike',
    category: 'Frontend Development',
    year: '2025',
    description:
      'Modern landing page for The Strike online course platform featuring engaging design and seamless enrollment experience.',
    image: '/img/project3.png',
    liveLink: 'https://strike-ten-rho.vercel.app/',
    githubLink: 'https://github.com/priyansh1224',
    tech: [
      { name: 'HTML5', icon: 'fab fa-html5', color: '#E44D26' },
      { name: 'CSS3', icon: 'fab fa-css3-alt', color: '#264de4' },
    ],
  },
  {
    id: 4,
    title: 'Celebrazo Events',
    category: 'StartUp Project',
    year: '2025',
    description:
      'Plan, manage, and promote events seamlessly with intuitive scheduling, booking system, and real-time collaboration tools.',
    image: '/img/project4.png',
    liveLink: 'https://celeberazo.vercel.app/',
    githubLink: 'https://github.com/priyansh1224',
    tech: [
      { name: 'HTML5', icon: 'fab fa-html5', color: '#E44D26' },
      { name: 'CSS3', icon: 'fab fa-css3-alt', color: '#264de4' },
      { name: 'JavaScript', icon: 'fab fa-js-square', color: '#F7DF1E' },
    ],
  },
]

/* ─────────────────────────────────────────────
   CONTACT DATA
───────────────────────────────────────────── */

const contactInfo = [
  {
    icon: 'fas fa-envelope',
    label: 'Email',
    value: 'priyanshuoli30@gmail.com',
    href: 'mailto:priyanshuoli30@gmail.com',
    isLink: true,
  },
  {
    icon: 'fas fa-phone',
    label: 'Phone',
    value: '+91 9068381864',
    href: 'tel:+919068381864',
    isLink: true,
  },
  {
    icon: 'fas fa-map-marker-alt',
    label: 'Location',
    value: 'Haldwani, Uttarakhand, India',
    isLink: false,
  },
]

const socialLinks = [
  { href: 'https://github.com/priyansh1224', icon: 'fab fa-github' },
  {
    href: 'https://www.linkedin.com/in/priyanshu-oli-13a913290',
    icon: 'fab fa-linkedin-in',
  },
  { href: 'https://twitter.com/priyansh1224', icon: 'fab fa-twitter' },
  { href: 'https://instagram.com/priyansh1224', icon: 'fab fa-instagram' },
]

/* ─────────────────────────────────────────────
   HOME COMPONENT
───────────────────────────────────────────── */

const Home = ({ isLoading }) => {
  const projectsRef = useRef(null)
  const contactRef = useRef(null)

  /* ─────────────────────────────────────────────
     PROJECTS SECTION ANIMATIONS
  ───────────────────────────────────────────── */

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    
    const ctx = gsap.context(() => {
      if (isMobile) {
        // Make everything visible on mobile
        gsap.set('.projects-section .section-number, .projects-section .title-reveal, .projects-section .section-line, .projects-footer', {
          opacity: 1,
          y: 0
        })
        return
      }

      // Desktop animations
      gsap.from(
        '.projects-section .section-number, .projects-section .title-reveal, .projects-section .section-line',
        {
          opacity: 0,
          y: 35,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-section',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.from('.projects-footer', {
        opacity: 0,
        y: 35,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.projects-footer',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }, projectsRef)

    return () => ctx.revert()
  }, [])

  /* ─────────────────────────────────────────────
     CONTACT SECTION ANIMATIONS
  ───────────────────────────────────────────── */

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    
    const ctx = gsap.context(() => {
      if (isMobile) {
        // Make everything visible on mobile
        gsap.set('.contact-section .section-number, .contact-section .title-reveal, .contact-section .section-line, .contact-heading, .contact-subtext, .contact-info-item, .contact-socials, .contact-form', {
          opacity: 1,
          y: 0,
          scale: 1
        })
        return
      }

      // Desktop animations
      gsap.from(
        '.contact-section .section-number, .contact-section .title-reveal, .contact-section .section-line',
        {
          opacity: 0,
          y: 35,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.from(
        '.contact-heading, .contact-subtext, .contact-info-item, .contact-socials',
        {
          opacity: 0,
          y: 45,
          duration: 0.8,
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.contact-layout',
            start: 'top 68%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.from('.contact-form', {
        opacity: 0,
        y: 65,
        scale: 0.97,
        duration: 1.1,
        scrollTrigger: {
          trigger: '.contact-layout',
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      })
    }, contactRef)

    return () => ctx.revert()
  }, [])

  /* ─────────────────────────────────────────────
     SCROLLTRIGGER REFRESH
  ───────────────────────────────────────────── */

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [])

  return (
    <>
      <Hero isLoading={isLoading} />
      <Marquee />
      <About />
      <Skills />

      {/* ══════════════════════════════════════
          PROJECTS SECTION
      ══════════════════════════════════════ */}
      <section
        id="projects"
        ref={projectsRef}
        className="projects-section py-[140px] md:py-[140px] py-[80px] bg-dark relative"
      >
        <div className="container-custom">
          <div className="section-header mb-20">
            <span className="section-number">04</span>
            <h2 className="section-title">
              <span className="title-reveal inline-block">
                Selected Work
              </span>
            </h2>
            <div className="section-line" />
          </div>

          <div className="projects-showcase flex flex-col gap-24 md:gap-[10rem]">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isReverse={index % 2 !== 0}
              />
            ))}
          </div>

          <div className="projects-footer text-center mt-20">
            <p className="text-light-muted mb-6">
              More projects available on GitHub
            </p>
            <a
              href="https://github.com/priyansh1224"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-btn group inline-flex items-center gap-3 py-4 px-8 rounded-full border border-glass-border text-light font-semibold transition-all duration-400 hover:border-accent-1 hover:shadow-neon hover:-translate-y-[3px]"
              style={{ fontSize: '0.9rem' }}
            >
              <span>View All Projects</span>
              <i className="fab fa-github text-xl" />
            </a>
          </div>
        </div>
      </section>

      <Journey />

      {/* ══════════════════════════════════════
          CONTACT SECTION
      ══════════════════════════════════════ */}
      <section
        id="contact"
        ref={contactRef}
        className="contact-section py-[80px] md:py-[140px] bg-dark relative"
      >
        <div className="container-custom">
          <div className="section-header mb-20">
            <span className="section-number">06</span>
            <h2 className="section-title">
              <span className="title-reveal inline-block">
                Let's Connect
              </span>
            </h2>
            <div className="section-line" />
          </div>

          <div className="contact-layout grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* ── LEFT SIDE ──────────────────── */}
            <div className="contact-left">
              <h3
                className="contact-heading font-display font-bold leading-tight mb-4"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
              >
                Have a project?
                <br />
                <span className="text-gradient">
                  Let's make it happen.
                </span>
              </h3>

              <p
                className="contact-subtext text-light-secondary mb-12"
                style={{ fontSize: '0.95rem' }}
              >
                I'm open to collaborations, learning opportunities, or
                just a friendly chat!
              </p>

              {/* Contact Info Cards */}
              <div className="contact-info-list flex flex-col gap-5 mb-12">
                {contactInfo.map((info, i) => (
                  <div
                    key={i}
                    className="contact-info-item glass-card flex items-center gap-5 px-5 py-4 transition-all duration-400 hover:translate-x-2 hover:border-[rgba(124,58,237,0.3)]"
                  >
                    <div
                      className="contact-info-icon w-12 h-12 rounded-[14px] flex items-center justify-center text-accent-1 flex-shrink-0 transition-all duration-300"
                      style={{
                        background: 'rgba(124,58,237,0.1)',
                        fontSize: '1.1rem',
                      }}
                    >
                      <i className={info.icon} />
                    </div>
                    <div className="contact-info-text flex flex-col gap-[3px]">
                      <span
                        className="info-label text-light-muted uppercase font-semibold"
                        style={{
                          fontSize: '0.65rem',
                          letterSpacing: '0.12em',
                        }}
                      >
                        {info.label}
                      </span>
                      {info.isLink ? (
                        <a
                          href={info.href}
                          className="text-light-secondary transition-colors duration-300 hover:text-accent-2"
                          style={{ fontSize: '0.9rem' }}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span
                          className="text-light-secondary"
                          style={{ fontSize: '0.9rem' }}
                        >
                          {info.value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="contact-socials flex flex-wrap gap-4">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link magnetic-btn w-12 h-12 flex items-center justify-center glass-card rounded-[14px] text-light-secondary text-lg transition-all duration-400 hover:border-accent-1 hover:text-accent-1 hover:-translate-y-1 hover:shadow-neon"
                  >
                    <i className={social.icon} />
                  </a>
                ))}
              </div>
            </div>

            {/* ── RIGHT SIDE (FORM) ──────────── */}
            <div className="contact-right">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home