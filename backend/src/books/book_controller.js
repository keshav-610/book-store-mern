const mongoose = require('mongoose');
const Book = require("../books/book_model");
const multer = require("multer");
const fs = require("fs");
const path = require("path");


const PostBook = async (req, res) => {
  try {
    // Log the received form data and file
    console.log("Received form data:", req.body);
    console.log("Received file:", req.file);

    if (!req.file) {
      return res.status(400).send({ message: "Cover image is required." });
    }

    const { title, description, category, oldPrice, newPrice } = req.body;
    const coverImage = req.file.filename;

    const newBook = new Book({
      title,
      description,
      category,
      oldPrice,
      newPrice,
      coverImage,
    });

    await newBook.save();
    res.status(201).send({ message: "Book created successfully", book: newBook });
  } catch (error) {
    console.error("Error creating book:", error.message);
    res.status(500).send({ message: "Error creating book", error: error.message });
  }
};



const GetAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send({ message: "Error", error: error.message });
  }
};

const GetSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send(book);
  } catch (error) {
    res.status(500).send({ message: "Error", error: error.message });
  }
};

const UpdateBook = async (req, res) => {
  const { id } = req.params;
  try {
    const bookToUpdate = await Book.findById(id);
    if (!bookToUpdate) {
      return res.status(404).send({ message: 'Book not found!' });
    }

    if (req.file) {
      const oldImagePath = path.join(
        __dirname,
        '../../../frontend/src/assets/books',
        bookToUpdate.coverImage
      );

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      req.body.coverImage = req.file.filename;
    }

    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(400).send({ message: 'Failed to update book' });
    }

    res.status(200).send({
      message: 'Book updated successfully',
      book: updatedBook,
    });
  } catch (error) {
    console.error('Error updating book:', error.message);
    res.status(500).send({
      message: 'Error updating book',
      error: error.message,
    });
  }
};


const DeleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid book ID format" });
    }

    const bookToDelete = await Book.findById(id);
    if (!bookToDelete) {
      return res.status(404).send({ message: "Book not found" });
    }

    const coverImagePath = path.join(
      __dirname,
      '../../../frontend/src/assets/books', 
      bookToDelete.coverImage
    );
    
    if (fs.existsSync(coverImagePath)) {
      fs.unlinkSync(coverImagePath); 
    } else {
      console.warn("Cover image not found at path:", coverImagePath);
    }

    const deletedBook = await Book.findByIdAndDelete(id);

    res.status(200).send({
      message: "Book and its cover image deleted successfully",
      book: deletedBook,
    });
  } catch (error) {
    console.error("Error occurred while deleting book:", error.message);
    res.status(500).send({ message: "Error deleting book", error: error.message });
  }
};

module.exports = {
  PostBook,
  GetAllBooks,
  GetSingleBook,
  DeleteBook,
  UpdateBook,
};
