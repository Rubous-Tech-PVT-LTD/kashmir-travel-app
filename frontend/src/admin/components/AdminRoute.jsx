import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { validateAdminSession } from '../../utils/adminAuth'

export default function AdminRoute({ children }) {
  const [isChecking, setIsChecking] = useState(true)
  const [isAllowed, setIsAllowed] = useState(false)

  useEffect(() => {
    let mounted = true

    const verify = async () => {
      const valid = await validateAdminSession()
      if (mounted) {
        setIsAllowed(valid)
        setIsChecking(false)
      }
    }

    verify()

    return () => {
      mounted = false
    }
  }, [])

  if (isChecking) {
    return null
  }

  if (!isAllowed) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
