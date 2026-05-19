import api from './api'

export const getInboxMessages = async () => {
  const response = await api.get('/messages/inbox')
  return response.data
}

export const getSentMessages = async () => {
  const response = await api.get('/messages/sent')
  return response.data
}

export const getUnreadCount = async () => {
  const response = await api.get('/messages/unread')
  return response.data
}

export const sendMessage = async (data) => {
  const response = await api.post('/messages', data)
  return response.data
}

export const markAsRead = async (messageId) => {
  const response = await api.put(`/messages/${messageId}/read`)
  return response.data
}

export const archiveMessage = async (messageId) => {
  const response = await api.put(`/messages/${messageId}/archive`)
  return response.data
}

export const deleteMessage = async (messageId) => {
  const response = await api.delete(`/messages/${messageId}`)
  return response.data
}

export default {
  getInboxMessages,
  getSentMessages,
  getUnreadCount,
  sendMessage,
  markAsRead,
  archiveMessage,
  deleteMessage,
}
