const Restaurants = require('../model/restaurants')
const Reviews = require('../model/reviews')

const getRestaurants = async (req, res) => {
  const {name, cuisine, zipcode} = req.query
  const queryObject = {}
  if (name) {
    queryObject.name = { $regex: name, $options: 'i'}
  }
  if (cuisine) {
    queryObject.cuisine = { $regex: cuisine, $options: 'i'}
  }
  if (zipcode) {
    queryObject['address.zipcode'] = { $regex: zipcode, $options: 'i'} 
  }
  const restaurants = Restaurants.find(queryObject).select('name cuisine address.zipcode')

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit
  const result = await restaurants.skip(skip).limit(limit)
  res.json({page: page, total_results: restaurants.length, entries_per_page: result.length, restaurants: result})
}

const getRestaurant = async (req, res) => {
  const restaurant_id = req.params.id
  let reviews = await Reviews.find({restaurant_id})
  let restaurant =  await Restaurants.findById(restaurant_id).select('name cuisine address.zipcode _id')
  res.json({restaurant, reviews})
}

const getRestaurantCuisines = async (req, res) => {
  const cuisines = await Restaurants.distinct('cuisine')               
  res.json({cuisines})
}








module.exports = {
  getRestaurants,
  getRestaurant,
  getRestaurantCuisines
}