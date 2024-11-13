const Book = require("../books/book_model");

const PostBook = async (req, res) => {
  try {
    const newBook = new Book({ ...req.body });
    await newBook.save();
    res
      .status(201)
      .send({ message: "Book posted successfully", book: newBook });
  } catch (error) {
    res.status(500).send({ message: "Error creating book", error: error });
  }
};

const GetAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send({ message: "Error", error: error });
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
    res.status(500).send({ message: "Error", error: error });
  }
};

const UpdateBook = async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).send({ message: "Error", error: error });
    }
}

const DeleteBook = async (req, res) => {
    try {
        const {id} = req.params
        const deletedBook = await Book.findByIdAndDelete(id)
        if(!deletedBook){
            res.status(404).send({message:"Book Not Found"})
        }
        res.send(200).send({
            message:"Book Deleted Successfully",
            book:deletedBook
        })
    } catch (error) {
        res.status(500).send({ message: "Error", error: error });
    }
}

module.exports = { PostBook, GetAllBooks,GetSingleBook,DeleteBook };
