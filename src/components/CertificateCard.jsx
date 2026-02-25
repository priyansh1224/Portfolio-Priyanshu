const CertificateCard = ({ cert, index, viewMode, onPreview }) => {
  return (
    <div
      className="cert-card opacity-0"
      data-category={cert.category}
      style={{ transform: 'translateY(40px)' }}
    >
      <div className="cert-card-inner glass-card relative group">
        <div className="cert-card-glow" />

        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
            loading="lazy"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-dark/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
            <button
              onClick={() => onPreview && onPreview()}
              className="cert-preview-btn flex items-center gap-2 px-7 py-3.5 glass-card rounded-full text-white font-medium transition-all duration-400 hover:bg-accent-1 hover:border-accent-1 hover:shadow-neon"
              style={{ fontSize: '0.88rem' }}
            >
              <i className="fas fa-expand" />
              <span>View</span>
            </button>
          </div>

          {/* Badge */}
          <div
            className={`absolute top-3.5 right-3.5 px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 backdrop-blur-sm z-[2] ${
              cert.badge === 'featured'
                ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 text-yellow-400'
                : 'bg-accent-3/15 border border-accent-3/30 text-accent-3'
            }`}
          >
            <i className={cert.badge === 'featured' ? 'fas fa-award' : 'fas fa-check-circle'} style={{ fontSize: '0.6rem' }} />
            {cert.badge === 'featured' ? 'Featured' : 'Verified'}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-7">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-accent-2 flex-shrink-0 transition-all duration-300 group-hover:scale-110"
              style={{
                background: cert.issuerIconBg || 'rgba(124,58,237,0.1)',
                color: cert.issuerIconColor || '#a78bfa',
                fontSize: '1rem',
              }}
            >
              <i className={cert.issuerIcon} />
            </div>
            <div>
              <span className="font-semibold text-light block" style={{ fontSize: '0.82rem' }}>
                {cert.issuer}
              </span>
              <span className="text-light-muted flex items-center gap-1.5" style={{ fontSize: '0.7rem' }}>
                <i className="far fa-calendar-alt" style={{ fontSize: '0.6rem' }} />
                {cert.date}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3
            className="font-display font-bold mb-2.5 leading-tight transition-colors duration-300 hover:text-accent-2"
            style={{ fontSize: '1.15rem', letterSpacing: '-0.01em', lineHeight: '1.35' }}
          >
            {cert.title}
          </h3>

          {/* Description */}
          <p
            className="text-light-secondary leading-relaxed mb-5 line-clamp-2"
            style={{ fontSize: '0.85rem' }}
          >
            {cert.description}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {cert.skills.map((skill, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: skill.color,
                }}
              >
                <i className={skill.icon} style={{ fontSize: '0.75rem' }} />
                {skill.name}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-5 border-t border-glass-border">
            <a
              href={cert.credentialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-accent-2 font-medium transition-all duration-300 hover:text-accent-1"
              style={{ fontSize: '0.8rem' }}
            >
              <i className="fas fa-external-link-alt" style={{ fontSize: '0.7rem' }} />
              <span className="hidden sm:inline">View Credential</span>
              <span className="sm:hidden">Credential</span>
            </a>
            <a
              href={cert.image}
              download={`${cert.title}.jpeg`}
              className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-light-muted transition-all duration-300 hover:text-accent-1 hover:border-accent-1 hover:bg-accent-1/10"
              title="Download"
              style={{ fontSize: '0.8rem' }}
            >
              <i className="fas fa-download" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CertificateCard