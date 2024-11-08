import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const CheckOut = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => console.log(data);

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
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Full Name is required" })}
                className="h-10 border border-gray-300 rounded px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                className="h-10 border border-gray-300 rounded px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="ph_no" className="text-gray-700 font-medium">Phone Number</label>
              <input
                type="tel"
                id="ph_no"
                {...register("phone", { required: "Phone Number is required" })}
                className="h-10 border border-gray-300 rounded px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="address" className="text-gray-700 font-medium">Address / Street</label>
              <input
                type="text"
                id="address"
                {...register("address", { required: "Address is required" })}
                className="h-10 border border-gray-300 rounded px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="city" className="text-gray-700 font-medium">City</label>
              <input
                type="text"
                id="city"
                {...register("city", { required: "City is required" })}
                className="h-10 border border-gray-300 rounded px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="country" className="text-gray-700 font-medium">Country / Region</label>
              <input
                type="text"
                id="country"
                {...register("country", { required: "Country is required" })}
                className="h-10 border border-gray-300 rounded px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="state" className="text-gray-700 font-medium">State</label>
              <input
                type="text"
                id="state"
                {...register("state", { required: "State is required" })}
                className="h-10 border border-gray-300 rounded px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.state && <span className="text-red-500 text-sm">{errors.state.message}</span>}
            </div>

            <div className="flex flex-col">
              <label htmlFor="zipcode" className="text-gray-700 font-medium">Zipcode</label>
              <input
                type="text"
                id="zipcode"
                {...register("zipcode", { required: "Zipcode is required" })}
                className="h-10 border border-gray-300 rounded px-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.zipcode && <span className="text-red-500 text-sm">{errors.zipcode.message}</span>}
            </div>

            <div className="mt-6 flex justify-center">
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200">
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
