const mongoose = require('mongoose')

const RestaurantSchema = new mongoose.Schema({
  name: String,
  address: {
    building: String,
    coord: Array,
    street: String,
    zipcode: String
  },
  cuisine: String
})//, {collection: 'restaurants'})

module.exports = mongoose.model('Restaurants', RestaurantSchema)