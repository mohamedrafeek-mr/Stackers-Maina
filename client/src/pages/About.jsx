export default function About() {
  return (
    <section id="about" className="section section-about">
      <div className="container about-container">
        <span className="badge-pill">ABOUT US</span>

        <div className="about-grid">
          <div className="about-copy">
            <h2 className="section-title">We Are <span className="gradient-highlight">Stackers Mania</span></h2>
            <p className="section-text">
              Born from a passion for clean code and bold design, Stackers Mania is a freshly launched web development studio based in Erode, Tamil Nadu. We believe every business — big or small — deserves a world-class digital presence.
            </p>
            <p className="section-text">
              We're a tight-knit team of developers, designers, and digital strategists who stack modern technologies to deliver websites that don't just look great — they perform.
            </p>

            <div className="tech-stack">
              <h4 className="section-subheading">Tech Stack</h4>
              <div className="tech-badges">
                <span className="badge-chip">React Js</span>
                <span className="badge-chip">Django</span>
                <span className="badge-chip">Bootstrap</span>
                <span className="badge-chip">Tailwind</span>
                <span className="badge-chip">Sqlite</span>
                <span className="badge-chip">PostgreSQL</span>
                <span className="badge-chip">Python</span>
                <span className="badge-chip">JavaScript</span>
              </div>
            </div>

            <div className="team-section">
              <h4 className="section-subheading">Our Team</h4>
              <div className="team-grid">
                <article className="team-card">
                  <div className="team-avatar">MR</div>
                  <div>
                    <h5 className="team-name">Mohamed Rafeek M.</h5>
                    <p className="team-role">Founder & Lead Dev</p>
                  </div>
                </article>
                <article className="team-card">
                  <div className="team-avatar team-avatar--alt">SB</div>
                  <div>
                    <h5 className="team-name">Saran B.</h5>
                    <p className="team-role">Business Development</p>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <div className="about-panel">
            <div className="why-card">
              <h3 className="why-title">WHY CHOOSE US</h3>

              <div className="why-feature">
                <span className="why-icon">⚡</span>
                <div>
                  <h4 className="why-name">Lightning Fast Delivery</h4>
                  <p className="why-desc">Most projects live in 7-14 days</p>
                </div>
              </div>

              <div className="why-feature">
                <span className="why-icon">🎨</span>
                <div>
                  <h4 className="why-name">Unique Custom Designs</h4>
                  <p className="why-desc">No templates. 100% bespoke.</p>
                </div>
              </div>

              <div className="why-feature">
                <span className="why-icon">📊</span>
                <div>
                  <h4 className="why-name">Conversion Focused</h4>
                  <p className="why-desc">Designed to turn visitors into clients</p>
                </div>
              </div>

              <div className="why-feature">
                <span className="why-icon">🤝</span>
                <div>
                  <h4 className="why-name">Transparent Process</h4>
                  <p className="why-desc">Weekly updates, no surprises</p>
                </div>
              </div>

              <div className="why-feature">
                <span className="why-icon">💰</span>
                <div>
                  <h4 className="why-name">Competitive Pricing</h4>
                  <p className="why-desc">Premium quality, startup-friendly rates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

