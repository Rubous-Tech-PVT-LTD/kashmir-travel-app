import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutAdmin } from '../utils/adminAuth'
import { Plus, Edit2, Trash2, X, Loader } from 'lucide-react'
import { adminAPI } from '../utils/api'

export default function AdminPanel() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('itineraries')

  // Itinerary state
  const [itineraries, setItineraries] = useState([])
  const [selectedItineraryId, setSelectedItineraryId] = useState(null)
  const [showNewItineraryForm, setShowNewItineraryForm] = useState(false)
  const [newItineraryForm, setNewItineraryForm] = useState({ title: '', duration: '', price: '', coverImage: '' })
  const [submitting, setSubmitting] = useState(false)

  // Day management state
  const [editingDayIndex, setEditingDayIndex] = useState(null)
  const [dayForm, setDayForm] = useState({ day: '', title: '', activitiesText: '', accommodation: '', meals: '', notes: '' })
  const [submittingDay, setSubmittingDay] = useState(false)

  // Review state
  const [reviews, setReviews] = useState([])
  const [reviewType, setReviewType] = useState('trip')
  const [deletingReviewId, setDeletingReviewId] = useState(null)
  const [deletingReview, setDeletingReview] = useState(false)

  // Load itineraries on mount
  useEffect(() => {
    fetchItineraries()
  }, [])

  // Load reviews when selected itinerary changes
  useEffect(() => {
    if (selectedItineraryId) {
      fetchReviews()
    }
  }, [selectedItineraryId, reviewType])

  const fetchItineraries = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await adminAPI.getItineraries()
      
      if (data.success) {
        setItineraries(data.data)
        if (data.data.length > 0 && !selectedItineraryId) {
          setSelectedItineraryId(data.data[0]._id)
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
        setReviews(data.data)
      }
    } catch (err) {
      console.error('Error fetching reviews:', err)
    }
  }

  const selectedItinerary = itineraries.find(it => it._id === selectedItineraryId)

  const handleCreateItinerary = async () => {
    if (!newItineraryForm.title || !newItineraryForm.duration || !newItineraryForm.price || !newItineraryForm.coverImage) {
      setError('All fields are required')
      return
    }

    try {
      setSubmitting(true)
      setError('')
      const data = await adminAPI.createItinerary({
        title: newItineraryForm.title,
        duration: newItineraryForm.duration,
        price: Number(newItineraryForm.price),
        coverImage: newItineraryForm.coverImage,
      })

      if (data.success) {
        setItineraries([...itineraries, data.data])
        setSelectedItineraryId(data.data._id)
        setNewItineraryForm({ title: '', duration: '', price: '', coverImage: '' })
        setShowNewItineraryForm(false)
      } else {
        setError(data.message || 'Failed to create itinerary')
      }
    } catch (err) {
      setError('Error: ' + err.message)
    } finally {
      setSubmitting(false)
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
        setReviews(reviews.filter(r => r._id !== reviewId))
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-white text-lg">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">🏔️ Admin Dashboard</h1>
              <p className="text-blue-100 mt-2">Manage your Kashmir travel itineraries & reviews</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition transform hover:scale-105"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/20 border-t-4 border-red-500 text-red-300 px-4 py-3 max-w-7xl mx-auto mt-4 rounded">
          <p>⚠️ {error}</p>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-3 mb-8 bg-white/10 p-1 rounded-lg backdrop-blur-sm">
          <button
            onClick={() => setActiveTab('itineraries')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'itineraries'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            📍 Itineraries
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'reviews'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            ⭐ Reviews
          </button>
        </div>

        {/* Itineraries Tab */}
        {activeTab === 'itineraries' && (
          <div className="space-y-6">
            {/* Create New Itinerary */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-white shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">➕ Create New Itinerary</h2>
                <button
                  onClick={() => setShowNewItineraryForm(!showNewItineraryForm)}
                  className="text-2xl text-blue-400 hover:text-blue-300"
                >
                  {showNewItineraryForm ? '−' : '+'}
                </button>
              </div>

              {showNewItineraryForm && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Trip Title"
                    value={newItineraryForm.title}
                    onChange={(e) => setNewItineraryForm({...newItineraryForm, title: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Duration (e.g., 7 Days)"
                    value={newItineraryForm.duration}
                    onChange={(e) => setNewItineraryForm({...newItineraryForm, duration: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={newItineraryForm.price}
                    onChange={(e) => setNewItineraryForm({...newItineraryForm, price: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Cover Image URL"
                    value={newItineraryForm.coverImage}
                    onChange={(e) => setNewItineraryForm({...newItineraryForm, coverImage: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleCreateItinerary}
                      disabled={submitting}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 rounded-lg font-semibold transition disabled:opacity-50"
                    >
                      {submitting ? 'Creating...' : 'Create Itinerary'}
                    </button>
                    <button
                      onClick={() => setShowNewItineraryForm(false)}
                      className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Itinerary Management */}
            {itineraries.length > 0 && (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-white shadow-xl">
                <h2 className="text-2xl font-bold mb-4">Manage Itinerary</h2>

                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">Select Itinerary</label>
                  <select
                    value={selectedItineraryId || ''}
                    onChange={(e) => setSelectedItineraryId(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    {itineraries.map((it) => (
                      <option key={it._id} value={it._id} className="bg-gray-800">
                        {it.title}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedItinerary && (
                  <>
                    {/* Add/Edit Day Form */}
                    <div className="bg-white/5 rounded-lg p-4 mb-6 space-y-4 border border-white/10">
                      <h3 className="font-semibold text-lg">
                        {editingDayIndex !== null ? '✏️ Edit' : '➕ Add'} Day
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          placeholder="Day (e.g., Day 1)"
                          value={dayForm.day}
                          onChange={(e) => setDayForm({...dayForm, day: e.target.value})}
                          className="px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        />
                        <input
                          placeholder="Title"
                          value={dayForm.title}
                          onChange={(e) => setDayForm({...dayForm, title: e.target.value})}
                          className="px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <input
                        placeholder="Activities (comma separated)"
                        value={dayForm.activitiesText}
                        onChange={(e) => setDayForm({...dayForm, activitiesText: e.target.value})}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          placeholder="Accommodation"
                          value={dayForm.accommodation}
                          onChange={(e) => setDayForm({...dayForm, accommodation: e.target.value})}
                          className="px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        />
                        <input
                          placeholder="Meals"
                          value={dayForm.meals}
                          onChange={(e) => setDayForm({...dayForm, meals: e.target.value})}
                          className="px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <textarea
                        placeholder="Notes (optional)"
                        rows="3"
                        value={dayForm.notes}
                        onChange={(e) => setDayForm({...dayForm, notes: e.target.value})}
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                      />

                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={handleAddDay}
                          disabled={submittingDay}
                          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-lg font-semibold transition disabled:opacity-50"
                        >
                          {submittingDay ? 'Saving...' : (editingDayIndex !== null ? '✓ Update' : '✓ Add')}
                        </button>
                        {editingDayIndex !== null && (
                          <button
                            onClick={resetDayForm}
                            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Days List */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg">📋 Days ({selectedItinerary.itinerary?.length || 0})</h3>
                      {selectedItinerary.itinerary?.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">No days added yet</p>
                      ) : (
                        selectedItinerary.itinerary.map((day, index) => (
                          <div key={index} className="bg-white/10 border border-white/20 rounded-lg p-4 hover:bg-white/15 transition">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="text-xl font-bold text-blue-300">{day.day}</h4>
                                <p className="text-lg font-semibold mt-1">{day.title}</p>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditDay(index)}
                                  className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                                >
                                  <Edit2 size={18} />
                                </button>
                                <button
                                  onClick={() => handleDeleteDay(index)}
                                  className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </div>
                            <div className="space-y-2 text-sm text-gray-200">
                              <p><strong>🎯 Activities:</strong> {day.activities?.join(', ')}</p>
                              <p><strong>🏠 Accommodation:</strong> {day.accommodation}</p>
                              <p><strong>🍽️ Meals:</strong> {day.meals}</p>
                              {day.notes && <p><strong>📝 Notes:</strong> {day.notes}</p>}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-white shadow-xl">
              <h2 className="text-2xl font-bold mb-6">⭐ Review Management</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Review Type</label>
                  <select
                    value={reviewType}
                    onChange={(e) => setReviewType(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="trip" className="bg-gray-800">Trip Reviews</option>
                    <option value="daywise" className="bg-gray-800">Day-wise Reviews</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Select Itinerary</label>
                  <select
                    value={selectedItineraryId || ''}
                    onChange={(e) => setSelectedItineraryId(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    {itineraries.map((it) => (
                      <option key={it._id} value={it._id} className="bg-gray-800">
                        {it.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Reviews ({reviews.length})</h3>
                {reviews.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No reviews for this itinerary</p>
                ) : (
                  reviews.map((review) => (
                    <div key={review._id} className="bg-white/10 border border-white/20 rounded-lg p-4 hover:bg-white/15 transition">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold">{review.name}</h4>
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-500'}>★</span>
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-300">{review.comment}</p>
                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteReview(review._id)}
                          disabled={deletingReview}
                          className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition disabled:opacity-50 ml-4"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
