const Reviews = require('../model/reviews')


const createReview = async (req, res) => {
  const review = await Reviews.create(req.body)
  res.json({status: "success", review: review})
}

const updateReview = async (req, res) => {
  const {review_id, user_id} = req.body
  const review = await Reviews.findByIdAndUpdate({_id: review_id, user_id: user_id}, req.body, {new:true, runValidators:true})
  res.json({review: review})
}

const deleteReview = async (req, res) => {
  const review_id = req.query.id
  const review = await Reviews.findByIdAndRemove(review_id)
  res.send()
}

module.exports = {
  createReview,
  updateReview,
  deleteReview
}