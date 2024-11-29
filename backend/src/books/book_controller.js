const Book = require("../books/book_model");
const multer = require("multer");
const fs = require("fs");
const path = require("path");


const PostBook = async (req, res) => {
  try {
    // Debugging: Log the token and the decoded user info
    console.log("Received token:", req.headers['authorization']);
    console.log("User from token:", req.user);

    if (!req.file) {
      return res.status(400).send({ message: "Cover image is required." });
    }

    const fileName = req.file.filename;

    const newBook = new Book({
      ...req.body,
      coverImage: fileName, 
    });

    await newBook.save();

    res.status(201).send({ message: "Book posted successfully", book: newBook });
  } catch (error) {
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
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      res.status(404).send({ message: "Book not found!" });
    } else {
      res.status(200).send({
        message: "Book updated successfully",
        book: updatedBook,
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Error", error: error.message });
  }
};

const DeleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      res.status(404).send({ message: "Book not found" });
    } else {
      res.status(200).send({
        message: "Book deleted successfully",
        book: deletedBook,
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Error", error: error.message });
  }
};

// Exporting controllers
module.exports = {
  PostBook,
  GetAllBooks,
  GetSingleBook,
  DeleteBook,
  UpdateBook, // Export the Multer upload middleware
};
