import { useState, useEffect } from 'react'
import { getAllDepartments } from '../services/departmentService'
import { useData } from './useData'

let cachedDepartments = null
let cachedPromise = null

export const useDepartments = () => {
  const [departments, setDepartments] = useState(cachedDepartments || [])
  const [loading, setLoading] = useState(!cachedDepartments)

  useEffect(() => {
    if (cachedDepartments) {
      setDepartments(cachedDepartments)
      setLoading(false)
      return
    }

    let cancelled = false

    const fetch = async () => {
      if (!cachedPromise) {
        cachedPromise = getAllDepartments().then((res) => {
          const depts = res.success ? (res.data.departments || []) : []
          cachedDepartments = depts
          return depts
        })
      }

      try {
        const depts = await cachedPromise
        if (!cancelled) {
          setDepartments(depts)
        }
      } catch (error) {
        console.error('Error fetching departments:', error)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetch()

    return () => { cancelled = true }
  }, [])

  const getDepartmentName = (deptId) => {
    const dept = departments.find(d => d._id === deptId || d.id === deptId)
    return dept?.name || deptId || '-'
  }

  return { departments, loading, getDepartmentName }
}
