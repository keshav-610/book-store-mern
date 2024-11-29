import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvide } from "./context/AuthContext.jsx";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CheckOut from "./pages/CheckOut";
import PrivateRoute from "./components/PrivateRoute";
import Orders from "./pages/Orders.jsx";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import AdminPrivateRoute from "./pages/Admin/AdminPrivateRoute.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import AdminAddBook from "./pages/Admin/AdminAddBook.jsx";

export default function App() {
  const location = useLocation();

  const hideNavBarRoutes = ["/admin", "/dashboard", "/add-new-book", "/login", "/register"];

  return (
    <AuthProvide>
      <div className="bg-white text-black transition-all">
        {!hideNavBarRoutes.includes(location.pathname) && <NavBar />}
        
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
              
            <Route path="/cart" element={<Cart />} />
            <Route element={<PrivateRoute />}>
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/orders" element={<Orders />} />
            </Route>

            <Route path="*" element={<NotFound />} />

            <Route path="/admin" element={<AdminLogin />} />

            <Route element={<AdminPrivateRoute />}>
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/add-new-book" element={<AdminAddBook />} />
            </Route>
          </Routes>
        </div>
      </div>
    </AuthProvide>
  );
}
