import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CheckOut = () => {
  const { currentUser, loading } = useAuth(); 
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    navigate("/login", { replace: true }); // Redirect to login if not logged in
    return null; // Prevent rendering the page while redirecting
  }

  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle checkout submission
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center gap-2 mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">Cash on Delivery</h2>
          <p className="text-xl font-semibold text-gray-700">Total Price: ${totalPrice}</p>
          <p className="text-lg text-gray-600 font-semibold">Items: {cartItems.length}</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Personal Details</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
