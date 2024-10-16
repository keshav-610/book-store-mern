import { FaBookOpen, FaShoppingCart, FaSun, FaMoon } from "react-icons/fa";
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

const NavBar = ({ isDarkTheme, setIsDarkTheme }) => {
  const currentUser = true;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className={`flex justify-between px-3 py-4 ${isDarkTheme ? 'bg-zinc-950' : 'bg-white'} transition-all`}>
      <div className="flex items-center gap-3 sm:gap-8">
        <Link to="/">
          <FaBookOpen className={isDarkTheme ? "text-white text-3xl sm:text-4xl" : "text-black text-3xl sm:text-4xl"} />
        </Link>
        <div className="relative flex items-center">
          <IoSearchSharp
            className={isDarkTheme ? "absolute left-2 text-gray-400 text-lg sm:text-xl" : "absolute left-2 text-gray-500 text-lg sm:text-xl"}
          />
          <input
            type="text"
            className={`pl-10 rounded-md w-36 sm:w-96 h-8 sm:h-10 focus:outline-none hover:border-yellow-400 cursor-pointer border-2 ${isDarkTheme ? 'bg-zinc-700 text-white border-transparent' : 'bg-gray-200 text-black border-transparent'} transition-colors duration-300`}
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex justify-center items-center gap-3 sm:gap-6">
        <div className="relative">
          {currentUser ? (
            <>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <span className={isDarkTheme ? "text-white" : "text-black"}>User</span>
              </button>
              {isDropdownOpen && (
                <div className={`absolute right-0 ${isDarkTheme ? 'bg-black' : 'bg-white'} shadow-md rounded-md mt-2`}>
                  <ul className="flex flex-col">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={`block px-4 py-2 ${isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
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
              <BsPerson className={isDarkTheme ? "text-white text-2xl sm:text-3xl" : "text-black text-2xl sm:text-3xl"} />
            </Link>
          )}
        </div>
        <button className="hidden sm:block">
          <MdFavoriteBorder className={isDarkTheme ? "text-white text-2xl sm:text-3xl" : "text-black text-2xl sm:text-3xl"} />
        </button>
        <Link
          to="/cart"
          className={`flex items-center justify-center px-3 py-1 sm:px-3 sm:py-2 rounded-md gap-1 ${isDarkTheme ? 'bg-yellow-300' : 'bg-gray-800'}`}
        >
          <FaShoppingCart className={`text-xl sm:text-2xl ${isDarkTheme?"text-black":"text-white"}`} />
          <span className={`ml-1 sm:ml-2 font-semibold text-base sm:text-xl ${isDarkTheme ? "text-black" : "text-white"}`}>0</span>
        </Link>
        <button onClick={() => setIsDarkTheme(!isDarkTheme)} className={isDarkTheme ? "text-white" : "text-black"}>
          {isDarkTheme ? <FaSun size={24} /> : <FaMoon size={24} />}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
