import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Skills = () => {
  const sectionRef = useRef(null)
  const globeRef = useRef(null)
  const rendererRef = useRef(null)
  const frameRef = useRef(null)
  const [activeTab, setActiveTab] = useState('all')
  const [hasAnimated, setHasAnimated] = useState(false)
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const skills = [
    { name: 'HTML5', icon: 'fab fa-html5', color: '#E44D26', percent: 90, category: 'frontend' },
    { name: 'CSS3', icon: 'fab fa-css3-alt', color: '#264de4', percent: 85, category: 'frontend' },
    { name: 'JavaScript', icon: 'fab fa-js-square', color: '#F7DF1E', percent: 80, category: 'frontend' },
    { name: 'React', icon: 'fab fa-react', color: '#61DAFB', percent: 75, category: 'frontend' },
    { name: 'Tailwind', icon: 'fas fa-wind', color: '#38BDF8', percent: 80, category: 'frontend' },
    { name: 'Bootstrap', icon: 'fab fa-bootstrap', color: '#7952B3', percent: 78, category: 'frontend' },
    { name: 'Node.js', icon: 'fab fa-node-js', color: '#68A063', percent: 65, category: 'backend' },
    { name: 'Express', icon: 'fas fa-server', color: '#aaaaaa', percent: 60, category: 'backend' },
    { name: 'MongoDB', icon: 'fas fa-database', color: '#4DB33D', percent: 60, category: 'backend' },
    { name: 'SQL', icon: 'fas fa-table', color: '#336791', percent: 55, category: 'backend' },
    { name: 'Git', icon: 'fab fa-git-alt', color: '#F05032', percent: 75, category: 'tools' },
    { name: 'Python', icon: 'fab fa-python', color: '#FFD43B', percent: 70, category: 'tools' },
    { name: 'TypeScript', icon: 'fas fa-code', color: '#3178C6', percent: 55, category: 'tools' },
    { name: 'C++', icon: 'fas fa-cogs', color: '#00599C', percent: 65, category: 'tools' },
    { name: 'DSA', icon: 'fas fa-brain', color: '#e040fb', percent: 65, category: 'tools' },
    { name: 'Prompt Eng', icon: 'fas fa-robot', color: '#00BFA5', percent: 70, category: 'tools' },
  ]

  // ─── THREE.JS GLOBE WITH ICONS ───
  useEffect(() => {
    // Skip 3D globe on mobile for better performance
    if (window.innerWidth <= 768) return
    
    const container = globeRef.current
    if (!container) return

    // Clear previous
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }

    const width = container.offsetWidth
    const height = container.offsetHeight

    // Scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
    camera.position.z = 5.5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create CSS overlay for icons
    const iconOverlay = document.createElement('div')
    iconOverlay.className = 'globe-icon-overlay'
    iconOverlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      overflow: hidden;
    `
    container.appendChild(iconOverlay)

    // Globe wireframe sphere
    const globeGeo = new THREE.SphereGeometry(2, 48, 48)
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    })
    const globe = new THREE.Mesh(globeGeo, globeMat)
    scene.add(globe)

    // Inner glow sphere
    const innerGlowGeo = new THREE.SphereGeometry(1.95, 32, 32)
    const innerGlowMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.02,
      side: THREE.BackSide,
    })
    const innerGlow = new THREE.Mesh(innerGlowGeo, innerGlowMat)
    scene.add(innerGlow)

    // Latitude rings
    const ringCount = 5
    for (let i = 1; i < ringCount; i++) {
      const angle = (Math.PI / ringCount) * i
      const radius = 2 * Math.sin(angle)
      const y = 2 * Math.cos(angle)
      const ringGeo = new THREE.RingGeometry(radius - 0.003, radius + 0.003, 64)
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x7c3aed,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
      })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.position.y = y
      ring.rotation.x = Math.PI / 2
      globe.add(ring)
    }

    // Skill node positions on globe surface
    const skillNodes = []
    const iconElements = []
    const radius = 2.05

    skills.forEach((skill, i) => {
      // Fibonacci sphere distribution
      const phi = Math.acos(1 - (2 * (i + 0.5)) / skills.length)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i

      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.cos(phi)
      const z = radius * Math.sin(phi) * Math.sin(theta)

      // 3D dot at position
      const dotGeo = new THREE.SphereGeometry(0.04, 8, 8)
      const dotMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(skill.color),
      })
      const dot = new THREE.Mesh(dotGeo, dotMat)
      dot.position.set(x, y, z)
      globe.add(dot)

      // Connection line from center to dot
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, y, z),
      ])
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(skill.color),
        transparent: true,
        opacity: 0.06,
      })
      const line = new THREE.Line(lineGeo, lineMat)
      globe.add(line)

      // Create HTML icon element
      const iconEl = document.createElement('div')
      iconEl.className = 'globe-skill-icon'
      iconEl.innerHTML = `
        <div class="globe-icon-inner" style="--skill-color: ${skill.color}">
          <i class="${skill.icon}"></i>
          <span class="globe-icon-label">${skill.name}</span>
        </div>
      `
      iconOverlay.appendChild(iconEl)
      iconElements.push(iconEl)

      skillNodes.push({
        position: new THREE.Vector3(x, y, z),
        dot,
        skill,
        iconEl,
      })
    })

    // Mouse interaction
    let isDragging = false
    let previousMouse = { x: 0, y: 0 }
    let rotationVelocity = { x: 0.002, y: 0.004 }
    let targetRotation = { x: 0, y: 0 }

    const onMouseDown = (e) => {
      isDragging = true
      previousMouse = { x: e.clientX, y: e.clientY }
      container.style.cursor = 'grabbing'
    }

    const onMouseMove = (e) => {
      if (!isDragging) return
      const deltaX = e.clientX - previousMouse.x
      const deltaY = e.clientY - previousMouse.y
      rotationVelocity.y = deltaX * 0.008
      rotationVelocity.x = deltaY * 0.008
      previousMouse = { x: e.clientX, y: e.clientY }
    }

    const onMouseUp = () => {
      isDragging = false
      container.style.cursor = 'grab'
    }

    const onTouchStart = (e) => {
      isDragging = true
      previousMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }

    const onTouchMove = (e) => {
      if (!isDragging) return
      const deltaX = e.touches[0].clientX - previousMouse.x
      const deltaY = e.touches[0].clientY - previousMouse.y
      rotationVelocity.y = deltaX * 0.008
      rotationVelocity.x = deltaY * 0.008
      previousMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }

    const onTouchEnd = () => {
      isDragging = false
    }

    container.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    container.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)
    container.style.cursor = 'grab'

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      // Apply rotation with damping
      if (!isDragging) {
        rotationVelocity.x *= 0.98
        rotationVelocity.y *= 0.98

        // Minimum auto-rotation
        if (Math.abs(rotationVelocity.x) < 0.001) rotationVelocity.x = 0.001
        if (Math.abs(rotationVelocity.y) < 0.002) rotationVelocity.y = 0.002
      }

      globe.rotation.x += rotationVelocity.x
      globe.rotation.y += rotationVelocity.y

      // Update icon positions (project 3D → 2D)
      skillNodes.forEach((node) => {
        const worldPos = node.position.clone()
        worldPos.applyMatrix4(globe.matrixWorld)

        // Project to screen
        const projected = worldPos.clone().project(camera)
        const screenX = (projected.x * 0.5 + 0.5) * width
        const screenY = (-projected.y * 0.5 + 0.5) * height

        // Check if point is facing camera (z-depth)
        const cameraDir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion)
        const pointDir = worldPos.clone().sub(camera.position).normalize()
        const dotProduct = cameraDir.dot(pointDir)

        // Check if on front face of globe
        const globeCenter = new THREE.Vector3(0, 0, 0).applyMatrix4(globe.matrixWorld)
        const toPoint = worldPos.clone().sub(globeCenter).normalize()
        const toCamera = camera.position.clone().sub(globeCenter).normalize()
        const facing = toPoint.dot(toCamera)

        const isFront = facing > 0.1
        const scale = isFront ? 0.6 + facing * 0.5 : 0
        const opacity = isFront ? 0.4 + facing * 0.6 : 0

        node.iconEl.style.transform = `translate(${screenX}px, ${screenY}px) translate(-50%, -50%) scale(${scale})`
        node.iconEl.style.opacity = opacity
        node.iconEl.style.zIndex = isFront ? Math.round(facing * 100) : 0

        // Glow the dot based on facing
        if (isFront) {
          node.dot.material.opacity = 1
          node.dot.scale.setScalar(1 + facing * 0.5)
        } else {
          node.dot.material.opacity = 0.2
          node.dot.scale.setScalar(0.5)
        }
      })

      renderer.render(scene, camera)
    }

    animate()

    // Resize handler
    const handleResize = () => {
      const w = container.offsetWidth
      const h = container.offsetHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(frameRef.current)
      renderer.dispose()
      container.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      container.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('resize', handleResize)
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [])

  // ─── SCROLL ANIMATIONS ───
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(
        '.skills-section .section-number, .skills-section .title-reveal, .skills-section .section-line',
        {
          opacity: 0,
          y: 35,
          duration: 0.8,
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.skills-section',
            start: 'top 82%',
          },
        }
      )

      gsap.utils.toArray('.skill-card').forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 55,
          scale: 0.88,
          duration: 0.6,
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
          },
        })
      })

      ScrollTrigger.create({
        trigger: '#skills',
        start: 'top 55%',
        onEnter: () => {
          setHasAnimated(true)
          animateMeters()
        },
        once: true,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const animateMeters = () => {
    setTimeout(() => {
      const meters = document.querySelectorAll('.meter-fill-bar')
      meters.forEach((meter, i) => {
        const targetWidth = meter.getAttribute('data-width')
        gsap.fromTo(
          meter,
          { width: '0%' },
          {
            width: targetWidth + '%',
            duration: 1.4,
            ease: 'power2.out',
            delay: i * 0.05,
          }
        )
      })
    }, 50)
  }

  useEffect(() => {
    if (hasAnimated) {
      animateMeters()
    }
  }, [activeTab, hasAnimated])

  const filteredSkills =
    activeTab === 'all' ? skills : skills.filter((s) => s.category === activeTab)

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="skills-section py-[140px] bg-dark-secondary relative overflow-hidden"
    >
      <style>{`
        /* ===========================
           GLOBE ICON OVERLAY
        =========================== */
        .globe-container {
          position: relative;
          width: 100%;
          height: 500px;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.06);
          background: radial-gradient(
            ellipse at center,
            rgba(124, 58, 237, 0.05) 0%,
            rgba(0, 0, 0, 0.3) 70%
          );
        }

        .globe-container canvas {
          display: block;
        }

        .globe-skill-icon {
          position: absolute;
          top: 0;
          left: 0;
          pointer-events: none;
          transition: opacity 0.15s ease;
          will-change: transform, opacity;
        }

        .globe-icon-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding: 6px 8px;
          border-radius: 10px;
          background: rgba(10, 10, 20, 0.7);
          backdrop-filter: blur(8px);
          border: 1px solid color-mix(in srgb, var(--skill-color) 25%, transparent);
          box-shadow: 
            0 0 12px color-mix(in srgb, var(--skill-color) 15%, transparent),
            inset 0 0 8px color-mix(in srgb, var(--skill-color) 5%, transparent);
          transition: all 0.3s ease;
        }

        .globe-icon-inner i {
          font-size: 0.95rem;
          color: var(--skill-color);
          filter: drop-shadow(0 0 4px color-mix(in srgb, var(--skill-color) 40%, transparent));
        }

        .globe-icon-label {
          font-size: 8px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
          letter-spacing: 0.03em;
          white-space: nowrap;
          text-transform: uppercase;
        }

        /* Globe glow effect at bottom */
        .globe-container::after {
          content: '';
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 40px;
          background: radial-gradient(
            ellipse,
            rgba(124, 58, 237, 0.15) 0%,
            transparent 70%
          );
          filter: blur(15px);
          pointer-events: none;
        }

        .globe-info {
          text-align: center;
          margin-top: 16px;
        }

        .globe-info-title {
          font-weight: 600;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 4px;
        }

        .globe-info-sub {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.3);
          font-family: 'JetBrains Mono', monospace;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .globe-info-sub .drag-icon {
          display: inline-flex;
          width: 18px;
          height: 18px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          align-items: center;
          justify-content: center;
          font-size: 8px;
          color: rgba(255, 255, 255, 0.4);
          animation: dragHint 3s ease-in-out infinite;
        }

        @keyframes dragHint {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }

        /* Globe legend dots */
        .globe-legend {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-top: 12px;
          flex-wrap: wrap;
        }

        .globe-legend-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.35);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .globe-legend-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        /* ===========================
           SKILL ICON WRAPPER
        =========================== */
        .skill-icon-wrapper {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .skill-icon-wrapper::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: transparent;
          transition: all 0.4s ease;
          opacity: 0;
        }

        .skill-icon-wrapper::after {
          content: '';
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          background: transparent;
          transition: all 0.4s ease;
          opacity: 0;
          filter: blur(10px);
        }

        .skill-icon-wrapper i {
          font-size: 1.15rem;
          color: var(--icon-color);
          transition: all 0.4s ease;
          position: relative;
          z-index: 2;
        }

        .skill-card:hover .skill-icon-wrapper {
          background: color-mix(in srgb, var(--icon-color) 15%, transparent);
          border-color: color-mix(in srgb, var(--icon-color) 35%, transparent);
          box-shadow:
            0 0 20px color-mix(in srgb, var(--icon-color) 25%, transparent),
            0 0 40px color-mix(in srgb, var(--icon-color) 10%, transparent);
          transform: scale(1.12);
        }

        .skill-card:hover .skill-icon-wrapper::before {
          opacity: 1;
          background: radial-gradient(
            circle,
            color-mix(in srgb, var(--icon-color) 25%, transparent) 0%,
            transparent 70%
          );
          animation: iconGlow 2s ease-in-out infinite;
        }

        .skill-card:hover .skill-icon-wrapper::after {
          opacity: 0.5;
          background: radial-gradient(
            circle,
            var(--icon-color) 0%,
            transparent 70%
          );
          animation: iconGlowOuter 2s ease-in-out infinite 0.3s;
        }

        .skill-card:hover .skill-icon-wrapper i {
          color: #fff;
          text-shadow:
            0 0 8px var(--icon-color),
            0 0 16px var(--icon-color),
            0 0 32px color-mix(in srgb, var(--icon-color) 50%, transparent);
        }

        @keyframes iconGlow {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 0.4; }
        }

        @keyframes iconGlowOuter {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.35); opacity: 0.15; }
        }

        /* ===========================
           METER BAR
        =========================== */
        .meter-track {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 999px;
          overflow: hidden;
          position: relative;
        }

        .meter-fill-bar {
          height: 100%;
          width: 0%;
          border-radius: 999px;
          position: relative;
          background: linear-gradient(
            90deg,
            var(--meter-color),
            color-mix(in srgb, var(--meter-color) 70%, #fff)
          );
          box-shadow: 0 0 8px color-mix(in srgb, var(--meter-color) 40%, transparent);
          transition: box-shadow 0.3s ease;
        }

        .meter-fill-bar::after {
          content: '';
          position: absolute;
          right: -3px;
          top: 50%;
          transform: translateY(-50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--meter-color);
          box-shadow: 0 0 6px var(--meter-color);
          opacity: 0.9;
        }

        .meter-fill-bar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.2) 50%,
            transparent 100%
          );
          animation: meterShine 2.5s ease-in-out infinite;
          border-radius: 999px;
        }

        @keyframes meterShine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        .skill-card:hover .meter-fill-bar {
          box-shadow:
            0 0 12px color-mix(in srgb, var(--meter-color) 60%, transparent),
            0 0 24px color-mix(in srgb, var(--meter-color) 25%, transparent);
        }

        .skill-card:hover .meter-fill-bar::after {
          box-shadow:
            0 0 10px var(--meter-color),
            0 0 20px color-mix(in srgb, var(--meter-color) 50%, transparent);
          animation: meterDotPulse 1.5s ease-in-out infinite;
        }

        @keyframes meterDotPulse {
          0%, 100% { transform: translateY(-50%) scale(1); }
          50% { transform: translateY(-50%) scale(1.5); }
        }

        /* ===========================
           CARD STYLES
        =========================== */
        .skill-card .glass-card {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border: 1px solid rgba(255, 255, 255, 0.06);
          position: relative;
          overflow: hidden;
        }

        .skill-card .glass-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.02),
            transparent
          );
          transition: left 0.6s ease;
        }

        .skill-card:hover .glass-card::before {
          left: 100%;
        }

        .skill-card:hover .glass-card {
          border-color: color-mix(in srgb, var(--card-color) 25%, transparent);
          background: linear-gradient(
            135deg,
            color-mix(in srgb, var(--card-color) 6%, transparent) 0%,
            rgba(255, 255, 255, 0.02) 100%
          );
          transform: translateY(-4px);
        }

        /* ===========================
           METER INFO
        =========================== */
        .meter-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .meter-label {
          font-size: 9px;
          color: rgba(255, 255, 255, 0.2);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 500;
        }

        .meter-percent {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.35);
          transition: all 0.3s ease;
          font-variant-numeric: tabular-nums;
        }

        .skill-card:hover .meter-percent {
          color: var(--meter-color);
          text-shadow: 0 0 8px color-mix(in srgb, var(--meter-color) 30%, transparent);
        }

        /* ===========================
           TAB BUTTONS
        =========================== */
        .skill-tab {
          position: relative;
          overflow: hidden;
        }

        .skill-tab::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: currentColor;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .skill-tab:hover::before {
          width: 60%;
        }

        .skill-tab.active::before {
          width: 80%;
        }

        /* ===========================
           CURRENTLY LEARNING PILLS
        =========================== */
        .learning-pill {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .learning-pill::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.05),
            transparent
          );
          transition: left 0.5s ease;
        }

        .learning-pill:hover::before {
          left: 100%;
        }

        .learning-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        /* ===========================
           RESPONSIVE
        =========================== */
        @media (max-width: 1024px) {
          .globe-container {
            height: 400px;
          }
        }

        @media (max-width: 768px) {
          .globe-container {
            height: 350px;
          }

          .globe-icon-inner {
            padding: 4px 6px;
          }

          .globe-icon-inner i {
            font-size: 0.8rem;
          }

          .globe-icon-label {
            font-size: 7px;
          }
        }
      `}</style>

      <div className="container-custom">
        {/* Section Header */}
        <div className="section-header mb-20">
          <span className="section-number">03</span>
          <h2 className="section-title">
            <span className="title-reveal inline-block">Tech Stack</span>
          </h2>
          <div className="section-line" />
        </div>

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          {/* 3D Globe */}
          <div className="sticky top-[120px]">
            <div ref={globeRef} className="globe-container" />

            <div className="globe-info">
              <div className="globe-info-title">Skills Universe</div>
              <div className="globe-info-sub">
                <span className="drag-icon">
                  <i className="fas fa-arrows-alt" />
                </span>
                Drag to explore
              </div>
            </div>

            <div className="globe-legend">
              <div className="globe-legend-item">
                <div
                  className="globe-legend-dot"
                  style={{ background: '#E44D26' }}
                />
                Frontend
              </div>
              <div className="globe-legend-item">
                <div
                  className="globe-legend-dot"
                  style={{ background: '#68A063' }}
                />
                Backend
              </div>
              <div className="globe-legend-item">
                <div
                  className="globe-legend-dot"
                  style={{ background: '#F05032' }}
                />
                Tools
              </div>
            </div>
          </div>

          {/* Skill Cards */}
          <div>
            {/* Tabs */}
            <div className="flex gap-3 mb-8 flex-wrap">
              {['all', 'frontend', 'backend', 'tools'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`skill-tab px-5 py-2 rounded-full border text-sm transition-all ${
                    activeTab === cat
                      ? 'active bg-accent-1 text-white border-accent-1 shadow-neon'
                      : 'border-glass-border text-light-muted hover:text-white'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-card"
                  style={{ '--card-color': skill.color }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="glass-card p-5 text-center hover:shadow-depth">
                    {/* Icon */}
                    <div
                      className="skill-icon-wrapper mx-auto mb-3"
                      style={{ '--icon-color': skill.color }}
                    >
                      <i className={skill.icon} />
                    </div>

                    {/* Name */}
                    <h4 className="font-display font-semibold text-sm mb-3">
                      {skill.name}
                    </h4>

                    {/* Meter Info */}
                    <div className="meter-info">
                      <span className="meter-label">Proficiency</span>
                      <span
                        className="meter-percent"
                        style={{ '--meter-color': skill.color }}
                      >
                        {skill.percent}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="meter-track">
                      <div
                        className="meter-fill-bar"
                        data-width={skill.percent}
                        style={{
                          '--meter-color': skill.color,
                          width: hasAnimated ? `${skill.percent}%` : '0%',
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Currently Learning */}
            <div className="mt-14 glass-card p-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="w-2.5 h-2.5 bg-accent-3 rounded-full animate-pulse-dot" />
                <h3 className="font-display text-xl font-bold">
                  Currently Learning
                </h3>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <span className="learning-pill px-5 py-2.5 rounded-full border border-accent-4/20 bg-accent-4/10 text-sm">
                  Advanced React
                </span>
                <span className="learning-pill px-5 py-2.5 rounded-full border border-white/20 bg-white/5 text-sm">
                  Next.js
                </span>
                <span className="learning-pill px-5 py-2.5 rounded-full border border-accent-3/20 bg-accent-3/10 text-sm">
                  API Development
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills