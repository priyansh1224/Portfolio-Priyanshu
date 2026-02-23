import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ProjectCard = ({ project, index, isReverse }) => {
  const itemRef = useRef(null)

  /* ─────────────────────────────────────────────
     SCROLL ANIMATIONS
  ───────────────────────────────────────────── */

  useEffect(() => {
    const item = itemRef.current
    if (!item) return

    const ctx = gsap.context(() => {
      const imgWrapper = item.querySelector('.project-image-wrapper')
      const details = item.querySelector('.project-details')
      const img = item.querySelector('.project-image img')
      const number = item.querySelector('.project-number')

      // Image slide
      gsap.from(imgWrapper, {
        opacity: 0,
        x: isReverse ? 70 : -70,
        scale: 0.94,
        duration: 1.1,
        scrollTrigger: {
          trigger: item,
          start: 'top 72%',
          toggleActions: 'play none none reverse',
        },
      })

      // Details stagger
      gsap.from(details.children, {
        opacity: 0,
        y: 45,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: item,
          start: 'top 68%',
          toggleActions: 'play none none reverse',
        },
      })

      // Image parallax
      if (img) {
        gsap.to(img, {
          yPercent: -12,
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }

      // Number parallax
      if (number) {
        gsap.to(number, {
          y: -40,
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }
    }, item)

    return () => ctx.revert()
  }, [isReverse])

  /* ─────────────────────────────────────────────
     3D TILT EFFECT
  ───────────────────────────────────────────── */

  useEffect(() => {
    if (window.innerWidth <= 768) return

    const item = itemRef.current
    const imgElement = item?.querySelector('.project-image')
    if (!imgElement) return

    const handleMouseMove = (e) => {
      const rect = imgElement.getBoundingClientRect()
      const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -8
      const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 8

      gsap.to(imgElement, {
        rotateX: rx,
        rotateY: ry,
        duration: 0.3,
        transformPerspective: 1000,
      })
    }

    const handleMouseLeave = () => {
      gsap.to(imgElement, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.5)',
      })
    }

    imgElement.addEventListener('mousemove', handleMouseMove)
    imgElement.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      imgElement.removeEventListener('mousemove', handleMouseMove)
      imgElement.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={itemRef}
      className={`project-item grid gap-10 lg:gap-20 items-center ${
        isReverse
          ? 'lg:grid-cols-[1fr_1.3fr]'
          : 'lg:grid-cols-[1.3fr_1fr]'
      }`}
    >
      {/* IMAGE */}
      <div
        className={`project-image-wrapper relative ${
          isReverse ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        <div
          className="project-image project-3d-hover group relative rounded-custom-lg overflow-hidden"
          style={{
            aspectRatio: '16/10',
            background: '#0a0a1a',
            transformStyle: 'preserve-3d',
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
            style={{ willChange: 'transform' }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-dark/75 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
            <div className="flex gap-5">
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn w-14 h-14 rounded-full glass-card flex items-center justify-center text-white text-lg transition-all duration-400 hover:bg-accent-1 hover:border-accent-1 hover:shadow-neon"
              >
                <i className="fas fa-external-link-alt" />
              </a>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn w-14 h-14 rounded-full glass-card flex items-center justify-center text-white text-lg transition-all duration-400 hover:bg-accent-1 hover:border-accent-1 hover:shadow-neon"
              >
                <i className="fab fa-github" />
              </a>
            </div>
          </div>
        </div>

        {/* LARGE NUMBER */}
        <div className="project-number absolute font-display font-black text-transparent pointer-events-none top-[-35px] right-[-20px] text-[5rem] md:text-[7rem] leading-none">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* DETAILS */}
      <div
        className={`project-details ${
          isReverse ? 'lg:order-1' : 'lg:order-2'
        }`}
      >
        <div className="flex items-center gap-5 mb-4">
          <span className="font-mono text-accent-1 uppercase px-3 py-1 rounded-full text-xs font-semibold bg-accent-1/10 tracking-[0.12em]">
            {project.category}
          </span>
          <span className="text-light-muted text-xs">
            {project.year}
          </span>
        </div>

        <h3 className="font-display font-bold mb-4 leading-tight text-[clamp(1.5rem,3vw,2.4rem)] tracking-[-0.02em] transition-all duration-300 hover:text-shadow-lg">
          {project.title}
        </h3>

        <p className="text-light-secondary leading-relaxed mb-6 text-[0.95rem]">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-3">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                color: '#9898b8',
              }}
            >
              <i
                className={tech.icon}
                style={{ color: tech.color, fontSize: '0.9rem' }}
              />
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard