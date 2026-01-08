const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://cine-max-movie-ticket-booking.vercel.app",
    "https://your-custom-domain.com", // Add your custom domain if any
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/movies", require("./routes/movies"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/auth", require("./routes/auth"));

// Test route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// MongoDB connection (ONLY ONCE)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
