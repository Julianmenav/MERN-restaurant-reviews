const express = require('express')
const router = express.Router()
const {getRestaurants, getRestaurant, getRestaurantCuisines} = require('../controllers/restaurants')
const {createReview, updateReview, deleteReview} = require('../controllers/reviews')


router.route('/').get(getRestaurants)
router.route('/id/:id').get(getRestaurant)
router.route('/cuisines').get(getRestaurantCuisines)

router.route('/review').post(createReview).put(updateReview).delete(deleteReview)

module.exports = router