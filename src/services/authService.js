import api from './api'

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData)
  if (response.data.success) {
    localStorage.setItem('token', response.data.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.data.user))
  }
  return response.data
}

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials)
  if (response.data.success) {
    localStorage.setItem('token', response.data.data.token)
    localStorage.setItem('user', JSON.stringify(response.data.data.user))
  }
  return response.data
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me')
  return response.data
}

export const changePassword = async (passwordData) => {
  const response = await api.post('/auth/change-password', passwordData)
  return response.data
}

export const updateProfile = async (profileData) => {
  const response = await api.put('/auth/profile', profileData)
  if (response.data.success) {
    localStorage.setItem('user', JSON.stringify(response.data.data.user))
  }
  return response.data
}

export const uploadProfileImage = async (formData) => {
  const response = await api.put('/auth/profile-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  if (response.data.success) {
    localStorage.setItem('user', JSON.stringify(response.data.data.user))
  }
  return response.data
}

export const isLoggedIn = () => {
  return !!localStorage.getItem('token')
}

export const getStoredUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export default {
  register,
  login,
  logout,
  getCurrentUser,
  changePassword,
  updateProfile,
  uploadProfileImage,
  isLoggedIn,
  getStoredUser,
}
