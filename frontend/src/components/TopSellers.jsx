import { useEffect, useState } from "react";

const TopSellers = ({ isDarkTheme }) => {
    const [books, setBooks] = useState([]);
    const categories = ["Choose a Genre", "Business", "Fiction", "Horror", "Adventure"];
    const [selectedCategory, setSelectedCategory] = useState("Choose a Genre");

    useEffect(() => {
        fetch("books.json")
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
                    className={`border p-3 rounded-lg cursor-pointer focus:outline-none transition-colors duration-300 ease-in-out text-black`}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book, index) => (
                        <div key={index}>
                            {book.title}
                        </div>
                    ))
                ) : (
                    <p>No books available for the selected genre.</p>
                )}
            </div>
        </div>
    );
};

export default TopSellers;
