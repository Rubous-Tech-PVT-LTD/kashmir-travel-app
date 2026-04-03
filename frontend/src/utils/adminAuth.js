const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'ktt@admin2026'
const ADMIN_SESSION_KEY = 'ktt-admin-session'

export const isAdminAuthenticated = () => {
  if (typeof window === 'undefined') {
    return false
  }

  return window.localStorage.getItem(ADMIN_SESSION_KEY) === 'active'
}

export const loginAdmin = (username, password) => {
  if (typeof window === 'undefined') {
    return false
  }

  const isValidUser = username === ADMIN_USERNAME && password === ADMIN_PASSWORD
  if (!isValidUser) {
    return false
  }

  window.localStorage.setItem(ADMIN_SESSION_KEY, 'active')
  return true
}

export const logoutAdmin = () => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(ADMIN_SESSION_KEY)
}

export const adminAllowedUser = {
  username: ADMIN_USERNAME,
}
