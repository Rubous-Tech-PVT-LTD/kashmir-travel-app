const CarRental = require('../models/CarRental')
const carRentalsData = require('../data/carRentals')

const CAR_RENTAL_SELECT_FIELDS = '-_id -__v -createdAt -updatedAt'

const ensureCarRentalsSeeded = async () => {
  const count = await CarRental.countDocuments()
  if (count > 0 || !Array.isArray(carRentalsData) || carRentalsData.length === 0) return

  await CarRental.insertMany(carRentalsData, { ordered: false })
}

const validateCarRentalPayload = (payload = {}) => {
  const required = ['name', 'type', 'route', 'seats', 'price', 'image']
  const missing = required.find((field) => !String(payload[field] ?? '').trim())
  if (missing) return `Field "${missing}" is required`
  return ''
}

const normalizeCarRentalPayload = (payload = {}) => ({
  name: payload.name,
  type: payload.type,
  route: payload.route,
  seats: payload.seats,
  price: String(payload.price),
  image: payload.image,
})

exports.getAllCarRentals = async (req, res) => {
  try {
    await ensureCarRentalsSeeded()
    const carRentals = await CarRental.find().select(CAR_RENTAL_SELECT_FIELDS).sort({ id: 1 }).lean()

    return res.json({
      success: true,
      data: carRentals,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching car rentals',
      error: error.message,
    })
  }
}

exports.getCarRentalById = async (req, res) => {
  try {
    await ensureCarRentalsSeeded()
    const rental = await CarRental.findOne({ id: Number(req.params.id) }).select(CAR_RENTAL_SELECT_FIELDS).lean()

    if (!rental) {
      return res.status(404).json({
        success: false,
        message: 'Car rental not found',
      })
    }

    return res.json({
      success: true,
      data: rental,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching car rental',
      error: error.message,
    })
  }
}

exports.createCarRental = async (req, res) => {
  try {
    const validationError = validateCarRentalPayload(req.body)
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      })
    }

    const latestCarRental = await CarRental.findOne().sort({ id: -1 }).select('id').lean()
    const nextCarRentalId = (latestCarRental?.id || 0) + 1

    const carRental = await CarRental.create({
      id: nextCarRentalId,
      ...normalizeCarRentalPayload(req.body),
    })

    const createdCarRental = await CarRental.findOne({ id: carRental.id }).select(CAR_RENTAL_SELECT_FIELDS).lean()

    return res.status(201).json({
      success: true,
      message: 'Car rental created successfully',
      data: createdCarRental,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating car rental',
      error: error.message,
    })
  }
}

exports.updateCarRental = async (req, res) => {
  try {
    const validationError = validateCarRentalPayload(req.body)
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      })
    }

    const updatedCarRental = await CarRental.findOneAndUpdate(
      { id: Number(req.params.id) },
      { $set: normalizeCarRentalPayload(req.body) },
      { new: true }
    ).select(CAR_RENTAL_SELECT_FIELDS).lean()

    if (!updatedCarRental) {
      return res.status(404).json({
        success: false,
        message: 'Car rental not found',
      })
    }

    return res.json({
      success: true,
      message: 'Car rental updated successfully',
      data: updatedCarRental,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating car rental',
      error: error.message,
    })
  }
}

exports.deleteCarRental = async (req, res) => {
  try {
    const deletedCarRental = await CarRental.findOneAndDelete({ id: Number(req.params.id) })
      .select(CAR_RENTAL_SELECT_FIELDS)
      .lean()

    if (!deletedCarRental) {
      return res.status(404).json({
        success: false,
        message: 'Car rental not found',
      })
    }

    return res.json({
      success: true,
      message: 'Car rental deleted successfully',
      data: deletedCarRental,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting car rental',
      error: error.message,
    })
  }
}
