const express = require('express')
const router = express.Router()
const carRentalController = require('../controllers/carRentalController')

router.get('/', carRentalController.getAllCarRentals)
router.get('/:id', carRentalController.getCarRentalById)

module.exports = router
