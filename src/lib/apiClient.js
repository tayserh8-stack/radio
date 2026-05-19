import axios from 'axios'
import { cache } from './cache'
import { deduplicate, clearInflight } from './deduplicator'

const BASE_URL = import.meta.env.VITE_API_BASE_URL
  ? import.meta.env.VITE_API_BASE_URL
  : import.meta.env.PROD
    ? 'https://cc-backend-2ogh.onrender.com'
    : ''

const getCacheKey = (url, params) => {
  const p = params ? JSON.stringify(params) : ''
  return `GET:${url}:${p}`
}

const api = axios.create({
  baseURL: BASE_URL ? `${BASE_URL}/api` : '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 60000,
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => {
    const method = response.config?.method
    if (method === 'get' || !method) {
      cache.set(
        getCacheKey(response.config.url, response.config.params),
        response
      )
    } else if (['post', 'put', 'patch', 'delete'].includes(method)) {
      cache.delete(getCacheKey(response.config.url, response.config.params))
    }
    return response
  },
  (error) => {
    try {
      if (error.config?.method === 'get' || !error.config?.method) {
        const key = getCacheKey(error.config.url, error.config.params)
        clearInflight(key)
      }
    } catch (innerErr) {
      console.warn('[API] Error in response error handler:', innerErr)
    }

    let userMessage = 'حدث خطأ في الاتصال بالخادم'
    if (error.response) {
      const { status, data } = error.response
      userMessage = data?.message || `خطأ في الخادم (${status})`
      if (status === 429) {
        console.warn(`[API] 429 Too Many Requests: ${error.config?.url}`)
        userMessage = 'طلبات كثيرة جداً، يرجى الانتظار قليلاً'
      }
      if (
        status === 401 &&
        !error.config?.url?.includes('/auth/login') &&
        !error.config?.url?.includes('/departments')
      ) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
      }
    } else if (error.request) {
      userMessage = 'لا يمكن الاتصال بالخادم. تحقق من الإنترنت'
    }
    error.userMessage = userMessage
    return Promise.reject(error)
  }
)

const originalGet = api.get
api.get = function (url, config = {}) {
  const key = getCacheKey(url, config.params)
  const cached = cache.get(key)
  if (cached) {
    return Promise.resolve(cached)
  }
  return deduplicate(key, () => originalGet.call(api, url, config))
}

export default api

export const UPLOADS_URL = BASE_URL
export const API_BASE_URL = BASE_URL
