import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getWellBeingStatus } from '../../services/wellBeingService'

const DISMISSED_KEY = 'wellBeingDismissedDate'
const CHECKED_KEY = 'wellBeingCheckedToday'

const WellBeingBanner = () => {
  const navigate = useNavigate()
  const [showWellBeingReminder, setShowWellBeingReminder] = useState(false)
  const [initialising, setInitialising] = useState(true)

  useEffect(() => {
    const today = new Date().toDateString()

    const dismissed = localStorage.getItem(DISMISSED_KEY)
    if (dismissed === today) {
      setInitialising(false)
      return
    }

    const alreadyChecked = localStorage.getItem(CHECKED_KEY)
    if (alreadyChecked === today) {
      setInitialising(false)
      return
    }

    const timer = setTimeout(async () => {
      try {
        const response = await getWellBeingStatus()
        if (response.success && !response.data.hasSubmitted) {
          setShowWellBeingReminder(true)
        } else if (response.success && response.data.hasSubmitted) {
          localStorage.setItem(CHECKED_KEY, today)
        }
      } catch (error) {
        console.error('Error checking well-being:', error)
      } finally {
        setInitialising(false)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const dismissReminder = () => {
    localStorage.setItem(DISMISSED_KEY, new Date().toDateString())
    setShowWellBeingReminder(false)
  }

  if (initialising || !showWellBeingReminder) return null

  return (
    <div className="bg-primary text-white px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-xl">😊</span>
        <span className="font-medium">تقرير الحالة اليومية - كيف تشعر اليوم؟</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/well-being')}
          className="px-4 py-1 bg-white text-primary rounded-full font-semibold hover:bg-gray-100 transition-colors"
        >
          إكمال الآن
        </button>
        <button
          onClick={dismissReminder}
          className="p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default WellBeingBanner
