import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {  Star, MapPin, Wifi, UtensilsCrossed, Users, Clock, ArrowLeft, ChevronLeft, ChevronRight, UserCircle2 } from 'lucide-react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import { hotelAPI } from '../utils/api'

export default function HotelDetail() {
  const { hotelId } = useParams()
  const navigate = useNavigate()
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [allReviews, setAllReviews] = useState([])
  const [formData, setFormData] = useState({ name: '', rating: 5, comment: '' })
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    const fetchHotel = async () => {
      setLoading(true)
      setLoadError('')

      try {
        const data = await hotelAPI.getById(hotelId)

        if (!data) {
          setHotel(null)
          setAllReviews([])
          setLoadError('Hotel not found')
          return
        }

        setHotel(data)
        setAllReviews(Array.isArray(data.reviews) ? data.reviews : [])
        setCurrentImageIndex(0)
      } catch (error) {
        console.error('Error fetching hotel details:', error)
        setHotel(null)
        setAllReviews([])
        setLoadError('Failed to load hotel details from server')
      } finally {
        setLoading(false)
      }
    }

    fetchHotel()
  }, [hotelId])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (hotel?.images?.length || 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + (hotel?.images?.length || 1)) % (hotel?.images?.length || 1))
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    setSubmitError('')
    setSubmitSuccess(false)

    // Validation
    if (!formData.name.trim()) {
      setSubmitError('Please enter your name')
      return
    }
    if (formData.comment.trim().length < 10) {
      setSubmitError('Comment must be at least 10 characters long')
      return
    }

    // Create new review object
    const newReview = {
      id: Date.now(),
      name: formData.name.trim(),
      rating: parseInt(formData.rating),
      date: 'just now',
      comment: formData.comment.trim()
    }

    const saveReview = async () => {
      try {
        const createdReview = await hotelAPI.addReview(hotelId, newReview)

        setAllReviews((currentReviews) => [createdReview || newReview, ...currentReviews])
        setFormData({ name: '', rating: 5, comment: '' })
        setSubmitSuccess(true)

        setTimeout(() => setSubmitSuccess(false), 3000)
      } catch (error) {
        console.error('Error saving hotel review:', error)
        setSubmitError(error.message || 'Failed to save review')
      }
    }

    saveReview()
  }

  if (!hotel) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2>{loading ? 'Loading hotel details...' : (loadError || 'Hotel not found')}</h2>
        <button
          onClick={() => navigate('/all-hotels')}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            background: '#3dba8f',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Back to All Hotels
        </button>
      </div>
    )
  }

  const hotelImages = Array.isArray(hotel.images) && hotel.images.length > 0 ? hotel.images : [hotel.image]
  const hotelAmenities = Array.isArray(hotel.amenities) ? hotel.amenities : []
  const hotelFacilities = Array.isArray(hotel.facilities) ? hotel.facilities : []

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", margin: 0, width: '100%', padding: 0 }}>
     

      <Navbar />

      <div style={{ backgroundColor: '#f4f6f8', padding: '30px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Back Button */}
          <button
            onClick={() => navigate('/all-hotels')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              color: '#0b3d66',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '24px',
              padding: 0
            }}
          >
            <ArrowLeft width={18} height={18} />
            Back to All Hotels
          </button>

          {/* Hotel Image Gallery */}
          <div style={{ marginBottom: '30px', position: 'relative' }}>
            <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
              <img
                src={hotelImages[currentImageIndex] || hotel.image}
                alt={`${hotel.name} - Photo ${currentImageIndex + 1}`}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              {hotel.images && hotel.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    style={{
                      position: 'absolute',
                      left: '20px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: 'none',
                      color: '#fff',
                      padding: '12px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <ChevronLeft width={24} height={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    style={{
                      position: 'absolute',
                      right: '20px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: 'none',
                      color: '#fff',
                      padding: '12px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <ChevronRight width={24} height={24} />
                  </button>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(0, 0, 0, 0.6)',
                      color: '#fff',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                  >
                    {currentImageIndex + 1} / {hotel.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Image Thumbnails */}
            {hotel.images && hotel.images.length > 1 && (
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
                {hotelImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${hotel.name} thumbnail ${idx + 1}`}
                    onClick={() => setCurrentImageIndex(idx)}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: currentImageIndex === idx ? '3px solid #3dba8f' : 'none',
                      opacity: currentImageIndex === idx ? 1 : 0.6
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Hotel Header */}
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', marginBottom: '30px' }}>
            <h1 style={{ fontSize: '38px', margin: '0 0 16px', color: '#0f2946' }}>{hotel.name}</h1>

            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin width={20} height={20} color="#3dba8f" />
                <span style={{ fontSize: '16px', color: '#3f5f89' }}>{hotel.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Star width={20} height={20} color="#f4c430" fill="#f4c430" />
                <span style={{ fontSize: '16px', color: '#0f2946', fontWeight: '600' }}>
                  {hotel.rating}.0 ({hotel.reviewCount} reviews)
                </span>
              </div>
              <div style={{ fontSize: '24px', color: '#0f2946', fontWeight: '700' }}>₹{hotel.price}</div>
            </div>

            <p style={{ fontSize: '16px', color: '#3f5f89', lineHeight: '1.6', margin: 0 }}>
              {hotel.description}
            </p>
          </div>

          {/* Quick Info */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <Clock width={24} height={24} color="#0b3d66" />
                <span style={{ fontSize: '14px', color: '#3f5f89', fontWeight: '600' }}>CHECK-IN / CHECK-OUT</span>
              </div>
              <p style={{ margin: 0, fontSize: '16px', color: '#0f2946', fontWeight: '600' }}>
                {hotel.checkInTime} / {hotel.checkOutTime}
              </p>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <Users width={24} height={24} color="#0b3d66" />
                <span style={{ fontSize: '14px', color: '#3f5f89', fontWeight: '600' }}>CAPACITY</span>
              </div>
              <p style={{ margin: 0, fontSize: '16px', color: '#0f2946', fontWeight: '600' }}>
                {hotel.capacity}
              </p>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <Clock width={24} height={24} color="#0b3d66" />
                <span style={{ fontSize: '14px', color: '#3f5f89', fontWeight: '600' }}>DURATION</span>
              </div>
              <p style={{ margin: 0, fontSize: '16px', color: '#0f2946', fontWeight: '600' }}>
                {hotel.nights}
              </p>
            </div>
          </div>

          {/* Amenities Section */}
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '26px', margin: '0 0 24px', color: '#0f2946' }}>Amenities</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {hotelAmenities.map((amenity, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#3dba8f'
                    }}
                  />
                  <span style={{ fontSize: '15px', color: '#3f5f89' }}>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Facilities Section */}
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '26px', margin: '0 0 24px', color: '#0f2946' }}>Facilities</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {hotelFacilities.map((facility, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#0b3d66'
                    }}
                  />
                  <span style={{ fontSize: '15px', color: '#3f5f89' }}>{facility}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '26px', margin: '0 0 24px', color: '#0f2946' }}>Guest Reviews</h2>
            <div style={{ borderBottom: '1px solid #e5e9ef', paddingBottom: '20px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: '#0f2946' }}>
                    {hotel.rating}.0
                  </div>
                  <div style={{ display: 'flex', gap: '4px', marginTop: '4px', justifyContent: 'center' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        width={16}
                        height={16}
                        color="#f4c430"
                        fill={i < hotel.rating ? '#f4c430' : '#e5e9ef'}
                      />
                    ))}
                  </div>
                  <p style={{ fontSize: '14px', color: '#3f5f89', margin: '8px 0 0' }}>
                    Based on {hotel.reviewCount} reviews
                  </p>
                </div>
              </div>
            </div>

            {allReviews && allReviews.map((review) => (
              <div
                key={review.id}
                style={{
                  paddingBottom: '24px',
                  marginBottom: '24px',
                  borderBottom: review.id === allReviews[allReviews.length - 1].id ? 'none' : '1px solid #e5e9ef'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <UserCircle2 width={40} height={40} color="#3dba8f" />
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '16px', color: '#0f2946', fontWeight: '600' }}>
                      {review.name}
                    </h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#3f5f89' }}>
                      {review.date}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      width={14}
                      height={14}
                      color="#f4c430"
                      fill={i < review.rating ? '#f4c430' : '#e5e9ef'}
                    />
                  ))}
                </div>

                <p style={{ fontSize: '14px', color: '#3f5f89', lineHeight: '1.6', margin: 0 }}>
                  {review.comment}
                </p>
              </div>
            ))}
          </div>

          {/* Add Review Form */}
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '26px', margin: '0 0 24px', color: '#0f2946' }}>Share Your Experience</h2>
            
            {submitSuccess && (
              <div style={{
                backgroundColor: '#d4edda',
                color: '#155724',
                padding: '12px 16px',
                borderRadius: '6px',
                marginBottom: '20px',
                fontSize: '14px'
              }}>
                ✓ Thank you! Your review has been added successfully.
              </div>
            )}

            {submitError && (
              <div style={{
                backgroundColor: '#f8d7da',
                color: '#721c24',
                padding: '12px 16px',
                borderRadius: '6px',
                marginBottom: '20px',
                fontSize: '14px'
              }}>
                ✗ {submitError}
              </div>
            )}

            <form onSubmit={handleReviewSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#0f2946',
                  marginBottom: '8px'
                }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e5e9ef',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3dba8f'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e9ef'}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#0f2946',
                  marginBottom: '8px'
                }}>
                  Rating *
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Star
                        width={32}
                        height={32}
                        color="#f4c430"
                        fill={formData.rating >= star ? '#f4c430' : '#e5e9ef'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#0f2946',
                  marginBottom: '8px'
                }}>
                  Your Review * (minimum 10 characters)
                </label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Share your experience with this hotel..."
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e5e9ef',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3dba8f'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e9ef'}
                />
                <p style={{
                  fontSize: '12px',
                  color: '#3f5f89',
                  margin: '6px 0 0',
                  textAlign: 'right'
                }}>
                  {formData.comment.length} / 10+ characters
                </p>
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: '#3dba8f',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 32px',
                  borderRadius: '6px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#2ea87e')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#3dba8f')}
              >
                Submit Review
              </button>
            </form>
          </div>

          {/* Booking Section */}
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', textAlign: 'center', marginBottom: '30px' }}>
            <h3 style={{ fontSize: '24px', margin: '0 0 16px', color: '#0f2946' }}>Ready to Book?</h3>
            <p style={{ fontSize: '16px', color: '#3f5f89', margin: '0 0 24px' }}>
              Reserve your stay and experience the best of Kashmir hospitality
            </p>
            <button
              onClick={() => navigate('/alltrips')}
              style={{
                backgroundColor: '#3dba8f',
                color: '#fff',
                border: 'none',
                padding: '14px 32px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#2ea87e')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#3dba8f')}
            >
              Book Now - ₹{hotel.price}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
