const hotels = require('../data/hotels')

exports.getAllHotels = async (req, res) => {
  try {
    res.json({
      success: true,
      data: hotels,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching hotels',
      error: error.message,
    })
  }
}

exports.getHouseboatHotels = async (req, res) => {
  try {
    const houseboatHotels = hotels.filter((item) => {
      const name = (item.name || '').toLowerCase()
      const location = (item.location || '').toLowerCase()

      return name.includes('houseboat') || location.includes('dal lake')
    })

    res.json({
      success: true,
      data: houseboatHotels,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching houseboat stays',
      error: error.message,
    })
  }
}

exports.getHotelById = async (req, res) => {
  try {
    const hotel = hotels.find((item) => String(item.id) === String(req.params.id))

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found',
      })
    }

    res.json({
      success: true,
      data: hotel,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching hotel',
      error: error.message,
    })
  }
}
