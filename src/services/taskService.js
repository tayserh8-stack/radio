import api from './api'

export const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData)
  return response.data
}

export const getMyTasks = async (filters = {}) => {
  const response = await api.get('/tasks/my-tasks', { params: filters })
  return response.data
}

export const getCreatedTasks = async (filters = {}) => {
  const response = await api.get('/tasks/created', { params: filters })
  return response.data
}

export const getTasksToEvaluate = async () => {
  const response = await api.get('/tasks/to-evaluate')
  return response.data
}

export const getTasksToApprove = async () => {
  const response = await api.get('/tasks/to-approve')
  return response.data
}

export const getTaskById = async (taskId) => {
  const response = await api.get(`/tasks/${taskId}`)
  return response.data
}

export const updateTask = async (taskId, taskData) => {
  const response = await api.put(`/tasks/${taskId}`, taskData)
  return response.data
}

export const updateTaskStatus = async (taskId, status) => {
  const response = await api.put(`/tasks/${taskId}/status`, { status })
  return response.data
}

export const evaluateTask = async (taskId, { score, notes }) => {
  const response = await api.post(`/tasks/${taskId}/evaluate`, { score, notes })
  return response.data
}

export const finalApproveTask = async (taskId) => {
  const response = await api.post(`/tasks/${taskId}/final-approve`)
  return response.data
}

export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`)
  return response.data
}

export const getDailySummary = async (date) => {
  const response = await api.get('/tasks/summary/daily', { params: { date } })
  return response.data
}

export const getWeeklySummary = async (startDate) => {
  const response = await api.get('/tasks/summary/weekly', { params: { startDate } })
  return response.data
}

export const getTaskReports = async (filters = {}) => {
  const response = await api.get('/tasks/reports', { params: filters })
  return response.data
}

export const getTotalTasks = async () => {
  const response = await api.get('/tasks/total')
  return response.data
}

export default {
  createTask,
  getMyTasks,
  getCreatedTasks,
  getTasksToEvaluate,
  getTasksToApprove,
  getTaskById,
  updateTask,
  updateTaskStatus,
  evaluateTask,
  finalApproveTask,
  deleteTask,
  getDailySummary,
  getWeeklySummary,
  getTaskReports,
  getTotalTasks,
}
