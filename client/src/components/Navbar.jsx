import React, { useContext, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { FaRegBell, FaUserCircle } from "react-icons/fa";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import axios from "axios"; // Import axios for making HTTP requests
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, setAuth, loader, setLoader } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  const logOutHandler = async () => {
    setLoader(true);
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });
      toast.success("Logged Out Successfully");
      setAuth(false);
      setLoader(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setAuth(false);
      setLoader(false);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
        
          <div className="flex items-center">
          
            <span className="text-white text-lg font-semibold flex flex-row">
            <MicIcon className="h-6 w-6 mr-4" />
              Voxwave
            </span>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none transition duration-300"
            >
              <IoMenu size={24} />
            </button>
          </div>
          <div className="hidden md:flex justify-between items-center">
            {isAuthenticated && (
              <>
                <Link to="/app/wt">
                  <button className="text-white mx-2">Home</button>
                </Link>
                <button className="text-lime-400 mx-2 flex items-center">
                  <FaRegBell /> <span className="ml-1">Notifications</span>
                </button>
                <Link to="/app/feedback">
                  <button className="text-white mx-2">Feedback</button>
                </Link>
                <Link to="/app/contactus">
                  <button className="text-white mx-2">Contact Us</button>
                </Link>
              </>
            )}
            {isAuthenticated ? (
              <button
                onClick={logOutHandler}
                className="bg-lime-400 hover:bg-lime-500 text-gray-900 rounded-md px-4 py-2 transition duration-300 ease-in-out"
              >
                Logout
              </button>
            ) : (
              <Link to={"/app/login"}>
                <button className="bg-lime-400 hover:bg-lime-500 text-gray-900 rounded-md px-4 py-2 transition duration-300 ease-in-out">
                  Login
                </button>
              </Link>
            )}
            {isAuthenticated && (
              <Link to="/app/profile">
                <button className="text-lime-400 mx-2 flex items-center">
                  <FaUserCircle size={40} />
                </button>
              </Link>
            )}
          </div>
        </div>
        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden transition duration-300">
            <div className="flex flex-col items-center mt-4">
              <Link to="/app/home">
                <button className="text-lime-400 my-2">Home</button>
              </Link>
              <Link to="/app/profile">
                <button className="text-lime-400 my-2 flex items-center">
                  <FaUserCircle size={30} /> <span className="ml-1">Profile</span>
                </button>
              </Link>
              <button className="text-lime-400 my-2 flex items-center">
                <FaRegBell /> <span className="ml-1">Notifications</span>
              </button>
              <Link to="/app/feedback">
                <button className="text-lime-400 my-2">Feedback</button>
              </Link>
              <Link to="/app/contactus">
                <button className="text-lime-400 my-2">Contact Us</button>
              </Link>

              {isAuthenticated && (
                <button
                  onClick={logOutHandler}
                  className="bg-lime-400 hover:bg-lime-500 text-gray-900 rounded-md px-4 py-2 mt-2 transition duration-300 ease-in-out"
                >
                  Logout
                </button>
              )}
              {!isAuthenticated && (
                <Link to={"/app/login"}>
                  <button className="bg-lime-400 hover:bg-lime-500 text-gray-900 rounded-md px-4 py-2 mt-2 transition duration-300 ease-in-out">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
function MicIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}
export default Navbar;