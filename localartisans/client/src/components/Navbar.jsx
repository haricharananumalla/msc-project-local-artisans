import { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { useData } from "../context/data";
import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import { FaCartArrowDown } from "react-icons/fa";

const Navbar = () => {
  const { data, setData } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const targetUrl = data?.role === "Seller" ? "/dashboard" : "/profile";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setData({
      user: null,
      token: "",
    });
    localStorage.removeItem("loginedUser");
  };

  return (
    <header className="bg-white shadow-lg">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <h1 className="font-bold text-xl">StyleUp</h1>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav className="hidden md:block">
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <Link
                    to={"/"}
                    className="text-gray-800 transition hover:text-gray-500/75"
                  >
                    Home
                  </Link>
                </div>
                <h1>
                  <Link
                    to={"/allproducts"}
                    className="text-gray-800 transition hover:text-gray-500/75"
                  >
                    All Products
                  </Link>
                </h1>
                <h1>
                  <Link
                    to={"/contact"}
                    className="text-gray-800 transition hover:text-gray-500/75"
                  >
                    Contact Us
                  </Link>
                </h1>

                <Searchbar />
                {data.role === "Buyer" || data.role === "Seller" ? (
                  <div className="flex gap-4">
                    <Link
                      to={"/cart"}
                      className="text-black text-2xl flex justify-center items-center transition hover:text-gray-500/75"
                    >
                      <FaCartArrowDown />
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-white bg-black transition hover:text-gray-300 px-4 rounded-xl shadow"
                    >
                      Logout
                    </button>
                    <Link
                      to={targetUrl}
                      className="h-10 w-10 rounded-full flex justify-center items-center"
                    >
                      <VscAccount className="text-2xl" />
                    </Link>
                  </div>
                ) : (
                  <h1>
                    <a
                      className="text-gray-100 bg-black px-4 py-2 rounded-lg shadow-xl transition hover:text-gray-200"
                      href="/login"
                    >
                      Login
                    </a>
                  </h1>
                )}
              </div>
            </nav>

            <div className="flex items-center gap-4">
              <div className="block md:hidden">
                <button onClick={toggleMenu}>
                  <MdOutlineMenu />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <nav className="absolute top-16 left-0 w-full bg-white z-50">
          <div className="flex flex-col items-center gap-4 text-sm py-4">
            <Searchbar togglemenu={toggleMenu} />
            <h1>
              <Link
              onClick={toggleMenu}
                to={"/"}
                className="text-gray-500 transition hover:text-gray-500/75"
              >
                Home
              </Link>
            </h1>
            <h1>
              <Link
              onClick={toggleMenu}
                to={"/allproducts"}
                className="text-gray-500 transition hover:text-gray-500/75"
              >
                All Products
              </Link>
            </h1>
           
            <h1>
              <Link
              onClick={toggleMenu}
                to={"/cart"}
                className="text-gray-500 transition hover:text-gray-500/75"
              >
                Cart
              </Link>
            </h1>

            <h1>
              <Link
              onClick={toggleMenu}
                to={targetUrl}
                className="text-gray-500 transition hover:text-gray-500/75"
              >
                Profile
              </Link>
            </h1>
            <h1>
              <Link
              onClick={toggleMenu}
                to={"/logout"}
                className="text-gray-500 transition hover:text-gray-500/75"
              >
                logout{" "}
              </Link>
            </h1>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
