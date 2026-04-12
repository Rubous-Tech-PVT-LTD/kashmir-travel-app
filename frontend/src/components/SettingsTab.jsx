import { Plus, Trash2 } from 'lucide-react'

export default function SettingsTab({
    settings,
    addHeroImageUrl,
    updateHeroImageUrl,
    removeHeroImageUrl,
    handleUpdateSettings,
    settingsSubmitting
}) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-900/5">
            <div className="flex flex-col gap-4 rounded-3xl bg-slate-950/5 p-6 shadow-inner shadow-slate-900/5 mb-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-lg shadow-blue-600/10">
                    <Plus className="h-5 w-5" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-slate-900">Global Settings</h3>
                    <p className="mt-1 text-sm text-slate-500">Update page banners and site configuration in the admin theme.</p>
                </div>
            </div>

            <div className="space-y-8">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h4 className="text-lg font-semibold text-slate-900">Home Page Banners</h4>
                            <p className="mt-1 text-sm text-slate-600">Manage your hero image rotation strategy.</p>
                        </div>
                        <button
                            onClick={addHeroImageUrl}
                            className="inline-flex items-center justify-center rounded-3xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition"
                        >
                            Add New Banner
                        </button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {settings.heroImages.map((url, index) => (
                        <div key={index} className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                            <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-4">
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-slate-100 text-sm font-bold text-slate-900">{index + 1}</span>
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => updateHeroImageUrl(index, e.target.value)}
                                    placeholder="Image URL"
                                    className="w-full bg-slate-50 px-3 py-2 rounded-3xl text-sm text-slate-700 outline-none border border-slate-200"
                                />
                                {settings.heroImages.length > 1 && (
                                    <button
                                        onClick={() => removeHeroImageUrl(index)}
                                        className="rounded-2xl bg-red-500 px-3 py-2 text-white hover:bg-red-600 transition"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                            <div className="h-48 bg-slate-900/5 flex items-center justify-center">
                                {url ? (
                                    <img src={url} alt={`Banner ${index + 1}`} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-slate-500">Waiting for URL...</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {settings.heroImages.length === 0 && (
                    <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center shadow-sm">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">
                            <Plus className="h-8 w-8" />
                        </div>
                        <p className="text-slate-900 text-xl font-semibold">No Banners Found</p>
                        <p className="mt-2 text-slate-500">Upload at least one beautiful image to start your home page rotation.</p>
                    </div>
                )}

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                    <h4 className="text-lg font-semibold text-slate-900">How it works</h4>
                    <p className="mt-2 text-sm text-slate-600">Banner image URLs are used on the home page hero carousel. Use high-quality images and HTTPS URLs for the best results.</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-3xl bg-white border border-slate-200 p-4">
                            <p className="text-sm text-slate-500">Recommended size</p>
                            <p className="mt-2 text-lg font-semibold text-slate-900">1200x600 px</p>
                        </div>
                        <div className="rounded-3xl bg-white border border-slate-200 p-4">
                            <p className="text-sm text-slate-500">Optimal format</p>
                            <p className="mt-2 text-lg font-semibold text-slate-900">JPEG / PNG</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <button
                    onClick={handleUpdateSettings}
                    disabled={settingsSubmitting}
                    className="rounded-3xl bg-slate-900 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition disabled:opacity-50"
                >
                    {settingsSubmitting ? 'Saving...' : 'Save Global Settings'}
                </button>
            </div>
        </div>
    )
}
