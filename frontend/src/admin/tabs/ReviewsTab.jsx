import { Star, MapPin } from 'lucide-react'
import { Card, FieldGroup, ReviewCard, SectionHeader, Select } from '../components/AdminPanelUI'

export default function ReviewsTab({
  reviewType,
  setReviewType,
  selectedItineraryId,
  setSelectedItineraryId,
  itineraries,
  reviews,
  handleDeleteReview,
  deletingReview,
}) {
  return (
    <div className="w-full">
      <Card className="w-full min-h-[calc(100vh-10.5rem)]">
        <SectionHeader title="Review management" />
        <div className="p-5">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <FieldGroup label="Review type">
              <Select value={reviewType} onChange={(e) => setReviewType(e.target.value)}>
                <option value="trip">Trip reviews</option>
                <option value="daywise">Day-wise reviews</option>
                <option value="hotel">Hotel reviews</option>
              </Select>
            </FieldGroup>
            <FieldGroup label="Itinerary" icon={MapPin}>
              <Select value={selectedItineraryId || ''} onChange={(e) => setSelectedItineraryId(e.target.value)}>
                {itineraries.map((it) => <option key={it._id} value={it._id}>{it.title}</option>)}
              </Select>
            </FieldGroup>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </p>
            {reviews.length === 0 ? (
              <div className="text-center py-14 text-slate-400 text-sm">
                <Star size={28} className="mx-auto mb-3 opacity-30" />
                No reviews for this itinerary yet
              </div>
            ) : reviews.map((r) => (
              <ReviewCard key={r._id} review={r} onDelete={handleDeleteReview} deleting={deletingReview} />
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
