const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    poster: { type: String, required: true },
    trailerUrl: { type: String }, // YouTube embed URL
    duration: { type: Number, required: true },
    genre: [String],
    rating: { type: Number, default: 0 },
    releaseYear: { type: Number },
    director: { type: String },
    cast: [String],
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
