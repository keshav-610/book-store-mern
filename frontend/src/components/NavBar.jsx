import { FaBookOpen, FaShoppingCart } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const NavBar = () => {
  const currentUser = true;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex justify-between px-3 py-4 sticky top-0 bg-white transition-all z-50">
      <div className="flex items-center gap-3 sm:gap-8">
        <Link to="/">
          <FaBookOpen className="text-black text-3xl sm:text-4xl" />
        </Link>
        <div className="relative flex items-center">
          <IoSearchSharp className="absolute left-2 text-gray-500 text-lg sm:text-xl" />
          <input
            type="text"
            className="pl-10 rounded-md w-36 sm:w-96 h-8 sm:h-10 focus:outline-none hover:border-yellow-400 cursor-pointer border-2 bg-gray-200 text-black border-transparent transition-colors duration-300"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex justify-center items-center gap-3 sm:gap-6">
        <div className="relative">
          {currentUser ? (
            <>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <span className="text-black">User</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 bg-white shadow-md rounded-md mt-2">
                  <ul className="flex flex-col">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className="block px-4 py-2 hover:bg-gray-200"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
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
        <button className="hidden sm:block">
          <MdFavoriteBorder className="text-black text-2xl sm:text-3xl" />
        </button>
        <Link
          to="/cart"
          className="flex items-center justify-center px-3 py-1 sm:px-3 sm:py-2 rounded-md gap-1 bg-gray-800"
        >
          <FaShoppingCart className="text-xl sm:text-2xl text-white" />
          <span className="ml-1 sm:ml-2 font-semibold text-base sm:text-xl text-white">0</span>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
