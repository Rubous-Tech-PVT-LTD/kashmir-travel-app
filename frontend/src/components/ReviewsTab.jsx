import { useState, useEffect, useMemo } from 'react'

export default function ReviewsTab({
    reviews,
    itineraries,
    reviewType,
    setReviewType,
    selectedItineraryId,
    setSelectedItineraryId,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    handleDeleteReview,
    deletingReview,
    reviewStatus,
    setReviewStatus,
    sortBy,
    setSortBy
}) {
    // Filter and sort reviews
    const filteredAndSortedReviews = useMemo(() => {
        let filtered = reviews

        // Filter by status
        if (reviewStatus === 'pending') {
            filtered = filtered.filter(r => r.status === 'pending')
        } else if (reviewStatus === 'flagged') {
            filtered = filtered.filter(r => r.status === 'flagged')
        }

        // Sort reviews
        const sorted = [...filtered]
        if (sortBy === 'newest') {
            sorted.reverse() // Assuming reviews are added in order, reversing shows newest first
        } else if (sortBy === 'oldest') {
            // Keep original order
        } else if (sortBy === 'highest') {
            sorted.sort((a, b) => b.rating - a.rating)
        } else if (sortBy === 'lowest') {
            sorted.sort((a, b) => a.rating - b.rating)
        }

        return sorted
    }, [reviews, reviewStatus, sortBy])

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Review Management</h3>

            {/* Sort Only */}
            {reviews.length > 0 && (
                <div className="mb-6 flex justify-end bg-slate-50 rounded-3xl p-4">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-slate-600">⚙️ Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                            className="rounded-full border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                            <option value="highest">Highest Rated</option>
                            <option value="lowest">Lowest Rated</option>
                        </select>
                    </div>
                </div>
            )}

            {/* Reviews Table */}
            {reviews.length > 0 && (
                <>
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200 text-sm">
                                <thead className="bg-slate-50 text-slate-600">
                                    <tr>
                                        <th className="px-6 py-4 text-left font-semibold">USER NAME</th>
                                        <th className="px-6 py-4 text-left font-semibold">RATING</th>
                                        <th className="px-6 py-4 text-left font-semibold">COMMENT</th>
                                        <th className="px-6 py-4 text-left font-semibold">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 bg-white">
                                    {filteredAndSortedReviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((review) => {
                                        const initials = review.name
                                            .split(' ')
                                            .map(n => n[0])
                                            .join('')
                                            .toUpperCase()

                                        const colors = ['bg-blue-600', 'bg-slate-700', 'bg-red-600', 'bg-green-600', 'bg-purple-600']
                                        const colorIndex = (review.name.charCodeAt(0) + review.name.charCodeAt(review.name.length - 1)) % colors.length

                                        return (
                                            <tr key={review._id} className="hover:bg-slate-50">
                                                <td className="px-6 py-4 align-middle">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`flex items-center justify-center h-10 w-10 rounded-full text-white font-semibold text-sm ${colors[colorIndex]}`}>
                                                            {initials}
                                                        </div>
                                                        <div>
                                                            <div className="text-slate-900 font-semibold">{review.name}</div>
                                                            <div className="text-xs text-slate-500">{review.email || 'user@example.com'}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 align-middle">
                                                    <span className="text-yellow-500 text-lg">{[...Array(5)].map((_, i) => (<span key={i}>{i < review.rating ? '★' : '☆'}</span>))}</span>
                                                </td>
                                                <td className="px-6 py-4 align-middle text-slate-600 max-w-xs">
                                                    <p className="truncate text-ellipsis">{review.comment}</p>
                                                </td>
                                                <td className="px-6 py-4 align-middle">
                                                    <button
                                                        onClick={() => handleDeleteReview(review._id)}
                                                        disabled={deletingReview}
                                                        className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition disabled:opacity-50"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex flex-col items-center gap-4 md:flex-row md:justify-between">
                        <p className="text-sm text-slate-600">
                            Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredAndSortedReviews.length)}-{Math.min(currentPage * itemsPerPage, filteredAndSortedReviews.length)} of {filteredAndSortedReviews.length} entries
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="rounded-lg grid place-items-center hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.5 7L0 3.5L3.5 0L4.31667 0.816667L1.63333 3.5L4.31667 6.18333L3.5 7Z" fill="#1A2B4A" fillOpacity="0.5" />
                                </svg>
                            </button>

                            {(() => {
                                const totalPages = Math.ceil(filteredAndSortedReviews.length / itemsPerPage)
                                const pagesToShow = 3
                                const pages = []

                                // Always show first pagesToShow pages or all pages if less than pagesToShow
                                for (let i = 1; i <= Math.min(pagesToShow, totalPages); i++) {
                                    pages.push(i)
                                }

                                return (
                                    <>
                                        {pages.map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`rounded-lg w-8 h-8 font-semibold text-sm transition ${currentPage === page
                                                    ? 'bg-slate-900 text-white'
                                                    : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                        {totalPages > pagesToShow && (
                                            <>
                                                <span className="text-slate-400">...</span>
                                            </>
                                        )}
                                    </>
                                )
                            })()}

                            <button
                                onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredAndSortedReviews.length / itemsPerPage), p + 1))}
                                disabled={currentPage === Math.ceil(filteredAndSortedReviews.length / itemsPerPage)}
                                className=" disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.68333 3.5L0 0.816667L0.816667 0L4.31667 3.5L0.816667 7L0 6.18333L2.68333 3.5Z" fill="#1A2B4A" fillOpacity="0.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </>
            )}

            {reviews.length === 0 && (
                <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-12 text-center text-slate-500">
                    No reviews for this itinerary
                </div>
            )}
        </div>
    )
}
