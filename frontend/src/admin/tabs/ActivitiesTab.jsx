import { Plus, Loader, Check, ChevronRight, Compass, Edit2, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Btn, Card, FieldGroup, Input, SectionHeader } from '../components/AdminPanelUI'

const SECTION_CONFIG = {
  'gondola-ride': [
    {
      key: 'gondolaHighlights',
      label: 'Highlights',
      fields: [
        { key: 'title', label: 'Title' },
        { key: 'detail', label: 'Detail' },
      ],
    },
    {
      key: 'rideTiers',
      label: 'Gondola Packages',
      fields: [
        { key: 'route', label: 'Route' },
        { key: 'title', label: 'Title' },
        { key: 'description', label: 'Description' },
        { key: 'price', label: 'Price' },
      ],
    },
    {
      key: 'gondolaMoments',
      label: 'Moments',
      fields: [
        { key: 'label', label: 'Label' },
        { key: 'value', label: 'Value' },
      ],
    },
    {
      key: 'activityFlow',
      label: 'Activity Flow',
      fields: [
        { key: 'phase', label: 'Phase' },
        { key: 'step', label: 'Step' },
      ],
    },
    {
      key: 'seasonalNotes',
      label: 'Seasonal Notes',
      itemType: 'string',
      inputLabel: 'Note',
    },
  ],
  'shikara-ride': [
    {
      key: 'rideHighlights',
      label: 'Highlights',
      fields: [
        { key: 'title', label: 'Title' },
        { key: 'detail', label: 'Detail' },
      ],
    },
    {
      key: 'ridePackages',
      label: 'Ride Packages',
      fields: [
        { key: 'title', label: 'Title' },
        { key: 'description', label: 'Description' },
        { key: 'time', label: 'Time' },
        { key: 'price', label: 'Price' },
      ],
    },
    {
      key: 'rideMoments',
      label: 'Moments',
      fields: [
        { key: 'label', label: 'Label' },
        { key: 'value', label: 'Value' },
      ],
    },
    {
      key: 'scenicStops',
      label: 'Scenic Stops',
      fields: [
        { key: 'title', label: 'Title' },
        { key: 'detail', label: 'Detail' },
      ],
    },
    {
      key: 'shikaraPlanIdeas',
      label: 'Ride Plan Ideas',
      itemType: 'string',
      inputLabel: 'Idea',
    },
    {
      key: 'seasonalNotes',
      label: 'Seasonal Notes',
      itemType: 'string',
      inputLabel: 'Note',
    },
  ],
  'river-rafting': [
    {
      key: 'raftingHighlights',
      label: 'Highlights',
      fields: [
        { key: 'title', label: 'Title' },
        { key: 'detail', label: 'Detail' },
      ],
    },
    {
      key: 'raftingPackages',
      label: 'Rafting Packages',
      fields: [
        { key: 'distance', label: 'Distance' },
        { key: 'title', label: 'Title' },
        { key: 'description', label: 'Description' },
        { key: 'price', label: 'Price' },
      ],
    },
    {
      key: 'raftingMoments',
      label: 'Moments',
      fields: [
        { key: 'label', label: 'Label' },
        { key: 'value', label: 'Value' },
      ],
    },
    {
      key: 'tripPhases',
      label: 'Activity Flow',
      fields: [
        { key: 'phase', label: 'Phase' },
        { key: 'activity', label: 'Activity' },
        { key: 'time', label: 'Time' },
      ],
    },
    {
      key: 'safetyGear',
      label: 'Safety Gear',
      fields: [
        { key: 'item', label: 'Item' },
        { key: 'included', label: 'Included/Value' },
      ],
    },
    {
      key: 'seasonalNotes',
      label: 'Seasonal Notes',
      itemType: 'string',
      inputLabel: 'Note',
    },
  ],
  paragliding: [
    {
      key: 'paraglideHighlights',
      label: 'Highlights',
      fields: [
        { key: 'title', label: 'Title' },
        { key: 'detail', label: 'Detail' },
      ],
    },
    {
      key: 'flightPackages',
      label: 'Flight Packages',
      fields: [
        { key: 'time', label: 'Time' },
        { key: 'title', label: 'Title' },
        { key: 'description', label: 'Description' },
        { key: 'price', label: 'Price' },
      ],
    },
    {
      key: 'flightMoments',
      label: 'Moments',
      fields: [
        { key: 'label', label: 'Label' },
        { key: 'value', label: 'Value' },
      ],
    },
    {
      key: 'flightPhases',
      label: 'Activity Flow',
      fields: [
        { key: 'phase', label: 'Phase' },
        { key: 'activity', label: 'Activity' },
        { key: 'time', label: 'Time' },
      ],
    },
    {
      key: 'flightGear',
      label: 'Flight Gear',
      fields: [
        { key: 'item', label: 'Item' },
        { key: 'condition', label: 'Condition' },
      ],
    },
    {
      key: 'seasonalNotes',
      label: 'Seasonal Notes',
      itemType: 'string',
      inputLabel: 'Note',
    },
  ],
  skiing: [
    {
      key: 'skiHighlights',
      label: 'Highlights',
      fields: [
        { key: 'title', label: 'Title' },
        { key: 'detail', label: 'Detail' },
      ],
    },
    {
      key: 'skiPackages',
      label: 'Skiing Packages',
      fields: [
        { key: 'level', label: 'Level' },
        { key: 'title', label: 'Title' },
        { key: 'description', label: 'Description' },
        { key: 'price', label: 'Price' },
      ],
    },
    {
      key: 'seasonalMoments',
      label: 'Moments',
      fields: [
        { key: 'label', label: 'Label' },
        { key: 'value', label: 'Value' },
      ],
    },
    {
      key: 'skiPhases',
      label: 'Activity Flow',
      fields: [
        { key: 'phase', label: 'Phase' },
        { key: 'activity', label: 'Activity' },
        { key: 'time', label: 'Time' },
      ],
    },
    {
      key: 'skiIncluded',
      label: 'Included Items',
      itemType: 'string',
      inputLabel: 'Item',
    },
    {
      key: 'seasonalNotes',
      label: 'Seasonal Notes',
      itemType: 'string',
      inputLabel: 'Note',
    },
  ],
  'houseboat-stay': [
    {
      key: 'houseboatHighlights',
      label: 'Highlights',
      fields: [
        { key: 'title', label: 'Title' },
        { key: 'detail', label: 'Detail' },
      ],
    },
    {
      key: 'houseboatStays',
      label: 'Houseboat Stays',
      fields: [
        { key: 'title', label: 'Title' },
        { key: 'duration', label: 'Duration' },
        { key: 'location', label: 'Location' },
        { key: 'image', label: 'Image URL' },
        { key: 'price', label: 'Price' },
      ],
    },
    {
      key: 'activityFlow',
      label: 'Activity Flow',
      fields: [
        { key: 'phase', label: 'Phase' },
        { key: 'step', label: 'Step' },
      ],
    },
    {
      key: 'seasonalNotes',
      label: 'Seasonal Notes',
      itemType: 'string',
      inputLabel: 'Note',
    },
  ],
}

