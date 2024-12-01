const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173","https://book-store-mern-frontend-theta.vercel.app"],
    credentials: true,
  })
);

const bookRoutes = require("./src/books/book_route");
const orderRoutes = require("./src/orders/order_route");
const userRoutes = require("./src/users/user_routes");
const adminRoutes = require("./src/stats/admin_stats")


app.use("/assets/books", express.static(path.join(__dirname, "../public/books")));
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin",adminRoutes)

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB connection established"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
