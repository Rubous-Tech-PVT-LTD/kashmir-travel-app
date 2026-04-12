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
    className={`p-0 bg-transparent border-none cursor-pointer flex items-center ${
      active ? 'text-yellow-500' : 'text-slate-300'
    }`}
  >
    <StarIcon className="w-5 h-5 fill-current" />
  </button>
)

export default function TripReviews({ tripId, tripTitle }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [rating, setRating] = useState(5)
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')

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
        setReviews([])
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [tripId])

  const summary = useMemo(() => {
    if (!reviews.length) return { average: 0, count: 0 }
    const total = reviews.reduce((sum, review) => sum + review.rating, 0)
    return {
      average: total / reviews.length,
      count: reviews.length,
    }
  }, [reviews])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !comment.trim()) return

    try {
      const createdReview = await reviewAPI.create({
        itineraryId: tripId,
        reviewType: 'trip',
        name: name.trim(),
        rating,
        comment: comment.trim(),
      })

      if (createdReview) {
        setReviews((prev) => [
          {
            ...createdReview,
            createdAt: createdReview.createdAt || new Date().toISOString(),
          },
          ...prev,
        ])
      }

      setName('')
      setComment('')
      setRating(5)
    } catch {
      setError('Failed to save review')
    }
  }

  return (
    <section className="mt-7 rounded-2xl border border-slate-200 bg-linear-to-b from-white to-blue-50 shadow-xl overflow-hidden">
      
      {/* Header */}
      <div className="p-6 pb-0 flex flex-wrap justify-between items-center gap-4">
        <div>
          <p className="text-xs font-extrabold text-green-500 uppercase tracking-widest mb-2">
            Reviews
          </p>
          <h3 className="text-2xl font-semibold text-slate-800">
            What travelers say about {tripTitle}
          </h3>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
          <span className="font-bold text-lg text-slate-800">
            {summary.average ? summary.average.toFixed(1) : '0.0'}
          </span>
          <div className="flex text-yellow-500">
            {[1,2,3,4,5].map((star) => (
              <StarIcon key={star} className={`w-4 h-4 ${star <= Math.round(summary.average) ? 'fill-current' : ''}`} />
            ))}
          </div>
          <span className="text-sm text-slate-500">({summary.count})</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-5 p-6">
        
        {/* Form */}
        <div className="border rounded-xl bg-white p-5">
          <div className="flex gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
              <MessageSquareQuote />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Add your review</h4>
              <p className="text-sm text-slate-500">
                Your review is saved to the database
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold mb-2">Rating</label>
              <div className="flex gap-2">
                {[1,2,3,4,5].map((star) => (
                  <StarButton
                    key={star}
                    active={star <= rating}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>

            {/* Name */}
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Comment */}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell your experience"
              className="w-full border rounded-lg px-4 py-3 min-h-30 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button className="w-full bg-linear-to-r from-blue-800 to-green-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition">
              Post Review
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="border rounded-xl bg-white p-5">
          <div className="flex justify-between mb-4">
            <h4 className="font-semibold text-lg">Trip Reviews</h4>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              {loading ? (
                <>
                  <Loader className="animate-spin w-4 h-4" /> Loading
                </>
              ) : (
                <>
                  <Clock3 className="w-4 h-4" /> Updated
                </>
              )}
            </div>
          </div>

          <div className="space-y-3 max-h-125 overflow-y-auto pr-2">
            {reviews.length ? (
              reviews.map((review, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <div className="flex gap-3 items-center">
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                        <UserIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold">{review.name}</p>
                        <div className="flex gap-1 text-yellow-500">
                          {[1,2,3,4,5].map((star) => (
                            <StarIcon key={star} className={`w-3 h-3 ${star <= review.rating ? 'fill-current' : ''}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 border border-dashed p-4 rounded-lg">
                No reviews yet
              </p>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}