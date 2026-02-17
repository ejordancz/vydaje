import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Login from './Login'
import './index.css'

const TOKEN_KEY = 'vydaje_token'

function Root() {
  const [token, setToken] = useState(() => {
    try {
      return window.localStorage.getItem(TOKEN_KEY)
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (!token) {
      try {
        window.localStorage.removeItem(TOKEN_KEY)
      } catch {}
    }
  }, [token])

  const onLogin = (newToken) => setToken(newToken)
  const onUnauthorized = () => setToken(null)

  if (!token) {
    return <Login onLogin={onLogin} />
  }
  return <App token={token} onUnauthorized={onUnauthorized} />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
