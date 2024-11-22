import { FaBookOpen, FaShoppingCart } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import avatar from "../assets/avatar.png";

const navigation = [
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
];

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate(); 

  useEffect(() => {
    console.log("Current User:", currentUser);
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out successfully");
    } catch (error) {
      alert("Logout failed. Please try again.");
    }
  };

  const handleCartClick = () => {
    if (!currentUser) {
      navigate("/login"); 
    } else {
      navigate("/cart"); 
    }
  };

  return (
    <div className="flex justify-between px-3 py-4 sticky top-0 bg-white shadow-sm transition-all z-50">
      <div className="flex items-center gap-3 sm:gap-8">
        <Link to="/">
          <FaBookOpen className="text-black text-3xl sm:text-4xl" />
        </Link>
      </div>

      <div className="flex justify-center items-center gap-3 sm:gap-6">
        <div className="relative">
          {currentUser ? (
            <>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <img
                  src={avatar}
                  alt="User Avatar"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-300"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 bg-white shadow-md rounded-md mt-2">
                  <ul className="flex flex-col">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className="block px-4 py-2 hover:bg-gray-200 text-center"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 hover:bg-gray-200 w-full"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <Link to="/login">
              <BsPerson className="text-black text-2xl sm:text-3xl" />
            </Link>
          )}
        </div>

        <button
          onClick={handleCartClick}
          className="flex items-center justify-center px-3 py-1 sm:px-3 sm:py-2 rounded-md gap-1 bg-gray-800"
        >
          <FaShoppingCart className="text-base sm:text-xl text-white" />
          <span className="ml-1 sm:ml-2 font-normal text-base sm:text-lg text-white">
            {cartItems.length > 0 ? cartItems.length : 0}
          </span>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
