import { Plus, X, Loader, Check, ChevronRight, Building2, MapPin, Clock, Star, DollarSign, Edit2, Trash2 } from 'lucide-react'
import { Btn, Card, FieldGroup, Input, SectionHeader, Textarea } from '../components/AdminPanelUI'

export default function HotelsTab({
  showNewHotelForm,
  setShowNewHotelForm,
  setIsEditingHotel,
  resetHotelForm,
  hotelForm,
  setHotelForm,
  handleCreateHotel,
  submittingHotel,
  hotels,
  selectedHotelId,
  setSelectedHotelId,
  selectedHotel,
  handleStartEditHotel,
  isEditingHotel,
  handleDeleteHotel,
  deletingHotel,
  handleUpdateHotel,
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-72 lg:flex-shrink-0 space-y-4">
        <Card>
          <SectionHeader
            title="All Hotels"
            action={
              <Btn
                variant="primary"
                size="sm"
                onClick={() => {
                  setShowNewHotelForm((value) => !value)
                  setIsEditingHotel(false)
                  if (!showNewHotelForm) resetHotelForm()
                }}
              >
                <Plus size={13} /> New
              </Btn>
            }
          />

          {showNewHotelForm && (
            <div className="p-4 border-b border-slate-100 space-y-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Create hotel</p>
              <FieldGroup label="Hotel name">
                <Input placeholder="e.g. Snow Peak Residency" value={hotelForm.name} onChange={(e) => setHotelForm({ ...hotelForm, name: e.target.value })} />
              </FieldGroup>
              <FieldGroup label="Location">
                <Input placeholder="Srinagar" value={hotelForm.location} onChange={(e) => setHotelForm({ ...hotelForm, location: e.target.value })} />
              </FieldGroup>
              <div className="grid grid-cols-2 gap-2">
                <FieldGroup label="Nights">
                  <Input placeholder="2N/3D Stay" value={hotelForm.nights} onChange={(e) => setHotelForm({ ...hotelForm, nights: e.target.value })} />
                </FieldGroup>
                <FieldGroup label="Rating">
                  <Input type="number" min="1" max="5" value={hotelForm.rating} onChange={(e) => setHotelForm({ ...hotelForm, rating: e.target.value })} />
                </FieldGroup>
              </div>
              <FieldGroup label="Price">
                <Input placeholder="14999" value={hotelForm.price} onChange={(e) => setHotelForm({ ...hotelForm, price: e.target.value })} />
              </FieldGroup>
              <FieldGroup label="Image URL">
                <Input placeholder="https://..." value={hotelForm.image} onChange={(e) => setHotelForm({ ...hotelForm, image: e.target.value })} />
              </FieldGroup>
              <div className="flex gap-2 pt-1">
                <Btn variant="primary" size="sm" onClick={handleCreateHotel} disabled={submittingHotel} className="flex-1 justify-center">
                  {submittingHotel ? <Loader size={13} className="animate-spin" /> : <Check size={13} />}
                  {submittingHotel ? 'Creating...' : 'Create'}
                </Btn>
                <Btn variant="ghost" size="sm" onClick={() => setShowNewHotelForm(false)}><X size={13} /></Btn>
              </div>
            </div>
          )}

          <div className="p-2 space-y-0.5 max-h-[65vh] overflow-y-auto">
            {hotels.length === 0 ? (
              <p className="text-center text-slate-400 text-sm py-8">No hotels yet</p>
            ) : hotels.map((hotel) => (
              <button
                key={hotel.id}
                onClick={() => {
                  setSelectedHotelId(hotel.id)
                  setIsEditingHotel(false)
                  setShowNewHotelForm(false)
                  resetHotelForm()
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all group ${
                  Number(selectedHotelId) === hotel.id
                    ? 'bg-sky-50 border border-sky-100'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-emerald-400" />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${Number(selectedHotelId) === hotel.id ? 'text-sky-700' : 'text-slate-700'}`}>{hotel.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{hotel.location} · ₹{hotel.price}</p>
                </div>
                <ChevronRight size={13} className={`flex-shrink-0 transition-opacity ${Number(selectedHotelId) === hotel.id ? 'text-sky-400 opacity-100' : 'text-slate-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100'}`} />
              </button>
            ))}
          </div>
        </Card>
      </div>

      <div className="flex-1 min-w-0 space-y-4">
        {!selectedHotel ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center text-slate-400">
              <Building2 size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Select or create a hotel</p>
            </div>
          </div>
        ) : (
          <Card>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg font-bold text-slate-800">{selectedHotel.name}</h1>
                  <div className="flex items-center gap-4 text-sm text-slate-400 flex-wrap mt-1">
                    <span className="flex items-center gap-1.5"><MapPin size={12} />{selectedHotel.location}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} />{selectedHotel.nights}</span>
                    <span className="flex items-center gap-1.5"><Star size={12} />{selectedHotel.rating}/5</span>
                    <span className="flex items-center gap-1.5"><DollarSign size={12} />₹{selectedHotel.price}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Btn variant="default" size="sm" onClick={handleStartEditHotel} disabled={isEditingHotel}>
                    <Edit2 size={13} /> Edit
                  </Btn>
                  <Btn variant="danger" size="sm" onClick={handleDeleteHotel} disabled={deletingHotel}>
                    <Trash2 size={13} /> {deletingHotel ? 'Deleting...' : 'Delete'}
                  </Btn>
                </div>
              </div>

              {selectedHotel.image && !isEditingHotel && (
                <div className="mt-4 h-44 rounded-xl overflow-hidden bg-slate-100">
                  <img src={selectedHotel.image} alt={selectedHotel.name} className="w-full h-full object-cover" />
                </div>
              )}

              {!isEditingHotel && (
                <div className="mt-4 border border-slate-100 rounded-xl bg-slate-50/60 p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="rounded-lg bg-white border border-slate-100 p-3">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Check-in</p>
                      <p className="text-sm font-semibold text-slate-700 mt-1">{selectedHotel.checkInTime || '2:00 PM'}</p>
                    </div>
                    <div className="rounded-lg bg-white border border-slate-100 p-3">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Check-out</p>
                      <p className="text-sm font-semibold text-slate-700 mt-1">{selectedHotel.checkOutTime || '11:00 AM'}</p>
                    </div>
                    <div className="rounded-lg bg-white border border-slate-100 p-3">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Capacity</p>
                      <p className="text-sm font-semibold text-slate-700 mt-1">{selectedHotel.capacity || '2-4 Guests'}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-1">Description</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{selectedHotel.description || 'No description available for this hotel yet.'}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-2">Amenities</p>
                      {selectedHotel.amenities?.length ? (
                        <div className="flex flex-wrap gap-2">
                          {selectedHotel.amenities.map((item, index) => (
                            <span key={`amenity-${index}`} className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-xs text-slate-600">
                              {item}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-400">No amenities listed.</p>
                      )}
                    </div>

                    <div>
                      <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-2">Facilities</p>
                      {selectedHotel.facilities?.length ? (
                        <div className="flex flex-wrap gap-2">
                          {selectedHotel.facilities.map((item, index) => (
                            <span key={`facility-${index}`} className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-xs text-slate-600">
                              {item}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-400">No facilities listed.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isEditingHotel && (
              <div className="border-t border-slate-100 p-5 space-y-4 bg-slate-50/50 rounded-b-2xl">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Edit hotel details</p>
                <div className="grid grid-cols-2 gap-4">
                  <FieldGroup label="Hotel name"><Input value={hotelForm.name} onChange={(e) => setHotelForm({ ...hotelForm, name: e.target.value })} /></FieldGroup>
                  <FieldGroup label="Location"><Input value={hotelForm.location} onChange={(e) => setHotelForm({ ...hotelForm, location: e.target.value })} /></FieldGroup>
                  <FieldGroup label="Nights"><Input value={hotelForm.nights} onChange={(e) => setHotelForm({ ...hotelForm, nights: e.target.value })} /></FieldGroup>
                  <FieldGroup label="Rating"><Input type="number" min="1" max="5" value={hotelForm.rating} onChange={(e) => setHotelForm({ ...hotelForm, rating: e.target.value })} /></FieldGroup>
                  <FieldGroup label="Price"><Input value={hotelForm.price} onChange={(e) => setHotelForm({ ...hotelForm, price: e.target.value })} /></FieldGroup>
                  <FieldGroup label="Capacity"><Input value={hotelForm.capacity} onChange={(e) => setHotelForm({ ...hotelForm, capacity: e.target.value })} /></FieldGroup>
                </div>
                <FieldGroup label="Image URL"><Input value={hotelForm.image} onChange={(e) => setHotelForm({ ...hotelForm, image: e.target.value })} /></FieldGroup>
                <FieldGroup label="Description"><Textarea rows={3} value={hotelForm.description} onChange={(e) => setHotelForm({ ...hotelForm, description: e.target.value })} /></FieldGroup>
                <div className="grid grid-cols-2 gap-4">
                  <FieldGroup label="Amenities (comma-separated)"><Input value={hotelForm.amenitiesText} onChange={(e) => setHotelForm({ ...hotelForm, amenitiesText: e.target.value })} /></FieldGroup>
                  <FieldGroup label="Facilities (comma-separated)"><Input value={hotelForm.facilitiesText} onChange={(e) => setHotelForm({ ...hotelForm, facilitiesText: e.target.value })} /></FieldGroup>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FieldGroup label="Check-in"><Input value={hotelForm.checkInTime} onChange={(e) => setHotelForm({ ...hotelForm, checkInTime: e.target.value })} /></FieldGroup>
                  <FieldGroup label="Check-out"><Input value={hotelForm.checkOutTime} onChange={(e) => setHotelForm({ ...hotelForm, checkOutTime: e.target.value })} /></FieldGroup>
                </div>
                <div className="flex gap-2">
                  <Btn variant="success" size="sm" onClick={handleUpdateHotel} disabled={submittingHotel}>
                    {submittingHotel ? <Loader size={13} className="animate-spin" /> : <Check size={13} />}
                    {submittingHotel ? 'Saving...' : 'Save changes'}
                  </Btn>
                  <Btn variant="ghost" size="sm" onClick={() => { setIsEditingHotel(false); resetHotelForm() }}>Cancel</Btn>
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}
