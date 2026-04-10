import { useState, useRef } from 'react'
import { X, Plus } from 'lucide-react'

export default function ItinerariesTab({
    itineraries,
    showNewItineraryForm,
    setShowNewItineraryForm,
    isEditingItinerary,
    setIsEditingItinerary,
    newItineraryForm,
    setNewItineraryForm,
    handleCreateItinerary,
    submitting,
    tripCategoryOptions,
    error,
    setError,
    selectedItineraryId,
    setSelectedItineraryId,
    handleDeleteItinerary,
    handleDeleteItineraryById,
    deletingItinerary
}) {
    const fileInputRef = useRef(null)
    const [imagePreview, setImagePreview] = useState(null)

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            // Create preview
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)
                setNewItineraryForm({ ...newItineraryForm, coverImage: reader.result })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = () => {
        // Validate all required fields
        if (!newItineraryForm.title || !newItineraryForm.title.trim()) {
            alert('Please enter a title')
            return
        }
        if (!newItineraryForm.duration || !newItineraryForm.duration.trim()) {
            alert('Please enter a duration')
            return
        }
        if (!newItineraryForm.price || newItineraryForm.price === '') {
            alert('Please enter a price')
            return
        }
        if (!newItineraryForm.coverImage) {
            alert('Please upload a cover image')
            return
        }
        if (!newItineraryForm.category) {
            alert('Please select a category')
            return
        }

        // Call the handler
        handleCreateItinerary()

        // Reset form after a small delay to allow state updates
        setTimeout(() => {
            setImagePreview(null)
        }, 100)
    }

    const handleCloseModal = () => {
        setShowNewItineraryForm(false)
        setIsEditingItinerary(false)
        setImagePreview(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }
    return (
        <div className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Itineraries</p>
                        <h3 className="mt-2 text-2xl font-bold text-slate-900">Manage curated journeys</h3>
                    </div>
                    <button
                        onClick={() => setShowNewItineraryForm(!showNewItineraryForm)}
                        className="rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition"
                    >
                        {showNewItineraryForm ? 'Hide Form' : 'Add Itinerary'}
                    </button>
                </div>
            </div>

            {showNewItineraryForm && (
                <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/70 p-4 sm:items-center sm:p-6">
                    <div className="relative w-full pt-10 max-w-xl sm:max-w-2xl max-h-[calc(100vh-3rem)] overflow-y-auto rounded-4xl bg-white p-4 shadow-2xl shadow-slate-900/20 sm:p-5">
                        <button
                            onClick={handleCloseModal}
                            className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-600 shadow-sm hover:bg-slate-200 transition"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="mb-5">
                            <h2 className="text-2xl font-bold text-slate-900">{isEditingItinerary ? 'Edit Itinerary' : 'Add Itinerary'}</h2>
                        </div>

                        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Sonmarg Meadows"
                                    value={newItineraryForm.title}
                                    onChange={(e) => setNewItineraryForm({ ...newItineraryForm, title: e.target.value })}
                                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">Price (₹)</label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={newItineraryForm.price}
                                    onChange={(e) => setNewItineraryForm({ ...newItineraryForm, price: e.target.value })}
                                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                            <div className="lg:col-span-2 space-y-2">
                                <label className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">Duration</label>
                                <input
                                    type="text"
                                    placeholder="2D / 1N"
                                    value={newItineraryForm.duration}
                                    onChange={(e) => setNewItineraryForm({ ...newItineraryForm, duration: e.target.value })}
                                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                            <div className="lg:col-span-2 space-y-2">
                                <label className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">Category</label>
                                <div className="flex flex-wrap gap-2">
                                    {tripCategoryOptions.slice(0, 4).map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => setNewItineraryForm({ ...newItineraryForm, category: option.value })}
                                            className={`rounded-full border px-4 py-2 text-sm transition ${newItineraryForm.category === option.value ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100'}`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="lg:col-span-2 space-y-2">
                                <label className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">Description</label>
                                <textarea
                                    rows={2}
                                    placeholder="Describe the journey experience..."
                                    value={newItineraryForm.description || ''}
                                    onChange={(e) => setNewItineraryForm({ ...newItineraryForm, description: e.target.value })}
                                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                            <div className="lg:col-span-2">
                                <label className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">Cover Image</label>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex h-24 items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 text-slate-400 cursor-pointer hover:bg-slate-100 hover:border-slate-400 transition"
                                >
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="h-full w-full object-cover rounded-3xl" />
                                    ) : (
                                        <span>Upload or drop image</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
                            <button
                                onClick={handleCloseModal}
                                className="rounded-3xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={submitting}
                                className="rounded-3xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition disabled:opacity-50"
                            >
                                {submitting ? (isEditingItinerary ? 'Updating...' : 'Publishing...') : (isEditingItinerary ? 'Update Itinerary' : 'Publish Itinerary')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0,3em] text-slate-500">Itineraries list</p>
                        <h3 className="mt-2 text-2xl font-bold text-slate-900">Current trips</h3>
                    </div>
                    <div className="text-sm text-slate-500">Showing {itineraries.length} itineraries</div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Title</th>
                                <th className="px-4 py-3 font-semibold">Image</th>
                                <th className="px-4 py-3 font-semibold">Category</th>
                                <th className="px-4 py-3 font-semibold">Price</th>
                                <th className="px-4 py-3 font-semibold">Duration</th>
                                <th className="px-4 py-3 font-semibold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {itineraries.map((it) => (
                                <tr key={it._id} className="hover:bg-slate-50">
                                    <td className="px-4 py-4 text-slate-900">{it.title}</td>
                                    <td className="px-4 py-4">
                                        <img src={it.coverImage} alt={it.title} className="h-12 w-16 object-cover rounded-lg" />
                                    </td>
                                    <td className="px-4 py-4 text-slate-600">{it.category}</td>
                                    <td className="px-4 py-4 text-slate-900">₹{it.price?.toLocaleString()}</td>
                                    <td className="px-4 py-4 text-slate-600">{it.duration}</td>
                                    <td className="px-4 py-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => {
                                                    const itinerary = itineraries.find(it => it._id === it._id)
                                                    if (itinerary) {
                                                        setNewItineraryForm({
                                                            title: itinerary.title,
                                                            duration: itinerary.duration,
                                                            price: itinerary.price,
                                                            coverImage: itinerary.coverImage,
                                                            category: itinerary.category,
                                                            description: itinerary.description || '',
                                                            isComingSoon: itinerary.isComingSoon || false
                                                        })
                                                        setImagePreview(itinerary.coverImage)
                                                        setSelectedItineraryId(it._id)
                                                        setIsEditingItinerary(true)
                                                        setShowNewItineraryForm(true)
                                                    }
                                                }}
                                                className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-600 transition"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (confirm('Are you sure you want to delete this itinerary? This action cannot be undone.')) {
                                                        handleDeleteItineraryById(it._id)
                                                    }
                                                }}
                                                disabled={deletingItinerary}
                                                className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700 transition disabled:opacity-50"
                                            >
                                                {deletingItinerary ? 'Deleting...' : 'Delete'}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
