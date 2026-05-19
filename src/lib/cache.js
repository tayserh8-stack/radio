const store = new Map()
const DEFAULT_TTL = 30_000

export const cache = {
  get(key) {
    const entry = store.get(key)
    if (!entry) return null
    if (Date.now() - entry.timestamp > entry.ttl) {
      store.delete(key)
      return null
    }
    return entry.data
  },

  set(key, data, ttl = DEFAULT_TTL) {
    store.set(key, { data, timestamp: Date.now(), ttl })
  },

  delete(key) {
    store.delete(key)
  },

  clear() {
    store.clear()
  },
}
