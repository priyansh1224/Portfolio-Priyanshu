import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ContactForm from '../components/ContactForm'

gsap.registerPlugin(ScrollTrigger)

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
   CONTACT PAGE
───────────────────────────────────────────── */

const Contact = () => {
  const sectionRef = useRef(null)

  /* ─────────────────────────────────────────────
     ANIMATIONS
  ───────────────────────────────────────────── */

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from(
        '.contact-page .section-number, .contact-page .title-reveal, .contact-page .section-line',
        {
          opacity: 0,
          y: 35,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-page',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Left content
      gsap.from(
        '.contact-page .contact-heading, .contact-page .contact-subtext, .contact-page .contact-info-item, .contact-page .contact-socials',
        {
          opacity: 0,
          y: 45,
          duration: 0.8,
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.contact-page .contact-layout',
            start: 'top 68%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Form
      gsap.from('.contact-page .contact-form', {
        opacity: 0,
        y: 65,
        scale: 0.97,
        duration: 1.1,
        scrollTrigger: {
          trigger: '.contact-page .contact-layout',
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="contact-page py-[140px] bg-dark relative min-h-screen"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute rounded-full"
          style={{
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(124,58,237,0.15), transparent 65%)',
            top: '-10%',
            right: '-10%',
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(6,214,160,0.1), transparent 65%)',
            bottom: '-10%',
            left: '-5%',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="container-custom relative z-[2]">
        {/* Section header */}
        <div className="section-header mb-20">
          <span className="section-number">06</span>
          <h2 className="section-title">
            <span className="title-reveal inline-block">
              Let's Connect
            </span>
          </h2>
          <div className="section-line" />
        </div>

        {/* Contact layout */}
        <div className="contact-layout grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left side */}
          <div className="contact-left">
            <h3
              className="contact-heading font-display font-bold leading-tight mb-4"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
            >
              Have a project?
              <br />
              <span className="text-gradient">Let's make it happen.</span>
            </h3>

            <p
              className="contact-subtext text-light-secondary mb-12"
              style={{ fontSize: '0.95rem' }}
            >
              I'm open to collaborations, learning opportunities, or just a
              friendly chat!
            </p>

            {/* Info cards */}
            <div className="flex flex-col gap-5 mb-12">
              {contactInfo.map((info, i) => (
                <div
                  key={i}
                  className="contact-info-item glass-card flex items-center gap-5 px-5 py-4 transition-all duration-400 hover:translate-x-2 hover:border-[rgba(124,58,237,0.3)]"
                >
                  <div
                    className="w-12 h-12 rounded-[14px] flex items-center justify-center text-accent-1 flex-shrink-0 transition-all duration-300"
                    style={{ background: 'rgba(124,58,237,0.1)', fontSize: '1.1rem' }}
                  >
                    <i className={info.icon} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span
                      className="text-light-muted uppercase font-semibold"
                      style={{ fontSize: '0.65rem', letterSpacing: '0.12em' }}
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
                      <span className="text-light-secondary" style={{ fontSize: '0.9rem' }}>
                        {info.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
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

          {/* Right side */}
          <div className="contact-right">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact