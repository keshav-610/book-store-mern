import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cart/CartSlice";
import { useAuth } from "../context/AuthContext";
import { getImgURL } from "../utils/getImgURL";  

const BookCard = ({ id, title, description, coverImage, oldPrice, newPrice, category }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleAddToCart = () => {
    if (!currentUser) {
      navigate("/login");
    } else {
      const product = {
        title,
        description,
        coverImage,
        oldPrice,
        newPrice,
        category,
        _id: id,
      };
      dispatch(addToCart(product));
    }
  };

  return (
    <div className="border rounded-md shadow-lg font-sans transition-transform duration-300 hover:shadow-xl overflow-hidden">
      <div className="flex justify-center w-full">
          <img
            src={getImgURL(coverImage)}  
            alt={`${title} cover`}
          />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-sm line-clamp-1 mb-2">{description}</p>
        <div className="flex justify-around items-center mt-2">
          <span className="text-lg font-semibold text-green-600">${newPrice}</span>
          <span className="line-through text-gray-500">${oldPrice}</span>
        </div>
        <button 
          className="mt-3 py-2 px-4 gap-x-2 text-base font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:bg-indigo-600 w-full transition-all"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookCard;
