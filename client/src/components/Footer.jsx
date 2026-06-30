export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Stackers Mania</h4>
            <p style={styles.description}>
              Creating modern, responsive, and professional digital experiences.
            </p>
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Quick Links</h4>
            <ul style={styles.list}>
              <li><a href="#services" style={styles.link}>Services</a></li>
              <li><a href="#work" style={styles.link}>Portfolio</a></li>
              <li><a href="#about" style={styles.link}>About Us</a></li>
              <li><a href="#contact" style={styles.link}>Contact</a></li>
            </ul>
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Services</h4>
            <ul style={styles.list}>
              <li><a href="#services" style={styles.link}>Web Design</a></li>
              <li><a href="#services" style={styles.link}>Web Development</a></li>
              <li><a href="#services" style={styles.link}>E-Commerce</a></li>
              <li><a href="#services" style={styles.link}>SEO Optimization</a></li>
            </ul>
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Connect</h4>
            <p style={styles.contact}>Email: stackersmania@gmail.com</p>
          </div>
        </div>

        <div style={styles.divider}></div>

        <div style={styles.bottom}>
          <p>&copy; {currentYear} Stackers Mania. All rights reserved.</p>
          <div style={styles.social}>
            <a href="#" style={styles.socialLink}>Twitter</a>
            <a href="#" style={styles.socialLink}>LinkedIn</a>
            <a href="#" style={styles.socialLink}>GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    background: '#0a0e27',
    borderTop: '1px solid rgba(127, 119, 221, 0.2)',
    padding: '4rem 0 2rem',
    marginTop: '6rem'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem'
  },
  section: {
    marginBottom: '1rem'
  },
  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    marginBottom: '1rem',
    color: '#e0e0ff'
  },
  description: {
    color: '#8b8fab',
    fontSize: '0.9rem'
  },
  list: {
    listStyle: 'none',
    padding: 0
  },
  link: {
    color: '#8b8fab',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    fontSize: '0.9rem'
  },
  contact: {
    color: '#8b8fab',
    fontSize: '0.9rem',
    marginBottom: '0.5rem'
  },
  divider: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(127, 119, 221, 0.2), transparent)',
    margin: '2rem 0'
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    color: '#8b8fab',
    fontSize: '0.9rem'
  },
  social: {
    display: 'flex',
    gap: '1.5rem'
  },
  socialLink: {
    color: '#8b8fab',
    textDecoration: 'none',
    transition: 'color 0.3s ease'
  }
}
