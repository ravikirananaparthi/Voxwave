import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Peer from "peerjs";
import io from "socket.io-client";
import freeice from "freeice";
import toast, { Toaster } from "react-hot-toast";

import { Context } from "../main";

const socket = io('http://localhost:4000');

const RoomAudio = () => {
  const { user } = useContext(Context);
  const { id: roomId } = useParams();
  const [peers, setPeers] = useState({});
  const [stream, setStream] = useState(null);
  const audioRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    let peer;
    let isUnmounted = false;

    const init = async () => {
      // Initialize PeerJS
      peer = new Peer(user._id, {
        config: {
          iceServers: freeice(),
        },
      });

      // Get user media
      const localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(localStream);

      // Emit join event to the server
      socket.emit("join", { roomId, user });

      // Listen for peer connection from server
      socket.on("user-connected", ({ user }) => {
        if (!isUnmounted) {
          toast(`${user.name} joined the room`);
          connectToNewUser(user, localStream, peer);
        }
      });

      // Listen for peer disconnection from server
      socket.on("user-disconnected", ({ user }) => {
        if (!isUnmounted) {
          toast(`${user.name} left the room`);
          if (peers[user.name]) peers[user.name].close();
          setPeers((prevPeers) => {
            const updatedPeers = { ...prevPeers };
            delete updatedPeers[user.name];
            return updatedPeers;
          });
        }
      });

      // Handle incoming calls
      peer.on("call", (call) => {
        call.answer(localStream);
        call.on("stream", (remoteStream) => {
          if (audioRefs.current[call.peer]) {
            audioRefs.current[call.peer].srcObject = remoteStream;
          }
        });
      });

      peer.on("error", (err) => {
        console.error("Peer error:", err);
      });
    };

    init();

    // Cleanup on component unmount
    return () => {
      isUnmounted = true;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      socket.emit("leave", { roomId, user });
      if (peer) {
        peer.destroy();
      }
    };
  }, [user, roomId]);

  const connectToNewUser = (newUser, stream, peer) => {
    const call = peer.call(newUser._id, stream);
    call.on("stream", (remoteStream) => {
      if (audioRefs.current[newUser.name]) {
        audioRefs.current[newUser.name].srcObject = remoteStream;
      }
    });
    call.on("close", () => {
      if (audioRefs.current[newUser.name]) {
        audioRefs.current[newUser.name].srcObject = null;
      }
    });
    setPeers((prevPeers) => ({ ...prevPeers, [newUser.name]: call }));
  };

  const leaveRoom = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    socket.emit("leave", { roomId, user });
    navigate("/wt");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="clientsWrap">
        <div className="header">
          <h2 className="text-white text-xl">Room: {roomId}</h2>
          <div>
            <button onClick={leaveRoom}>
              <img src="/images/win.png" alt="win-icon" />
              <span>Leave</span>
            </button>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Users in the Channel</h2>
        <ul className="space-y-4">
          {Object.keys(peers).map((peerName) => (
            <li
              className="flex items-center border-b-2 border-gray-700 py-2"
              key={peerName}
            >
              <audio
                autoPlay
                ref={(ref) => (audioRefs.current[peerName] = ref)}
              />
              <h4 className="text-white">{peerName}</h4>
            </li>
          ))}
        </ul>
      </div>
      <Toaster />
    </div>
  );
};

export default RoomAudio;
