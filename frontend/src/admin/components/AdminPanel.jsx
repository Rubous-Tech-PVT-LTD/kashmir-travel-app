import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Menu, AlertCircle, MapPin, Star, Settings, Building2, Car, Compass, Inbox, FileText } from 'lucide-react'
import { logoutAdmin } from '../../utils/adminAuth'
import { adminAPI } from '../../utils/api'
import { Btn } from './AdminPanelUI'
import ItinerariesTab from '../tabs/ItinerariesTab'
import HotelsTab from '../tabs/HotelsTab'
import CarRentalsTab from '../tabs/CarRentalsTab'
import ActivitiesTab from '../tabs/ActivitiesTab'
import ReviewsTab from '../tabs/ReviewsTab'
import SettingsTab from '../tabs/SettingsTab'
import InquiriesTab from '../tabs/InquiriesTab'
import BlogsTab from '../tabs/BlogsTab'

const INITIAL_ITINERARY_FORM = { title: '', duration: '', price: '', coverImage: '', category: 'popular', isComingSoon: false }
const INITIAL_DAY_FORM = { day: '', title: '', activitiesText: '', accommodation: '', meals: '', notes: '' }
const INITIAL_HOTEL_FORM = {
  name: '',
  location: '',
  nights: '',
  rating: 5,
  price: '',
  image: '',
  description: '',
  amenitiesText: '',
  facilitiesText: '',
  checkInTime: '2:00 PM',
  checkOutTime: '11:00 AM',
  capacity: '2-4 Guests',
}
const INITIAL_CAR_RENTAL_FORM = {
  name: '',
  type: '',
  route: '',
  seats: '',
  price: '',
  image: '',
}
const INITIAL_ACTIVITY_FORM = {
  title: '',
  slug: '',
  coverImage: '',
  contentJson: '',
}

