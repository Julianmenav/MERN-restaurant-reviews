const mongoose = require("mongoose");

const ReviewSquema = new mongoose.Schema({
    restaurant_id: {
      type: mongoose.Types.ObjectId,
      required: [true, "Please provide restaurant_id"],
    },
    user_id: {
      type: String,
      required: [true, "Please provide userId"],
    },
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    text: { type: String, required: [true, "Please provide a review"] },
},{ timestamps: true });

module.exports = mongoose.model("Reviews", ReviewSquema);
