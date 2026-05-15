import { createContext, useState, useEffect } from 'react'
import { login as loginService, logout as logoutService } from '../servicos/authService'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]           = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Reavalia token salvo ao iniciar a app
  useEffect(() => {
    const token = localStorage.getItem('petlife_token')
    if (token) {
      try {
        // Decodifica payload sem biblioteca externa (base64)
        const payload = JSON.parse(atob(token.split('.')[1]))
        if (payload.exp * 1000 > Date.now()) {
          setUser({
            id:    payload.sub || payload.nameid,
            name:  payload.name || payload.unique_name,
            email: payload.email,
          })
        } else {
          localStorage.removeItem('petlife_token')
        }
      } catch {
        localStorage.removeItem('petlife_token')
      }
    }
    setIsLoading(false)
  }, [])

  const handleLogin = async (credentials) => {
    const userData = await loginService(credentials)
    setUser(userData)
    return userData
  }

  const handleLogout = () => {
    setUser(null)
    logoutService()
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}
