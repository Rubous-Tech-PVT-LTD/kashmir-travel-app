import axios from 'axios'

const DEFAULT_API_PATH = '/api/v1'
const DEFAULT_TIMEOUT_MS = 15000

const getApiUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL?.trim()

  if (envUrl) {
    const baseUrl = envUrl.replace(/\/+$/, '')
    // Ensure the /api/v1 prefix is present if the user only provided the domain
    return baseUrl.includes('/api/') ? baseUrl : `${baseUrl}${DEFAULT_API_PATH}`
  }

  if (typeof window !== 'undefined') {
    return `${window.location.origin}${DEFAULT_API_PATH}`
  }

  return `http://localhost:5000${DEFAULT_API_PATH}`
}

const API_URL = getApiUrl()
const REQUEST_TIMEOUT_MS = Number(import.meta.env.VITE_API_TIMEOUT_MS) || DEFAULT_TIMEOUT_MS

const http = axios.create({
  baseURL: API_URL,
  timeout: REQUEST_TIMEOUT_MS,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

class ApiError extends Error {
  constructor(message, status, data) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

const request = async (path, { method = 'GET', body, query, headers } = {}) => {
  try {
    const response = await http.request({
      url: path,
      method,
      data: body,
      params: query,
      headers,
    })

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 0
      const data = error.response?.data
      const message = data?.message || error.message || 'Network request failed'
      throw new ApiError(message, status, data)
    }

    if (error instanceof ApiError) {
      throw error
    }

    throw new ApiError(error?.message || 'Network request failed', 0)
  }
}

const dataOr = (value, fallback) => (value?.data ?? fallback)

const safe = async (fn, fallback, label) => {
  try {
    return await fn()
  } catch (error) {
    return fallback
  }
}

export const itineraryAPI = {
  getAll: (options = {}) => safe(async () => dataOr(await request('/itineraries', { query: options }), []), [], 'Error fetching itineraries'),

  getByCategory: (category) => itineraryAPI.getAll({ category }),

  getById: (id) => safe(async () => dataOr(await request(`/itineraries/${id}`), null), null, 'Error fetching itinerary'),

  create: async (itinerary) => dataOr(await request('/itineraries', { method: 'POST', body: itinerary }), null),

  update: async (id, itinerary) => dataOr(await request(`/itineraries/${id}`, { method: 'PUT', body: itinerary }), null),

  delete: async (id) => dataOr(await request(`/itineraries/${id}`, { method: 'DELETE' }), null),

  addDay: async (id, day) => dataOr(await request(`/itineraries/${id}/days`, { method: 'POST', body: day }), null),

  updateDay: async (id, dayIndex, day) =>
    dataOr(await request(`/itineraries/${id}/days/${dayIndex}`, { method: 'PUT', body: day }), null),

  deleteDay: async (id, dayIndex) => dataOr(await request(`/itineraries/${id}/days/${dayIndex}`, { method: 'DELETE' }), null),
}

export const reviewAPI = {
  getByItinerary: (itineraryId, reviewType = null) =>
    safe(
      async () => dataOr(await request('/reviews', { query: { itineraryId, reviewType } }), []),
      [],
      'Error fetching reviews'
    ),

  create: async (review) => dataOr(await request('/reviews', { method: 'POST', body: review }), null),

  delete: async (id) => dataOr(await request(`/reviews/${id}`, { method: 'DELETE' }), null),
}

export const hotelAPI = {
  getAll: () => safe(async () => dataOr(await request('/hotels'), []), [], 'Error fetching hotels'),
  getHouseboats: () => safe(async () => dataOr(await request('/hotels/houseboats'), []), [], 'Error fetching houseboat stays'),
  getById: (id) => safe(async () => dataOr(await request(`/hotels/${id}`), null), null, 'Error fetching hotel'),
  addReview: async (id, review) => dataOr(await request(`/hotels/${id}/reviews`, { method: 'POST', body: review }), null),
}

export const carRentalAPI = {
  getAll: async () => dataOr(await request('/car-rentals'), []),
  getById: async (id) => dataOr(await request(`/car-rentals/${id}`), null),
}

export const inquiryAPI = {
  create: async (inquiry) => dataOr(await request('/inquiries', { method: 'POST', body: inquiry }), null),
  getAll: () => safe(async () => dataOr(await request('/inquiries'), []), [], 'Error fetching inquiries'),
}

export const activityAPI = {
  getAll: () => safe(async () => dataOr(await request('/activities'), []), [], 'Error fetching activities'),
  getBySlug: (slug) => safe(async () => dataOr(await request(`/activities/${slug}`), null), null, 'Error fetching activity'),
}

export const settingsAPI = {
  getSettings: () => request('/settings'),
}

export const adminAPI = {
  login: (username, password) => request('/admin/login', { method: 'POST', body: { username, password } }),
  logout: () => request('/admin/logout', { method: 'POST' }),
  me: () => request('/admin/me'),

  getItineraries: () => request('/admin/itineraries'),
  getHotels: () => request('/admin/hotels'),
  getCarRentals: () => request('/admin/car-rentals'),
  getActivities: () => request('/admin/activities'),
  getInquiries: () => request('/admin/inquiries'),
  getReviews: (itineraryId, reviewType) => request('/admin/reviews', { query: { itineraryId, reviewType } }),
  createItinerary: (payload) => request('/admin/itineraries', { method: 'POST', body: payload }),
  createHotel: (payload) => request('/admin/hotels', { method: 'POST', body: payload }),
  createCarRental: (payload) => request('/admin/car-rentals', { method: 'POST', body: payload }),
  createActivity: (payload) => request('/admin/activities', { method: 'POST', body: payload }),
  updateItinerary: (id, payload) => request(`/admin/itineraries/${id}`, { method: 'PUT', body: payload }),
  updateHotel: (id, payload) => request(`/admin/hotels/${id}`, { method: 'PUT', body: payload }),
  updateCarRental: (id, payload) => request(`/admin/car-rentals/${id}`, { method: 'PUT', body: payload }),
  // Activities are slug-based
  updateActivity: (slug, payload) => request(`/admin/activities/${slug}`, { method: 'PUT', body: payload }),
  addDay: (id, payload) => request(`/admin/itineraries/${id}/days`, { method: 'POST', body: payload }),
  updateDay: (id, dayIndex, payload) => request(`/admin/itineraries/${id}/days/${dayIndex}`, { method: 'PUT', body: payload }),
  deleteDay: (id, dayIndex) => request(`/admin/itineraries/${id}/days/${dayIndex}`, { method: 'DELETE' }),
  getItineraryGallery: (id) => request(`/admin/itineraries/${id}/gallery`),
  addItineraryGalleryImages: (id, gallery) => request(`/admin/itineraries/${id}/gallery`, { method: 'POST', body: { gallery } }),
  updateItineraryGalleryImage: (id, imageIndex, image) => request(`/admin/itineraries/${id}/gallery/${imageIndex}`, { method: 'PUT', body: { image } }),
  deleteItineraryGalleryImage: (id, imageIndex) => request(`/admin/itineraries/${id}/gallery/${imageIndex}`, { method: 'DELETE' }),
  deleteReview: (id) => request(`/admin/reviews/${id}`, { method: 'DELETE' }),
  deleteItinerary: (id) => request(`/admin/itineraries/${id}`, { method: 'DELETE' }),
  deleteHotel: (id) => request(`/admin/hotels/${id}`, { method: 'DELETE' }),
  deleteCarRental: (id) => request(`/admin/car-rentals/${id}`, { method: 'DELETE' }),
  deleteActivity: (slug) => request(`/admin/activities/${slug}`, { method: 'DELETE' }),
  getSettings: () => request('/admin/settings'),
  updateSettings: (payload) => request('/admin/settings', { method: 'PUT', body: payload }),
}

