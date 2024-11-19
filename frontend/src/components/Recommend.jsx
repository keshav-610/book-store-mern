import BookCard from "./BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useFetchAllBooksQuery } from "../redux/features/books/booksAPI";

const Recommend = () => {
  const { data: books = [], isLoading, isError } = useFetchAllBooksQuery();
  
  if (isLoading) return <p>Loading books...</p>;
  if (isError) {console.error("Error loading books:", isError);  // Log error for more insight
    return <p>Failed to load books. Error: {JSON.stringify(isError)}</p>;};

  return (
    <div className="py-6">
      <h3 className="text-2xl sm:text-3xl font-bold mb-6">Recommended for You</h3>
      <Swiper
        spaceBetween={20}
        navigation={true}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 40 },
        }}
        modules={[Navigation]}
        loop={books.length > 1}
      >
        {books.map((book) => (
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
        ))}
      </Swiper>
    </div>
  );
};

export default Recommend;
