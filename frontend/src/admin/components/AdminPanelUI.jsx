import { Bed, Utensils, Edit2, Trash2, Star } from 'lucide-react'

export const tripCategoryOptions = [
  { label: 'Popular', value: 'popular' },
  { label: 'Day-wise', value: 'daywise' },
  { label: 'Romantic Tour', value: 'romantic-tour' },
  { label: 'Couple Tour', value: 'couple-tour' },
  { label: 'Group Tour', value: 'group-tour' },
  { label: 'Family Tour', value: 'family-tour' },
  { label: 'Honeymoon Packages', value: 'honeymoon-packages' },
  { label: 'Adventure Trek', value: 'adventure-trek' },
  { label: 'Spiritual Tour', value: 'spiritual-tour' },
  { label: 'Couple Special', value: 'couple-special' },
]

const categoryColors = {
  popular: 'bg-sky-100 text-sky-700',
  daywise: 'bg-violet-100 text-violet-700',
  'romantic-tour': 'bg-rose-100 text-rose-700',
  'couple-tour': 'bg-pink-100 text-pink-700',
  'group-tour': 'bg-amber-100 text-amber-700',
  'family-tour': 'bg-green-100 text-green-700',
  'honeymoon-packages': 'bg-fuchsia-100 text-fuchsia-700',
  'adventure-trek': 'bg-orange-100 text-orange-700',
  'spiritual-tour': 'bg-indigo-100 text-indigo-700',
  'couple-special': 'bg-red-100 text-red-700',
}

export function Badge({ category }) {
  const cls = categoryColors[category] || 'bg-slate-100 text-slate-600'
  const label = tripCategoryOptions.find((o) => o.value === category)?.label || category

  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase ${cls}`}>
      {label}
    </span>
  )
}

export function FieldGroup({ label, icon: Icon, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1.5 text-[11px] font-semibold tracking-widest text-slate-400 uppercase">
        {Icon && <Icon size={11} />} {label}
      </label>
      {children}
    </div>
  )
}

export function Input({ className = '', ...props }) {
  return (
    <input
      {...props}
      className={`w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 transition ${className}`}
    />
  )
}

export function Select({ className = '', children, ...props }) {
  return (
    <select
      {...props}
      className={`w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 transition appearance-none cursor-pointer ${className}`}
    >
      {children}
    </select>
  )
}

export function Textarea({ className = '', ...props }) {
  return (
    <textarea
      {...props}
      className={`w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 transition resize-none ${className}`}
    />
  )
}

export function Btn({ variant = 'default', size = 'md', className = '', children, ...props }) {
  const base = 'inline-flex items-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed'
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2.5 text-sm', lg: 'px-6 py-3 text-sm' }
  const variants = {
    default: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98]',
    primary: 'bg-gradient-to-r from-[#0b3d66] to-[#1e5c91] text-white hover:from-[#0a3558] hover:to-[#184d79] active:scale-[0.98] shadow-md shadow-[#0b3d66]/20',
    danger: 'bg-white border border-red-200 text-red-500 hover:bg-red-50 active:scale-[0.98]',
    ghost: 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 active:scale-[0.98]',
    success: 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 active:scale-[0.98] shadow-md shadow-emerald-300/40',
  }

  return (
    <button {...props} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

export function Card({ className = '', children }) {
  return (
    <div className={`bg-white/95 backdrop-blur-sm rounded-2xl border border-white shadow-md shadow-slate-200/70 ${className}`}>
      {children}
    </div>
  )
}

export function SectionHeader({ title, action }) {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100/90 bg-linear-to-r from-slate-50 to-white rounded-t-2xl">
      <h2 className="text-sm font-bold text-slate-800 tracking-wide">{title}</h2>
      {action}
    </div>
  )
}

export function DayRow({ day, index, onEdit, onDelete }) {
  return (
    <div className="group flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
      <div className="shrink-0 w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 font-bold text-xs">
        D{index + 1}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 truncate">{day.title}</p>
        <p className="text-xs text-slate-400 mt-0.5 truncate">{day.activities?.join(' · ')}</p>
        <div className="flex gap-3 mt-1.5 text-[11px] text-slate-400">
          {day.accommodation && day.accommodation !== 'N/A' && (
            <span className="flex items-center gap-1"><Bed size={10} />{day.accommodation}</span>
          )}
          {day.meals && day.meals !== 'N/A' && (
            <span className="flex items-center gap-1"><Utensils size={10} />{day.meals}</span>
          )}
        </div>
      </div>
      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <Btn variant="ghost" size="sm" onClick={() => onEdit(index)}><Edit2 size={13} /></Btn>
        <Btn variant="danger" size="sm" onClick={() => onDelete(index)}><Trash2 size={13} /></Btn>
      </div>
    </div>
  )
}

export function ReviewCard({ review, onDelete, deleting }) {
  return (
    <div className="group flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 bg-white transition">
      <div className="w-9 h-9 rounded-full bg-linear-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
        {review.name?.[0]?.toUpperCase() || '?'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-slate-800">{review.name}</span>
          <span className="flex text-amber-400 text-xs">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={11} fill={i < review.rating ? 'currentColor' : 'none'} />
            ))}
          </span>
        </div>
        <p className="text-sm text-slate-500 mt-1 leading-relaxed">{review.comment}</p>
        <p className="text-[11px] text-slate-300 mt-2">{new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
      </div>
      <Btn variant="danger" size="sm" onClick={() => onDelete(review._id)} disabled={deleting} className="opacity-0 group-hover:opacity-100 shrink-0">
        <Trash2 size={13} />
      </Btn>
    </div>
  )
}
