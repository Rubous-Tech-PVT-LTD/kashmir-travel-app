const carRentals = require('../data/carRentals')

exports.getAllCarRentals = async (req, res) => {
  try {
    res.json({
      success: true,
      data: carRentals,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching car rentals',
      error: error.message,
    })
  }
}

exports.getCarRentalById = async (req, res) => {
  try {
    const rental = carRentals.find((item) => item.id === Number(req.params.id))

    if (!rental) {
      return res.status(404).json({
        success: false,
        message: 'Car rental not found',
      })
    }

    res.json({
      success: true,
      data: rental,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching car rental',
      error: error.message,
    })
  }
}
