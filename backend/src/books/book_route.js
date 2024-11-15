const express = require("express");
const Book = require("./book_model");
const {
  PostBook,
  GetAllBooks,
  GetSingleBook,
  DeleteBook,
  UpdateBook,
} = require("./book_controller");
const router = express.Router();

router.post("/create_book", PostBook);
router.get("/", GetAllBooks);
router.get("/:id", GetSingleBook);
router.delete("/:id", DeleteBook);
router.put("/edit/:id", UpdateBook);

module.exports = router;
