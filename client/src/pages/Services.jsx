const services = [
  {
    id: 1,
    title: 'Web Design',
    description: 'Beautiful, modern interfaces that captivate users and drive engagement with intuitive design principles.',
    icon: '🎨'
  },
  {
    id: 2,
    title: 'Web Development',
    description: 'Robust, scalable web applications built with cutting-edge technologies and best practices.',
    icon: '⚙️'
  },
  {
    id: 3,
    title: 'E-Commerce Solutions',
    description: 'Complete online store solutions with payment integration, inventory, and analytics.',
    icon: '🛒'
  },
  {
    id: 4,
    title: 'Mobile-First Design',
    description: 'Responsive designs optimized for mobile devices with seamless user experience across all screens.',
    icon: '📱'
  },
  {
    id: 5,
    title: 'SEO Optimization',
    description: 'Strategic optimization to improve visibility and ranking in search engines.',
    icon: '🔍'
  },
  {
    id: 6,
    title: 'Maintenance & Support',
    description: 'Ongoing support and updates to keep your website secure, fast, and running smoothly.',
    icon: '🔧'
  }
]

export default function Services() {
  return (
    <section id="services" className="section section-services">
      <div className="container">
        <div className="section-header">
          <span className="badge-pill">OUR SERVICES</span>
          <h2 className="section-title">What We <span className="gradient-purple">Build</span> For <span className="gradient-mint">You</span></h2>
          <p className="section-subtitle">End-to-end digital solutions crafted with precision, passion, and the latest technology stack.</p>
        </div>

        <div className="grid services-grid">
          {services.slice(0, 6).map(service => (
            <article key={service.id} className="card service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="card-title">{service.title}</h3>
              <p className="card-copy">{service.description}</p>
              <a href="#contact" className="link-link">Learn more →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
