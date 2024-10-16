import { FaBookOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { FaShoppingCart,FaSun,FaMoon } from "react-icons/fa";
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
    <div className={`flex justify-between p-4 ${isDarkTheme ? 'bg-zinc-950 transition' : 'bg-white transition'}`}>
      <div className="flex items-center gap-3 sm:gap-8">
        <Link to="/">
          <FaBookOpen className={isDarkTheme ? "text-white text-3xl sm:text-4xl" : "text-black text-3xl sm:text-4xl"} />
        </Link>
        <div className="relative flex items-center">
          <IoSearchSharp className={isDarkTheme ? "absolute left-2 text-gray-400 text-lg sm:text-xl" : "absolute left-2 text-gray-500 text-lg sm:text-xl"} />
          <input
            type="text"
            className={`pl-10 rounded-md w-40 sm:w-96 h-8 sm:h-10 focus:outline-none border-2 transition-colors duration-300 ease-in-out cursor-pointer tracking-normal font-normal ${isDarkTheme ? 'bg-zinc-700 text-white border-transparent hover:border-sky-400' : 'bg-gray-200 text-black border-transparent hover:border-gray-500'}`}
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex justify-center items-center gap-5">
        <div className="relative">
          {currentUser ? (
            <>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <span className={isDarkTheme ? "text-white" : "text-black"}>User</span>
              </button>
              {isDropdownOpen && (
                <div className={`absolute right-0 ${isDarkTheme ? 'bg-black' : 'bg-white'} text-white shadow-md rounded-md mt-2 z-10`}>
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
          <FaShoppingCart className={isDarkTheme ? "text-black text-xl sm:text-2xl" : "text-white text-xl sm:text-2xl"} />
          <span className={`ml-1 sm:ml-2 font-semibold text-lg sm:text-xl ${isDarkTheme ? "text-black" : "text-white"}`}>0</span>
        </Link>
        <button onClick={() => setIsDarkTheme(!isDarkTheme)} className={isDarkTheme ? "text-white" : "text-black"}>
        {isDarkTheme ? <FaSun size={24} /> : <FaMoon size={24} />}
      </button>
      </div>
    </div>
  );
};

export default NavBar;
