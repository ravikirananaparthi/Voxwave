import React, { useContext, useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Context, server } from "./main";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import WT from "./pages/WT";
import Login from "./pages/Login";
//import Channel from "./pages/Channel";
//import AudioRoom from "./pages/Audioroom";
import RoomAudio from "./pages/RoomAudio";
import AudioChannel from "./pages/AudioChannel";
import Landing from "./pages/Landing";
import Nav from "./components/Nav";
import Bottom from "./components/Bottom";
import FmRadios from "./pages/FmRadios";
import Profile from "./pages/Profile";

function App() {
  const { setUser, setAuth, setLoader ,isAuthenticated} = useContext(Context);

  useEffect(() => {
    setLoader(true);
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setAuth(true);
        setLoader(false);
      })
      .catch((error) => {
        setUser({});
        setAuth(false);
        setLoader(false);
      });
  }, [isAuthenticated]);
  const token = localStorage.getItem('token') 
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  //  <Route path="/room/:id" element={<Channel />} />  <Route path="/room/:id" element={<AudioRoom/>} /> <Route path="/room/:id" element={<RoomAudio/>} />
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app/*" element={<ProtectedRoutes />} />
      </Routes>
      <Bottom />
    </Router>
  );
}
function ProtectedRoutes() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/home" element={<WT />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wt" element={<WT />} />
        <Route path="/fm" element={<FmRadios/>} />
        <Route path="/room/:id" element={<AudioChannel />} />
      </Routes>
      
      <Toaster />
    </>
  );  
}
const Home = () => {
  return <h1>Home Page</h1>;
};



export default App;