const ADMIN_TABS = [
  { id: 'itineraries', label: 'Itineraries', icon: MapPin },
  { id: 'hotels', label: 'Hotels', icon: Building2 },
  { id: 'car-rentals', label: 'Car Rentals', icon: Car },
  { id: 'activities', label: 'Activities', icon: Compass },
  { id: 'inquiries', label: 'Inquiries', icon: Inbox },
  { id: 'blogs', label: 'Blogs', icon: FileText },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function AdminPanel() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('itineraries')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [itineraries, setItineraries] = useState([])
  const [selectedItineraryId, setSelectedItineraryId] = useState(null)
  const [showNewItineraryForm, setShowNewItineraryForm] = useState(false)
  const [newItineraryForm, setNewItineraryForm] = useState(INITIAL_ITINERARY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [deletingItinerary, setDeletingItinerary] = useState(false)
  const [isEditingTrip, setIsEditingTrip] = useState(false)
  const [editTripForm, setEditTripForm] = useState(INITIAL_ITINERARY_FORM)
  const [updatingTrip, setUpdatingTrip] = useState(false)
  const [gallerySubmitting, setGallerySubmitting] = useState(false)

  const [editingDayIndex, setEditingDayIndex] = useState(null)
  const [dayForm, setDayForm] = useState(INITIAL_DAY_FORM)
  const [submittingDay, setSubmittingDay] = useState(false)

  const [reviews, setReviews] = useState([])
  const [reviewType, setReviewType] = useState('trip')
  const [deletingReview, setDeletingReview] = useState(false)

  const [inquiries, setInquiries] = useState([])
  const [selectedInquiryId, setSelectedInquiryId] = useState('')
  const [loadingInquiries, setLoadingInquiries] = useState(false)

  const [settings, setSettings] = useState({ heroImages: [] })
  const [settingsSubmitting, setSettingsSubmitting] = useState(false)

  const [hotels, setHotels] = useState([])
  const [selectedHotelId, setSelectedHotelId] = useState(null)
  const [showNewHotelForm, setShowNewHotelForm] = useState(false)
  const [isEditingHotel, setIsEditingHotel] = useState(false)
  const [submittingHotel, setSubmittingHotel] = useState(false)
  const [deletingHotel, setDeletingHotel] = useState(false)
  const [hotelForm, setHotelForm] = useState(INITIAL_HOTEL_FORM)

  const [carRentals, setCarRentals] = useState([])
  const [selectedCarRentalId, setSelectedCarRentalId] = useState(null)
  const [showNewCarRentalForm, setShowNewCarRentalForm] = useState(false)
  const [isEditingCarRental, setIsEditingCarRental] = useState(false)
  const [submittingCarRental, setSubmittingCarRental] = useState(false)
  const [deletingCarRental, setDeletingCarRental] = useState(false)
  const [carRentalForm, setCarRentalForm] = useState(INITIAL_CAR_RENTAL_FORM)

  const [activities, setActivities] = useState([])
  const [selectedActivitySlug, setSelectedActivitySlug] = useState('')
  const [isEditingActivity, setIsEditingActivity] = useState(false)
  const [submittingActivity, setSubmittingActivity] = useState(false)
  const [activityForm, setActivityForm] = useState(INITIAL_ACTIVITY_FORM)

  useEffect(() => { fetchItineraries(); fetchHotels(); fetchCarRentals(); fetchActivities(); fetchSettings(); fetchInquiries() }, [])
  useEffect(() => { if (selectedItineraryId) fetchReviews() }, [selectedItineraryId, reviewType])

  const fetchItineraries = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await adminAPI.getItineraries()
      if (data.success) {
        setItineraries(data.data)
        if (data.data.length > 0 && !selectedItineraryId) setSelectedItineraryId(data.data[0]._id)
      } else {
        setError(data.message || 'Failed to load itineraries')
      }
    } catch (err) {
      setError('Error connecting to server: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchReviews = async () => {
    try {
      const data = await adminAPI.getReviews(selectedItineraryId, reviewType)
      if (data.success) setReviews(data.data)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchHotels = async () => {
    try {
      const data = await adminAPI.getHotels()
      if (data.success) {
        setHotels(data.data)
        if (data.data.length > 0 && !selectedHotelId) setSelectedHotelId(data.data[0].id)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const fetchCarRentals = async () => {
    try {
      const data = await adminAPI.getCarRentals()
      if (data.success) {
        setCarRentals(data.data)
        if (data.data.length > 0 && !selectedCarRentalId) setSelectedCarRentalId(data.data[0].id)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const fetchSettings = async () => {
    try {
      const data = await adminAPI.getSettings()
      if (data.success) setSettings({ heroImages: data.data.heroImages || [] })
    } catch (err) {
      console.error(err)
    }
  }

  const fetchActivities = async () => {
    try {
      const data = await adminAPI.getActivities()
      if (data.success) {
        const next = Array.isArray(data.data) ? data.data : []
        setActivities(next)
        if (next.length > 0 && !selectedActivitySlug) {
          setSelectedActivitySlug(next[0].slug || '')
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  const fetchInquiries = async () => {
    try {
      setLoadingInquiries(true)
      const data = await adminAPI.getInquiries()
      if (data.success) {
        const next = Array.isArray(data.data) ? data.data : []
        setInquiries(next)
        if (next.length > 0 && !selectedInquiryId) setSelectedInquiryId(next[0]._id)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingInquiries(false)
    }
  }

  const selectedItinerary = itineraries.find((it) => it._id === selectedItineraryId)
  const selectedHotel = hotels.find((hotel) => hotel.id === Number(selectedHotelId))
  const selectedCarRental = carRentals.find((rental) => rental.id === Number(selectedCarRentalId))
  const selectedActivity = activities.find(
    (activity) => selectedActivitySlug && activity.slug === selectedActivitySlug
  )
  const selectedInquiry = inquiries.find((inquiry) => inquiry._id === selectedInquiryId)

  const resetHotelForm = () => {
    setHotelForm(INITIAL_HOTEL_FORM)
  }

  const buildHotelPayload = () => {
    const amenities = hotelForm.amenitiesText.split(',').map((item) => item.trim()).filter(Boolean)
    const facilities = hotelForm.facilitiesText.split(',').map((item) => item.trim()).filter(Boolean)

    return {
      name: hotelForm.name,
      location: hotelForm.location,
      nights: hotelForm.nights,
      rating: Number(hotelForm.rating),
      price: hotelForm.price,
      image: hotelForm.image,
      images: hotelForm.image ? [hotelForm.image] : [],
      description: hotelForm.description,
      amenities,
      facilities,
      checkInTime: hotelForm.checkInTime,
      checkOutTime: hotelForm.checkOutTime,
      capacity: hotelForm.capacity,
    }
  }

  const resetCarRentalForm = () => {
    setCarRentalForm(INITIAL_CAR_RENTAL_FORM)
  }

  const resetActivityForm = () => {
    setActivityForm(INITIAL_ACTIVITY_FORM)
  }

  const buildCarRentalPayload = () => ({
    name: carRentalForm.name,
    type: carRentalForm.type,
    route: carRentalForm.route,
    seats: carRentalForm.seats,
    price: carRentalForm.price,
    image: carRentalForm.image,
  })

  const buildActivityPayload = (baseActivity = null) => {
    let content = {}
    const raw = String(activityForm.contentJson || '').trim()
    if (raw) {
      content = JSON.parse(raw)
    }

    return {
      // Content-only editing: keep identity fields from existing activity.
      title: baseActivity?.title || activityForm.title,
      slug: baseActivity?.slug || activityForm.slug,
      coverImage: baseActivity?.coverImage || activityForm.coverImage,
      content,
    }
  }

  const handleCreateItinerary = async () => {
    if (!newItineraryForm.title || !newItineraryForm.duration || !newItineraryForm.price || !newItineraryForm.coverImage) return setError('All fields are required')
    try {
      setSubmitting(true)
      setError('')
      const data = await adminAPI.createItinerary({ ...newItineraryForm, price: Number(newItineraryForm.price) })
      if (data.success) {
        setItineraries([...itineraries, data.data])
        setSelectedItineraryId(data.data._id)
        setNewItineraryForm(INITIAL_ITINERARY_FORM)
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

  const handleDeleteItinerary = async () => {
    if (!selectedItineraryId || !confirm('Delete this entire itinerary? This cannot be undone.')) return
    try {
      setDeletingItinerary(true)
      setError('')
      const data = await adminAPI.deleteItinerary(selectedItineraryId)
      if (data.success) {
        const remaining = itineraries.filter((it) => it._id !== selectedItineraryId)
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

  const handleEditTrip = () => {
    if (!selectedItinerary) return
    setEditTripForm({
      title: selectedItinerary.title,
      duration: selectedItinerary.duration,
      price: selectedItinerary.price,
      coverImage: selectedItinerary.coverImage,
      category: selectedItinerary.category || 'popular',
      isComingSoon: selectedItinerary.isComingSoon || false,
      tag: selectedItinerary.tag || '',
      tagColor: selectedItinerary.tagColor || '#2563eb',
    })
    setIsEditingTrip(true)
    setError('')
  }

  const handleUpdateTrip = async () => {
    if (!editTripForm.title || !editTripForm.duration || !editTripForm.price || !editTripForm.coverImage) return setError('All fields are required')
    try {
      setUpdatingTrip(true)
      setError('')
      const data = await adminAPI.updateItinerary(selectedItineraryId, { 
        ...editTripForm, 
        price: Number(editTripForm.price),
        category: editTripForm.category 
      })
      if (data.success) {
        setItineraries(itineraries.map((it) => (it._id === selectedItineraryId ? data.data : it)))
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

  const syncSelectedItineraryGallery = (gallery) => {
    setItineraries((prev) => prev.map((it) => (
      it._id === selectedItineraryId ? { ...it, gallery: Array.isArray(gallery) ? gallery : [] } : it
    )))
  }

  const handleAddGalleryImages = async (gallery) => {
    if (!selectedItineraryId) return
    try {
      setGallerySubmitting(true)
      setError('')
      const data = await adminAPI.addItineraryGalleryImages(selectedItineraryId, gallery)
      if (data.success) {
        syncSelectedItineraryGallery(data.data)
      } else {
        setError(data.message || 'Failed to add gallery images')
      }
    } catch (err) {
      setError('Error: ' + err.message)
    } finally {
      setGallerySubmitting(false)
    }
  }

  const handleUpdateGalleryImage = async (imageIndex, image) => {
    if (!selectedItineraryId) return
    try {
      setGallerySubmitting(true)
      setError('')
      const data = await adminAPI.updateItineraryGalleryImage(selectedItineraryId, imageIndex, image)
      if (data.success) {
        syncSelectedItineraryGallery(data.data)
      } else {
        setError(data.message || 'Failed to update gallery image')
      }
    } catch (err) {
      setError('Error: ' + err.message)
    } finally {
      setGallerySubmitting(false)
    }
  }

  const handleDeleteGalleryImage = async (imageIndex) => {
    if (!selectedItineraryId) return
    try {
      setGallerySubmitting(true)
      setError('')
      const data = await adminAPI.deleteItineraryGalleryImage(selectedItineraryId, imageIndex)
      if (data.success) {
        syncSelectedItineraryGallery(data.data)
      } else {
        setError(data.message || 'Failed to delete gallery image')
      }
    } catch (err) {
      setError('Error: ' + err.message)
    } finally {
      setGallerySubmitting(false)
    }
  }

  const handleAddDay = async () => {
    if (!dayForm.day || !dayForm.title || !dayForm.activitiesText) return setError('Day, title and activities are required')
    const activities = dayForm.activitiesText.split(',').map((a) => a.trim()).filter(Boolean)
    if (!activities.length) return setError('Please add at least one activity')
    try {
      setSubmittingDay(true)
      setError('')
      const payload = {
        day: dayForm.day,
        title: dayForm.title,
        activities,
        accommodation: dayForm.accommodation || 'N/A',
        meals: dayForm.meals || 'N/A',
        notes: dayForm.notes,
      }
      const data = editingDayIndex !== null
        ? await adminAPI.updateDay(selectedItineraryId, editingDayIndex, payload)
        : await adminAPI.addDay(selectedItineraryId, payload)
      if (data.success) {
        setItineraries(itineraries.map((it) => (it._id === selectedItineraryId ? data.data : it)))
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
      notes: day.notes || '',
    })
    setEditingDayIndex(index)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDeleteDay = async (index) => {
    if (!confirm('Delete this day?')) return
    try {
      setError('')
      const data = await adminAPI.deleteDay(selectedItineraryId, index)
      if (data.success) {
        setItineraries(itineraries.map((it) => (it._id === selectedItineraryId ? data.data : it)))
        resetDayForm()
      } else {
        setError(data.message || 'Failed to delete day')
      }
    } catch (err) {
      setError('Error: ' + err.message)
    }
  }

  const handleDeleteReview = async (reviewId) => {
    if (!confirm('Delete this review?')) return
    try {
      setDeletingReview(true)
      setError('')
      const data = await adminAPI.deleteReview(reviewId)
      if (data.success) {
        setReviews(reviews.filter((r) => r._id !== reviewId))
      } else {
        setError(data.message || 'Failed to delete review')
      }
    } catch (err) {
      setError('Error: ' + err.message)
    } finally {
      setDeletingReview(false)
    }
  }

  const resetDayForm = () => {
    setDayForm(INITIAL_DAY_FORM)
    setEditingDayIndex(null)
  }

  const handleUpdateSettings = async () => {
    if (!settings.heroImages?.length) return setError('At least one banner image URL is required')
    try {
      setSettingsSubmitting(true)
      setError('')
      const data = await adminAPI.updateSettings(settings)
      if (data.success) {
        setSettings({ heroImages: data.data.heroImages || [] })
        alert('Settings saved!')
      } else {
        setError(data.message || 'Failed to update settings')
      }
    } catch (err) {
      setError('Error: ' + err.message)
    } finally {
      setSettingsSubmitting(false)
    }
  }

  const handleCreateHotel = async () => {
    if (!hotelForm.name || !hotelForm.location || !hotelForm.nights || !hotelForm.price || !hotelForm.image) return setError('Name, location, nights, price and image are required for hotel')

    try {
      setSubmittingHotel(true)
      setError('')
      const data = await adminAPI.createHotel(buildHotelPayload())
      if (data.success) {
        const nextHotels = [...hotels, data.data].sort((a, b) => a.id - b.id)
        setHotels(nextHotels)
        setSelectedHotelId(data.data.id)
        setShowNewHotelForm(false)
        resetHotelForm()
      } else {
        setError(data.message || 'Failed to create hotel')
      }
    } catch (err) {
      setError('Error: ' + err.message)
    } finally {
      setSubmittingHotel(false)
    }
  }

  const handleStartEditHotel = () => {
    if (!selectedHotel) return
    setHotelForm({
      name: selectedHotel.name || '',
      location: selectedHotel.location || '',
      nights: selectedHotel.nights || '',
      rating: selectedHotel.rating || 5,
      price: selectedHotel.price || '',
      image: selectedHotel.image || '',
      description: selectedHotel.description || '',
      amenitiesText: Array.isArray(selectedHotel.amenities) ? selectedHotel.amenities.join(', ') : '',
      facilitiesText: Array.isArray(selectedHotel.facilities) ? selectedHotel.facilities.join(', ') : '',
      checkInTime: selectedHotel.checkInTime || '2:00 PM',
      checkOutTime: selectedHotel.checkOutTime || '11:00 AM',
      capacity: selectedHotel.capacity || '2-4 Guests',
    })
    setIsEditingHotel(true)
    setShowNewHotelForm(false)
  }

  const handleUpdateHotel = async () => {
    if (!selectedHotelId) return
    if (!hotelForm.name || !hotelForm.location || !hotelForm.nights || !hotelForm.price || !hotelForm.image) return setError('Name, location, nights, price and image are required for hotel')

    try {
      setSubmittingHotel(true)
      setError('')
      const data = await adminAPI.updateHotel(selectedHotelId, buildHotelPayload())
      if (data.success) {
        setHotels(hotels.map((hotel) => (hotel.id === Number(selectedHotelId) ? data.data : hotel)))
        setIsEditingHotel(false)
        resetHotelForm()
      } else {
        setError(data.message || 'Failed to update hotel')
      }
    } catch (err) {
      setError('Error: ' + err.message)
    } finally {
      setSubmittingHotel(false)
    }
  }

  const handleDeleteHotel = async () => {
    if (!selectedHotelId || !confirm('Delete this hotel? This cannot be undone.')) return

    try {
      setDeletingHotel(true)
      setError('')
      const data = await adminAPI.deleteHotel(selectedHotelId)
      if (data.success) {
        const remaining = hotels.filter((hotel) => hotel.id !== Number(selectedHotelId))
        setHotels(remaining)
        setSelectedHotelId(remaining.length > 0 ? remaining[0].id : null)
        setIsEditingHotel(false)
        resetHotelForm()
      } else {
        setError(data.message || 'Failed to delete hotel')
      }
    } catch (err) {
      setError('Error: ' + err.message)
    } finally {
      setDeletingHotel(false)
    }
  }

  const handleCreateCarRental = async () => {
    if (!carRentalForm.name || !carRentalForm.type || !carRentalForm.route || !carRentalForm.seats || !carRentalForm.price || !carRentalForm.image) return setError('Name, type, route, seats, price and image are required for car rental')

    try {
      setSubmittingCarRental(true)
      setError('')
      const data = await adminAPI.createCarRental(buildCarRentalPayload())
      if (data.success) {
        const nextRentals = [...carRentals, data.data].sort((a, b) => a.id - b.id)
        setCarRentals(nextRentals)
        setSelectedCarRentalId(data.data.id)
        setShowNewCarRentalForm(false)
        resetCarRentalForm()
      } else {
        setError(data.message || 'Failed to create car rental')
      }
    } catch (err) {
      setError('Error: ' + err.message)
    } finally {
      setSubmittingCarRental(false)
    }
  }

  const handleStartEditCarRental = () => {
    if (!selectedCarRental) return
    setCarRentalForm({
      name: selectedCarRental.name || '',
      type: selectedCarRental.type || '',
      route: selectedCarRental.route || '',
      seats: selectedCarRental.seats || '',
      price: selectedCarRental.price || '',
      image: selectedCarRental.image || '',
    })
    setIsEditingCarRental(true)
    setShowNewCarRentalForm(false)
  }

  const handleUpdateCarRental = async () => {
    if (!selectedCarRentalId) return
    if (!carRentalForm.name || !carRentalForm.type || !carRentalForm.route || !carRentalForm.seats || !carRentalForm.price || !carRentalForm.image) return setError('Name, type, route, seats, price and image are required for car rental')

    try {
      setSubmittingCarRental(true)
      setError('')
      const data = await adminAPI.updateCarRental(selectedCarRentalId, buildCarRentalPayload())
      if (data.success) {
        setCarRentals(carRentals.map((rental) => (rental.id === Number(selectedCarRentalId) ? data.data : rental)))
        setIsEditingCarRental(false)
        resetCarRentalForm()
      } else {
        setError(data.message || 'Failed to update car rental')
      }
    } catch (err) {
      setError('Error: ' + err.message)
    } finally {
      setSubmittingCarRental(false)
    }
  }

  const handleDeleteCarRental = async () => {
    if (!selectedCarRentalId || !confirm('Delete this car rental? This cannot be undone.')) return

    try {
      setDeletingCarRental(true)
      setError('')
      const data = await adminAPI.deleteCarRental(selectedCarRentalId)
      if (data.success) {
        const remaining = carRentals.filter((rental) => rental.id !== Number(selectedCarRentalId))
        setCarRentals(remaining)
        setSelectedCarRentalId(remaining.length > 0 ? remaining[0].id : null)
        setIsEditingCarRental(false)
        resetCarRentalForm()
      } else {
        setError(data.message || 'Failed to delete car rental')
      }
    } catch (err) {
      setError('Error: ' + err.message)
    } finally {
      setDeletingCarRental(false)
    }
  }

  const handleStartEditActivity = () => {
    if (!selectedActivity) return
    setActivityForm({
      title: selectedActivity.title || '',
      slug: selectedActivity.slug || '',
      coverImage: selectedActivity.coverImage || '',
      contentJson: JSON.stringify(selectedActivity.content || {}, null, 2),
    })
    setIsEditingActivity(true)
  }

  const handleUpdateActivity = async () => {
    const targetSlug = selectedActivity?.slug || selectedActivitySlug
    if (!targetSlug) return setError('Unable to update this activity because slug is missing')
    if (!selectedActivity?.title || !selectedActivity?.slug) return setError('Activity metadata is missing')
    try {
      setSubmittingActivity(true)
      setError('')
      const payload = buildActivityPayload(selectedActivity)
      const data = await adminAPI.updateActivity(targetSlug, payload)

      if (data.success) {
        setActivities(activities.map((activity) =>
          activity.slug === selectedActivitySlug ? data.data : activity
        ))
        setSelectedActivitySlug(data.data?.slug || selectedActivitySlug)
        setIsEditingActivity(false)
        resetActivityForm()
      } else {
        setError(data.message || 'Failed to update activity')
      }
    } catch (err) {
      const details = err?.data?.error ? ` (${err.data.error})` : ''
      setError('Error: ' + (err.message || 'Failed to update activity') + details)
    } finally {
      setSubmittingActivity(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#f4f8fb] via-[#eef5fa] to-[#e7f1f8] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mx-auto animate-pulse shadow-md shadow-slate-300/40">
            <img src="/logo.png" alt="Kashmir Tour Travel" className="w-11 h-11 object-contain" />
          </div>
          <div>
            <p className="text-slate-800 font-semibold">Loading dashboard</p>
            <p className="text-slate-400 text-sm mt-1">Just a moment...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f4f8fb] via-[#edf4fa] to-[#e7f0f8] font-sans relative overflow-x-hidden">
      <div className="pointer-events-none absolute -top-32 -left-28 w-72 h-72 rounded-full bg-[#1e5c91]/10 blur-3xl" />
      <div className="pointer-events-none absolute top-24 -right-20 w-72 h-72 rounded-full bg-[#3dba8f]/10 blur-3xl" />

      <header className="sticky top-0 z-40 border-b border-slate-700/20 shadow-lg shadow-[#0b3d66]/20" style={{ background: 'linear-gradient(90deg, #0b3d66 0%, #1e5c91 62%, #2b7ab7 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/95 border border-white/30 flex items-center justify-center shrink-0">
              <img src="/logo.png" alt="Kashmir Tour Travel" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
            </div>
            <div>
              <span className="text-sm font-bold text-white leading-none whitespace-nowrap">Kashmir Tour Travel</span>
              <span className="text-[10px] sm:text-xs text-sky-100/90 block leading-none">Admin Dashboard</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {ADMIN_TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === t.id
                    ? 'bg-whieen-te text-[#0b3d66] shadow-sm'
                    : 'text-sky-100 hover:text-white hover:bg-white/15'
                }`}
              >
                <t.icon size={14} />
                {t.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Btn
              variant="danger"
              size="sm"
              onClick={async () => { await logoutAdmin(); navigate('/admin/login', { replace: true }) }}
              className="hidden lg:flex bg-white! border! border-white/60! text-[#0b3d66]! hover:bg-slate-100! text-xs py-1.5"
            >
              Sign out
            </Btn>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-sky-100 hover:text-white hover:bg-white/15 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#0b3d66]/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Drawer */}
          <div className="absolute top-0 right-0 bottom-0 w-[280px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0b3d66] flex items-center justify-center">
                  <img src="/logo.png" alt="" className="w-5 h-5 object-contain brightness-0 invert" />
                </div>
                <span className="font-bold text-slate-800 text-sm">Dashboard</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              {ADMIN_TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setActiveTab(t.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === t.id
                      ? 'bg-sky-50 text-[#0b3d66] shadow-sm ring-1 ring-[#0b3d66]/10'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <t.icon size={18} className={activeTab === t.id ? 'text-[#0b3d66]' : 'text-slate-400'} />
                  {t.label}
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-slate-100">
              <button
                onClick={async () => { 
                  setIsMobileMenuOpen(false)
                  await logoutAdmin()
                  navigate('/admin/login', { replace: true }) 
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="max-w-7xl mx-auto px-6 mt-4">
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            <AlertCircle size={15} className="shrink-0" />
            <span className="flex-1">{error}</span>
            <button onClick={() => setError('')} className="text-red-400 hover:text-red-600"><X size={14} /></button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-6 relative z-10">
        {activeTab === 'itineraries' && (
          <ItinerariesTab
            showNewItineraryForm={showNewItineraryForm}
            setShowNewItineraryForm={setShowNewItineraryForm}
            newItineraryForm={newItineraryForm}
            setNewItineraryForm={setNewItineraryForm}
            handleCreateItinerary={handleCreateItinerary}
            submitting={submitting}
            itineraries={itineraries}
            selectedItineraryId={selectedItineraryId}
            setSelectedItineraryId={setSelectedItineraryId}
            setIsEditingTrip={setIsEditingTrip}
            resetDayForm={resetDayForm}
            selectedItinerary={selectedItinerary}
            handleEditTrip={handleEditTrip}
            isEditingTrip={isEditingTrip}
            handleDeleteItinerary={handleDeleteItinerary}
            deletingItinerary={deletingItinerary}
            editTripForm={editTripForm}
            setEditTripForm={setEditTripForm}
            handleUpdateTrip={handleUpdateTrip}
            updatingTrip={updatingTrip}
            gallerySubmitting={gallerySubmitting}
            handleAddGalleryImages={handleAddGalleryImages}
            handleUpdateGalleryImage={handleUpdateGalleryImage}
            handleDeleteGalleryImage={handleDeleteGalleryImage}
            dayForm={dayForm}
            setDayForm={setDayForm}
            handleAddDay={handleAddDay}
            submittingDay={submittingDay}
            editingDayIndex={editingDayIndex}
            handleEditDay={handleEditDay}
            handleDeleteDay={handleDeleteDay}
          />
        )}

        {activeTab === 'hotels' && (
          <HotelsTab
            showNewHotelForm={showNewHotelForm}
            setShowNewHotelForm={setShowNewHotelForm}
            setIsEditingHotel={setIsEditingHotel}
            resetHotelForm={resetHotelForm}
            hotelForm={hotelForm}
            setHotelForm={setHotelForm}
            handleCreateHotel={handleCreateHotel}
            submittingHotel={submittingHotel}
            hotels={hotels}
            selectedHotelId={selectedHotelId}
            setSelectedHotelId={setSelectedHotelId}
            selectedHotel={selectedHotel}
            handleStartEditHotel={handleStartEditHotel}
            isEditingHotel={isEditingHotel}
            handleDeleteHotel={handleDeleteHotel}
            deletingHotel={deletingHotel}
            handleUpdateHotel={handleUpdateHotel}
          />
        )}

        {activeTab === 'car-rentals' && (
          <CarRentalsTab
            showNewCarRentalForm={showNewCarRentalForm}
            setShowNewCarRentalForm={setShowNewCarRentalForm}
            setIsEditingCarRental={setIsEditingCarRental}
            resetCarRentalForm={resetCarRentalForm}
            carRentalForm={carRentalForm}
            setCarRentalForm={setCarRentalForm}
            handleCreateCarRental={handleCreateCarRental}
            submittingCarRental={submittingCarRental}
            carRentals={carRentals}
            selectedCarRentalId={selectedCarRentalId}
            setSelectedCarRentalId={setSelectedCarRentalId}
            selectedCarRental={selectedCarRental}
            handleStartEditCarRental={handleStartEditCarRental}
            isEditingCarRental={isEditingCarRental}
            handleDeleteCarRental={handleDeleteCarRental}
            deletingCarRental={deletingCarRental}
            handleUpdateCarRental={handleUpdateCarRental}
          />
        )}

        {activeTab === 'activities' && (
          <ActivitiesTab
            setIsEditingActivity={setIsEditingActivity}
            resetActivityForm={resetActivityForm}
            activityForm={activityForm}
            setActivityForm={setActivityForm}
            submittingActivity={submittingActivity}
            activities={activities}
            selectedActivitySlug={selectedActivitySlug}
            setSelectedActivitySlug={setSelectedActivitySlug}
            selectedActivity={selectedActivity}
            handleStartEditActivity={handleStartEditActivity}
            isEditingActivity={isEditingActivity}
            handleUpdateActivity={handleUpdateActivity}
          />
        )}

        {activeTab === 'reviews' && (
          <ReviewsTab
            reviewType={reviewType}
            setReviewType={setReviewType}
            selectedItineraryId={selectedItineraryId}
            setSelectedItineraryId={setSelectedItineraryId}
            itineraries={itineraries}
            reviews={reviews}
            handleDeleteReview={handleDeleteReview}
            deletingReview={deletingReview}
          />
        )}

        {activeTab === 'inquiries' && (
          <InquiriesTab
            inquiries={inquiries}
            loading={loadingInquiries}
            selectedInquiryId={selectedInquiryId}
            setSelectedInquiryId={setSelectedInquiryId}
            selectedInquiry={selectedInquiry}
          />
        )}

        {activeTab === 'blogs' && (
          <BlogsTab />
        )}

        {activeTab === 'settings' && (
          <SettingsTab
            settings={settings}
            setSettings={setSettings}
            handleUpdateSettings={handleUpdateSettings}
            settingsSubmitting={settingsSubmitting}
          />
        )}
      </div>
    </div>
  )
}
