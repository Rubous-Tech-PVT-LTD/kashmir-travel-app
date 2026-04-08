import { adminAPI } from './api'

export const isAdminAuthenticated = () => {
  return validateAdminSession()
}

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
    return { success: false, message: error.message || 'Unable to login admin' }
  }
}

export const validateAdminSession = async () => {
  try {
    const response = await adminAPI.me()
    return Boolean(response?.success)
  } catch (error) {
    return false
  }
}

export const logoutAdmin = async () => {
  try {
    await adminAPI.logout()
  } catch (error) {
    // Ignore logout failures so UI can still redirect to login.
  }
}
