import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const BackToTop = () => {
  const [visible, setVisible] = useState(false)
  const circleRef = useRef(null)
  const circumference = 2 * Math.PI * 24

  useEffect(() => {
    const circle = circleRef.current
    if (circle) {
      circle.style.strokeDasharray = circumference
      circle.style.strokeDashoffset = circumference
    }

    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0

      setVisible(scrollTop > 400)

      if (circle) {
        circle.style.strokeDashoffset = Math.max(
          0,
          circumference - progress * circumference
        )
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [circumference])

  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: 0,
      duration: 1.2,
      ease: 'power3.inOut',
    })
  }

  return (
    <button
      className={`fixed bottom-[30px] right-[30px] w-[54px] h-[54px] rounded-full flex items-center justify-center text-accent-1 text-sm z-[999] transition-all duration-400 bg-dark-secondary border border-glass-border hover:bg-accent-1 hover:text-white hover:border-accent-1 hover:-translate-y-1 hover:shadow-neon ${
        visible ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={scrollToTop}
      title="Back to top"
    >
      <i className="fas fa-arrow-up" />
      <svg className="progress-ring" width="54" height="54">
        <circle
          ref={circleRef}
          className="progress-ring-circle"
          cx="27"
          cy="27"
          r="24"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </button>
  )
}

export default BackToTop