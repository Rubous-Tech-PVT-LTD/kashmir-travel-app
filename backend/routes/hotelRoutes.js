const express = require('express')
const router = express.Router()
const hotelController = require('../controllers/hotelController')

router.get('/', hotelController.getAllHotels)
router.get('/houseboats', hotelController.getHouseboatHotels)
router.post('/:id/reviews', (req, res, next) => {
  if (typeof hotelController.addReview === 'function') {
    return hotelController.addReview(req, res, next)
  }

  return res.status(501).json({ error: 'Review submission is not implemented' })
})
router.get('/:id', hotelController.getHotelById)

module.exports = router
