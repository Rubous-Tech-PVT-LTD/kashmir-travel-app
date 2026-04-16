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
      className={`inline-flex items-center border-none bg-transparent p-0 cursor-pointer ${active ? 'text-orange-500' : 'text-gray-300'}`}
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
      setError('Failed to save review')
    }
  }

  return (
    <section className="mt-7 overflow-hidden rounded-[20px] border border-[#f3dfc6] bg-[linear-gradient(135deg,#fffaf4_0%,#ffffff_55%,#f8fbff_100%)] shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
      <div className="px-5 pb-0 pt-5 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-orange-500">
              Daywise Reviews
            </p>
            <h3 className="m-0 text-2xl text-[#13213b]">Traveler feedback for {tripTitle}</h3>
          </div>

          <div className="flex items-center gap-2.5 rounded-full border border-[#f7d6b1] bg-[#fff4e8] px-3.5 py-2.5">
            <span className="text-lg font-extrabold text-[#13213b]">
              {summary.average ? summary.average.toFixed(1) : '0.0'}
            </span>
            <span className="flex items-center gap-1 text-orange-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  width={14}
                  height={14}
                  fill={star <= Math.round(summary.average || 0) ? 'currentColor' : 'none'}
                  color="currentColor"
                  strokeWidth={1.6}
                />
              ))}
            </span>
            <span className="text-[13px] text-slate-600">({summary.count} reviews)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4.5 p-5 sm:p-6 min-[981px]:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="rounded-2xl border border-[#f1e3cf] bg-white p-4 sm:p-4.5">
          <div className="mb-3.5 flex items-center gap-2.5">
            <div className="flex h-9.5 w-9.5 items-center justify-center rounded-xl bg-[#fff1e4] text-orange-700">
              <MessageSquare width={18} height={18} />
            </div>
            <div>
              <h4 className="m-0 text-lg text-[#13213b]">Add a review</h4>
              <p className="mt-1 mb-0 text-[13px] text-slate-500">
                This review will be saved to the database for this daywise trip.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-3.5">
            <div>
              <label className="mb-2 block text-[13px] font-bold text-slate-700">Your rating</label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarPicker key={star} value={star} active={star <= rating} onClick={() => setRating(star)} />
                ))}
              </div>
            </div>

            <div>
              <label htmlFor={`daywise-review-name-${tripId}`} className="mb-2 block text-[13px] font-bold text-slate-700">
                Name
              </label>
              <input
                id={`daywise-review-name-${tripId}`}
                value={reviewerName}
                onChange={(event) => setReviewerName(event.target.value)}
                placeholder="Your name"
                className="w-full rounded-xl border border-[#d6c2aa] px-3.5 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div>
              <label htmlFor={`daywise-review-comment-${tripId}`} className="mb-2 block text-[13px] font-bold text-slate-700">
                Review
              </label>
              <textarea
                id={`daywise-review-comment-${tripId}`}
                value={reviewText}
                onChange={(event) => setReviewText(event.target.value)}
                placeholder="Share your travel experience"
                rows={5}
                className="min-h-31 w-full resize-y rounded-xl border border-[#d6c2aa] px-3.5 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer rounded-xl border-none bg-linear-to-r from-orange-800 to-orange-500 px-4 py-3 font-extrabold text-white hover:opacity-95"
            >
              Post daywise review
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-[#f1e3cf] bg-white p-4 sm:p-4.5">
          <div className="mb-3.5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="m-0 text-lg text-[#13213b]">Trip feedback</h4>
              <p className="mt-1 mb-0 text-[13px] text-slate-500">
                Only reviews for this specific daywise itinerary appear here.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[13px] text-slate-500">
              {loading ? (
                <>
                  <Loader size={15} className="animate-spin" />
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

          <div className="grid max-h-125 gap-3.5 overflow-auto pr-1 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#f0cfa4]">
            {reviews.length ? (
              reviews.map((review, index) => (
                <article
                  key={`${review.createdAt}-${index}`}
                  className={`rounded-[14px] border border-[#f1e3cf] p-4 ${index === 0 ? 'bg-[#fffaf4]' : 'bg-white'}`}
                >
                  <div className="mb-2.5 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-[#fff0e5] text-orange-700">
                        <UserCircle2 width={18} height={18} />
                      </div>
                      <div>
                        <h5 className="m-0 text-[15px] text-[#13213b]">{review.name}</h5>
                        <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                          <span className="flex items-center gap-0.5 text-orange-500">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <StarIcon
                                key={star}
                                width={12}
                                height={12}
                                fill={star <= review.rating ? 'currentColor' : 'none'}
                                color="currentColor"
                                strokeWidth={1.7}
                              />
                            ))}
                          </span>
                          <span>{formatDate(review.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="m-0 text-sm leading-relaxed text-slate-600">{review.comment}</p>
                </article>
              ))
            ) : (
              <div className="rounded-[14px] border border-dashed border-[#d6c2aa] p-4 text-sm leading-relaxed text-slate-500 sm:p-9.5">
                No daywise reviews yet. Add the first one for this itinerary.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
