import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart } from "../redux/features/cart/CartSlice";

function getImgURL(name) {
  return new URL(`../assets/books/${name}`, import.meta.url);
}

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice * item.quantity, 0).toFixed(2);

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="px-5 py-2 sm:px-10 sm:py-3">
      <div className="sm:shadow-md sm:rounded-lg">
        <div className="sm:p-5 py-2 flex justify-between">
          <h1 className="font-sans text-2xl sm:text-3xl font-bold">Your Cart</h1>
          <button
            onClick={handleClearCart}
            className="rounded-lg border border-red-500 bg-red-500 px-2 text-sm font-medium text-white transition-all hover:border-red-700 hover:bg-red-700"
          >
            Clear Cart
          </button>
        </div>
        {cartItems.length > 0 ? (
          cartItems.map((product) => (
            <div key={product._id} className="flex justify-between sm:p-5 py-2">
              <div className="flex gap-3">
                <img
                  alt={product.title}
                  src={getImgURL(product.coverImage)}
                  className="size-20 h-auto"
                />
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold line-clamp-1">{product.title}</h3>
                  <h3 className="font-medium">
                    Category: <span className="font-normal">{product.category}</span>
                  </h3>
                  <h1 className="font-medium">
                    Quantity: <span className="font-normal">{product.quantity}</span>
                  </h1>
                </div>
              </div>
              <div className="text-right flex flex-col justify-between">
                <div className="flex justify-center">
                  <h3 className="font-medium">${product.newPrice}</h3>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(product)}
                  className="border border-red-500 text-red-500 px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-500 hover:text-white transition duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="sm:p-5 py-2 text-center text-gray-500">No products found in your cart.</p>
        )}

        <hr />

        <div className="sm:p-5 py-5 flex flex-col gap-4 sm:gap-5">
          <div className="flex justify-between">
            <h3 className="font-medium">Total</h3>
            <h3 className="font-medium">${totalPrice}</h3>
          </div>
          <Link
            to="/checkout"
            className="w-full py-2 sm:py-3 px-4 text-white bg-blue-700 rounded-xl inline-flex justify-center hover:bg-slate-100 hover:text-blue-700 transition-all font-medium"
          >
            Checkout
          </Link>
          <Link to="/" className="text-sm text-indigo-500 font-medium hover:text-indigo-700 transition-all text-center">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
