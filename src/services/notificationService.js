import api from './api'

export const getMyNotifications = async (unreadOnly = false) => {
  const response = await api.get('/notifications', { params: { unreadOnly } })
  return response.data
}

export const markAsRead = async (notificationId) => {
  const response = await api.put(`/notifications/${notificationId}/read`)
  return response.data
}

export const markAllAsRead = async () => {
  const response = await api.put('/notifications/read-all')
  return response.data
}

export const deleteNotification = async (notificationId) => {
  const response = await api.delete(`/notifications/${notificationId}`)
  return response.data
}

export const clearReadNotifications = async () => {
  const response = await api.delete('/notifications/clear-read')
  return response.data
}

export const getSettings = async () => {
  const response = await api.get('/settings')
  return response.data
}

export const updateSetting = async (key, value) => {
  const response = await api.put(`/settings/${key}`, { value })
  return response.data
}

export const updateMultipleSettings = async (settings) => {
  const response = await api.put('/settings', settings)
  return response.data
}

export const getEvaluationWeights = async () => {
  const response = await api.get('/settings/weights')
  return response.data
}

export const resetSettings = async () => {
  const response = await api.post('/settings/reset')
  return response.data
}

const simpleNotify = {
  showSuccess: (msg) => { if (window.toastSuccess) window.toastSuccess(msg); else alert(msg) },
  showError: (msg) => { if (window.toastError) window.toastError(msg); else alert(msg) },
  showInfo: (msg) => { if (window.toastInfo) window.toastInfo(msg); else alert(msg) },
}

export const getNotificationService = () => simpleNotify

export default {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearReadNotifications,
  getSettings,
  updateSetting,
  updateMultipleSettings,
  getEvaluationWeights,
  resetSettings,
}
