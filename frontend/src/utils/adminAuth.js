import { adminAPI } from './api'

export const loginAdmin = async (username, password) => {
  if (typeof window === 'undefined') {
    return { success: false, message: 'Admin login is only available in browser context' }
  }

  try {
    const response = await adminAPI.login(username, password)

    if (!response?.success) {
      return { success: false, message: response?.message || 'Invalid credentials' }
    }

    return { success: true, message: response.message || 'Admin login successful' }
  } catch (error) {
    console.error('loginAdmin: Error:', error)
    return { success: false, message: error.message || 'Unable to login admin' }
  }
}

export const validateAdminSession = async () => {
  try {
    const response = await adminAPI.me()
    const isValid = Boolean(response?.success)
    if (!isValid) {
      console.warn('validateAdminSession: Server returned success: false', response)
    }
    return isValid
  } catch (error) {
    console.error('validateAdminSession: Error fetching session:', {
      message: error.message,
      status: error.status,
      data: error.data
    })
    return false
  }
}

export const logoutAdmin = async () => {
  try {
    await adminAPI.logout()
  } catch (error) {
    console.error('logoutAdmin: Error:', error)
    // Ignore logout failures so UI can still redirect to login.
  }
}
