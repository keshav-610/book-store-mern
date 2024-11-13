const express = require("express");
const Book = require("./book_model");
const { PostBook, GetAllBooks, GetSingleBook, DeleteBook } = require("./book_controller");
const router = express.Router();

router.post("/create_book", PostBook);
router.get("/get_books",GetAllBooks)
router.get("/get_single_book/:id",GetSingleBook)
router.delete("/delete_book/:id",DeleteBook)

module.exports = router;
