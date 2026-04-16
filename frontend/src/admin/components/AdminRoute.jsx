import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { validateAdminSession } from '../../utils/adminAuth'

export default function AdminRoute({ children }) {
  const [isChecking, setIsChecking] = useState(true)
  const [isAllowed, setIsAllowed] = useState(false)

  useEffect(() => {
    let mounted = true

    const verify = async () => {
      console.log('AdminRoute: Verifying session...')
      const valid = await validateAdminSession()
      
      if (mounted) {
        console.log('AdminRoute: Session valid:', valid)
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
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-500 font-medium">Verifying admin access...</p>
        </div>
      </div>
    )
  }

  if (!isAllowed) {
    console.warn('AdminRoute: Access denied, redirecting to login...')
    return <Navigate to="/admin/login" replace />
  }

  return children
}
