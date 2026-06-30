import { useState } from 'react'
import CareerApplicationForm from '../components/CareerApplicationForm'

const initialCareers = [
  {
    id: 1,
    title: 'Senior React Developer',
    department: 'Engineering',
    type: 'Full-time',
    experience: '5+ years',
    description: 'Join our team as a Senior React Developer and lead frontend development projects.'
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    department: 'Design',
    type: 'Full-time',
    experience: '3+ years',
    description: 'Create beautiful and intuitive user interfaces for our world-class web applications.'
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    department: 'Engineering',
    type: 'Full-time',
    experience: '3+ years',
    description: 'Build complete web solutions from frontend to backend using modern technologies.'
  },
  {
    id: 4,
    title: 'Product Manager',
    department: 'Product',
    type: 'Full-time',
    experience: '5+ years',
    description: 'Lead product strategy and vision for our innovative digital solutions.'
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    type: 'Full-time',
    experience: '3+ years',
    description: 'Manage and optimize our cloud infrastructure and deployment pipelines.'
  },
  {
    id: 6,
    title: 'Marketing Manager',
    department: 'Marketing',
    type: 'Full-time',
    experience: '4+ years',
    description: 'Drive marketing initiatives and grow our brand presence in the digital space.'
  }
]

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'rafeek.m'

