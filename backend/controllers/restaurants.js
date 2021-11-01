const Restaurants = require('../model/restaurants')


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


module.exports = {
  getRestaurants
}