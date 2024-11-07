import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart/CardSlice"; 

function getimgURL(name) {
  return new URL(`../assets/books/${name}`, import.meta.url);
}

const BookCard = ({ title, description, coverImage, oldPrice, newPrice }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const product = {
      title,
      description,
      coverImage,
      oldPrice,
      newPrice,
      _id: title 
    };
    dispatch(addToCart(product));
  };

  return (
    <div className="border rounded-md shadow-lg font-sans transition-transform duration-300 hover:shadow-xl overflow-hidden">
      <div className="flex justify-center w-full">
        <img
          src={getimgURL(coverImage)}
          alt={`${title} cover`}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm line-clamp-1 mb-2">{description}</p>
        <div className="flex justify-around items-center mt-2">
          <span className="text-lg font-semibold text-green-600">${newPrice}</span>
          <span className="line-through text-gray-500">${oldPrice}</span>
        </div>
        <button
          className="mt-3 px-4 py-2 rounded bg-yellow-500 font-semibold text-white hover:bg-yellow-600 w-full"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookCard;
