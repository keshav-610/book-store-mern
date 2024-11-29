import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { currentUser } = useAuth();
  const cartItems = useSelector((state) => state.cart.cartItems);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (cartItems.length === 0 && window.location.pathname === "/checkout") {
    return <Navigate to="/cart"/>;  
  }

  return <Outlet />;
};

export default PrivateRoute;