const parseJson = (value) => {
  const raw = String(value || '').trim()
  if (!raw) return {}

  try {
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

const getSectionFieldValue = (sectionKey, fieldKey, item = {}) => {
  if (sectionKey === 'rideTiers') {
    if (fieldKey === 'route') return item.route || item.altitude || item.duration || item.tier || ''
    if (fieldKey === 'title') return item.title || item.name || item.tier || ''
    if (fieldKey === 'description') return item.description || item.note || item.detail || item.duration || item.altitude || ''
    if (fieldKey === 'price') return item.price || ''
  }

  if (sectionKey === 'raftingPackages') {
    if (fieldKey === 'distance') return item.distance || item.river || item.level || item.grade || ''
    if (fieldKey === 'title') return item.title || item.name || item.level || ''
    if (fieldKey === 'description') return item.description || item.note || item.detail || item.grade || item.river || ''
    if (fieldKey === 'price') return item.price || ''
  }

  if (sectionKey === 'flightPackages') {
    if (fieldKey === 'time') return item.time || item.duration || item.height || item.type || ''
    if (fieldKey === 'title') return item.title || item.name || item.type || ''
    if (fieldKey === 'description') return item.description || item.note || item.detail || item.height || item.duration || ''
    if (fieldKey === 'price') return item.price || ''
  }

  if (sectionKey === 'skiPackages') {
    if (fieldKey === 'level') return item.level || item.terrain || item.type || ''
    if (fieldKey === 'title') return item.title || item.name || item.duration || ''
    if (fieldKey === 'description') return item.description || item.note || item.includes || item.detail || ''
    if (fieldKey === 'price') return item.price || ''
  }

  return item?.[fieldKey] || ''
}

export default function ActivitiesTab({
  setIsEditingActivity,
  resetActivityForm,
  activityForm,
  setActivityForm,
  submittingActivity,
  activities,
  selectedActivitySlug,
  setSelectedActivitySlug,
  selectedActivity,
  handleStartEditActivity,
  isEditingActivity,
  handleUpdateActivity,
}) {
  const [activeSectionKey, setActiveSectionKey] = useState('')
  const [editingItemIndex, setEditingItemIndex] = useState(null)
  const [itemDraft, setItemDraft] = useState({})

  const sectionOptions = useMemo(() => {
    const slug = selectedActivity?.slug || activityForm.slug
    return SECTION_CONFIG[slug] || []
  }, [selectedActivity?.slug, activityForm.slug])

  const selectedSection = useMemo(() => {
    if (!sectionOptions.length) return null
    return sectionOptions.find((section) => section.key === activeSectionKey) || sectionOptions[0]
  }, [sectionOptions, activeSectionKey])

  const currentContent = useMemo(() => parseJson(activityForm.contentJson), [activityForm.contentJson])
  const sectionItems = selectedSection && Array.isArray(currentContent[selectedSection.key]) ? currentContent[selectedSection.key] : []

  const setSectionItems = (nextItems) => {
    if (!selectedSection) return
    const nextContent = {
      ...currentContent,
      [selectedSection.key]: nextItems,
    }
    setActivityForm({
      ...activityForm,
      contentJson: JSON.stringify(nextContent, null, 2),
    })
  }

  const startCreateItem = () => {
    if (!selectedSection) return

    if (selectedSection.itemType === 'string') {
      setItemDraft({ value: '' })
      setEditingItemIndex(-1)
      return
    }

    const emptyDraft = selectedSection.fields.reduce((acc, field) => {
      acc[field.key] = ''
      return acc
    }, {})

    setItemDraft(emptyDraft)
    setEditingItemIndex(-1)
  }

  const startEditItem = (item, index) => {
    if (!selectedSection) return

    if (selectedSection.itemType === 'string') {
      setItemDraft({ value: typeof item === 'string' ? item : '' })
      setEditingItemIndex(index)
      return
    }

    const nextDraft = selectedSection.fields.reduce((acc, field) => {
      acc[field.key] = getSectionFieldValue(selectedSection.key, field.key, item)
      return acc
    }, {})

    setItemDraft(nextDraft)
    setEditingItemIndex(index)
  }

  const cancelItemEdit = () => {
    setEditingItemIndex(null)
    setItemDraft({})
  }

  const saveItem = () => {
    if (!selectedSection || editingItemIndex === null) return

    if (selectedSection.itemType === 'string') {
      const preparedValue = String(itemDraft.value || '').trim()
      if (!preparedValue) return

      const nextItems = [...sectionItems]
      if (editingItemIndex === -1) {
        nextItems.push(preparedValue)
      } else {
        nextItems[editingItemIndex] = preparedValue
      }

      setSectionItems(nextItems)
      cancelItemEdit()
      return
    }

    const prepared = selectedSection.fields.reduce((acc, field) => {
      acc[field.key] = String(itemDraft[field.key] || '').trim()
      return acc
    }, {})

    const firstField = selectedSection.fields[0]
    if (!prepared[firstField.key]) return

    const nextItems = [...sectionItems]
    if (editingItemIndex === -1) {
      nextItems.push(prepared)
    } else {
      nextItems[editingItemIndex] = prepared
    }

    setSectionItems(nextItems)
    cancelItemEdit()
  }

  const deleteItem = (index) => {
    const nextItems = sectionItems.filter((_, itemIndex) => itemIndex !== index)
    setSectionItems(nextItems)
    if (editingItemIndex === index) cancelItemEdit()
  }

  const activateEditMode = () => {
    handleStartEditActivity()
    if (!activeSectionKey && sectionOptions.length) {
      setActiveSectionKey(sectionOptions[0].key)
    }
  }

  const isActivitySelected = (activity) =>
    !!selectedActivitySlug && activity.slug === selectedActivitySlug

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-72 lg:flex-shrink-0 space-y-4">
        <Card>
          <SectionHeader title="All Activities" />

          <div className="p-2 space-y-0.5 max-h-[65vh] overflow-y-auto">
            {activities.length === 0 ? (
              <p className="text-center text-slate-400 text-sm py-8">No activities yet</p>
            ) : activities.map((activity) => (
              (() => {
                const selected = isActivitySelected(activity)
                return (
              <button
                key={activity.slug || activity.title}
                onClick={() => {
                  setSelectedActivitySlug(activity.slug || '')
                  setIsEditingActivity(false)
                  resetActivityForm()
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all group ${
                  selected
                    ? 'bg-sky-50 border border-sky-100'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-emerald-400" />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${selected ? 'text-sky-700' : 'text-slate-700'}`}>
                    {activity.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">
                    {activity.slug}
                  </p>
                </div>
                <ChevronRight size={13} className={`flex-shrink-0 transition-opacity ${
                  selected
                    ? 'text-sky-400 opacity-100'
                    : 'text-slate-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100'
                }`} />
              </button>
                )
              })()
            ))}
          </div>
        </Card>
      </div>

      <div className="flex-1 min-w-0 space-y-4">
        {!selectedActivity ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center text-slate-400">
              <Compass size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Select an activity</p>
            </div>
          </div>
        ) : (
          <Card>
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg font-bold text-slate-800">{selectedActivity.title}</h1>
                  <p className="text-sm text-slate-400 mt-1">Slug: <span className="font-semibold text-slate-600">{selectedActivity.slug}</span></p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Btn variant="default" size="sm" onClick={activateEditMode} disabled={isEditingActivity}>
                    <Edit2 size={13} /> Edit Content
                  </Btn>
                </div>
              </div>

              {selectedActivity.coverImage && !isEditingActivity && (
                <div className="mt-4 h-44 rounded-xl overflow-hidden bg-slate-100">
                  <img src={selectedActivity.coverImage} alt={selectedActivity.title} className="w-full h-full object-cover" />
                </div>
              )}

              {!isEditingActivity && (
                <div className="mt-4 border border-slate-100 rounded-xl bg-slate-50/60 p-4 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="rounded-lg bg-white border border-slate-100 p-3">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Editable Sections</p>
                      <p className="text-sm font-semibold text-slate-700 mt-1">{sectionOptions.length || 0}</p>
                    </div>
                    <div className="rounded-lg bg-white border border-slate-100 p-3">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">Status</p>
                      <p className="text-sm font-semibold text-slate-700 mt-1">
                        Content-only editing enabled
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-white border border-slate-100 p-3">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-2">Sections</p>
                    {sectionOptions.length === 0 ? (
                      <p className="text-sm text-slate-500">No structured content sections configured for this activity.</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {sectionOptions.map((section) => {
                          const count = Array.isArray(selectedActivity?.content?.[section.key]) ? selectedActivity.content[section.key].length : 0
                          return (
                            <span key={section.key} className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                              {section.label}: {count}
                            </span>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {isEditingActivity && (
              <div className="border-t border-slate-100 p-5 space-y-4 bg-slate-50/50 rounded-b-2xl">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Edit content only</p>

                {sectionOptions.length > 0 && (
                  <div className="space-y-3 border border-slate-200 bg-white rounded-xl p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Section CRUD</p>
                      <div className="flex items-center gap-2">
                        <select
                          className="h-9 rounded-lg border border-slate-300 px-3 text-sm text-slate-700 bg-white"
                          value={selectedSection?.key || ''}
                          onChange={(e) => {
                            setActiveSectionKey(e.target.value)
                            cancelItemEdit()
                          }}
                        >
                          {sectionOptions.map((section) => (
                            <option key={section.key} value={section.key}>{section.label}</option>
                          ))}
                        </select>
                        <Btn variant="primary" size="sm" onClick={startCreateItem}>
                          <Plus size={13} /> Add item
                        </Btn>
                      </div>
                    </div>

                    {sectionItems.length === 0 ? (
                      <p className="text-sm text-slate-400 py-2">No items in this section yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {sectionItems.map((item, index) => (
                          <div key={`${selectedSection.key}-${index}`} className="flex items-center justify-between gap-3 border border-slate-100 rounded-lg px-3 py-2">
                            <p className="text-sm text-slate-700 truncate">
                              {selectedSection.itemType === 'string'
                                ? (item || 'Untitled')
                                : (selectedSection.fields.map((field) => item?.[field.key]).filter(Boolean).join(' • ') || 'Untitled')}
                            </p>
                            <div className="flex items-center gap-1 shrink-0">
                              <Btn variant="ghost" size="sm" onClick={() => startEditItem(item, index)}><Edit2 size={12} /></Btn>
                              <Btn variant="danger" size="sm" onClick={() => deleteItem(index)}><Trash2 size={12} /></Btn>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {editingItemIndex !== null && selectedSection && (
                      <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-3">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                          {editingItemIndex === -1 ? 'Add item' : 'Edit item'}
                        </p>
                        {selectedSection.itemType === 'string' ? (
                          <FieldGroup label={selectedSection.inputLabel || 'Value'}>
                            <Input
                              value={itemDraft.value || ''}
                              onChange={(e) => setItemDraft({ ...itemDraft, value: e.target.value })}
                            />
                          </FieldGroup>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {selectedSection.fields.map((field) => (
                              <FieldGroup key={field.key} label={field.label}>
                                <Input
                                  value={itemDraft[field.key] || ''}
                                  onChange={(e) => setItemDraft({ ...itemDraft, [field.key]: e.target.value })}
                                />
                              </FieldGroup>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Btn variant="success" size="sm" onClick={saveItem}><Check size={13} /> Save item</Btn>
                          <Btn variant="ghost" size="sm" onClick={cancelItemEdit}>Cancel</Btn>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {sectionOptions.length === 0 && (
                  <div className="border border-amber-200 bg-amber-50 rounded-xl p-3 text-sm text-amber-800">
                    This activity does not have configured content sections yet. Add a section mapping in the Activities tab config to edit it here.
                  </div>
                )}

                <div className="flex gap-2">
                  <Btn variant="success" size="sm" onClick={handleUpdateActivity} disabled={submittingActivity}>
                    {submittingActivity ? <Loader size={13} className="animate-spin" /> : <Check size={13} />}
                    {submittingActivity ? 'Saving...' : 'Save changes'}
                  </Btn>
                  <Btn variant="ghost" size="sm" onClick={() => { setIsEditingActivity(false); resetActivityForm() }}>Cancel</Btn>
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}
