import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";
import { Context } from "../main";
import "tailwindcss/tailwind.css";
import { io } from "socket.io-client";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";

const appId = "d2ef69d8954f4c3ba2b8123d6ed0deb3"; // Replace with your Agora App ID
const token = null; // You can generate a token for better security
const socket = io(import.meta.env.VITE_SOCKET_SERVER);

const AudioChannel = () => {
  const { id: roomId } = useParams();
  const { user, channels } = useContext(Context);
  const [users, setUsers] = useState([]);
  const [room, setRoom] = useState({});
  console.log(channels);
  const client = useRef(AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }));
  const localAudioTrack = useRef();
  let matchingTopic = null; // Initialize a variable to store the matching topic

  channels.forEach((room) => {
    if (room._id === roomId) {
      matchingTopic = room.topic;
      return;
    }
  });

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/rooms/${roomId}`,
          {
            withCredentials: true,
          }
        );
        setRoom(data); // Update the state properly
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchRoom();
  }, [roomId]);

  useEffect(() => {
    socket.emit("joinRoom", { roomId, user });

    socket.on("initialUsers", (roomUsers) => {
      setUsers(roomUsers);
    });

    socket.on("userJoined", (newUser) => {
      setUsers((prevUsers) => {
        if (!prevUsers.some((u) => u._id === newUser._id)) {
          toast(`${newUser.name} has joined the audio room`, {
            icon: "🚀",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          return [...prevUsers, newUser];
        }
        return prevUsers;
      });
    });

    socket.on("userLeft", (leftUser) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u._id !== leftUser._id));
      toast(`${leftUser.name} has left the audio room`, {
        icon: "🏃🚪",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    });

    const init = async () => {
      client.current.on("user-published", async (remoteUser, mediaType) => {
        await client.current.subscribe(remoteUser, mediaType);
        if (mediaType === "audio") {
          if (remoteUser.uid !== user._id) {
            remoteUser.audioTrack.play();
          }
        }
        setUsers((prevUsers) => {
          if (!prevUsers.some((u) => u.uid === remoteUser.uid)) {
            return [...prevUsers, remoteUser];
          }
          return prevUsers;
        });
      });

      client.current.on("user-unpublished", (remoteUser) => {
        setUsers((prevUsers) =>
          prevUsers.filter((u) => u.uid !== remoteUser.uid)
        );
      });

      client.current.on("user-left", (remoteUser) => {
        setUsers((prevUsers) =>
          prevUsers.filter((u) => u.uid !== remoteUser.uid)
        );
      });

      await client.current.join(appId, roomId, token, user._id);
      localAudioTrack.current = await AgoraRTC.createMicrophoneAudioTrack();
      await client.current.publish([localAudioTrack.current]);
    };

    init();

    return () => {
      socket.emit("leaveRoom", { roomId, user });
      client.current.leave();
      if (localAudioTrack.current) {
        localAudioTrack.current.stop();
        localAudioTrack.current.close();
      }
      client.current.removeAllListeners();
      socket.off("initialUsers");
      socket.off("userJoined");
      socket.off("userLeft");
    };
  }, [client, roomId, user]);
  console.log(users);
  return (
    <div className="min-h-screen bg-gray-900 text-white p-7 relative">
      <Toaster position="bottom-center" reverseOrder={false}/>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-5">
          Audio Channel {matchingTopic}
        </h2>
        <h3 className="text-xl mb-6 text-gray-400">Users in this room:</h3>
        <ul className="space-y-2 mb-[100px]">
          {users
            .filter((u) => u._id)
            .map((u, index) => (
              <li key={index} className="flex items-center space-x-3">
                {u.image ? (
                  <img
                    src={u.image}
                    alt={u.name}
                    className="w-[40px] h-[40px] rounded-full"
                  />
                ) : (
                  <FaUserCircle size={40} />
                )}
                <span>{u.name}</span>
              </li>
            ))}
        </ul>
        {users
          .filter((u) => u.uid !== user._id)
          .map((remoteUser, index) => (
            <AudioPlayer key={index} track={remoteUser.audioTrack} />
          ))}
      </div>
      <MuteButton />
    </div>
  );
};

const AudioPlayer = ({ track }) => {
  const ref = useRef();
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (track) {
      track.play(ref.current);
    }
  }, [track]);

  const toggleMute = () => {
    if (muted) {
      track.setVolume(100);
    } else {
      track.setVolume(0);
    }
    setMuted(!muted);
  };

  return (
    <div className="relative">
      <div ref={ref} />
    </div>
  );
};

const MuteButton = () => {
  const [muted, setMuted] = useState(false);

  const toggleMute = () => {
    setMuted(!muted);
  };

  return (
    <button
      onClick={toggleMute}
      className="absolute bottom-[120px] left-[50px] text-white bg-gray-800 p-2 rounded-full hover:bg-gray-600"
    >
      {muted ? (
        <HiMiniSpeakerXMark size={40} />
      ) : (
        <HiMiniSpeakerWave size={40} />
      )}
    </button>
  );
};

export default AudioChannel;
