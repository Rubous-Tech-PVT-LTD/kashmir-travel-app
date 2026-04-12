const path = require('path')

const Activity = require('../models/Activity')
// Use an explicit absolute path to avoid Windows path resolution edge cases.
const activitiesData = require(path.join(__dirname, '..', 'data', 'activities'))

const ACTIVITY_SELECT_FIELDS = '-_id -__v -createdAt -updatedAt'
const SEED_ACTIVITY_BY_SLUG = new Map(
  (Array.isArray(activitiesData) ? activitiesData : []).map((item) => [String(item.slug || '').trim(), item])
)

const ensureActivitiesSeeded = async () => {
  if (!Array.isArray(activitiesData) || activitiesData.length === 0) return

  const existing = await Activity.find().select('slug').lean()
  const existingSlugSet = new Set(existing.map((item) => String(item.slug || '').trim()))

  const missing = activitiesData.filter((item) => !existingSlugSet.has(String(item.slug || '').trim()))
  if (missing.length === 0) return

  const prepared = missing.map((item) => {
    return {
      title: item.title,
      slug: String(item.slug || '').trim(),
      coverImage: item.coverImage || '',
      content: item.content || {},
    }
  })

  await Activity.insertMany(prepared, { ordered: false })
}

const normalizeActivityPayload = (payload = {}) => ({
  // Keep common identity fields normalized, while allowing flexible per-activity payload keys.
  title: payload.title,
  slug: String(payload.slug || '').trim(),
  coverImage: payload.coverImage || '',
  content:
    payload.content && typeof payload.content === 'object'
      ? payload.content
      : Object.keys(payload).reduce((acc, key) => {
          if (['id', 'title', 'slug', 'coverImage'].includes(key)) return acc
          acc[key] = payload[key]
          return acc
        }, {}),
})

const pickText = (...values) => {
  for (const value of values) {
    if (typeof value === 'number') return String(value)
    if (typeof value !== 'string') continue
    const text = value.replace(/[\u200B-\u200D\uFEFF]/g, '').trim()
    if (text) return text
  }
  return ''
}

const normalizeActivityContentForClient = (content = {}) => {
  const normalized = { ...content }

  if (Array.isArray(content.rideTiers)) {
    normalized.rideTiers = content.rideTiers.map((item = {}) => ({
      ...item,
      route: pickText(item.route, item.altitude, item.duration, item.tier),
      title: pickText(item.title, item.name, item.tier, item.route),
      description: pickText(item.description, item.note, item.detail, item.duration, item.altitude),
      price: pickText(item.price),
    }))
  }

  if (Array.isArray(content.raftingPackages)) {
    normalized.raftingPackages = content.raftingPackages.map((item = {}) => ({
      ...item,
      distance: pickText(item.distance, item.river, item.level, item.grade),
      title: pickText(item.title, item.name, item.level),
      description: pickText(item.description, item.note, item.detail, item.grade, item.river),
      price: pickText(item.price),
    }))
  }

  if (Array.isArray(content.flightPackages)) {
    normalized.flightPackages = content.flightPackages.map((item = {}) => ({
      ...item,
      time: pickText(item.time, item.duration, item.height, item.type),
      title: pickText(item.title, item.name, item.type),
      description: pickText(item.description, item.note, item.detail, item.height, item.duration),
      price: pickText(item.price),
    }))
  }

  if (Array.isArray(content.skiPackages)) {
    normalized.skiPackages = content.skiPackages.map((item = {}) => ({
      ...item,
      level: pickText(item.level, item.terrain, item.type),
      title: pickText(item.title, item.name, item.duration),
      description: pickText(item.description, item.note, item.includes, item.detail),
      price: pickText(item.price),
    }))
  }

  return normalized
}