export default function Careers() {
  const [jobs, setJobs] = useState(initialCareers)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('stackers_is_admin') === '1')
  const [newJob, setNewJob] = useState({
    title: '',
    department: '',
    type: '',
    experience: '',
    description: ''
  })
  const [editingJobId, setEditingJobId] = useState(null)

  // Admin login is handled on the dedicated Login page; Careers reads localStorage for admin state.

  const handleLogout = () => {
    setIsAdmin(false)
    setEditingJobId(null)
    setNewJob({ title: '', department: '', type: '', description: '' })
    localStorage.removeItem('stackers_is_admin')
  }

  const handleJobChange = (field, value) => {
    setNewJob(prev => ({ ...prev, [field]: value }))
  }

  const handleAddOrUpdateJob = (e) => {
    e.preventDefault()
    const trimmedTitle = newJob.title.trim()
    if (!trimmedTitle || !newJob.department.trim() || !newJob.type.trim() || !newJob.experience.trim() || !newJob.description.trim()) {
      return
    }

    if (editingJobId) {
      setJobs(prev => prev.map(job => job.id === editingJobId ? {
        ...job,
        title: trimmedTitle,
        department: newJob.department.trim(),
        type: newJob.type.trim(),
        experience: newJob.experience.trim(),
        description: newJob.description.trim()
      } : job))
      setEditingJobId(null)
    } else {
      const nextId = Math.max(0, ...jobs.map(job => job.id)) + 1
      setJobs(prev => [
        ...prev,
        {
          id: nextId,
          title: trimmedTitle,
          department: newJob.department.trim(),
          type: newJob.type.trim(),
          experience: newJob.experience.trim(),
          description: newJob.description.trim()
        }
      ])
    }

      setNewJob({ title: '', department: '', type: '', experience: '', description: '' })
  }

  const handleEditJob = (job) => {
    setEditingJobId(job.id)
    setNewJob({
      title: job.title,
      department: job.department,
      type: job.type,
      experience: job.experience || '',
      description: job.description
    })
  }

  const handleDeleteJob = (jobId) => {
    setJobs(prev => prev.filter(job => job.id !== jobId))
  }

  return (
    <section id="careers" style={styles.section}>
      <div style={styles.container} className="careers-container">
        <div style={styles.header}>
          <h2 style={styles.title}>Join Our Team</h2>
          <p style={styles.subtitle}>We're looking for talented individuals to help us create amazing digital experiences</p>
        </div>

        <div style={styles.intro}>
          <p>
            At Stackers Mania, we believe in fostering a culture of creativity, collaboration, and continuous learning. Our team is our greatest asset, and we invest in their growth and well-being.
          </p>
        </div>

        {isAdmin && (
          <div style={styles.adminPanel}>
            <div style={styles.adminHeader}>
              <div>
                <h3 style={styles.adminTitle}>Career Manager</h3>
                <p style={styles.adminNote}>You are logged in as admin. Add, edit, or delete job openings below.</p>
              </div>
              <button onClick={handleLogout} style={styles.adminLogout}>Logout</button>
            </div>

            <form onSubmit={handleAddOrUpdateJob} style={styles.adminForm}>
              <input
                type="text"
                placeholder="Job title"
                value={newJob.title}
                onChange={(e) => handleJobChange('title', e.target.value)}
                style={styles.adminInput}
              />
              <select
                value={newJob.department}
                onChange={(e) => handleJobChange('department', e.target.value)}
                style={styles.adminInput}
              >
                <option value="">Select department</option>
                <option>Engineering</option>
                <option>Design</option>
                <option>Product</option>
                <option>Infrastructure</option>
                <option>Marketing</option>
                <option>Sales</option>
                <option>HR</option>
                <option>Other</option>
              </select>

              <select
                value={newJob.type}
                onChange={(e) => handleJobChange('type', e.target.value)}
                style={styles.adminInput}
              >
                <option value="">Select type</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
                <option>Remote</option>
              </select>

              <select
                value={newJob.experience}
                onChange={(e) => handleJobChange('experience', e.target.value)}
                style={styles.adminInput}
              >
                <option value="">Experience (years)</option>
                <option>0-1</option>
                <option>1-3</option>
                <option>3-5</option>
                <option>5+</option>
              </select>
              <textarea
                placeholder="Job description"
                value={newJob.description}
                onChange={(e) => handleJobChange('description', e.target.value)}
                style={styles.adminTextarea}
              />
              <div style={styles.adminActions}>
                <button type="submit" style={styles.adminButton}>
                  {editingJobId ? 'Update Job' : 'Add Job'}
                </button>
                {editingJobId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingJobId(null)
                      setNewJob({ title: '', department: '', type: '', description: '' })
                    }}
                    style={styles.adminSecondaryButton}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        <div style={styles.benefits} className="careers-benefits">
          <div style={styles.benefit}>
            <span style={styles.benefitIcon}>🎯</span>
            <h4>Clear Growth Path</h4>
            <p>Career development opportunities and mentorship from industry experts</p>
          </div>
          <div style={styles.benefit}>
            <span style={styles.benefitIcon}>💚</span>
            <h4>Work-Life Balance</h4>
            <p>Flexible working arrangements and generous time-off policies</p>
          </div>
          <div style={styles.benefit}>
            <span style={styles.benefitIcon}>🌟</span>
            <h4>Competitive Perks</h4>
            <p>Comprehensive health benefits, learning budget, and team events</p>
          </div>
        </div>

        <h3 style={styles.openingsTitle}>Open Positions</h3>
        <div style={styles.grid} className="careers-grid">
          {jobs.map(job => (
            <div key={job.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <h4 style={styles.jobTitle}>{job.title}</h4>
                <span style={styles.jobType}>{job.type}</span>
              </div>
              <p style={styles.department}>{job.department}</p>
              <p style={styles.description}>{job.description}</p>
              {job.experience && <p style={styles.experience}>Experience: {job.experience}</p>}
              <div style={styles.cardFooter}>
                <button 
                  style={styles.applyBtn}
                  onClick={() => {
                    setSelectedJob(job.title)
                    setShowApplicationForm(true)
                  }}
                >
                  Apply Now
                </button>
                {isAdmin && (
                  <div style={styles.adminCardActions}>
                    <button
                      type="button"
                      onClick={() => handleEditJob(job)}
                      style={styles.smallButton}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteJob(job.id)}
                      style={styles.smallButtonDanger}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {showApplicationForm && (
          <CareerApplicationForm 
            jobTitle={selectedJob}
            onClose={() => {
              setShowApplicationForm(false)
              setSelectedJob(null)
            }}
          />
        )}

        <div style={styles.cta} className="careers-cta">
          <h3>Don't see the right role?</h3>
          <p>We're always interested in hearing from talented individuals. Send us your resume!</p>
          <button style={styles.ctaButton}>Send Resume</button>
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: '6rem 0',
    background: 'linear-gradient(180deg, rgba(29, 158, 117, 0.03), transparent)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '1rem'
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#8b8fab',
    maxWidth: '500px',
    margin: '0 auto'
  },
  intro: {
    textAlign: 'center',
    marginBottom: '3rem',
    fontSize: '1.1rem',
    color: '#8b8fab',
    maxWidth: '600px',
    margin: '0 auto 3rem'
  },
  adminPanel: {
    marginBottom: '3rem',
    padding: '2rem',
    borderRadius: '20px',
    border: '1px solid rgba(127, 119, 221, 0.15)',
    background: 'rgba(10, 14, 39, 0.92)'
  },
  adminHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  adminTitle: {
    fontSize: '1.55rem',
    fontWeight: 700,
    marginBottom: '0.5rem'
  },
  adminNote: {
    color: '#8b8fab',
    margin: 0,
    fontSize: '0.95rem'
  },
  adminForm: {
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    alignItems: 'start'
  },
  adminInput: {
    width: '100%',
    padding: '0.9rem 1rem',
    borderRadius: '14px',
    border: '1px solid rgba(127, 119, 221, 0.2)',
    background: 'rgba(15, 20, 50, 0.9)',
    color: '#e0e0ff',
    fontSize: '0.95rem',
    boxSizing: 'border-box'
  },
  adminTextarea: {
    width: '100%',
    minHeight: '120px',
    padding: '1rem',
    borderRadius: '14px',
    border: '1px solid rgba(127, 119, 221, 0.2)',
    background: 'rgba(15, 20, 50, 0.9)',
    color: '#e0e0ff',
    fontSize: '0.95rem',
    resize: 'vertical',
    boxSizing: 'border-box'
  },
  adminActions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  adminButton: {
    padding: '0.9rem 1.75rem',
    background: 'linear-gradient(135deg, #7F77DD, #2DDBA0)',
    color: 'white',
    border: 'none',
    borderRadius: '999px',
    cursor: 'pointer',
    fontWeight: 700,
    minWidth: '140px'
  },
  adminSecondaryButton: {
    padding: '0.9rem 1.75rem',
    background: 'transparent',
    color: '#e0e0ff',
    border: '1px solid rgba(127, 119, 221, 0.3)',
    borderRadius: '999px',
    cursor: 'pointer'
  },
  loginError: {
    color: '#EF9F27',
    margin: 0,
    fontSize: '0.95rem'
  },
  benefits: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '4rem'
  },
  benefit: {
    textAlign: 'center',
    padding: '2rem',
    background: 'linear-gradient(135deg, rgba(127, 119, 221, 0.1), rgba(29, 158, 117, 0.1))',
    border: '1px solid rgba(127, 119, 221, 0.2)',
    borderRadius: '12px'
  },
  benefitIcon: {
    fontSize: '2.5rem',
    display: 'block',
    marginBottom: '1rem'
  },
  openingsTitle: {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '2rem',
    marginTop: '2rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '4rem'
  },
  card: {
    background: 'linear-gradient(135deg, rgba(29, 158, 117, 0.05), rgba(127, 119, 221, 0.05))',
    border: '1px solid rgba(127, 119, 221, 0.2)',
    borderRadius: '12px',
    padding: '1.5rem',
    transition: 'all 0.3s ease'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem'
  },
  jobTitle: {
    fontSize: '1.3rem',
    fontWeight: 700,
    color: '#e0e0ff'
  },
  jobType: {
    fontSize: '0.8rem',
    color: '#2DDBA0',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  department: {
    color: '#8b8fab',
    fontSize: '0.9rem',
    marginBottom: '0.5rem'
  },
  description: {
    color: '#8b8fab',
    marginBottom: '1.5rem',
    fontSize: '0.95rem',
    overflowWrap: 'anywhere',
    wordBreak: 'break-word'
  },
  experience: {
    color: '#a7f3d0',
    fontSize: '0.9rem',
    marginBottom: '0.75rem'
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  adminCardActions: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap'
  },
  smallButton: {
    padding: '0.55rem 1rem',
    background: 'rgba(127, 119, 221, 0.12)',
    color: '#e0e0ff',
    border: '1px solid rgba(127, 119, 221, 0.25)',
    borderRadius: '999px',
    cursor: 'pointer',
    fontSize: '0.85rem'
  },
  smallButtonDanger: {
    padding: '0.55rem 1rem',
    background: 'rgba(239, 68, 68, 0.12)',
    color: '#ffbaba',
    border: '1px solid rgba(239, 68, 68, 0.25)',
    borderRadius: '999px',
    cursor: 'pointer',
    fontSize: '0.85rem'
  },
  applyBtn: {
    padding: '0.5rem 1.5rem',
    background: 'linear-gradient(135deg, #7F77DD, #A79AF5)',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    fontSize: '0.9rem'
  },
  cta: {
    textAlign: 'center',
    padding: '3rem',
    background: 'linear-gradient(135deg, rgba(127, 119, 221, 0.1), rgba(29, 158, 117, 0.1))',
    borderRadius: '16px',
    border: '1px solid rgba(127, 119, 221, 0.2)'
  },
  ctaButton: {
    padding: '0.75rem 2rem',
    background: 'linear-gradient(135deg, #7F77DD, #A79AF5)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '1rem'
  }
}
