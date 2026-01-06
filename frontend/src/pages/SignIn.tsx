import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const API_URL = 'http://localhost:3000/api'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.message || 'Login failed')
        return
      }
      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('/')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Sign In</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignIn}>
        <div style={{ marginBottom: 15 }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            style={{ width: '100%', padding: 8, marginTop: 5, boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: 15 }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={{ width: '100%', padding: 8, marginTop: 5, boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 10, cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: 20 }}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  )
}