const formatActivityForClient = (activity) => {
  if (!activity || typeof activity !== 'object') return activity

  const { content, details, name, image, coverImage, title, slug, ...rest } = activity
  const normalizedSlug = String(slug || rest.slug || '').trim()

  const seedActivity = SEED_ACTIVITY_BY_SLUG.get(normalizedSlug)
  const seedContent =
    seedActivity?.content && typeof seedActivity.content === 'object'
      ? seedActivity.content
      : seedActivity?.details && typeof seedActivity.details === 'object'
        ? seedActivity.details
        : {}

  const activityContent = content && typeof content === 'object' ? content : {}
  const activityDetails = details && typeof details === 'object' ? details : {}
  const mergedContent = { ...seedContent, ...activityDetails, ...activityContent }
  const normalizedContent = normalizeActivityContentForClient(mergedContent)

  // Keep `content` for admin editing, but also flatten keys for public pages.
  return {
    ...rest,
    slug: normalizedSlug,
    title: title || name || rest.title || '',
    coverImage: coverImage || image || rest.coverImage || '',
    content: normalizedContent,
    ...normalizedContent,
  }
}

const validateActivityPayload = (payload = {}) => {
  const required = ['title', 'slug']
  const missing = required.find((field) => !String(payload[field] ?? '').trim())
  if (missing) return `Field "${missing}" is required`
  return ''
}

exports.getAllActivities = async (req, res) => {
  try {
    await ensureActivitiesSeeded()
    const activities = await Activity.find().select(ACTIVITY_SELECT_FIELDS).sort({ slug: 1 }).lean()
    const formattedActivities = activities.map(formatActivityForClient)

    // Fallback: always expose seed-defined activities in admin/public lists,
    // even if one record is missing in DB (for example after partial/manual deletes).
    const bySlug = new Map(
      formattedActivities.map((item) => [String(item.slug || '').trim(), item])
    )

    for (const seedItem of Array.isArray(activitiesData) ? activitiesData : []) {
      const seedSlug = String(seedItem.slug || '').trim()
      if (!seedSlug || bySlug.has(seedSlug)) continue

      bySlug.set(seedSlug, formatActivityForClient(seedItem))
    }

    const mergedActivities = Array.from(bySlug.values()).sort((a, b) =>
      String(a.slug || '').localeCompare(String(b.slug || ''))
    )

    return res.json({
      success: true,
      data: mergedActivities,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching activities',
      error: error.message,
    })
  }
}

exports.getActivityBySlug = async (req, res) => {
  try {
    await ensureActivitiesSeeded()
    const activity = await Activity.findOne({ slug: req.params.slug }).select(ACTIVITY_SELECT_FIELDS).lean()

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found',
      })
    }

    return res.json({
      success: true,
      data: formatActivityForClient(activity),
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching activity',
      error: error.message,
    })
  }
}

exports.createActivity = async (req, res) => {
  try {
    const validationError = validateActivityPayload(req.body)
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      })
    }

    const activity = await Activity.create(normalizeActivityPayload(req.body))

    const createdActivity = await Activity.findOne({ slug: activity.slug }).select(ACTIVITY_SELECT_FIELDS).lean()

    return res.status(201).json({
      success: true,
      message: 'Activity created successfully',
      data: formatActivityForClient(createdActivity),
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating activity',
      error: error.message,
    })
  }
}

exports.updateActivity = async (req, res) => {
  try {
    const validationError = validateActivityPayload(req.body)
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      })
    }

    const slug = String(req.params.slug || req.params.id || '').trim()
    if (!slug) {
      return res.status(400).json({
        success: false,
        message: 'Activity slug is required',
      })
    }

    const updatedActivity = await Activity.findOneAndUpdate(
      { slug },
      { $set: normalizeActivityPayload(req.body) },
      { returnDocument: 'after' }
    ).select(ACTIVITY_SELECT_FIELDS).lean()

    if (!updatedActivity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found',
      })
    }

    return res.json({
      success: true,
      message: 'Activity updated successfully',
      data: formatActivityForClient(updatedActivity),
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating activity',
      error: error.message,
    })
  }
}

exports.deleteActivity = async (req, res) => {
  try {
    const slug = String(req.params.slug || req.params.id || '').trim()
    if (!slug) {
      return res.status(400).json({
        success: false,
        message: 'Activity slug is required',
      })
    }

    const deletedActivity = await Activity.findOneAndDelete({ slug })
      .select(ACTIVITY_SELECT_FIELDS)
      .lean()

    if (!deletedActivity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found',
      })
    }

    return res.json({
      success: true,
      message: 'Activity deleted successfully',
      data: formatActivityForClient(deletedActivity),
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting activity',
      error: error.message,
    })
  }
}
