import { useEffect, useState } from "react";
import BookCard from "./BookCard";

const TopSellers = () => {
  const [books, setBooks] = useState([]);
  const categories = ["Choose a Genre", "Business", "Fiction", "Horror", "Adventure"];
  const [selectedCategory, setSelectedCategory] = useState("Choose a Genre");

  useEffect(() => {
    fetch("/books.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const filteredBooks = selectedCategory === "Choose a Genre" 
    ? books 
    : books.filter(book => book.category === selectedCategory.toLowerCase());

  return (
    <div className="p-0 md:px-8 py-16">
      <h3 className="text-3xl font-bold">Top Sellers</h3>
      <div className="my-5">
        <select
          name="category"
          id="category"
          className="py-3 px-4 pe-9 block w-full border rounded-lg text-sm bg-white border-gray-200 text-black"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard 
              key={book._id}
              title={book.title}
              description={book.description}
              coverImage={book.coverImage}
              oldPrice={book.oldPrice}
              newPrice={book.newPrice}
            />
          ))
        ) : (
          <p>No books available for the selected genre.</p>
        )}
      </div>
    </div>
  );
};

export default TopSellers;
