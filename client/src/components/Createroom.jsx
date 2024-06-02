import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLockOpen, FaWindowClose } from "react-icons/fa";
import { server } from "../main";
const Createroom = ({ onClose }) => {
  const navigate = useNavigate();

  const [roomType, setRoomType] = useState("open");
  const [topic, setTopic] = useState("");

  const handleTypeSelect = (type) => {
    setRoomType(type);
  };

  async function createRoom() {
    try {
      if (!topic) return;
      const { data } = await axios.post(
        `${server}/rooms/createroom`,
        { topic, roomType },
        { withCredentials: true }
      );
      navigate(`/app/room/${data._id}`);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
      <div className="relative bg-gray-800 rounded-lg p-6 w-96 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-400 hover:text-gray-200"
        >
          <FaWindowClose className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-semibold mb-4 text-white">
          Enter the topic to be discussed
        </h3>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border border-gray-600 bg-gray-700 text-white rounded-md px-4 py-2 mb-4 w-full focus:outline-none focus:border-blue-500"
          placeholder="Topic"
        />
        <h2 className="text-lg font-semibold mb-2 text-white">Room Type</h2>
        <div className="flex justify-center mb-4">
          <button className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => handleTypeSelect("open")}
          >
            <FaLockOpen className="w-12 h-12 mb-2" />
            <span className="text-white">Open</span>
          </button>
        </div>
        <div className="flex justify-center">
          <button  onClick={createRoom}
            type="button"
            class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
           Let's go
          </button>
        </div>
      </div>
    </div>
  );
};

export default Createroom;
