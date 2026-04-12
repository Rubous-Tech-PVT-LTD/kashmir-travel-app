import { Plus, Image, X, Loader, Check } from 'lucide-react'
import { Btn, Card, SectionHeader } from '../components/AdminPanelUI'

export default function SettingsTab({
  settings,
  setSettings,
  handleUpdateSettings,
  settingsSubmitting,
}) {
  return (
    <div className="w-full">
      <Card className="w-full min-h-[calc(100vh-10.5rem)]">
        <SectionHeader
          title="Home page banners"
          action={
            <Btn variant="primary" size="sm" onClick={() => setSettings((s) => ({ ...s, heroImages: [...s.heroImages, ''] }))}>
              <Plus size={13} /> Add banner
            </Btn>
          }
        />
        <div className="p-5 space-y-4">
          {settings.heroImages.length === 0 ? (
            <div className="text-center py-14 border-2 border-dashed border-slate-200 rounded-xl">
              <Image size={28} className="mx-auto mb-3 text-slate-300" />
              <p className="text-sm text-slate-400 mb-3">No banners added yet</p>
              <Btn variant="primary" size="sm" onClick={() => setSettings((s) => ({ ...s, heroImages: [''] }))}>
                <Plus size={13} /> Add first banner
              </Btn>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {settings.heroImages.map((url, i) => (
                <div key={i} className="rounded-xl border border-slate-200 overflow-hidden group">
                  <div className="h-40 bg-slate-100 relative overflow-hidden">
                    {url ? (
                      <img src={url} alt={`Banner ${i + 1}`} className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
                    ) : null}
                    <div className={`absolute inset-0 flex items-center justify-center text-slate-400 text-xs bg-slate-100 ${url ? 'hidden' : 'flex'}`}>
                      Waiting for URL
                    </div>
                    <div className="absolute top-2 left-2">
                      <span className="bg-black/50 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">#{i + 1}</span>
                    </div>
                    {settings.heroImages.length > 1 && (
                      <button
                        onClick={() => setSettings((s) => ({ ...s, heroImages: s.heroImages.filter((_, idx) => idx !== i) }))}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={11} />
                      </button>
                    )}
                  </div>
                  <div className="p-2 bg-white border-t border-slate-100">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => {
                        const imgs = [...settings.heroImages]
                        imgs[i] = e.target.value
                        setSettings({ ...settings, heroImages: imgs })
                      }}
                      placeholder="Paste image URL..."
                      className="w-full text-xs text-slate-600 placeholder-slate-300 bg-transparent focus:outline-none font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pt-2 flex justify-end border-t border-slate-100">
            <Btn variant="primary" size="md" onClick={handleUpdateSettings} disabled={settingsSubmitting}>
              {settingsSubmitting ? <Loader size={14} className="animate-spin" /> : <Check size={14} />}
              {settingsSubmitting ? 'Saving...' : 'Save settings'}
            </Btn>
          </div>
        </div>
      </Card>
    </div>
  )
}
