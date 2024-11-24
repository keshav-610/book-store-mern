const express = require("express");
const Book = require("./book_model");

const {
  PostBook,
  GetAllBooks,
  GetSingleBook,
  DeleteBook,
  UpdateBook,
} = require("./book_controller");
const verifyAdminToken = require("../middlewares/verifyAdminToken");
const router = express.Router();

router.post("/create_book", verifyAdminToken, PostBook);
router.get("/", verifyAdminToken, GetAllBooks);
router.get("/:id", GetSingleBook);
router.delete("/:id", verifyAdminToken, DeleteBook);
router.put("/edit/:id", verifyAdminToken, UpdateBook);

module.exports = router;
