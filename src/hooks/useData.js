import { useState, useEffect, useRef, useCallback } from 'react'

export function useData(fetcher, deps = [], options = {}) {
  const { enabled = true, onSuccess, onError, keepPreviousData = false } = options
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const mountedRef = useRef(true)
  const prevDataRef = useRef(null)

  const execute = useCallback(async () => {
    if (!enabled) return
    const thisCallId = {}
    setLoading(true)
    setError(null)
    try {
      const result = await fetcher()
      if (mountedRef.current) {
        prevDataRef.current = result
        setData(result)
        onSuccess?.(result)
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err)
        onError?.(err)
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false)
      }
    }
  }, deps)

  useEffect(() => {
    mountedRef.current = true
    if (enabled) execute()
    return () => { mountedRef.current = false }
  }, [execute, enabled])

  return { data, loading, error, refetch: execute }
}
