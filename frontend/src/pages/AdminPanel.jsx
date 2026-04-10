// @ts-nocheck
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutAdmin } from '../utils/adminAuth'
import { Plus, Edit2, Trash2, X, Loader, Home, MapPin, Star, CalendarDays, Users, Settings, Menu, ChevronLeft } from 'lucide-react'
import { adminAPI } from '../utils/api'
import ItinerariesTab from '../components/ItinerariesTab'
import ReviewsTab from '../components/ReviewsTab'
import SettingsTab from '../components/SettingsTab'

const tripCategoryOptions = [
  { label: 'Popular', value: 'popular' },
  { label: 'Day-wise', value: 'daywise' },
  { label: 'Romantic Tour', value: 'romantic-tour' },
  { label: 'Couple Tour', value: 'couple-tour' },
  { label: 'Group Tour', value: 'group-tour' },
  { label: 'Family Tour', value: 'family-tour' },
  { label: 'Honeymoon Packages', value: 'honeymoon-packages' },
  { label: 'Adventure Trek', value: 'adventure-trek' },
  { label: 'Couple Special', value: 'couple-special' }
]

export default function AdminPanel() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('itineraries')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const adminMenu = [
    { key: 'itineraries', label: 'Itineraries', icon: MapPin },
    { key: 'reviews', label: 'Reviews', icon: Star },
    { key: 'settings', label: 'Settings', icon: Settings }
  ]

  const activeTabLabel = adminMenu.find(item => item.key === activeTab)?.label || 'Itineraries'

  // Itinerary state
  const [itineraries, setItineraries] = useState([])
  const [selectedItineraryId, setSelectedItineraryId] = useState(null)
  const [showNewItineraryForm, setShowNewItineraryForm] = useState(false)
  const [isEditingItinerary, setIsEditingItinerary] = useState(false)
  const [newItineraryForm, setNewItineraryForm] = useState({
    title: '',
    duration: '',
    price: '',
    coverImage: '',
    category: 'popular',
    description: '',
    isComingSoon: false
  })
  const [submitting, setSubmitting] = useState(false)
  const [deletingItinerary, setDeletingItinerary] = useState(false)
  const [isEditingTrip, setIsEditingTrip] = useState(false)
  const [editTripForm, setEditTripForm] = useState({
    title: '',
    duration: '',
    price: '',
    coverImage: '',
    category: 'popular',
    isComingSoon: false
  })
  const [updatingTrip, setUpdatingTrip] = useState(false)
  const [settings, setSettings] = useState({ heroImages: [] })
  const [settingsSubmitting, setSettingsSubmitting] = useState(false)

  // Day management state
  const [editingDayIndex, setEditingDayIndex] = useState(null)
  const [dayForm, setDayForm] = useState({ day: '', title: '', activitiesText: '', accommodation: '', meals: '', notes: '' })
  const [submittingDay, setSubmittingDay] = useState(false)

  // Review state
  const [reviews, setReviews] = useState([])
  const [reviewType, setReviewType] = useState('trip')
  const [deletingReviewId, setDeletingReviewId] = useState(null)
  const [deletingReview, setDeletingReview] = useState(false)
  const [reviewStatus, setReviewStatus] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  // Load itineraries on mount
  useEffect(() => {
    fetchItineraries()
    fetchSettings()
  }, [])

  // Load reviews when selected itinerary changes
  useEffect(() => {
    if (selectedItineraryId) {
      fetchReviews()
    } else {
      setReviews([])
    }
  }, [selectedItineraryId, reviewType])

  // Keep settings fresh whenever Settings tab is opened
  useEffect(() => {
    if (activeTab === 'settings') {
      fetchSettings()
    }
  }, [activeTab])

  const fetchItineraries = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await adminAPI.getItineraries()

      if (data.success) {
        const fetchedItineraries = data.data || []
        setItineraries(fetchedItineraries)
        if (fetchedItineraries.length > 0) {
          if (!selectedItineraryId || !fetchedItineraries.some(it => it._id === selectedItineraryId)) {
            setSelectedItineraryId(fetchedItineraries[0]._id)
          }
        } else {
          setSelectedItineraryId(null)
          setReviews([])
        }
      } else {
        setError(data.message || 'Failed to load itineraries')
      }
    } catch (err) {
      setError('Error connecting to server: ' + err.message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchReviews = async () => {
    try {
      const data = await adminAPI.getReviews(selectedItineraryId, reviewType)

      if (data.success) {
        setReviews(data.data || [])
      } else {
        setReviews([])
        setError(data.message || 'Failed to load reviews')
      }
    } catch (err) {
      console.error('Error fetching reviews:', err)
      setReviews([])
      setError('Error fetching reviews: ' + err.message)
    }
  }

  const fetchSettings = async () => {
    try {
      const data = await adminAPI.getSettings()
      if (data.success) {
        setSettings({ heroImages: data.data.heroImages || [] })
      } else {
        setError(data.message || 'Failed to load settings')
      }
    } catch (err) {
      console.error('Error fetching settings:', err)
      setError('Error fetching settings: ' + err.message)
    }
  }

  const updateHeroImageUrl = (index, value) => {
    const newImages = [...settings.heroImages]
    newImages[index] = value
    setSettings({
      ...settings,
      heroImages: newImages
    })
  }

  const handleUpdateSettings = async () => {
    if (!settings.heroImages || settings.heroImages.length === 0) {
      setError('At least one banner image URL is required')
      return
    }

    try {
      setSettingsSubmitting(true)
      setError('')
      const data = await adminAPI.updateSettings(settings)
      if (data.success) {
        await fetchSettings()
        alert('Settings updated successfully!')
      } else {
        setError(data.message || 'Failed to update settings')
      }
    } catch (err) {
      setError('Error: ' + err.message)
    } finally {
      setSettingsSubmitting(false)
    }
  }

  const addHeroImageUrl = () => {
    setSettings({
      ...settings,
      heroImages: [...settings.heroImages, '']
    })
  }

  const removeHeroImageUrl = (index) => {
    const newImages = [...settings.heroImages]
    newImages.splice(index, 1)
    setSettings({
      ...settings,
      heroImages: newImages
    })
  }

  const selectedItinerary = itineraries.find(it => it._id === selectedItineraryId)

  const handleCreateItinerary = async () => {
    // Validate all required fields
    const title = newItineraryForm.title?.trim()
    const duration = newItineraryForm.duration?.trim()
    const price = newItineraryForm.price
    const coverImage = newItineraryForm.coverImage
    const category = newItineraryForm.category

    if (!title || !duration || !price || !coverImage || !category) {
      setError('All fields are required (Title, Duration, Price, Category, and Cover Image)')
      return
    }

    try {
      setSubmitting(true)
      setError('')

      if (isEditingItinerary) {
        const data = await adminAPI.updateItinerary(selectedItineraryId, {
          title: title,
          duration: duration,
          price: Number(price),
          coverImage: coverImage,
          description: newItineraryForm.description || '',
          isComingSoon: newItineraryForm.isComingSoon || false,
          category: category
        })

        if (data.success && data.data) {
          setItineraries(prev =>
            prev.map(it => it._id === selectedItineraryId ? data.data : it)
          )
        } else {
          setError(data.message || 'Failed to update itinerary')
          return
        }
      } else {
        const data = await adminAPI.createItinerary({
          title: title,
          duration: duration,
          price: Number(price),
          coverImage: coverImage,
          description: newItineraryForm.description || '',
          isComingSoon: newItineraryForm.isComingSoon || false,
          category: category
        })

        if (data.success && data.data) {
          setItineraries(prev => [...prev, data.data])
          setSelectedItineraryId(data.data._id)
        } else {
          setError(data.message || 'Failed to create itinerary')
          return
        }
      }

      // Reset form
      setNewItineraryForm({
        title: '',
        duration: '',
        price: '',
        coverImage: '',
        category: 'popular',
        description: '',
        isComingSoon: false
      })
      setShowNewItineraryForm(false)
      setIsEditingItinerary(false)
    } catch (err) {
      setError('Error: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteItinerary = async () => {
    if (!selectedItineraryId) return
    if (!confirm('Are you sure you want to delete this ENTIRE itinerary? This action cannot be undone.')) return

    try {
      setDeletingItinerary(true)
      setError('')
      const data = await adminAPI.deleteItinerary(selectedItineraryId)

      if (data.success) {
        const remaining = itineraries.filter(it => it._id !== selectedItineraryId)
        setItineraries(remaining)
        setSelectedItineraryId(remaining.length > 0 ? remaining[0]._id : null)
      } else {
        setError(data.message || 'Failed to delete itinerary')
      }
    } catch (err) {
      setError('Error: ' + err.message)
    } finally {
      setDeletingItinerary(false)
    }
  }

  const handleDeleteItineraryById = async (itineraryId) => {
    if (!itineraryId) return

    try {
      setDeletingItinerary(true)
      setError('')
      const data = await adminAPI.deleteItinerary(itineraryId)
      if (data.success) {
        const remaining = itineraries.filter(it => it._id !== itineraryId)
        setItineraries(remaining)
        if (selectedItineraryId === itineraryId) {
          setSelectedItineraryId(remaining.length > 0 ? remaining[0]._id : null)
        }
      } else {
        setError(data.message || 'Failed to delete itinerary')
      }
    } catch (err) {
      setError('Error: ' + err.message)
    } finally {
      setDeletingItinerary(false)
    }
  }

  const handleEditTrip = () => {
    if (!selectedItinerary) return
    setEditTripForm({
      title: selectedItinerary.title,
      duration: selectedItinerary.duration,
      price: selectedItinerary.price,
      coverImage: selectedItinerary.coverImage,
      category: selectedItinerary.category || 'popular',
      isComingSoon: selectedItinerary.isComingSoon || false
    })
    setIsEditingTrip(true)
    setError('')
  }

  const handleUpdateTrip = async () => {
    if (!editTripForm.title || !editTripForm.duration || !editTripForm.price || !editTripForm.coverImage) {
      setError('All fields are required')
      return
    }

    try {
      setUpdatingTrip(true)
      setError('')
      const data = await adminAPI.updateItinerary(selectedItineraryId, {
        ...editTripForm,
        price: Number(editTripForm.price)
      })

      if (data.success) {
        setItineraries(itineraries.map(it => it._id === selectedItineraryId ? data.data : it))
        setIsEditingTrip(false)
      } else {
        setError(data.message || 'Failed to update itinerary')
      }
    } catch (err) {
      setError('Error: ' + err.message)
    } finally {
      setUpdatingTrip(false)
    }
  }

  const handleAddDay = async () => {
    if (!dayForm.day || !dayForm.title || !dayForm.activitiesText) {
      setError('Day, title, and activities are required')
      return
    }

    const activities = dayForm.activitiesText.split(',').map(a => a.trim()).filter(Boolean)
    if (activities.length === 0) {
      setError('Please add at least one activity')
      return
    }

    try {
      setSubmittingDay(true)
      setError('')
      const payload = {
        day: dayForm.day,
        title: dayForm.title,
        activities,
        accommodation: dayForm.accommodation || 'N/A',
        meals: dayForm.meals || 'N/A',
        notes: dayForm.notes
      }

      const data = editingDayIndex !== null
        ? await adminAPI.updateDay(selectedItineraryId, editingDayIndex, payload)
        : await adminAPI.addDay(selectedItineraryId, payload)

      if (data.success) {
        setItineraries(itineraries.map(it => it._id === selectedItineraryId ? data.data : it))
        resetDayForm()
      } else {
        setError(data.message || 'Failed to save day')
      }
    } catch (err) {
      setError('Error: ' + err.message)
    } finally {
      setSubmittingDay(false)
    }
  }

  const handleEditDay = (index) => {
    const day = selectedItinerary.itinerary[index]
    setDayForm({
      day: day.day,
      title: day.title,
      activitiesText: day.activities.join(', '),
      accommodation: day.accommodation,
      meals: day.meals,
      notes: day.notes || ''
    })
    setEditingDayIndex(index)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDeleteDay = async (index) => {
    if (!confirm('Are you sure you want to delete this day?')) return

    try {
      setError('')
      const data = await adminAPI.deleteDay(selectedItineraryId, index)

      if (data.success) {
        setItineraries(itineraries.map(it => it._id === selectedItineraryId ? data.data : it))
        resetDayForm()
      } else {
        setError(data.message || 'Failed to delete day')
      }
    } catch (err) {
      setError('Error: ' + err.message)
    }
  }

  const handleDeleteReview = async (reviewId) => {
    if (!confirm('Are you sure you want to delete this review?')) return

    try {
      setDeletingReview(true)
      setError('')
      const data = await adminAPI.deleteReview(reviewId)

      if (data.success) {
        await fetchReviews()
      } else {
        setError(data.message || 'Failed to delete review')
      }
    } catch (err) {
      setError('Error: ' + err.message)
    } finally {
      setDeletingReview(false)
      setDeletingReviewId(null)
    }
  }

  const resetDayForm = () => {
    setDayForm({ day: '', title: '', activitiesText: '', accommodation: '', meals: '', notes: '' })
    setEditingDayIndex(null)
  }

  const handleLogout = () => {
    logoutAdmin()
    navigate('/admin/login', { replace: true })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-cyan-400 mx-auto mb-4" />
          <p className="text-white text-lg">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Mobile Header with Hamburger Menu */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 text-white text-sm font-black">
            K
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Kashmir Tour Travel</h1>
            <p className="text-xs text-slate-500">Admin Dashboard</p>
          </div>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors duration-200"
        >
          {isSidebarOpen ? <ChevronLeft className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Backdrop for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="min-h-screen lg:min-h-0 flex lg:flex-row flex-col">
        {/* Sidebar */}
        <aside className={`
          fixed top-0 left-0 h-screen w-80 bg-slate-950 text-slate-100 border-r border-slate-800 z-50 transform transition-transform duration-300 ease-in-out
          lg:fixed lg:translate-x-0 lg:z-auto
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="px-6 py-8 h-full overflow-y-auto">
            {/* Close button for mobile */}
            <div className="lg:hidden flex justify-end mb-4">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-10">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 text-white text-lg font-black">
                  K
                </div>
                <div>
                  <h1 className="text-xl font-bold">Kashmir Tour Travel</h1>
                  <p className="text-sm text-slate-400">Admin Dashboard</p>
                </div>
              </div>
            </div>

            <nav className="space-y-2">
              {adminMenu.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.key
                return (
                  <button
                    key={item.key}
                    onClick={() => {
                      setActiveTab(item.key)
                      setIsSidebarOpen(false) // Close sidebar on mobile after selection
                    }}
                    className={`flex w-full items-center gap-3 rounded-3xl px-4 py-4 text-left transition ${isActive ? 'bg-white text-slate-900 shadow-lg shadow-slate-900/10' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
                  >
                    <span className={`grid h-11 w-11 place-items-center rounded-2xl ${isActive ? 'bg-slate-950 text-white' : 'bg-slate-800 text-slate-400'}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-semibold tracking-wide">{item.label}</span>
                  </button>
                )
              })}
            </nav>

            <div className="mt-10 pt-8 border-t border-slate-800">
              <button
                onClick={handleLogout}
                className="w-full rounded-3xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1 bg-slate-100 overflow-y-auto min-h-0 lg:ml-80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-700 px-4 py-4 rounded-3xl mb-6">
                <p>⚠️ {error}</p>
              </div>
            )}

            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Admin workspace</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">{activeTabLabel}</h2>
              <p className="mt-2 max-w-2xl text-slate-600">Manage itineraries, reviews, bookings and user activity from one central dashboard.</p>
            </div>

            <div className="space-y-6">
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Itineraries</p>
                          <h3 className="mt-4 text-3xl font-bold text-slate-900">{itineraries.length}</h3>
                          <p className="mt-2 text-sm text-slate-500">Active itineraries ready to manage.</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-900 text-white shadow-lg shadow-slate-900/10">
                          <MapPin className="h-6 w-6" />
                        </div>
                      </div>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Reviews</p>
                          <h3 className="mt-4 text-3xl font-bold text-slate-900">{reviews.length}</h3>
                          <p className="mt-2 text-sm text-slate-500">Recent feedback across all trips.</p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-900 text-white shadow-lg shadow-slate-900/10">
                          <Star className="h-6 w-6" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Recent Itineraries</p>
                          <h3 className="mt-4 text-xl font-semibold text-slate-900">Latest trips added</h3>
                        </div>
                        <span className="rounded-3xl bg-slate-950/5 px-3 py-2 text-xs font-semibold uppercase text-slate-700">Live</span>
                      </div>
                      <div className="mt-6 space-y-3">
                        {itineraries.slice(0, 3).map((it) => (
                          <div key={it._id} className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <p className="text-sm font-semibold text-slate-900">{it.title}</p>
                                <p className="text-xs text-slate-500">{it.duration}</p>
                              </div>
                              <span className="text-sm font-semibold text-slate-700">₹{it.price.toLocaleString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Review Health</p>
                          <h3 className="mt-4 text-xl font-semibold text-slate-900">Current status</h3>
                        </div>
                        <div className="inline-flex rounded-3xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white">Insights</div>
                      </div>
                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-3xl bg-slate-50 p-4 text-center">
                          <p className="text-sm text-slate-500">Approved</p>
                          <p className="mt-2 text-2xl font-bold text-slate-900">{reviews.filter(r => r.status === 'approved').length}</p>
                        </div>
                        <div className="rounded-3xl bg-slate-50 p-4 text-center">
                          <p className="text-sm text-slate-500">Pending</p>
                          <p className="mt-2 text-2xl font-bold text-amber-600">{reviews.filter(r => r.status === 'pending').length}</p>
                        </div>
                        <div className="rounded-3xl bg-slate-50 p-4 text-center">
                          <p className="text-sm text-slate-500">Flagged</p>
                          <p className="mt-2 text-2xl font-bold text-red-600">{reviews.filter(r => r.status === 'flagged').length}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'itineraries' && (
                <div className="min-h-[400px]">
                  <ItinerariesTab
                    itineraries={itineraries}
                    showNewItineraryForm={showNewItineraryForm}
                    setShowNewItineraryForm={setShowNewItineraryForm}
                    isEditingItinerary={isEditingItinerary}
                    setIsEditingItinerary={setIsEditingItinerary}
                    newItineraryForm={newItineraryForm}
                    setNewItineraryForm={setNewItineraryForm}
                    handleCreateItinerary={handleCreateItinerary}
                    submitting={submitting}
                    tripCategoryOptions={tripCategoryOptions}
                    error={error}
                    setError={setError}
                    selectedItineraryId={selectedItineraryId}
                    setSelectedItineraryId={setSelectedItineraryId}
                    handleDeleteItinerary={handleDeleteItinerary}
                    handleDeleteItineraryById={handleDeleteItineraryById}
                    deletingItinerary={deletingItinerary}
                  />
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="min-h-[400px]">
                  <ReviewsTab
                    reviews={reviews}
                    itineraries={itineraries}
                    reviewType={reviewType}
                    setReviewType={setReviewType}
                    selectedItineraryId={selectedItineraryId}
                    setSelectedItineraryId={setSelectedItineraryId}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    handleDeleteReview={handleDeleteReview}
                    deletingReview={deletingReview}
                    reviewStatus={reviewStatus}
                    setReviewStatus={setReviewStatus}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                  />
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="min-h-[400px]">
                  <SettingsTab
                    settings={settings}
                    addHeroImageUrl={addHeroImageUrl}
                    updateHeroImageUrl={updateHeroImageUrl}
                    removeHeroImageUrl={removeHeroImageUrl}
                    handleUpdateSettings={handleUpdateSettings}
                    settingsSubmitting={settingsSubmitting}
                  />
                </div>
              )}

              {/* Fallback content for debugging */}
              {!['dashboard', 'itineraries', 'reviews', 'settings'].includes(activeTab) && (
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="text-2xl font-bold text-slate-900">Tab: {activeTab}</h3>
                  <p className="mt-3 text-slate-600">This tab content is not yet implemented.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
};

