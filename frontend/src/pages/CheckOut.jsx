import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCreateOrderMutation } from "../redux/features/orders/ordersAPI";
import Swal from "sweetalert2";

const CheckOut = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const [createOrder, { isLoading, error }] = useCreateOrderMutation()


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    navigate("/login", { replace: true });
    return null;
  }

  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice * item.quantity, 0).toFixed(2);

  const userEmail = currentUser.email;
  setValue("email", userEmail);

  const onSubmit = async (data) => {

    const newOrder = {
      name: data.name,
      email: currentUser?.email,
      address: {
        city: data.city,
        zipcode: data.zipcode,
        state: data.state,
        country: data.country,
      },
      phone: data.phone,
      productIds: cartItems.map(item => item._id),
      totalPrice: totalPrice,
    };

    try {
      await createOrder(newOrder).unwrap();
      Swal.fire({
        position: "top", icon: "success", title: "Order Successful !", showConfirmButton: false,
        timer: 1500
      })
      navigate("/");
    } catch (err) {
      console.error("Error placing order", err);
      alert("Failed to place an order");
    }
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
                <label htmlFor="full_name" className="block text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  defaultValue={userEmail}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  readOnly={true}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="number"
                  {...register("phone")}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  {...register("address")}
                  className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div>
                <label htmlFor="city">City</label>
                <input type="text" id="city" {...register("city")} className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" />
              </div>
              <div>
                <label htmlFor="zipcode">Zipcode</label>
                <input type="number" id="zipcode" {...register("zipcode")} className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" />
              </div>
              <div>
                <label htmlFor="state">
                  State
                </label>
                <input type="text" id="state" {...register("state")} className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" />
              </div>
              <div>
                <label htmlFor="country">Country</label>
                <input type="text" id="country" {...register("country")} className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" />
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
