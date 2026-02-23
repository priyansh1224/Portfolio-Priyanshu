import { useEffect, useRef } from 'react'

const Marquee = () => {
  const trackRef = useRef(null)

  const items = [
    { icon: 'fab fa-html5', color: '#E44D26', label: 'HTML5' },
    { icon: 'fab fa-react', color: '#61DAFB', label: 'REACT' },
    { icon: 'fab fa-js-square', color: '#F7DF1E', label: 'JAVASCRIPT' },
    { icon: 'fab fa-node-js', color: '#68A063', label: 'NODE.JS' },
    { icon: 'fab fa-css3-alt', color: '#264de4', label: 'CSS3' },
    { icon: 'fab fa-python', color: '#FFD43B', label: 'PYTHON' },
    { icon: 'fab fa-git-alt', color: '#F05032', label: 'GIT' },
    { icon: 'fas fa-database', color: '#4DB33D', label: 'MONGODB' },
  ]

  // ── Clone content for seamless scroll ───────
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const content = track.querySelector('.marquee-content')
    if (!content) return

    // Clone only once
    if (track.children.length === 1) {
      const clone = content.cloneNode(true)
      track.appendChild(clone)
    }
  }, [])

  return (
    <div
      className="py-[22px] overflow-hidden relative"
      style={{
        background: '#0a0a1a',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Left fade */}
      <div
        className="absolute top-0 left-0 h-full z-[2] pointer-events-none"
        style={{
          width: '150px',
          background: 'linear-gradient(90deg, #0a0a1a, transparent)',
        }}
      />
      {/* Right fade */}
      <div
        className="absolute top-0 right-0 h-full z-[2] pointer-events-none"
        style={{
          width: '150px',
          background: 'linear-gradient(-90deg, #0a0a1a, transparent)',
        }}
      />

      <div ref={trackRef} className="marquee-track">
        <div className="marquee-content flex items-center gap-12 pr-12">
          {items.map((item, i) => (
            <span
              key={i}
              className="font-display font-semibold uppercase whitespace-nowrap flex items-center gap-2 text-light-muted"
              style={{ fontSize: '0.85rem', letterSpacing: '0.15em' }}
            >
              <i className={item.icon} style={{ color: item.color, fontSize: '1.1rem' }} />
              {item.label}
            </span>
          )).reduce((prev, curr, i) => {
            // Insert diamond dots between items
            if (i === 0) return [curr]
            return [
              ...prev,
              <span
                key={`dot-${i}`}
                className="text-accent-1"
                style={{ fontSize: '0.45rem' }}
              >
                ◆
              </span>,
              curr,
            ]
          }, [])}
          {/* Final dot */}
          <span
            className="text-accent-1"
            style={{ fontSize: '0.45rem' }}
          >
            ◆
          </span>
        </div>
      </div>
    </div>
  )
}

export default Marquee