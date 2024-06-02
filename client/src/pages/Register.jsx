import React, { useState, useContext } from "react";
import axios from "axios"; // Make sure axios is imported
import toast from "react-hot-toast"; // Make sure react-toastify is imported
import { Context, auth, server } from "../main";
 // Make sure to import your context file
 import { Link, Navigate } from "react-router-dom"; 
 import l from '../assets/ggg.png';
 import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const RegisterPage = () => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated,setAuth } = useContext(Context); // Assuming you only need setAuth from your context

  // Handle input changes
  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Here you can add logic to register the user
      const { data } = await axios.post(
        `${server}/users/new`,
        {
          name:userId,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setAuth(true);
    } catch (error) {
      toast.error(error.response.data.message);
      setAuth(false);
    }
  };
  const handleGoSubmit = async (event) => {
    event.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user1 = result.user;
      // User successfully signed in
      const user = result.user;
      console.log(user);
      const response = await axios.post(
        `${server}/users/new/google`,
        {
          name: user1.displayName,
          email: user1.email,
          password: "ravikiran456",
          image: user1.photoURL,
          token: await result.user.accessToken,
        }
      );
      if (response.data && response.data.tokeen) {
        localStorage.setItem('token', response.data.tokeen);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.tokeen}`;
        toast.success(response.data.message);
        setAuth(true);
      } else {
        toast.error(response.data.message);
        setAuth(false);
      }
      // Send the token and user information to your backend for authentication
    } catch (error) {
      // Handle errors (refer to Firebase documentation for error codes)
      console.error("Error during sign-in:", error);
      toast.error("Registration failed. Please try again.");
    }
  };
  if (isAuthenticated) return <Navigate to={"/app/wt"} />;
  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-1" htmlFor="userId">
              User Name
            </label>
            <input
              type="text"
              id="userId"
              className="bg-gray-700 text-white rounded-md px-4 py-2 w-full md:w-96 sm:w-full focus:outline-none focus:ring focus:border-lime-400"
              value={userId}
              onChange={handleUserIdChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-700 text-white rounded-md px-4 py-2 w-full md:w-96 sm:w-full focus:outline-none focus:ring focus:border-lime-400"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-1" htmlFor="password">
              Set Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-700 text-white rounded-md px-4 py-2 w-full md:w-96 sm:w-full focus:outline-none focus:ring focus:border-lime-400"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button
            type="submit"
            className="bg-lime-400 hover:bg-lime-500 text-gray-900 rounded-md px-4 py-2 w-full transition duration-300 ease-in-out"
          >
            Register
          </button>
          <button className="mx-auto mt-4 flex justify-center" onClick={handleGoSubmit}>
            <div className="border-2 bg-gradient-to-r bg-[white] border-gray-700 font-semibold px-5 py-2 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:bg-[#3E80ED] transition duration-300 ease-in-out">
              <img
                className="h-7 w-7 rounded-full  mr-2"
                src={l}
                alt=""
              />
              <span className="text-gray-700">Sign up with Google</span>
            </div>
          </button>
        </form>
        <div className="mt-4">
          <p className="text-gray-400 text-center">
            Don't have an account?{" "}
            <Link to="/app/login" className="text-lime-400">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
