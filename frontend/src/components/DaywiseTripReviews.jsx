import { useEffect, useMemo, useState } from 'react'
import { BadgeCheck, MessageSquare, Star as StarIcon, UserCircle2, Loader } from 'lucide-react'
import { reviewAPI } from '../utils/api'

const formatDate = (value) =>
  new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))

function StarPicker({ value, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${value} star${value > 1 ? 's' : ''}`}
      style={{
        border: 'none',
        background: 'transparent',
        padding: 0,
        cursor: 'pointer',
        color: active ? '#f97316' : '#d1d5db',
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      <StarIcon width={18} height={18} fill="currentColor" color="currentColor" strokeWidth={1.5} />
    </button>
  )
}

export default function DaywiseTripReviews({ tripId, tripTitle }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [rating, setRating] = useState(5)
  const [reviewerName, setReviewerName] = useState('')
  const [reviewText, setReviewText] = useState('')

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await reviewAPI.getByItinerary(tripId, 'daywise')
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
    return { average: total / reviews.length, count: reviews.length }
  }, [reviews])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const trimmedName = reviewerName.trim()
    const trimmedText = reviewText.trim()

    if (!trimmedName || !trimmedText) {
      return
    }

    try {
      const createdReview = await reviewAPI.create({
        itineraryId: tripId,
        reviewType: 'daywise',
        name: trimmedName,
        rating,
        comment: trimmedText,
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

      setReviewerName('')
      setReviewText('')
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
        borderRadius: 20,
        background: 'linear-gradient(135deg, #fffaf4 0%, #ffffff 55%, #f8fbff 100%)',
        border: '1px solid #f3dfc6',
        boxShadow: '0 18px 44px rgba(15, 23, 42, 0.08)',
        overflow: 'hidden',
      }}
    >
      <style>{`
        .daywise-review-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 18px;
        }

        .daywise-review-panel {
          border: 1px solid #f1e3cf;
          border-radius: 16px;
          background: #fff;
        }

        .daywise-review-list {
          display: grid;
          gap: 14px;
          max-height: 500px;
          overflow: auto;
          padding-right: 4px;
        }

        .daywise-review-list::-webkit-scrollbar {
          width: 8px;
        }

        .daywise-review-list::-webkit-scrollbar-thumb {
          background: #f0cfa4;
          border-radius: 999px;
        }

        @media (max-width: 980px) {
          .daywise-review-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div style={{ padding: '22px 22px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <p style={{ margin: '0 0 8px', color: '#f97316', fontSize: 12, fontWeight: 800, letterSpacing: '1.3px', textTransform: 'uppercase' }}>
              Daywise Reviews
            </p>
            <h3 style={{ margin: 0, color: '#13213b', fontSize: 24 }}>Traveler feedback for {tripTitle}</h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 999, background: '#fff4e8', border: '1px solid #f7d6b1' }}>
            <span style={{ color: '#13213b', fontWeight: 800, fontSize: 18 }}>{summary.average ? summary.average.toFixed(1) : '0.0'}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#f97316' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} width={14} height={14} fill={star <= Math.round(summary.average || 0) ? 'currentColor' : 'none'} color="currentColor" strokeWidth={1.6} />
              ))}
            </span>
            <span style={{ color: '#475569', fontSize: 13 }}>({summary.count} reviews)</span>
          </div>
        </div>
      </div>

      <div className="daywise-review-grid" style={{ padding: '22px' }}>
        <div className="daywise-review-panel" style={{ padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: '#fff1e4', color: '#c2410c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageSquare width={18} height={18} />
            </div>
            <div>
              <h4 style={{ margin: 0, color: '#13213b', fontSize: 18 }}>Add a review</h4>
              <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 13 }}>This review will be saved to the database for this daywise trip.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#334155', fontSize: 13, fontWeight: 700 }}>Your rating</label>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarPicker key={star} value={star} active={star <= rating} onClick={() => setRating(star)} />
                ))}
              </div>
            </div>

            <div>
              <label htmlFor={`daywise-review-name-${tripId}`} style={{ display: 'block', marginBottom: 8, color: '#334155', fontSize: 13, fontWeight: 700 }}>
                Name
              </label>
              <input
                id={`daywise-review-name-${tripId}`}
                value={reviewerName}
                onChange={(event) => setReviewerName(event.target.value)}
                placeholder="Your name"
                style={{ width: '100%', border: '1px solid #d6c2aa', borderRadius: 12, padding: '12px 14px', fontSize: 14, outline: 'none' }}
              />
            </div>

            <div>
              <label htmlFor={`daywise-review-comment-${tripId}`} style={{ display: 'block', marginBottom: 8, color: '#334155', fontSize: 13, fontWeight: 700 }}>
                Review
              </label>
              <textarea
                id={`daywise-review-comment-${tripId}`}
                value={reviewText}
                onChange={(event) => setReviewText(event.target.value)}
                placeholder="Share your travel experience"
                rows={5}
                style={{ width: '100%', border: '1px solid #d6c2aa', borderRadius: 12, padding: '12px 14px', fontSize: 14, outline: 'none', resize: 'vertical', minHeight: 124 }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                border: 'none',
                borderRadius: 12,
                background: 'linear-gradient(90deg, #c2410c 0%, #f97316 100%)',
                color: '#fff',
                padding: '12px 16px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              Post daywise review
            </button>
          </form>
        </div>

        <div className="daywise-review-panel" style={{ padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
            <div>
              <h4 style={{ margin: 0, color: '#13213b', fontSize: 18 }}>Trip feedback</h4>
              <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 13 }}>Only reviews for this specific daywise itinerary appear here.</p>
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
                  <BadgeCheck width={15} height={15} />
                  Per trip
                </>
              )}
            </div>
          </div>

          <div className="daywise-review-list">
            {reviews.length ? (
              reviews.map((review, index) => (
                <article key={`${review.createdAt}-${index}`} style={{ border: '1px solid #f1e3cf', borderRadius: 14, padding: 16, background: index === 0 ? '#fffaf4' : '#fff' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#fff0e5', color: '#c2410c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <UserCircle2 width={18} height={18} />
                      </div>
                      <div>
                        <h5 style={{ margin: 0, color: '#13213b', fontSize: 15 }}>{review.name}</h5>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, color: '#64748b', fontSize: 12 }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 2, color: '#f97316' }}>
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
              <div style={{ border: '1px dashed #d6c2aa', borderRadius: 14, padding: 18, color: '#64748b', fontSize: 14, lineHeight: 1.7 }}>
                No daywise reviews yet. Add the first one for this itinerary.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}