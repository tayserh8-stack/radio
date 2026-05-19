import api from './api'

export const getAllEmployees = async () => {
  const response = await api.get('/users/employees')
  return response.data
}

export const getEmployeesByDepartment = async (department) => {
  const response = await api.get(`/users/department/${department}`)
  return response.data
}

export const getAllManagers = async () => {
  const response = await api.get('/users/managers')
  return response.data
}

export const getAllUsers = async () => {
  const response = await api.get('/users')
  return response.data
}

export const getUserById = async (userId) => {
  const response = await api.get(`/users/${userId}`)
  return response.data
}

export const createUser = async (userData) => {
  const response = await api.post('/users', userData)
  return response.data
}

export const updateUser = async (userId, userData) => {
  const response = await api.put(`/users/${userId}`, userData)
  return response.data
}

export const deleteUser = async (userId) => {
  const response = await api.delete(`/users/${userId}`)
  return response.data
}

export const calculatePerformanceScore = async (userId) => {
  const response = await api.post(`/users/${userId}/calculate-score`)
  return response.data
}

export const getRankings = async () => {
  const response = await api.get('/users/rankings')
  return response.data
}

export const getDepartmentStats = async () => {
  const response = await api.get('/users/department-stats')
  return response.data
}

export const getPendingUsers = async () => {
  const response = await api.get('/users/pending')
  return response.data
}

export const activateUser = async (userId) => {
  const response = await api.post(`/users/${userId}/activate`)
  return response.data
}

export const getUserCounts = async () => {
  const response = await api.get('/users/counts')
  return response.data
}

export const changePassword = async (passwordData) => {
  const response = await api.put('/users/change-password', passwordData)
  return response.data
}

export default {
  getAllEmployees,
  getEmployeesByDepartment,
  getAllManagers,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  calculatePerformanceScore,
  getRankings,
  getDepartmentStats,
  getPendingUsers,
  activateUser,
  getUserCounts,
  changePassword,
}
