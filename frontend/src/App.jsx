import { Routes, Route } from "react-router-dom";
import { AuthProvide } from "./context/AuthContext.jsx";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CheckOut from "./pages/CheckOut";
import SingleBook from "./pages/SingleBook";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <AuthProvide>
      <div className="bg-white text-black transition-all">
        <NavBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<PrivateRoute />}>
              <Route path="/cart" element={<Cart />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/books/:id" element={<SingleBook />} />

            <Route element={<PrivateRoute />}>
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </div>
      </div>
    </AuthProvide>
  );
}
