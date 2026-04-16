import { Plus, X, Loader, Check, ChevronRight, Car, MapPin, Clock, DollarSign, Edit2, Trash2 } from 'lucide-react'
import { Btn, Card, FieldGroup, Input, SectionHeader } from '../components/AdminPanelUI'

export default function CarRentalsTab({
  showNewCarRentalForm,
  setShowNewCarRentalForm,
  setIsEditingCarRental,
  resetCarRentalForm,
  carRentalForm,
  setCarRentalForm,
  handleCreateCarRental,
  submittingCarRental,
  carRentals,
  selectedCarRentalId,
  setSelectedCarRentalId,
  selectedCarRental,
  handleStartEditCarRental,
  isEditingCarRental,
  handleDeleteCarRental,
  deletingCarRental,
  handleUpdateCarRental,
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-72 lg:flex-shrink-0 space-y-4">
        <Card>
          <SectionHeader
            title="All Car Rentals"
            action={
              <Btn
                variant="primary"
                size="sm"
                onClick={() => {
                  setShowNewCarRentalForm((value) => !value)
                  setIsEditingCarRental(false)
                  if (!showNewCarRentalForm) resetCarRentalForm()
                }}
              >
                <Plus size={13} /> New
              </Btn>
            }
          />

          {showNewCarRentalForm && (
            <div className="p-4 border-b border-slate-100 space-y-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Create car rental</p>
              <FieldGroup label="Vehicle name"><Input placeholder="e.g. Innova Crysta" value={carRentalForm.name} onChange={(e) => setCarRentalForm({ ...carRentalForm, name: e.target.value })} /></FieldGroup>
              <FieldGroup label="Type"><Input placeholder="Family MPV" value={carRentalForm.type} onChange={(e) => setCarRentalForm({ ...carRentalForm, type: e.target.value })} /></FieldGroup>
              <FieldGroup label="Route"><Input placeholder="Gulmarg + Sonamarg" value={carRentalForm.route} onChange={(e) => setCarRentalForm({ ...carRentalForm, route: e.target.value })} /></FieldGroup>
              <div className="grid grid-cols-2 gap-2">
                <FieldGroup label="Seats"><Input placeholder="6-7 Seats" value={carRentalForm.seats} onChange={(e) => setCarRentalForm({ ...carRentalForm, seats: e.target.value })} /></FieldGroup>
                <FieldGroup label="Price"><Input placeholder="4,999/day" value={carRentalForm.price} onChange={(e) => setCarRentalForm({ ...carRentalForm, price: e.target.value })} /></FieldGroup>
              </div>
              <FieldGroup label="Image URL"><Input placeholder="https://..." value={carRentalForm.image} onChange={(e) => setCarRentalForm({ ...carRentalForm, image: e.target.value })} /></FieldGroup>
              <div className="flex gap-2 pt-1">
                <Btn variant="primary" size="sm" onClick={handleCreateCarRental} disabled={submittingCarRental} className="flex-1 justify-center">
                  {submittingCarRental ? <Loader size={13} className="animate-spin" /> : <Check size={13} />}
                  {submittingCarRental ? 'Creating...' : 'Create'}
                </Btn>
                <Btn variant="ghost" size="sm" onClick={() => setShowNewCarRentalForm(false)}><X size={13} /></Btn>
              </div>
            </div>
          )}

          <div className="p-2 space-y-0.5 max-h-[65vh] overflow-y-auto">
            {carRentals.length === 0 ? (
              <p className="text-center text-slate-400 text-sm py-8">No car rentals yet</p>
            ) : carRentals.map((rental) => (
              <button
                key={rental.id}
                onClick={() => {
                  setSelectedCarRentalId(rental.id)
                  setIsEditingCarRental(false)
                  setShowNewCarRentalForm(false)
                  resetCarRentalForm()
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all group ${
                  Number(selectedCarRentalId) === rental.id
                    ? 'bg-sky-50 border border-sky-100'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-emerald-400" />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${Number(selectedCarRentalId) === rental.id ? 'text-sky-700' : 'text-slate-700'}`}>{rental.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{rental.type} · ₹{rental.price}</p>
                </div>
                <ChevronRight size={13} className={`flex-shrink-0 transition-opacity ${Number(selectedCarRentalId) === rental.id ? 'text-sky-400 opacity-100' : 'text-slate-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100'}`} />
              </button>
            ))}
          </div>
        </Card>
      </div>

      <div className="flex-1 min-w-0 space-y-4">
        {!selectedCarRental ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center text-slate-400">
              <Car size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Select or create a car rental</p>
            </div>
          </div>
        ) : (
          <Card>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg font-bold text-slate-800">{selectedCarRental.name}</h1>
                  <div className="flex items-center gap-4 text-sm text-slate-400 flex-wrap mt-1">
                    <span className="flex items-center gap-1.5"><Car size={12} />{selectedCarRental.type}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={12} />{selectedCarRental.route}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} />{selectedCarRental.seats}</span>
                    <span className="flex items-center gap-1.5"><DollarSign size={12} />₹{selectedCarRental.price}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Btn variant="default" size="sm" onClick={handleStartEditCarRental} disabled={isEditingCarRental}>
                    <Edit2 size={13} /> Edit
                  </Btn>
                  <Btn variant="danger" size="sm" onClick={handleDeleteCarRental} disabled={deletingCarRental}>
                    <Trash2 size={13} /> {deletingCarRental ? 'Deleting...' : 'Delete'}
                  </Btn>
                </div>
              </div>

              {selectedCarRental.image && !isEditingCarRental && (
                <div className="mt-4 h-44 rounded-xl overflow-hidden bg-slate-100">
                  <img src={selectedCarRental.image} alt={selectedCarRental.name} className="w-full h-full object-cover" />
                </div>
              )}

              {!isEditingCarRental && (
                <div className="mt-4 border border-slate-100 rounded-xl bg-slate-50/60 p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="rounded-lg bg-white border border-slate-100 p-3">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Vehicle Type</p>
                      <p className="text-sm font-semibold text-slate-700 mt-1">{selectedCarRental.type || 'N/A'}</p>
                    </div>
                    <div className="rounded-lg bg-white border border-slate-100 p-3">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Seats</p>
                      <p className="text-sm font-semibold text-slate-700 mt-1">{selectedCarRental.seats || 'N/A'}</p>
                    </div>
                    <div className="rounded-lg bg-white border border-slate-100 p-3">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Starting Price</p>
                      <p className="text-sm font-semibold text-slate-700 mt-1">₹{selectedCarRental.price || 'N/A'}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-1">Route / Coverage</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{selectedCarRental.route || 'No route details available.'}</p>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-2">Vehicle Summary</p>
                    <div className="rounded-lg bg-white border border-slate-100 p-3 text-sm text-slate-600">
                      <p>
                        {selectedCarRental.name || 'This vehicle'} is available as a {selectedCarRental.type || 'rental option'} for
                        {' '}{selectedCarRental.route || 'local and outstation routes'}, with {selectedCarRental.seats || 'standard seating'} at
                        {' '}₹{selectedCarRental.price || 'N/A'}.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isEditingCarRental && (
              <div className="border-t border-slate-100 p-5 space-y-4 bg-slate-50/50 rounded-b-2xl">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Edit car rental details</p>
                <div className="grid grid-cols-2 gap-4">
                  <FieldGroup label="Vehicle name"><Input value={carRentalForm.name} onChange={(e) => setCarRentalForm({ ...carRentalForm, name: e.target.value })} /></FieldGroup>
                  <FieldGroup label="Type"><Input value={carRentalForm.type} onChange={(e) => setCarRentalForm({ ...carRentalForm, type: e.target.value })} /></FieldGroup>
                  <FieldGroup label="Route"><Input value={carRentalForm.route} onChange={(e) => setCarRentalForm({ ...carRentalForm, route: e.target.value })} /></FieldGroup>
                  <FieldGroup label="Seats"><Input value={carRentalForm.seats} onChange={(e) => setCarRentalForm({ ...carRentalForm, seats: e.target.value })} /></FieldGroup>
                  <FieldGroup label="Price"><Input value={carRentalForm.price} onChange={(e) => setCarRentalForm({ ...carRentalForm, price: e.target.value })} /></FieldGroup>
                  <FieldGroup label="Image URL"><Input value={carRentalForm.image} onChange={(e) => setCarRentalForm({ ...carRentalForm, image: e.target.value })} /></FieldGroup>
                </div>
                <div className="flex gap-2">
                  <Btn variant="success" size="sm" onClick={handleUpdateCarRental} disabled={submittingCarRental}>
                    {submittingCarRental ? <Loader size={13} className="animate-spin" /> : <Check size={13} />}
                    {submittingCarRental ? 'Saving...' : 'Save changes'}
                  </Btn>
                  <Btn variant="ghost" size="sm" onClick={() => { setIsEditingCarRental(false); resetCarRentalForm() }}>Cancel</Btn>
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}
