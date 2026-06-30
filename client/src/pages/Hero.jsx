import { useState, useEffect } from 'react'

const AnimatedCounter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])

  return <span>{count}</span>
}

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <section id="home" className="hero-section section" style={styles.hero}>
        <div className="container hero-container" style={styles.container}>
          <div className="hero-badge" style={styles.badge}>🚀 Now Open for Projects</div>
          
          <div className="hero-grid" style={styles.heroContent}>
            <div className="hero-copy" style={styles.heroText}>
              <h1 className="hero-title" style={styles.title}>
                We Build<br />
                <span className="gradient-purple" style={styles.gradientPurple}>Websites</span> <span className="gradient-mint" style={styles.gradientMint}>That</span><br />
                Drive Results
              </h1>
              <p className="hero-text" style={styles.subtitle}>
                Stackers Mania crafts high-performance, visually stunning websites for businesses ready to dominate the digital world. From design to deployment — we stack it all.
              </p>
              <div className="hero-buttons" style={styles.buttons}>
                <button type="button" className="btn btn-primary" style={styles.btnPrimary} onClick={() => scrollToSection('contact')}>Get Started Now</button>
                <button type="button" className="btn btn-secondary" style={styles.btnSecondary} onClick={() => scrollToSection('work')}>View Our Work</button>
              </div>
            </div>

            <div className="hero-panel" style={styles.codeEditor}>
              <div className="editor-header" style={styles.editorHeader}>
                <span className="editor-dot editor-dot--red"></span>
                <span className="editor-dot editor-dot--yellow"></span>
                <span className="editor-dot editor-dot--green"></span>
                <span className="editor-title" style={styles.editorTitle}>App.jsx</span>
              </div>
              <div className="editor-content" style={styles.editorContent}>
                <div className="code-line" style={styles.codeLine}><span className="syntax-keyword">const</span> <span className="syntax-variable">Website</span> = () =&gt; {'{'}</div>
                <div className="code-line code-indent-2" style={styles.codeLine}><span className="syntax-keyword">return</span> (</div>
                <div className="code-line code-indent-3" style={styles.codeLine}>&lt;<span className="syntax-tag">div</span> <span className="syntax-attr">className</span>=<span className="syntax-string">"hero"</span>&gt;</div>
                <div className="code-line code-indent-4" style={styles.codeLine}>&lt;<span className="syntax-tag">h1</span>&gt;Your Dream Site&lt;/<span className="syntax-tag">h1</span>&gt;</div>
                <div className="code-line code-indent-4" style={styles.codeLine}>&lt;<span className="syntax-tag">Button</span>&gt;Launch 🚀&lt;/<span className="syntax-tag">Button</span>&gt;</div>
                <div className="code-line code-indent-3" style={styles.codeLine}>&lt;/<span className="syntax-tag">div</span>&gt;</div>
                <div className="code-line code-indent-2" style={styles.codeLine}>)</div>
                <div className="code-line" style={styles.codeLine}>{'}'}</div>
              </div>
              <div className="editor-footer" style={styles.editorFooter}>✓ Compiled successfully in 0.8s</div>
            </div>
          </div>
        </div>
        <div style={styles.background}></div>
      </section>

      <section id="stats" className="stats-section section" style={styles.statsSection}>
        <div className="grid stats-grid" style={styles.statsContainer}>
          <div className="stat-card" style={styles.statCard}>
            <div className="stat-number" style={styles.statBigNumber}><AnimatedCounter target={1} /></div>
            <p className="stat-label" style={styles.statLabel}>Projects Delivered</p>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statBigNumber}><AnimatedCounter target={1} /></div>
            <p style={styles.statLabel}>Happy Clients</p>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statBigNumber}><AnimatedCounter target={1} /></div>
            <p style={styles.statLabel}>Years Experience</p>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statBigNumber}><AnimatedCounter target={100} />%</div>
            <p style={styles.statLabel}>Client Satisfaction</p>
          </div>
        </div>
      </section>
    </>
  )
}

