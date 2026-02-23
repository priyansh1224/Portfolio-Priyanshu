import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const CustomCursor = () => {
  const dotRef = useRef(null)
  const outlineRef = useRef(null)
  const trailRef = useRef(null)

  useEffect(() => {
    // Don't show custom cursor on mobile/tablet
    if (window.innerWidth <= 768) return

    const dot = dotRef.current
    const outline = outlineRef.current
    const trail = trailRef.current
    if (!dot || !outline || !trail) return

    // Initialize positions at center
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let outX = mouseX
    let outY = mouseY
    let trailX = mouseX
    let trailY = mouseY
    let rafId = null

    // Set initial visibility and position
    gsap.set([dot, outline, trail], { 
      opacity: 1,
      x: mouseX,
      y: mouseY
    })

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.08, ease: 'none' })
    }

    const animateCursor = () => {
      outX += (mouseX - outX) * 0.12
      outY += (mouseY - outY) * 0.12
      trailX += (mouseX - trailX) * 0.06
      trailY += (mouseY - trailY) * 0.06

      gsap.set(outline, { x: outX, y: outY })
      gsap.set(trail, { x: trailX, y: trailY })

      rafId = requestAnimationFrame(animateCursor)
    }

    const setupHovers = () => {
      const hoverTargets = document.querySelectorAll(
        'a, button, .skill-card-3d, .project-image, .hamburger, input, textarea, .learning-tag, .contact-social-link, .journey-card, .tab-btn, .detail-card, .magnetic-btn, .cert-card, .cert-filter-btn, .view-btn'
      )

      hoverTargets.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverEnter)
        el.addEventListener('mouseleave', handleHoverLeave)
      })

      return hoverTargets
    }

    const handleHoverEnter = () => outline.classList.add('hover')
    const handleHoverLeave = () => outline.classList.remove('hover')

    const handleDocLeave = () => {
      gsap.to([dot, outline, trail], { opacity: 0, duration: 0.2 })
    }

    const handleDocEnter = () => {
      gsap.to([dot, outline, trail], { opacity: 1, duration: 0.2 })
    }

    // Initialize
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleDocLeave)
    document.addEventListener('mouseenter', handleDocEnter)
    rafId = requestAnimationFrame(animateCursor)

    // Setup hovers with MutationObserver for dynamic content
    let hoverTargets = setupHovers()

    const observer = new MutationObserver(() => {
      // Re-setup hovers when DOM changes
      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverEnter)
        el.removeEventListener('mouseleave', handleHoverLeave)
      })
      hoverTargets = setupHovers()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleDocLeave)
      document.removeEventListener('mouseenter', handleDocEnter)
      cancelAnimationFrame(rafId)
      observer.disconnect()
      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverEnter)
        el.removeEventListener('mouseleave', handleHoverLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={outlineRef} className="cursor-outline" />
      <div ref={trailRef} className="cursor-trail" />
    </>
  )
}

export default CustomCursor