import { Routes, Route, useLocation, Navigate } from "react-router-dom";
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
import AdminManageBook from "./pages/Admin/AdminManageBook.jsx";
import AdminEditBook from "./pages/Admin/AdminEditBook.jsx";

export default function App() {
  const location = useLocation();
  const hideNavBarRoutes = [
    "/admin",
    "/dashboard",
    "/add-new-book",
    "/login",
    "/register",
    "/notfound",
  ];

  const isNavBarHidden =
    hideNavBarRoutes.includes(location.pathname) ||
    ![
      "/",
      "/login",
      "/register",
      "/cart",
      "/checkout",
      "/orders",
      "/admin",
      "/dashboard",
      "/add-new-book",
    ].includes(location.pathname);

  return (
    <AuthProvide>
      <div className="bg-white text-black transition-all">
        {!isNavBarHidden && <NavBar />}

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

            <Route path="/admin" element={<AdminLogin />} />
            <Route element={<AdminPrivateRoute />}>
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/dashboard/add-new-book" element={<AdminAddBook />} />
              <Route path="/dashboard/manage-books" element={<AdminManageBook />} />
              {/* Updated dynamic route for editing a book */}
              <Route path="/dashboard/edit-book/:id" element={<AdminEditBook />} />
            </Route>

            <Route path="*" element={<Navigate to="/notfound" replace />} />
            <Route path="/notfound" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </AuthProvide>
  );
}
