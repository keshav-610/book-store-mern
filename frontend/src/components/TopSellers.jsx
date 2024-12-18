import { useState } from "react";
import BookCard from "./BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useFetchAllBooksQuery } from "../redux/features/books/booksAPI";

const categories = ["Choose a Genre", "Business", "Fiction", "Horror", "Adventure"];

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a Genre");

  const { data: books = [], isLoading, isError } = useFetchAllBooksQuery();
  console.log(books)
  console.log(isLoading, isError)

  if (isLoading) return <p>Loading books...</p>;
  if (isError) {
    console.error("Error loading books:", isError);
    return (
      <p>
        Failed to load books. Error: {JSON.stringify(isError)} 
      </p>
    );
  } 

  const filteredBooks = selectedCategory === "Choose a Genre"
    ? books
    : books.filter(book => book.category && book.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="md:py-8 mt-8 z-10">
      <h3 className="text-2xl sm:text-3xl font-bold">Top Sellers</h3>
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
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        navigation={true}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 40 },
        }}
        modules={[Navigation]}
        loop
      >
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <SwiperSlide key={book._id}>
              <BookCard
                id={book._id}
                title={book.title}
                description={book.description}
                coverImage={book.coverImage}
                oldPrice={book.oldPrice}
                newPrice={book.newPrice}
                category={book.category}
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <p>No books available for the selected genre. Try selecting a different genre.</p>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default TopSellers;
