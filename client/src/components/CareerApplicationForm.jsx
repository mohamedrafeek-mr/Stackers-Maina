import { useState } from 'react'

const jobPositions = [
  'Senior React Developer',
  'UI/UX Designer',
  'Full Stack Developer',
  'Product Manager',
  'DevOps Engineer',
  'Marketing Manager'
]

const getApiUrl = (path) => {
  const baseUrl = (import.meta.env.VITE_API_URL || 'https://stackers-maina.onrender.com').trim().replace(/\/$/, '')
  return baseUrl ? `${baseUrl}${path}` : path
}

export default function CareerApplicationForm({ jobTitle, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: jobTitle || '',
    coverLetter: ''
  })
  const [cvFile, setCvFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB')
        return
      }
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedTypes.includes(file.type)) {
        setError('Only PDF and Word documents are accepted')
        return
      }
      setCvFile(file)
      setError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.position || !cvFile) {
      setError('Please fill all required fields and attach your CV')
      return
    }

    setLoading(true)
    
    try {
      // Read CV file as base64
      const reader = new FileReader()
      reader.onload = async (event) => {
        const cvBase64 = event.target.result
        
        const response = await fetch(getApiUrl('/api/careers'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            position: formData.position,
            coverLetter: formData.coverLetter,
            cv: cvBase64,
            cvFileName: cvFile.name
          })
        })

        const data = await response.json()

        if (response.ok) {
          setSubmitted(true)
          setTimeout(() => {
            onClose()
          }, 3000)
        } else {
          setError(data.message || 'Failed to submit application')
        }
        setLoading(false)
      }
      reader.readAsDataURL(cvFile)
    } catch (error) {
      console.error('Error submitting application:', error)
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}>✕</button>
        
        {submitted ? (
          <div style={styles.successContainer}>
            <div style={styles.successIcon}>✓</div>
            <h3 style={styles.successTitle}>Application Submitted!</h3>
            <p style={styles.successMessage}>
              Thank you for applying! We've received your application and will review it shortly. 
              You will receive a confirmation email at <strong>{formData.email}</strong>.
            </p>
            <p style={styles.successSubtext}>Redirecting...</p>
          </div>
        ) : (
          <>
            <h2 style={styles.title}>Career Application</h2>
            <p style={styles.subtitle}>Apply for the position and attach your CV</p>

            {error && <div style={styles.errorMessage}>{error}</div>}

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Position Applying For *</label>
                <select 
                  name="position" 
                  value={formData.position} 
                  onChange={handleChange}
                  style={styles.select}
                  required
                >
                  <option value="">Select a position</option>
                  {jobPositions.map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Upload CV/Resume *</label>
                <div style={styles.fileUpload}>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    style={styles.fileInput}
                    required
                  />
                  <div style={styles.fileUploadText}>
                    {cvFile ? (
                      <>
                        <span style={styles.fileIcon}>📄</span>
                        <span style={styles.fileName}>{cvFile.name}</span>
                        <span style={styles.fileSize}>({(cvFile.size / 1024).toFixed(0)} KB)</span>
                      </>
                    ) : (
                      <>
                        <span style={styles.uploadIcon}>📤</span>
                        <span>Click to upload CV (PDF, DOC, DOCX)</span>
                        <span style={styles.fileHint}>Max 5MB</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Cover Letter (Optional)</label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  style={styles.textarea}
                  placeholder="Tell us why you're interested in this position..."
                  rows="4"
                ></textarea>
              </div>

              <div style={styles.buttonGroup}>
                <button 
                  type="submit" 
                  disabled={loading} 
                  style={styles.submitBtn}
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
                <button 
                  type="button" 
                  onClick={onClose}
                  style={styles.cancelBtn}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    backdropFilter: 'blur(5px)'
  },
  modal: {
    background: 'linear-gradient(135deg, rgba(29, 158, 117, 0.05), rgba(127, 119, 221, 0.05))',
    border: '1px solid rgba(127, 119, 221, 0.3)',
    borderRadius: '16px',
    padding: '2.5rem',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    backdropFilter: 'blur(20px)'
  },
  closeBtn: {
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',
    background: 'none',
    border: 'none',
    color: '#e0e0ff',
    fontSize: '1.5rem',
    cursor: 'pointer',
    transition: 'color 0.3s ease'
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
    color: '#e0e0ff'
  },
  subtitle: {
    color: '#8b8fab',
    marginBottom: '1.5rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: 600,
    color: '#e0e0ff',
    fontSize: '0.95rem'
  },
  input: {
    padding: '0.75rem 1rem',
    background: 'rgba(10, 14, 39, 0.6)',
    border: '1px solid rgba(127, 119, 221, 0.2)',
    borderRadius: '8px',
    color: '#e0e0ff',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease'
  },
  select: {
    padding: '0.75rem 1rem',
    background: 'rgba(10, 14, 39, 0.6)',
    border: '1px solid rgba(127, 119, 221, 0.2)',
    borderRadius: '8px',
    color: '#e0e0ff',
    fontSize: '0.95rem'
  },
  textarea: {
    padding: '0.75rem 1rem',
    background: 'rgba(10, 14, 39, 0.6)',
    border: '1px solid rgba(127, 119, 221, 0.2)',
    borderRadius: '8px',
    color: '#e0e0ff',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    resize: 'vertical'
  },
  fileUpload: {
    position: 'relative',
    border: '2px dashed rgba(127, 119, 221, 0.3)',
    borderRadius: '8px',
    padding: '1.5rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    background: 'rgba(127, 119, 221, 0.05)'
  },
  fileInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer'
  },
  fileUploadText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#8b8fab'
  },
  uploadIcon: {
    fontSize: '2rem'
  },
  fileIcon: {
    fontSize: '1.5rem'
  },
  fileName: {
    color: '#2DDBA0',
    fontWeight: 600
  },
  fileSize: {
    fontSize: '0.85rem',
    color: '#8b8fab'
  },
  fileHint: {
    fontSize: '0.8rem',
    color: '#8b8fab'
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  },
  submitBtn: {
    flex: 1,
    padding: '0.75rem 1.5rem',
    background: 'linear-gradient(135deg, #7F77DD, #A79AF5)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  cancelBtn: {
    flex: 1,
    padding: '0.75rem 1.5rem',
    background: 'transparent',
    color: '#8b8fab',
    border: '1px solid rgba(127, 119, 221, 0.2)',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  errorMessage: {
    background: 'rgba(239, 159, 39, 0.2)',
    border: '1px solid rgba(239, 159, 39, 0.5)',
    color: '#EF9F27',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontSize: '0.9rem'
  },
  successContainer: {
    textAlign: 'center',
    padding: '2rem 0'
  },
  successIcon: {
    fontSize: '3rem',
    color: '#2DDBA0',
    marginBottom: '1rem'
  },
  successTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#2DDBA0',
    marginBottom: '1rem'
  },
  successMessage: {
    color: '#8b8fab',
    marginBottom: '1rem'
  },
  successSubtext: {
    color: '#8b8fab',
    fontSize: '0.9rem',
    fontStyle: 'italic'
  }
}
