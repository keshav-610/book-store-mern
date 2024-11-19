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
    navigate("/login", { replace: true }); 
    return null; 
  }

  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.newPrice * item.quantity), 0).toFixed(2);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here
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
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Name</label>
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Phone Number</label>
                <input
                  id="phone"
                  type="text"
                  {...register("phone", { required: "Phone number is required" })}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-semibold text-gray-700">Address</label>
                <input
                  id="address"
                  type="text"
                  {...register("address", { required: "Address is required" })}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-semibold text-gray-700">City</label>
                <input
                  id="city"
                  type="text"
                  {...register("city", { required: "City is required" })}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-semibold text-gray-700">State</label>
                <input
                  id="state"
                  type="text"
                  {...register("state", { required: "State is required" })}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                {errors.state && <p className="text-red-500 text-xs">{errors.state.message}</p>}
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-semibold text-gray-700">Country</label>
                <input
                  id="country"
                  type="text"
                  {...register("country", { required: "Country is required" })}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                {errors.country && <p className="text-red-500 text-xs">{errors.country.message}</p>}
              </div>

              <div>
                <label htmlFor="zipcode" className="block text-sm font-semibold text-gray-700">Zipcode</label>
                <input
                  id="zipcode"
                  type="text"
                  {...register("zipcode", { required: "Zipcode is required" })}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                {errors.zipcode && <p className="text-red-500 text-xs">{errors.zipcode.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-yellow-500 text-white rounded-md font-semibold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 mt-6"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
