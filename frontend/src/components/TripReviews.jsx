import { useEffect, useMemo, useState } from 'react'
import { Star as StarIcon, MessageSquareQuote, User as UserIcon, Clock3, Loader } from 'lucide-react'
import { reviewAPI } from '../utils/api'

const formatDate = (value) =>
  new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))

const StarButton = ({ active, onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    title={label}
    style={{
      background: 'transparent',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      color: active ? '#f59e0b' : '#cbd5e1',
      display: 'inline-flex',
      alignItems: 'center',
    }}
  >
    <StarIcon width={20} height={20} fill="currentColor" color="currentColor" strokeWidth={1.5} />
  </button>
)

export default function TripReviews({ tripId, tripTitle }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [rating, setRating] = useState(5)
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')

  // Fetch reviews from API on component mount and when tripId changes
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await reviewAPI.getByItinerary(tripId, 'trip')
        const transformed = data.map((review) => ({
          name: review.name,
          rating: review.rating,
          comment: review.comment,
          createdAt: review.createdAt || new Date().toISOString(),
        }))
        setReviews(transformed)
      } catch (err) {
        setError('Failed to load reviews')
        console.error('Error fetching reviews:', err)
        setReviews([])
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [tripId])

  const summary = useMemo(() => {
    if (!reviews.length) {
      return { average: 0, count: 0 }
    }

    const total = reviews.reduce((sum, review) => sum + review.rating, 0)
    return {
      average: total / reviews.length,
      count: reviews.length,
    }
  }, [reviews])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const trimmedName = name.trim()
    const trimmedComment = comment.trim()

    if (!trimmedName || !trimmedComment) {
      return
    }

    try {
      const createdReview = await reviewAPI.create({
        itineraryId: tripId,
        reviewType: 'trip',
        name: trimmedName,
        rating,
        comment: trimmedComment,
      })

      if (createdReview) {
        setReviews((currentReviews) => [
          {
            name: createdReview.name,
            rating: createdReview.rating,
            comment: createdReview.comment,
            createdAt: createdReview.createdAt || new Date().toISOString(),
          },
          ...currentReviews,
        ])
      }

      setName('')
      setComment('')
      setRating(5)
    } catch (err) {
      console.error('Error posting review:', err)
      setError('Failed to save review')
    }
  }

  return (
    <section
      style={{
        marginTop: 28,
        borderRadius: 18,
        border: '1px solid #dbe4ef',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)',
        boxShadow: '0 16px 40px rgba(26, 43, 74, 0.08)',
        overflow: 'hidden',
      }}
    >
      <style>{`
        .review-shell {
          display: grid;
          grid-template-columns: 1fr 0.95fr;
          gap: 18px;
        }

        .review-card {
          border: 1px solid #dbe4ef;
          border-radius: 16px;
          background: #fff;
        }

        .review-list {
          display: grid;
          gap: 14px;
          max-height: 520px;
          overflow: auto;
          padding-right: 4px;
        }

        .review-list::-webkit-scrollbar {
          width: 8px;
        }

        .review-list::-webkit-scrollbar-thumb {
          background: #c8d7e6;
          border-radius: 999px;
        }

        @media (max-width: 980px) {
          .review-shell {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div style={{ padding: '22px 22px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <p style={{ margin: '0 0 8px', color: '#3dba8f', fontSize: 12, fontWeight: 800, letterSpacing: '1.3px', textTransform: 'uppercase' }}>
              Reviews
            </p>
            <h3 style={{ margin: 0, color: '#1a2b4a', fontSize: 24 }}>What travelers say about {tripTitle}</h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 999, background: '#f1f7ff', border: '1px solid #dbeafe' }}>
            <span style={{ color: '#1a2b4a', fontWeight: 800, fontSize: 18 }}>{summary.average ? summary.average.toFixed(1) : '0.0'}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#f59e0b' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} width={14} height={14} fill={star <= Math.round(summary.average || 0) ? 'currentColor' : 'none'} color="currentColor" strokeWidth={1.6} />
              ))}
            </span>
            <span style={{ color: '#64748b', fontSize: 13 }}>({summary.count} reviews)</span>
          </div>
        </div>
      </div>

      <div className="review-shell" style={{ padding: '22px' }}>
        <div className="review-card" style={{ padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: '#e6f7f0', color: '#15946b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageSquareQuote width={18} height={18} />
            </div>
            <div>
              <h4 style={{ margin: 0, color: '#1a2b4a', fontSize: 18 }}>Add your review</h4>
              <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 13 }}>Your review is saved to the database for this trip.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#334155', fontSize: 13, fontWeight: 700 }}>Rating</label>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarButton
                    key={star}
                    active={star <= rating}
                    onClick={() => setRating(star)}
                    label={`${star} star${star > 1 ? 's' : ''}`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label htmlFor={`review-name-${tripId}`} style={{ display: 'block', marginBottom: 8, color: '#334155', fontSize: 13, fontWeight: 700 }}>
                Your name
              </label>
              <input
                id={`review-name-${tripId}`}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
                style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: 12, padding: '12px 14px', fontSize: 14, outline: 'none' }}
              />
            </div>

            <div>
              <label htmlFor={`review-comment-${tripId}`} style={{ display: 'block', marginBottom: 8, color: '#334155', fontSize: 13, fontWeight: 700 }}>
                Your review
              </label>
              <textarea
                id={`review-comment-${tripId}`}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Tell future travelers what stood out"
                rows={5}
                style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: 12, padding: '12px 14px', fontSize: 14, outline: 'none', resize: 'vertical', minHeight: 124 }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                border: 'none',
                borderRadius: 12,
                background: 'linear-gradient(90deg, #1a2b4a 0%, #3dba8f 100%)',
                color: '#fff',
                padding: '12px 16px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              Post review for this trip
            </button>
          </form>
        </div>

        <div className="review-card" style={{ padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
            <div>
              <h4 style={{ margin: 0, color: '#1a2b4a', fontSize: 18 }}>Trip reviews</h4>
              <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 13 }}>Only reviews for this itinerary are shown here.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748b', fontSize: 13 }}>
              {loading ? (
                <>
                  <Loader size={15} style={{ animation: 'spin 1s linear infinite' }} />
                  <style>{`
                    @keyframes spin {
                      from { transform: rotate(0deg); }
                      to { transform: rotate(360deg); }
                    }
                  `}</style>
                  Loading...
                </>
              ) : (
                <>
                  <Clock3 width={15} height={15} />
                  Updated live
                </>
              )}
            </div>
          </div>

          <div className="review-list">
            {reviews.length ? (
              reviews.map((review, index) => (
                <article key={`${review.createdAt}-${index}`} style={{ border: '1px solid #dbe4ef', borderRadius: 14, padding: 16, background: index === 0 ? '#f8fbff' : '#fff' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#e8f4ff', color: '#1a2b4a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                        <UserIcon width={18} height={18} />
                      </div>
                      <div>
                        <h5 style={{ margin: 0, color: '#1a2b4a', fontSize: 15 }}>{review.name}</h5>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, color: '#64748b', fontSize: 12 }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 2, color: '#f59e0b' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <StarIcon key={star} width={12} height={12} fill={star <= review.rating ? 'currentColor' : 'none'} color="currentColor" strokeWidth={1.7} />
                            ))}
                          </span>
                          <span>{formatDate(review.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p style={{ margin: 0, color: '#475569', fontSize: 14, lineHeight: 1.7 }}>{review.comment}</p>
                </article>
              ))
            ) : (
              <div style={{ border: '1px dashed #cbd5e1', borderRadius: 14, padding: 18, color: '#64748b', fontSize: 14, lineHeight: 1.7 }}>
                No reviews yet for this trip. Be the first to share your experience.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}