import { useState } from 'react'

const getApiUrl = (path) => {
  const baseUrl = (import.meta.env.VITE_API_URL || 'https://stackers-maina.onrender.com').trim().replace(/\/$/, '')
  return baseUrl ? `${baseUrl}${path}` : path
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch(getApiUrl('/api/contact'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          name: '',
          email: '',
          company: '',
          service: '',
          message: ''
        })
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" style={styles.section}>
      <div style={styles.container} className="contact-container">
        <div style={styles.content} className="contact-content">
          <div style={styles.leftColumn} className="contact-left">
            <div style={styles.infoBox}>
              <h3 style={styles.infoBoxTitle}>Location</h3>
              <p style={styles.infoBoxText}>Erode, Tamil Nadu, India</p>
              <div style={styles.iconBox}>📍</div>
            </div>

            <div style={styles.infoBox}>
              <h3 style={styles.infoBoxTitle}>Email</h3>
              <p style={styles.infoBoxText}>stackersmania@gmail.com</p>
              <div style={styles.iconBox}>📧</div>
            </div>

            <div style={styles.infoBox}>
              <h3 style={styles.infoBoxTitle}>Working Hours</h3>
              <p style={styles.infoBoxText}>Mon-Sat, 9 AM – 7 PM IST</p>
              <div style={styles.iconBox}>🕐</div>
            </div>

            <div style={styles.socialBox}>
              <a href="#" style={styles.socialIconLink}>in</a>
              <a href="#" style={styles.socialIconLink}>ig</a>
              <a href="#" style={styles.socialIconLink}>tw</a>
            </div>
          </div>

          <div style={styles.rightColumn} className="contact-right">
            {submitted ? (
              <div style={styles.successMessage}>
                <h3>Thank you! 🎉</h3>
                <p>We've received your message and will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={styles.formContent}>
                <div style={styles.formGroup}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={styles.input}
                    placeholder="Your Name"
                  />
                </div>

                <div style={styles.formGroup}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={styles.input}
                    placeholder="Email Address"
                  />
                </div>

                <div style={styles.formGroup}>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Subject (e.g. New Website)"
                  />
                </div>

                <div style={styles.formGroup}>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    style={styles.textarea}
                    placeholder="Tell us about your project..."
                    rows="6"
                  ></textarea>
                </div>

                <button type="submit" disabled={loading} style={styles.submitBtn}>
                  {loading ? 'Sending...' : 'Send Message 🚀'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: '6rem 0',
    background: 'linear-gradient(180deg, rgba(10, 14, 39, 0.3), transparent)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'flex-start'
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  rightColumn: {
    background: 'linear-gradient(135deg, rgba(127, 119, 221, 0.05), rgba(29, 158, 117, 0.05))',
    border: '1px solid rgba(127, 119, 221, 0.1)',
    borderRadius: '16px',
    padding: '2.5rem'
  },
  infoBox: {
    background: 'linear-gradient(135deg, rgba(127, 119, 221, 0.05), rgba(29, 158, 117, 0.05))',
    border: '1px solid rgba(127, 119, 221, 0.1)',
    borderRadius: '12px',
    padding: '1.5rem',
    position: 'relative'
  },
  infoBoxTitle: {
    fontSize: '1rem',
    fontWeight: 700,
    color: '#e0e0ff',
    marginBottom: '0.5rem'
  },
  infoBoxText: {
    color: '#8b8fab',
    fontSize: '0.95rem',
    margin: 0
  },
  iconBox: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    fontSize: '1.5rem'
  },
  socialBox: {
    display: 'flex',
    gap: '1rem'
  },
  socialIconLink: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, rgba(127, 119, 221, 0.1), rgba(29, 158, 117, 0.1))',
    border: '1px solid rgba(127, 119, 221, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#2DDBA0',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '0.75rem',
    transition: 'all 0.3s ease'
  },
  formContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    padding: '0.75rem 1rem',
    background: 'rgba(10, 14, 39, 0.5)',
    border: '1px solid rgba(127, 119, 221, 0.2)',
    borderRadius: '8px',
    color: '#e0e0ff',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease'
  },
  textarea: {
    padding: '0.75rem 1rem',
    background: 'rgba(10, 14, 39, 0.5)',
    border: '1px solid rgba(127, 119, 221, 0.2)',
    borderRadius: '8px',
    color: '#e0e0ff',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    resize: 'vertical'
  },
  submitBtn: {
    padding: '0.75rem 2rem',
    background: 'linear-gradient(135deg, #7F77DD, #2DDBA0)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  successMessage: {
    textAlign: 'center',
    padding: '2rem',
    background: 'rgba(45, 219, 160, 0.1)',
    border: '1px solid rgba(45, 219, 160, 0.3)',
    borderRadius: '8px'
  }
}
