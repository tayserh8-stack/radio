const inflight = new Map()

export const deduplicate = async (key, fetcher) => {
  if (inflight.has(key)) {
    return inflight.get(key)
  }
  const promise = fetcher().finally(() => {
    inflight.delete(key)
  })
  inflight.set(key, promise)
  return promise
}

export const clearInflight = (key) => {
  inflight.delete(key)
}
