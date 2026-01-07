const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    poster: { type: String, required: true },
    duration: { type: Number, required: true },
    genre: [String],
    rating: { type: Number, default: 0 },
    showtimes: [
      {
        time: String,
        date: Date,
        availableSeats: { type: Number, default: 100 },
      },
    ],
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
