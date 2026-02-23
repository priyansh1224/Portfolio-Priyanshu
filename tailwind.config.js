/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ── Colors ──────────────────────────────────
      colors: {
        dark: {
          DEFAULT: '#050510',
          secondary: '#0a0a1a',
          tertiary: '#111128',
          card: 'rgba(15, 15, 35, 0.6)',
        },
        light: {
          DEFAULT: '#eeeef5',
          secondary: '#9898b8',
          muted: '#5a5a78',
        },
        accent: {
          1: '#7c3aed',
          2: '#a78bfa',
          3: '#06d6a0',
          4: '#f72585',
          5: '#4cc9f0',
        },
        glass: {
          bg: 'rgba(255, 255, 255, 0.02)',
          border: 'rgba(255, 255, 255, 0.06)',
          highlight: 'rgba(255, 255, 255, 0.1)',
        },
      },

      // ── Fonts ───────────────────────────────────
      fontFamily: {
        primary: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },

      // ── Border Radius ──────────────────────────
      borderRadius: {
        'custom-sm': '10px',
        'custom-md': '18px',
        'custom-lg': '26px',
        'custom-xl': '36px',
      },

      // ── Box Shadows ────────────────────────────
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'glass-inner': 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'glass-combined': '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'depth': '0 20px 60px -15px rgba(0, 0, 0, 0.5)',
        'neon': '0 0 15px rgba(124, 58, 237, 0.5), 0 0 45px rgba(124, 58, 237, 0.2)',
        'neon-green': '0 0 20px rgba(6, 214, 160, 0.4)',
        'neon-pink': '0 0 20px rgba(247, 37, 133, 0.4)',
      },

      // ── Gradients ──────────────────────────────
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #7c3aed, #4cc9f0)',
        'gradient-warm': 'linear-gradient(135deg, #f72585, #7c3aed)',
        'gradient-cool': 'linear-gradient(135deg, #06d6a0, #4cc9f0)',
      },

      // ── Animations ─────────────────────────────
      animation: {
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'bounce-down': 'bounceDown 0.6s infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'scroll-wheel': 'scrollWheel 1.8s ease-in-out infinite',
        'marquee': 'marqueeScroll 35s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'grid-pulse': 'gridPulse 8s ease-in-out infinite',
        'aurora-pulse': 'auroraPulse 6s ease-in-out infinite alternate',
        'orb-float-1': 'orbFloat1 12s ease-in-out infinite',
        'orb-float-2': 'orbFloat2 15s ease-in-out infinite',
        'orb-float-3': 'orbFloat3 10s ease-in-out infinite',
        'cube-rotate': 'cubeRotate 4s infinite ease-in-out',
        'orbit-spin': 'orbitSpin 3s linear infinite',
        'noise-shift': 'noiseShift 0.2s steps(3) infinite',
      },

      // ── Keyframes ──────────────────────────────
      keyframes: {
        pulseDot: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(6, 214, 160, 0.5)' },
          '50%': { boxShadow: '0 0 0 10px rgba(6, 214, 160, 0)' },
        },
        bounceDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(3px)' },
        },
        shimmer: {
          '0%': { left: '-100%' },
          '100%': { left: '200%' },
        },
        scrollWheel: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '50%': { opacity: '0.3', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marqueeScroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        gridPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        auroraPulse: {
          '0%': { opacity: '0.5', transform: 'translateY(0)' },
          '100%': { opacity: '1', transform: 'translateY(-20px)' },
        },
        noiseShift: {
          '0%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(-2px, 1px)' },
          '66%': { transform: 'translate(1px, -2px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        orbFloat1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-30px, 20px) scale(1.05)' },
        },
        orbFloat2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(25px, -25px) scale(1.08)' },
        },
        orbFloat3: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(20px, -15px)' },
        },
        cubeRotate: {
          '0%': { transform: 'rotateX(0deg) rotateY(0deg)' },
          '25%': { transform: 'rotateX(90deg) rotateY(90deg)' },
          '50%': { transform: 'rotateX(180deg) rotateY(180deg)' },
          '75%': { transform: 'rotateX(270deg) rotateY(270deg)' },
          '100%': { transform: 'rotateX(360deg) rotateY(360deg)' },
        },
        orbitSpin: {
          from: { transform: 'translate(-50%, -50%) rotateX(70deg) rotateZ(0deg)' },
          to: { transform: 'translate(-50%, -50%) rotateX(70deg) rotateZ(360deg)' },
        },
        glitchOverlay: {
          '0%': { opacity: '0' },
          '20%': { opacity: '0.8', background: 'rgba(124,58,237,0.15)', transform: 'translate(-3px,2px)' },
          '40%': { opacity: '0' },
          '60%': { opacity: '0.5', background: 'rgba(6,214,160,0.1)', transform: 'translate(3px,-1px)' },
          '100%': { opacity: '0', transform: 'translate(0)' },
        },
      },

      // ── Extra Breakpoint ───────────────────────
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
}