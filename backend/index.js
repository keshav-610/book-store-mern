const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin:"https://book-store-mern-frontend-theta.vercel.app",
    credentials: true,
  })
);

// Routes
const bookRoutes = require("./src/books/book_route");
const orderRoutes = require("./src/orders/order_route");
const userRoutes = require("./src/users/user_routes");
const adminRoutes = require("./src/stats/admin_stats");

app.use("/assets/books", express.static(path.join(__dirname, "../public/books")));
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB connection established"))
  .catch((err) => console.log(err));

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Run locally on port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app