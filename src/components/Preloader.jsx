import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null)
  const progressFillRef = useRef(null)
  const percentRef = useRef(null)
  const messageRef = useRef(null)
  const loaderRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const progressFill = progressFillRef.current
    const percent = percentRef.current
    const message = messageRef.current
    const loader = loaderRef.current

    // Create timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out and remove preloader
        gsap.to(container, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: onComplete
        })
      }
    })

    // Animate loader (scale pulse)
    tl.fromTo(loader,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
    )

    // Animate message
    tl.fromTo(message,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      '-=0.4'
    )

    // Progress bar and percentage count
    const progressObj = { val: 0 }
    tl.to(progressObj, {
      val: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(progressObj.val)
        if (percent) percent.textContent = `${v}%`
        if (progressFill) progressFill.style.width = `${v}%`
      }
    }, '-=0.3')

    // Optional: change message midway
    tl.to(message, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        if (message) message.textContent = 'ALMOST THERE...'
        gsap.to(message, { opacity: 1, duration: 0.2 })
      }
    }, '+=1.2')

    // Final pulse on loader
    tl.to(loader, {
      scale: 1.1,
      duration: 0.4,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut'
    }, '-=0.2')

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div className="preloader" ref={containerRef}>
      <style>{`
        .preloader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #0b0b1a;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: white;
          overflow: hidden;
        }

        /* Animated gradient background */
        .preloader::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 50%, rgba(67, 97, 238, 0.15) 0%, transparent 50%),
                      radial-gradient(circle at 70% 50%, rgba(114, 9, 183, 0.15) 0%, transparent 50%);
          animation: bgShift 8s ease-in-out infinite alternate;
        }

        @keyframes bgShift {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.2); opacity: 1; }
        }

        /* Loader container */
        .loader {
          position: relative;
          width: 120px;
          height: 120px;
          margin-bottom: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Outer ring with gradient */
        .loader-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 3px solid transparent;
          border-top-color: #4361ee;
          border-right-color: #7209b7;
          border-bottom-color: #3a0ca3;
          border-left-color: transparent;
          animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        }

        .loader-ring:nth-child(2) {
          width: 80%;
          height: 80%;
          border-top-color: #7209b7;
          border-right-color: #3a0ca3;
          border-bottom-color: #4361ee;
          border-left-color: transparent;
          animation-duration: 1.8s;
          animation-direction: reverse;
        }

        .loader-ring:nth-child(3) {
          width: 60%;
          height: 60%;
          border-top-color: #3a0ca3;
          border-right-color: #4361ee;
          border-bottom-color: #7209b7;
          border-left-color: transparent;
          animation-duration: 2.4s;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Inner glow */
        .loader-glow {
          position: absolute;
          width: 40%;
          height: 40%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(114,9,183,0.4) 0%, rgba(67,97,238,0.2) 70%, transparent 100%);
          filter: blur(10px);
          animation: pulse 2s ease-in-out infinite alternate;
        }

        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.2); opacity: 1; }
        }

        /* Message */
        .message {
          font-size: 0.9rem;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          background: linear-gradient(135deg, #a0b4ff, #c77dff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 30px;
          opacity: 0;
        }

        /* Progress bar container */
        .progress-container {
          width: 260px;
          height: 2px;
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 12px;
        }

        .progress-fill {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, #4361ee, #7209b7, #3a0ca3);
          background-size: 200% 100%;
          animation: gradientMove 2s linear infinite;
          border-radius: 4px;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        /* Percentage text */
        .percent {
          font-size: 1rem;
          font-weight: 300;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.1em;
        }

        /* Responsive */
        @media (max-width: 500px) {
          .loader { width: 100px; height: 100px; }
          .progress-container { width: 200px; }
        }
      `}</style>

      {/* Loader rings */}
      <div className="loader" ref={loaderRef}>
        <div className="loader-ring"></div>
        <div className="loader-ring"></div>
        <div className="loader-ring"></div>
        <div className="loader-glow"></div>
      </div>

      {/* Message */}
      <div className="message" ref={messageRef}>INITIALIZING</div>

      {/* Progress bar */}
      <div className="progress-container">
        <div className="progress-fill" ref={progressFillRef} />
      </div>

      {/* Percentage */}
      <div className="percent" ref={percentRef}>0%</div>
    </div>
  )
}

export default Preloader