const styles = {
  hero: {
    position: 'relative',
    minHeight: 'auto',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    overflow: 'visible',
    marginTop: '60px',
    padding: '4rem 0 2rem'
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 1rem',
    zIndex: 10,
    position: 'relative',
    width: '100%'
  },
  badge: {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    background: 'rgba(45, 219, 160, 0.1)',
    border: '1px solid rgba(45, 219, 160, 0.3)',
    borderRadius: '50px',
    fontSize: '0.9rem',
    color: '#2DDBA0',
    marginBottom: '2rem',
    animation: 'fadeInUp 0.8s ease 0.2s backwards'
  },
  heroContent: {
    display: 'grid',
    gap: '2rem',
    alignItems: 'center'
  },
  heroText: {
    zIndex: 10
  },
  title: {
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: '1.5rem',
    animation: 'fadeInUp 0.8s ease 0.2s backwards'
  },
  gradientPurple: {
    background: 'linear-gradient(135deg, #A79AF5, #7F77DD)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  gradientMint: {
    background: 'linear-gradient(135deg, #2DDBA0, #1D9E75)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  subtitle: {
    fontSize: '1.05rem',
    color: '#8b8fab',
    maxWidth: '100%',
    marginBottom: '2rem',
    animation: 'fadeInUp 0.8s ease 0.4s backwards',
    lineHeight: 1.7
  },
  buttons: {
    display: 'flex',
    gap: '1rem',
    animation: 'fadeInUp 0.8s ease 0.6s backwards',
    flexWrap: 'wrap'
  },
  btnPrimary: {
    padding: '0.9rem 1.6rem',
    background: 'linear-gradient(135deg, #7F77DD, #A79AF5)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 20px rgba(127, 119, 221, 0.3)'
  },
  btnSecondary: {
    padding: '0.9rem 1.6rem',
    background: 'transparent',
    color: '#2DDBA0',
    border: '2px solid #2DDBA0',
    borderRadius: '50px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  codeEditor: {
    background: 'rgba(10, 14, 39, 0.8)',
    border: '1px solid rgba(127, 119, 221, 0.2)',
    borderRadius: '12px',
    overflow: 'visible',
    backdropFilter: 'blur(10px)',
    animation: 'fadeInUp 0.8s ease 0.4s backwards'
  },
  editorHeader: {
    background: 'rgba(15, 20, 50, 0.8)',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    borderBottom: '1px solid rgba(127, 119, 221, 0.1)'
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    marginRight: '0.25rem'
  },
  editorTitle: {
    marginLeft: 'auto',
    fontSize: '0.9rem',
    color: '#888',
    fontFamily: 'monospace'
  },
  editorContent: {
    padding: '1.5rem',
    fontFamily: 'monospace',
    fontSize: '0.9rem',
    color: '#b4bcd0'
  },
  codeLine: {
    marginBottom: '0.5rem',
    lineHeight: 1.5
  },
  keyword: {
    color: '#c678dd'
  },
  variable: {
    color: '#2DDBA0'
  },
  tag: {
    color: '#2DDBA0'
  },
  attr: {
    color: '#e0e0ff'
  },
  string: {
    color: '#98c379'
  },
  editorFooter: {
    background: 'rgba(15, 20, 50, 0.8)',
    padding: '0.75rem 1.5rem',
    borderTop: '1px solid rgba(127, 119, 221, 0.1)',
    color: '#2DDBA0',
    fontSize: '0.85rem',
    fontFamily: 'monospace'
  },
  statsSection: {
    padding: '4rem 0',
    background: 'linear-gradient(180deg, rgba(127, 119, 221, 0.05), transparent)',
    borderTop: '1px solid rgba(127, 119, 221, 0.1)'
  },
  statsContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '2rem'
  },
  statCard: {
    textAlign: 'center',
    padding: '2rem',
    background: 'linear-gradient(135deg, rgba(127, 119, 221, 0.05), rgba(29, 158, 117, 0.05))',
    border: '1px solid rgba(127, 119, 221, 0.1)',
    borderRadius: '16px',
    transition: 'all 0.3s ease'
  },
  statBigNumber: {
    fontSize: '2.5rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #7F77DD, #2DDBA0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '0.5rem'
  },
  statLabel: {
    color: '#8b8fab',
    fontSize: '1rem'
  },
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 'min(45vw, 320px)',
    height: 'min(45vw, 320px)',
    background: 'radial-gradient(circle, rgba(127, 119, 221, 0.2), transparent)',
    borderRadius: '50%',
    filter: 'blur(40px)',
    zIndex: 0
  }
}
