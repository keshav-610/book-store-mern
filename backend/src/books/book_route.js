// book_route.js
const express = require("express");
const Book = require("./book_model");
const upload = require("../middlewares/Upload");
const {
  PostBook,
  GetAllBooks,
  GetSingleBook,
  DeleteBook,
  UpdateBook,
} = require("./book_controller");
const verifyAdminToken = require("../middlewares/verifyAdminToken");

const router = express.Router();

router.post("/create_book", verifyAdminToken, upload.single("coverImage"), PostBook);  // This will handle the image upload
router.get("/", GetAllBooks);
router.get("/:id", GetSingleBook);
router.delete("/:id", verifyAdminToken, DeleteBook);
router.put("/edit/:id", verifyAdminToken, UpdateBook);

module.exports = router;
