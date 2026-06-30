import { useState } from 'react'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const ADMIN_USERNAME = 'admin'
  const ADMIN_PASSWORD = 'rafeek.m'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem('stackers_is_admin', '1')
      setError('')
      // navigate back to the site index and jump to careers
      window.location.href = '/' + '#careers'
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <section id="login" style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.title}>Admin Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>Log In</button>
        </form>
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: '3rem 0',
    background: 'transparent'
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0 1rem'
  },
  title: {
    fontSize: '1.6rem',
    fontWeight: 700,
    marginBottom: '1rem',
    color: '#e0e0ff',
    textAlign: 'center'
  },
  form: {
    display: 'grid',
    gap: '0.75rem'
  },
  input: {
    padding: '0.85rem 1rem',
    borderRadius: '10px',
    border: '1px solid rgba(127, 119, 221, 0.12)',
    background: 'rgba(15,20,50,0.9)',
    color: '#e0e0ff'
  },
  button: {
    padding: '0.75rem 1rem',
    borderRadius: '999px',
    background: 'linear-gradient(135deg, #7F77DD, #2DDBA0)',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 700
  },
  error: {
    color: '#EF9F27',
    margin: 0
  }
}
