import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

const Recommend = () => {
  const [Books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/books.json")
      .then((res) => res.json())
      .then((data) => setBooks(data))
  }, []);

  return (
    <div className="py-6">
      <h3 className="text-2xl md:text-3xl font-bold text-center mb-6">Recommended for You</h3>
      <Swiper
        spaceBetween={20}
        navigation={true}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 }, 
          768: { slidesPerView: 2, spaceBetween: 30 }, 
          1024: { slidesPerView: 3, spaceBetween: 40 },
        }}
        modules={[Navigation]}
        loop={Books.length > 1}
      >
        {Books.map((book) => (
          <SwiperSlide key={book._id}>
            <BookCard
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
