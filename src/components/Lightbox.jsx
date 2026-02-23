import { useEffect } from 'react'
import gsap from 'gsap'

const Lightbox = ({ isOpen, onClose, cert, onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onNext, onPrev])

  if (!cert) return null

  return (
    <div
      className={`cert-lightbox fixed inset-0 z-[10000] flex items-center justify-center transition-opacity duration-400 ${
        isOpen ? 'active' : ''
      }`}
    >
      {/* Backdrop */}
      <div
        className="lightbox-backdrop absolute inset-0 backdrop-blur-[30px]"
        style={{ background: 'rgba(5,5,16,0.92)' }}
        onClick={onClose}
      />

      {/* Container */}
      <div className="lightbox-container relative w-[90%] max-w-[900px] max-h-[85vh] z-[2]">
        {/* Close */}
        <button
          onClick={onClose}
          className="lightbox-close absolute -top-12 right-0 w-11 h-11 rounded-full glass-card text-white flex items-center justify-center z-[3] transition-all duration-300 hover:bg-accent-4 hover:border-accent-4 hover:rotate-90"
        >
          <i className="fas fa-times" />
        </button>

        {/* Content */}
        <div className="lightbox-content bg-dark-secondary border border-glass-border rounded-custom-xl overflow-hidden">
          <div className="max-h-[65vh] overflow-hidden flex items-center justify-center bg-dark-tertiary">
            <img
              src={cert.image}
              alt={cert.title}
              className="max-w-full max-h-[65vh] object-contain"
            />
          </div>
          <div className="p-6">
            <h3 className="font-display text-xl font-bold mb-2">{cert.title}</h3>
            <div className="flex gap-8 text-sm text-light-secondary">
              <span className="flex items-center gap-2">
                <i className="fas fa-building text-accent-1" style={{ fontSize: '0.8rem' }} />
                {cert.issuer}
              </span>
              <span className="flex items-center gap-2">
                <i className="far fa-calendar-alt text-accent-1" style={{ fontSize: '0.8rem' }} />
                {cert.date}
              </span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="lightbox-nav absolute top-1/2 -translate-y-1/2 left-[-60px] right-[-60px] flex justify-between pointer-events-none">
          <button
            onClick={onPrev}
            className="lightbox-prev w-12 h-12 rounded-full glass-card text-white flex items-center justify-center pointer-events-auto transition-all duration-300 hover:bg-accent-1 hover:border-accent-1 hover:shadow-neon"
          >
            <i className="fas fa-chevron-left" />
          </button>
          <button
            onClick={onNext}
            className="lightbox-next w-12 h-12 rounded-full glass-card text-white flex items-center justify-center pointer-events-auto transition-all duration-300 hover:bg-accent-1 hover:border-accent-1 hover:shadow-neon"
          >
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Lightbox