import { createContext, useState, useEffect } from 'react'
import axios from '../api/axios'

import { useNavigate } from 'react-router-dom'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user'))
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!token || !user) {
      navigate('/login')
    }
  }, [token, user, navigate])

  // Login function
  const login = async (credentials) => {
    setLoading(true)
    try {
      const response = await axios.post('/users/login', credentials)
      const { token, user } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', user.username)
      setToken(token)
      setUser(user.username)
      navigate('/')
    } catch (error) {
      console.error('Error logging in:', error)
      setError("Nom d'utilisateur ou mot de passe incorrect")
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
    navigate('/login')
  }

  // Provide the context
  return (
    <UserContext.Provider value={{ user, token, login, logout, loading, error }}>
      {children}
    </UserContext.Provider>
  )
}
