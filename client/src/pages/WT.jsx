import React, { useState, useEffect, useContext } from "react";
//import { io } from "socket.io-client";
import { Link, Navigate } from "react-router-dom";
//import AddRoomModal from '../../components/AddRoomModal/AddRoomModal';
import axios from "axios";
import Createroom from "../components/Createroom";
import { Context, server } from "../main";

function WT(props) {
  /*const socket = io("http://localhost:4000", {
    reconnection: true,
  });*/

  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { user, setChannels, isAuthenticated } = useContext(Context);
  console.log(user);
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await axios.get(`${server}/rooms/allrooms`, {
          withCredentials: true,
        });
        setChannels(data);
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);
  function openModal() {
    setShowModal(true);
  }
  if (!isAuthenticated) {
    return <Navigate to={"/app/login"} />;
  }
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Public Channels</h2>

          <button
            onClick={openModal}
            className="bg-[#24DA82] hover:bg-[#0F624A] text-white rounded-3xl md:rounded-2xl px-4 py-2 transition duration-300 ease-in-out"
          >
            Create New Channel
          </button>
        </div>
        <ul className="flex flex-col space-y-4">
          {rooms?.map((room) => (
            <li key={room._id} className="bg-gray-700 p-4 rounded-3xl">
              <div className="flex justify-between items-center">
                <span>{room?.topic}</span>
                <Link to={`/app/room/${room?._id}`}>
                  <button className="bg-[#1E74E2] hover:bg-[#003C9E] text-white rounded-2xl px-4 py-2 transition duration-300 ease-in-out">
                    Go to Channel
                  </button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
        {showModal && <Createroom onClose={() => setShowModal(false)} />}
      </div>
    </>
  );
}

export default WT;
