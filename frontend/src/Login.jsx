import React, { useState } from 'react'

const API = '/api'

export default function Login({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!password.trim()) {
      setError('Zadejte heslo.')
      return
    }
    setLoading(true)
    try {
      const r = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password.trim() }),
      })
      const data = await r.json().catch(() => ({}))
      if (!r.ok) {
        setError(data.detail || 'Nesprávné heslo.')
        return
      }
      if (data.token) {
        window.localStorage.setItem('vydaje_token', data.token)
        onLogin(data.token)
      } else {
        setError('Server nevrátil token.')
      }
    } catch (err) {
      setError(err.message || 'Přihlášení se nezdařilo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Výdaje a příjmy</h1>
        <p className="login-subtitle">Pro přístup zadejte heslo</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="login-password">Heslo</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-full login-input"
              placeholder="Heslo"
              autoComplete="current-password"
              autoFocus
              disabled={loading}
            />
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="btn btn-primary login-submit" disabled={loading}>
            {loading ? 'Přihlašuji…' : 'Přihlásit'}
          </button>
        </form>
      </div>
    </div>
  )
}
