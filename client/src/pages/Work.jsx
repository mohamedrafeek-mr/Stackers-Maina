const portfolio = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'Full-stack e-commerce solution with advanced features',
    image: '🛍️'
  },
  {
    id: 2,
    title: 'SaaS Dashboard',
    category: 'Web Application',
    description: 'Real-time analytics dashboard for business intelligence',
    image: '📊'
  },
  {
    id: 3,
    title: 'Brand Redesign',
    category: 'Web Design',
    description: 'Complete digital presence overhaul and rebranding',
    image: '🎨'
  },
  {
    id: 4,
    title: 'Mobile App',
    category: 'Mobile Development',
    description: 'Cross-platform mobile application with native performance',
    image: '📱'
  },
  {
    id: 5,
    title: 'Marketing Website',
    category: 'Web Design',
    description: 'High-converting marketing website with lead generation',
    image: '🚀'
  },
  {
    id: 6,
    title: 'CMS Solution',
    category: 'Web Development',
    description: 'Custom content management system for enterprise',
    image: '⚙️'
  }
]

export default function Work() {
  return (
    <section id="work" className="section section-work">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Work</h2>
          <p className="section-subtitle">Showcase of our latest projects and success stories</p>
        </div>

        <div className="grid portfolio-grid">
          {portfolio.map(project => (
            <article key={project.id} className="card portfolio-card">
              <div className="portfolio-image">
                <span>{project.image}</span>
              </div>
              <div className="portfolio-content">
                <span className="portfolio-category">{project.category}</span>
                <h3 className="card-title">{project.title}</h3>
                <p className="card-copy">{project.description}</p>
                <a href="#contact" className="link-link">View Project →</a>
              </div>
            </article>
          ))}
        </div>

        <div className="section-cta">
          <p className="cta-title">Want to see more of our work?</p>
          <button className="btn btn-primary">View Full Portfolio</button>
        </div>
      </div>
    </section>
  )
}
