import { useRef, useState } from 'react'
import gsap from 'gsap'

const ContactForm = () => {
  const formRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFocus = (e) => {
    const label = e.target.parentElement.querySelector('label')
    if (label) {
      gsap.to(label, { color: '#7c3aed', y: -2, duration: 0.3 })
    }
  }

  const handleBlur = (e) => {
    const label = e.target.parentElement.querySelector('label')
    if (label) {
      gsap.to(label, { color: '', y: 0, duration: 0.3 })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const inputs = formRef.current.querySelectorAll('[required]')
    let valid = true

    inputs.forEach((inp) => {
      if (!inp.value.trim()) {
        valid = false
        gsap.to(inp, { borderBottomColor: '#ff6b6b', duration: 0.3 })
        gsap.fromTo(
          inp.parentElement,
          { x: -4 },
          { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' }
        )
      } else {
        gsap.to(inp, { borderBottomColor: 'rgba(255,255,255,0.08)', duration: 0.3 })
      }
    })

    if (valid) {
      const btn = formRef.current.querySelector('.submit-button')
      const txt = btn.querySelector('.btn-text')
      const ico = btn.querySelector('.btn-icon')
      const origText = txt.textContent

      gsap.to(btn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          txt.textContent = 'Sent Successfully!'
          ico.innerHTML = '<i class="fas fa-check"></i>'
          btn.style.background = '#06d6a0'
          gsap.fromTo(btn, { scale: 0.95 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' })
        },
      })

      setTimeout(() => {
        txt.textContent = origText
        ico.innerHTML = '<i class="fas fa-paper-plane"></i>'
        btn.style.background = ''
        setFormData({ name: '', email: '', subject: '', message: '' })
        formRef.current.querySelectorAll('.input-line').forEach((line) => {
          gsap.to(line, { width: 0, duration: 0.3 })
        })
      }, 3000)
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="glass-card p-8 md:p-12"
    >
      {/* Row */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="form-group relative mb-6">
          <label
            htmlFor="name"
            className="block uppercase text-light-muted mb-2 font-semibold transition-all duration-300"
            style={{ fontSize: '0.72rem', letterSpacing: '0.12em' }}
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Your name"
            required
            className="w-full py-3.5 bg-transparent border-0 border-b border-white/8 text-light outline-none transition-all duration-400"
            style={{ fontSize: '0.95rem' }}
          />
          <div className="input-line" />
        </div>

        <div className="form-group relative mb-6">
          <label
            htmlFor="email"
            className="block uppercase text-light-muted mb-2 font-semibold transition-all duration-300"
            style={{ fontSize: '0.72rem', letterSpacing: '0.12em' }}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="your@email.com"
            required
            className="w-full py-3.5 bg-transparent border-0 border-b border-white/8 text-light outline-none transition-all duration-400"
            style={{ fontSize: '0.95rem' }}
          />
          <div className="input-line" />
        </div>
      </div>

      <div className="form-group relative mb-6">
        <label
          htmlFor="subject"
          className="block uppercase text-light-muted mb-2 font-semibold transition-all duration-300"
          style={{ fontSize: '0.72rem', letterSpacing: '0.12em' }}
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="What's this about?"
          className="w-full py-3.5 bg-transparent border-0 border-b border-white/8 text-light outline-none transition-all duration-400"
          style={{ fontSize: '0.95rem' }}
        />
        <div className="input-line" />
      </div>

      <div className="form-group relative mb-6">
        <label
          htmlFor="message"
          className="block uppercase text-light-muted mb-2 font-semibold transition-all duration-300"
          style={{ fontSize: '0.72rem', letterSpacing: '0.12em' }}
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          rows="5"
          placeholder="Tell me about your project..."
          required
          className="w-full py-3.5 bg-transparent border-0 border-b border-white/8 text-light outline-none resize-y transition-all duration-400"
          style={{ fontSize: '0.95rem', minHeight: '100px' }}
        />
        <div className="input-line" />
      </div>

      <button
        type="submit"
        className="submit-button magnetic-btn group inline-flex items-center gap-3 py-[18px] px-10 rounded-full text-white font-semibold relative overflow-hidden transition-all duration-400 hover:shadow-neon hover:-translate-y-1"
        style={{
          background: '#7c3aed',
          fontSize: '0.95rem',
        }}
      >
        <span
          className="absolute inset-0 bg-gradient-main opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        />
        <span className="btn-text relative z-[1]">Send Message</span>
        <span className="btn-icon relative z-[1]">
          <i className="fas fa-paper-plane" />
        </span>
      </button>
    </form>
  )
}

export default ContactForm