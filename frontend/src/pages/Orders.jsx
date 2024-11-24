import { useAuth } from "../context/AuthContext";
import { useGetOrderByEmailQuery } from "../redux/features/orders/ordersAPI";

const Orders = () => {
  const { currentUser } = useAuth();
  const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email); 
  if (isLoading) return <div className="flex justify-center items-center text-xl font-semibold">Loading...</div>;
  if (isError) return <div className="flex justify-center items-center text-xl font-semibold text-red-600">Error fetching orders</div>;
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Your Orders</h2>
        {
          orders.length === 0 ? (
            <div className="text-center text-xl font-semibold text-gray-600">No Orders found</div> 
          ) : (
            <div className="space-y-6">
              {
                orders.map((order, index) => (
                  <div key={order._id} className="bg-gray-100 p-6 rounded-lg shadow-sm">
                    <h3 className="text-2xl font-semibold text-gray-800">Order #{index + 1}</h3>
                    <p><strong>Name:</strong> {order.name}</p>
                    <p><strong>Email:</strong> {order.email}</p>
                    <p><strong>Phone:</strong> {order.phone}</p>
                    <p><strong>Total Price:</strong> ${order.totalPrice}</p>
                    
                    <div className="order-address mt-4">
                      <p><strong>Address:</strong></p>
                      <p>{order.address.street}, {order.address.city}, {order.address.state},- {order.address.zipcode}, {order.address.country} </p>
                    </div>
                    <p className="mt-2"><strong>Order Created:</strong> {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}</p>
                    <p className="mt-2"><strong>Products:</strong> {order.productIds.join(', ')}</p>
                  </div>
                ))
              }
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Orders;
