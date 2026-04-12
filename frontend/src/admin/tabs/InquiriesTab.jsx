import { Mail, Phone, User, Briefcase, CalendarDays, MessageSquareText, Inbox } from 'lucide-react'
import { Card, SectionHeader } from '../components/AdminPanelUI'

const formatDate = (value) => {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function InquiriesTab({ inquiries, loading, selectedInquiryId, setSelectedInquiryId, selectedInquiry }) {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-80 lg:flex-shrink-0 space-y-4">
        <Card>
          <SectionHeader title="All Inquiries" />
          <div className="p-2 max-h-[70vh] overflow-y-auto">
            {loading ? (
              <div className="px-4 py-10 text-center text-slate-400 text-sm">
                Loading inquiries...
              </div>
            ) : inquiries.length === 0 ? (
              <div className="px-4 py-10 text-center text-slate-400 text-sm">
                <Inbox size={28} className="mx-auto mb-3 opacity-30" />
                No inquiries submitted yet
              </div>
            ) : (
              inquiries.map((inquiry) => (
                <button
                  key={inquiry._id}
                  onClick={() => setSelectedInquiryId(inquiry._id)}
                  className={`w-full rounded-xl border px-3 py-3 text-left transition-all mb-2 ${
                    selectedInquiryId === inquiry._id
                      ? 'border-sky-200 bg-sky-50'
                      : 'border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className={`text-sm font-semibold truncate ${selectedInquiryId === inquiry._id ? 'text-sky-700' : 'text-slate-800'}`}>
                      {inquiry.name}
                    </p>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">
                      {formatDate(inquiry.createdAt)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 truncate">{inquiry.tripType || 'General Inquiry'}</p>
                </button>
              ))
            )}
          </div>
        </Card>
      </div>

      <div className="flex-1 min-w-0 space-y-4">
        {!selectedInquiry ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center text-slate-400">
              <MessageSquareText size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Select an inquiry to view details</p>
            </div>
          </div>
        ) : (
          <Card>
            <SectionHeader title="Inquiry details" />
            <div className="p-6 space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-100 p-4">
                  <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-widest font-semibold mb-2"><User size={12} /> Name</div>
                  <p className="text-sm font-semibold text-slate-800">{selectedInquiry.name}</p>
                </div>
                <div className="rounded-xl border border-slate-100 p-4">
                  <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-widest font-semibold mb-2"><Mail size={12} /> Email</div>
                  <p className="text-sm font-semibold text-slate-800 break-all">{selectedInquiry.email}</p>
                </div>
                <div className="rounded-xl border border-slate-100 p-4">
                  <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-widest font-semibold mb-2"><Phone size={12} /> WhatsApp</div>
                  <p className="text-sm font-semibold text-slate-800">{selectedInquiry.whatsapp}</p>
                </div>
                <div className="rounded-xl border border-slate-100 p-4">
                  <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-widest font-semibold mb-2"><Briefcase size={12} /> Profession</div>
                  <p className="text-sm font-semibold text-slate-800">{selectedInquiry.profession || '—'}</p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 p-4">
                <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-widest font-semibold mb-2"><MessageSquareText size={12} /> Interested In</div>
                <p className="text-sm font-semibold text-slate-800">{selectedInquiry.tripType || 'General Inquiry'}</p>
              </div>

              <div className="rounded-xl border border-slate-100 p-4">
                <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-widest font-semibold mb-2"><CalendarDays size={12} /> Submitted</div>
                <p className="text-sm font-semibold text-slate-800">{formatDate(selectedInquiry.createdAt)}</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
