import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const Footer = ({ currentYear }) => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  const navLinks = [
    { label: 'Home', href: isHome ? '#hero' : '/', isRoute: !isHome },
    { label: 'About', href: isHome ? '#about' : '/#about', isRoute: !isHome },
    { label: 'Skills', href: isHome ? '#skills' : '/#skills', isRoute: !isHome },
    { label: 'Work', href: isHome ? '#projects' : '/#projects', isRoute: !isHome },
    { label: 'Certificates', href: '/certificates', isRoute: true },
    { label: 'Contact', href: isHome ? '#contact' : '/#contact', isRoute: !isHome },
  ]

  const socialLinks = [
    { href: 'https://github.com/priyansh1224', icon: 'fab fa-github' },
    { href: 'https://www.linkedin.com/in/priyanshu-oli-13a913290', icon: 'fab fa-linkedin-in' },
    { href: 'https://twitter.com/priyansh1224', icon: 'fab fa-twitter' },
    { href: 'https://instagram.com/priyansh1224', icon: 'fab fa-instagram' },
  ]

  const handleNavClick = (e, link) => {
    if (link.isRoute) return
    e.preventDefault()
    gsap.to(window, {
      scrollTo: { y: link.href, offsetY: 80 },
      duration: 1,
      ease: 'power3.inOut',
    })
  }

  const handleLogoClick = (e) => {
    if (isHome) {
      e.preventDefault()
      gsap.to(window, { scrollTo: 0, duration: 1, ease: 'power3.inOut' })
    }
  }

  return (
    <footer id="footer" className="relative">
      {/* Footer Top CTA - Only on Home Page */}
      {isHome && (
        <div className="pt-28 pb-[70px] border-t border-glass-border">
          <div className="container-custom">
            <div className="footer-cta text-center">
              <h2
                className="font-display font-bold mb-8 leading-tight"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)' }}
              >
                Ready to bring your
                <br />
                <span className="text-gradient">ideas to life?</span>
              </h2>
              <a
                href="mailto:priyanshuoli30@gmail.com"
                className="magnetic-btn group inline-flex items-center gap-3.5 text-accent-2 font-medium transition-all duration-400 border-b border-accent-2/30 pb-1.5 hover:text-accent-1 hover:border-accent-1"
                style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}
              >
                priyanshuoli30@gmail.com
                <i className="fas fa-arrow-right transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer Bottom */}
      <div className="py-[30px] border-t border-glass-border">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center flex-wrap gap-6">
          {/* Left */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
            <Link
              to="/"
              className="font-mono text-xl font-bold text-light"
              onClick={handleLogoClick}
            >
              <span className="text-accent-1">&lt;</span>
              PO
              <span className="text-accent-1">/&gt;</span>
            </Link>
            <p className="text-light-muted text-sm">
              © {currentYear} Priyanshu Oli. Crafted with passion.
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-wrap justify-center gap-8">
            {navLinks.map((link, i) =>
              link.isRoute ? (
                <Link
                  key={i}
                  to={link.href}
                  className="text-light-muted text-sm transition-all duration-300 relative hover:text-light group"
                >
                  {link.label}
                  <span className="absolute -bottom-[3px] left-0 w-0 h-px bg-accent-1 transition-all duration-300 group-hover:w-full" />
                </Link>
              ) : (
                <a
                  key={i}
                  href={link.href}
                  className="text-light-muted text-sm transition-all duration-300 relative hover:text-light group"
                  onClick={(e) => handleNavClick(e, link)}
                >
                  {link.label}
                  <span className="absolute -bottom-[3px] left-0 w-0 h-px bg-accent-1 transition-all duration-300 group-hover:w-full" />
                </a>
              )
            )}
          </div>

          {/* Social */}
          <div className="flex gap-5">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-muted text-base transition-all duration-300 hover:text-accent-1 hover:-translate-y-[3px]"
              >
                <i className={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer