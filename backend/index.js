const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: ["http://192.168.1.7:5173", "http://localhost:5173"], 
    credentials: true,
  })
);


const bookRoutes = require("./src/books/book_route");
app.use("/api/books", bookRoutes);

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB connection established"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://192.168.1.7:${process.env.PORT}`); // Update this to your local IP address
});
