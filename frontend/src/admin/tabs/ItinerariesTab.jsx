import { Plus, X, Loader, MapPin, ChevronRight, Clock, DollarSign, Calendar, Image, Check, Edit2, Trash2, Utensils, Bed, FileText } from 'lucide-react'
import { Badge, Btn, Card, DayRow, FieldGroup, Input, SectionHeader, Select, Textarea, tripCategoryOptions } from '../components/AdminPanelUI'

export default function ItinerariesTab({
  showNewItineraryForm,
  setShowNewItineraryForm,
  newItineraryForm,
  setNewItineraryForm,
  handleCreateItinerary,
  submitting,
  itineraries,
  selectedItineraryId,
  setSelectedItineraryId,
  setIsEditingTrip,
  resetDayForm,
  selectedItinerary,
  handleEditTrip,
  isEditingTrip,
  handleDeleteItinerary,
  deletingItinerary,
  editTripForm,
  setEditTripForm,
  handleUpdateTrip,
  updatingTrip,
  dayForm,
  setDayForm,
  handleAddDay,
  submittingDay,
  editingDayIndex,
  handleEditDay,
  handleDeleteDay,
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-72 lg:flex-shrink-0 space-y-4">
        <Card>
          <SectionHeader
            title="All Itineraries"
            action={
              <Btn variant="primary" size="sm" onClick={() => setShowNewItineraryForm((v) => !v)}>
                <Plus size={13} /> New
              </Btn>
            }
          />

          {showNewItineraryForm && (
            <div className="p-4 border-b border-slate-100 space-y-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Create itinerary</p>
              <FieldGroup label="Title" icon={MapPin}>
                <Input placeholder="e.g. Kashmir Valley Tour" value={newItineraryForm.title} onChange={(e) => setNewItineraryForm({ ...newItineraryForm, title: e.target.value })} />
              </FieldGroup>
              <div className="grid grid-cols-2 gap-2">
                <FieldGroup label="Duration" icon={Clock}>
                  <Input placeholder="7 Days" value={newItineraryForm.duration} onChange={(e) => setNewItineraryForm({ ...newItineraryForm, duration: e.target.value })} />
                </FieldGroup>
                <FieldGroup label="Price ₹" icon={DollarSign}>
                  <Input type="number" placeholder="15000" value={newItineraryForm.price} onChange={(e) => setNewItineraryForm({ ...newItineraryForm, price: e.target.value })} />
                </FieldGroup>
              </div>
              <FieldGroup label="Cover image URL" icon={Image}>
                <Input placeholder="https://..." value={newItineraryForm.coverImage} onChange={(e) => setNewItineraryForm({ ...newItineraryForm, coverImage: e.target.value })} />
              </FieldGroup>
              <FieldGroup label="Category">
                <Select value={newItineraryForm.category} onChange={(e) => setNewItineraryForm({ ...newItineraryForm, category: e.target.value })}>
                  {tripCategoryOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </Select>
              </FieldGroup>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={newItineraryForm.isComingSoon} onChange={(e) => setNewItineraryForm({ ...newItineraryForm, isComingSoon: e.target.checked })} className="rounded accent-sky-600" />
                <span className="text-xs text-slate-600">Mark as "Coming Soon"</span>
              </label>
              <div className="flex gap-2 pt-1">
                <Btn variant="primary" size="sm" onClick={handleCreateItinerary} disabled={submitting} className="flex-1 justify-center">
                  {submitting ? <Loader size={13} className="animate-spin" /> : <Check size={13} />}
                  {submitting ? 'Creating...' : 'Create'}
                </Btn>
                <Btn variant="ghost" size="sm" onClick={() => setShowNewItineraryForm(false)}><X size={13} /></Btn>
              </div>
            </div>
          )}

          <div className="p-2 space-y-0.5 max-h-[65vh] overflow-y-auto">
            {itineraries.length === 0 ? (
              <p className="text-center text-slate-400 text-sm py-8">No itineraries yet</p>
            ) : itineraries.map((it) => (
              <button
                key={it._id}
                onClick={() => { setSelectedItineraryId(it._id); setIsEditingTrip(false); resetDayForm() }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all group ${
                  selectedItineraryId === it._id
                    ? 'bg-sky-50 border border-sky-100'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${it.isComingSoon ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${selectedItineraryId === it._id ? 'text-sky-700' : 'text-slate-700'}`}>{it.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{it.duration} · ₹{Number(it.price).toLocaleString('en-IN')}</p>
                </div>
                <ChevronRight size={13} className={`flex-shrink-0 transition-opacity ${selectedItineraryId === it._id ? 'text-sky-400 opacity-100' : 'text-slate-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100'}`} />
              </button>
            ))}
          </div>
        </Card>
      </div>

      <div className="flex-1 min-w-0 space-y-4">
        {!selectedItinerary ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center text-slate-400">
              <MapPin size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Select or create an itinerary</p>
            </div>
          </div>
        ) : (
          <>
            <Card>
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h1 className="text-lg font-bold text-slate-800">{selectedItinerary.title}</h1>
                      {selectedItinerary.isComingSoon && (
                        <span className="bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">Coming soon</span>
                      )}
                      <Badge category={selectedItinerary.category} />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-400 flex-wrap">
                      <span className="flex items-center gap-1.5"><Clock size={12} />{selectedItinerary.duration}</span>
                      <span className="flex items-center gap-1.5"><DollarSign size={12} />₹{Number(selectedItinerary.price).toLocaleString('en-IN')}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={12} />{selectedItinerary.itinerary?.length || 0} days planned</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Btn variant="default" size="sm" onClick={handleEditTrip} disabled={isEditingTrip}>
                      <Edit2 size={13} /> Edit
                    </Btn>
                    <Btn variant="danger" size="sm" onClick={handleDeleteItinerary} disabled={deletingItinerary}>
                      <Trash2 size={13} /> {deletingItinerary ? 'Deleting...' : 'Delete'}
                    </Btn>
                  </div>
                </div>

                {selectedItinerary.coverImage && !isEditingTrip && (
                  <div className="mt-4 h-36 rounded-xl overflow-hidden bg-slate-100">
                    <img src={selectedItinerary.coverImage} alt="cover" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {isEditingTrip && (
                <div className="border-t border-slate-100 p-5 space-y-4 bg-slate-50/50 rounded-b-2xl">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Edit trip details</p>
                  <div className="grid grid-cols-2 gap-4">
                    <FieldGroup label="Title" icon={MapPin}>
                      <Input value={editTripForm.title} onChange={(e) => setEditTripForm({ ...editTripForm, title: e.target.value })} />
                    </FieldGroup>
                    <FieldGroup label="Price ₹" icon={DollarSign}>
                      <Input type="number" value={editTripForm.price} onChange={(e) => setEditTripForm({ ...editTripForm, price: e.target.value })} />
                    </FieldGroup>
                    <FieldGroup label="Duration" icon={Clock}>
                      <Input value={editTripForm.duration} onChange={(e) => setEditTripForm({ ...editTripForm, duration: e.target.value })} />
                    </FieldGroup>
                    <FieldGroup label="Category">
                      <Select value={editTripForm.category} onChange={(e) => setEditTripForm({ ...editTripForm, category: e.target.value })}>
                        {tripCategoryOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </Select>
                    </FieldGroup>
                  </div>
                  <FieldGroup label="Cover image URL" icon={Image}>
                    <Input value={editTripForm.coverImage} onChange={(e) => setEditTripForm({ ...editTripForm, coverImage: e.target.value })} />
                  </FieldGroup>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input type="checkbox" checked={editTripForm.isComingSoon} onChange={(e) => setEditTripForm({ ...editTripForm, isComingSoon: e.target.checked })} className="rounded accent-sky-600" />
                    <span className="text-xs text-slate-600">Show "Coming Soon" badge</span>
                  </label>
                  <div className="flex gap-2">
                    <Btn variant="success" size="sm" onClick={handleUpdateTrip} disabled={updatingTrip}>
                      {updatingTrip ? <Loader size={13} className="animate-spin" /> : <Check size={13} />}
                      {updatingTrip ? 'Saving...' : 'Save changes'}
                    </Btn>
                    <Btn variant="ghost" size="sm" onClick={() => setIsEditingTrip(false)}>Cancel</Btn>
                  </div>
                </div>
              )}
            </Card>

            <Card>
              <SectionHeader title={editingDayIndex !== null ? 'Edit day' : 'Add a day'} />
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FieldGroup label="Day label" icon={Calendar}>
                    <Input placeholder="Day 1" value={dayForm.day} onChange={(e) => setDayForm({ ...dayForm, day: e.target.value })} />
                  </FieldGroup>
                  <FieldGroup label="Title">
                    <Input placeholder="Arrival & Sightseeing" value={dayForm.title} onChange={(e) => setDayForm({ ...dayForm, title: e.target.value })} />
                  </FieldGroup>
                </div>
                <FieldGroup label="Activities (comma-separated)">
                  <Input placeholder="Dal Lake boat ride, Mughal Gardens, Local market" value={dayForm.activitiesText} onChange={(e) => setDayForm({ ...dayForm, activitiesText: e.target.value })} />
                </FieldGroup>
                <div className="grid grid-cols-2 gap-4">
                  <FieldGroup label="Accommodation" icon={Bed}>
                    <Input placeholder="Hotel Grand" value={dayForm.accommodation} onChange={(e) => setDayForm({ ...dayForm, accommodation: e.target.value })} />
                  </FieldGroup>
                  <FieldGroup label="Meals" icon={Utensils}>
                    <Input placeholder="Breakfast + Dinner" value={dayForm.meals} onChange={(e) => setDayForm({ ...dayForm, meals: e.target.value })} />
                  </FieldGroup>
                </div>
                <FieldGroup label="Notes" icon={FileText}>
                  <Textarea rows={2} placeholder="Optional notes for travellers..." value={dayForm.notes} onChange={(e) => setDayForm({ ...dayForm, notes: e.target.value })} />
                </FieldGroup>
                <div className="flex gap-2">
                  <Btn variant="primary" size="sm" onClick={handleAddDay} disabled={submittingDay}>
                    {submittingDay ? <Loader size={13} className="animate-spin" /> : <Check size={13} />}
                    {submittingDay ? 'Saving...' : editingDayIndex !== null ? 'Update day' : 'Add day'}
                  </Btn>
                  {editingDayIndex !== null && (
                    <Btn variant="ghost" size="sm" onClick={resetDayForm}>Cancel</Btn>
                  )}
                </div>
              </div>
            </Card>

            <Card>
              <SectionHeader title={`Day-wise plan (${selectedItinerary.itinerary?.length || 0} days)`} />
              <div className="p-3">
                {!selectedItinerary.itinerary?.length ? (
                  <div className="text-center py-10 text-slate-400 text-sm">
                    <Calendar size={28} className="mx-auto mb-3 opacity-30" />
                    No days added yet. Use the form above.
                  </div>
                ) : (
                  selectedItinerary.itinerary.map((day, i) => (
                    <DayRow key={i} day={day} index={i} onEdit={handleEditDay} onDelete={handleDeleteDay} />
                  ))
                )}
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
