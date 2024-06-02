import express from "express";
import { Server } from "socket.io";
import userRouter from "./routes/user.js";
import roomsRouter from "./routes/room.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleWare } from "./middlewares/errorHandling.js";
import cors from "cors";
import { createServer } from "http";
import helmet from "helmet";
import * as fs from 'fs';
import morgan from "morgan";
import ACTIONS from "./actions.js";
import http from "http";
import { User } from "./models/user.js";
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import jwt from "jsonwebtoken";
const serviceAccountKey = JSON.parse(fs.readFileSync('./voxwave-777r-firebase-adminsdk-4slpf-dab5b0dffe.json'));

export const app = express();
export const server = http.createServer(app);
const front = [
  "https://voxwave.vercel.app",
  "http://localhost:5173",
];
export const io = new Server(server, {
  cors: {
    origin: front,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});
config({
  path: "./data/config.env",
});
//using middleware
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: front,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//using Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/rooms", roomsRouter);

app.get("/", (req, res) => {
  res.send("working");
});
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

app.post("/api/v1/users/new/google", async (req, res) => {
  try {
    const { name, email, password, image, token } = req.body;
    console.log(req.body);
    let img=null;
    if (image===null){
      image=img;
    }
    // Verify ID token using Firebase Admin SDK
    const decodedToken = await getAuth().verifyIdToken(token);
    console.log(decodedToken);
    // Check for existing user with the same email
    let user= await User.findOne({ email }).select('socialauth');
    console.log(user);
    if (user) {
      if (!user.socialauth) {
        return res.status(403).json({
          error: 'This email is signed up without Google (Login with Email and password)'
        });
      }
      // User already exists and signed up with Google
      return res.json({ message: 'User already exists with Google sign-in' });
    }

    
     user = new User({
      name,
      email,
      password,
      image,
      socialauth:true,
    });
    await user.save();
    const tokeen = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "2 days" });

    res.json({ success: true, message: 'Registered successfully', tokeen });
  } catch (err) {
    console.error(err); 
    if (err.code === 'auth/invalid-token') {
      return res.status(401).json({ error: 'Invalid Google sign-in token' });
    } else {
      return res.status(500).json({ error: 'An error occurred during registration' });
    }
  }
});
app.post('/api/v1/users/google-login', async (req, res) => {
  try {
    const { token } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log(decodedToken);

   
    const user = await User.findOne({ email: decodedToken.email }).select('socialauth');
    console.log(user);

    if (!user) {
     
      return res.status(404).json({ error: 'User not found with this email' });
    }

    if (!user.socialauth) {
      return res.status(403).json({
        error: 'This email is signed up without Google (Login with Email and password)'
      });
    }

  
    const jwtToken = generateJWT(user._id);

    res.json({ success: true, message: 'Logged in successfully', token: jwtToken });
  } catch (err) {
    console.error(err);
    if (err.code === 'auth/invalid-token') {
      return res.status(401).json({ error: 'Invalid Google sign-in token' });
    } else {
      return res.status(500).json({ error: 'An error occurred during login' });
    }
  }
});
function generateJWT(userId) {
  
  return jwt.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: '2 days' }); 
}
let rooms = {};

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('joinRoom', ({ roomId, user }) => {
    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }

    const existingUser = rooms[roomId].find((u) => u._id === user._id);
    if (!existingUser) {
      rooms[roomId].push(user);
      socket.join(roomId);
      io.to(socket.id).emit('initialUsers', rooms[roomId]);
      io.in(roomId).emit('userJoined', user);
      console.log(`${user.name} joined room ${roomId}`);
    }
  });

  socket.on('leaveRoom', ({ roomId, user }) => {
    if (rooms[roomId]) {
      rooms[roomId] = rooms[roomId].filter((u) => u._id !== user._id);
      if (rooms[roomId].length === 0) {
        delete rooms[roomId];
      }
      socket.leave(roomId);
      io.in(roomId).emit('userLeft', user);
      console.log(`${user.name} left room ${roomId}`);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    // Optionally handle users disconnecting without explicitly leaving a room
  });
});
app.use(errorMiddleWare);







/*peerjs
const ACTIONS1 = {
  JOIN: 'join',
  LEAVE: 'leave',
  ADD_PEER: 'user-connected',
  REMOVE_PEER: 'user-disconnected'
};

io.on('connection', (socket) => {
  console.log('New connection', socket.id);

  socket.on(ACTIONS1.JOIN, ({ roomId, user }) => {
    socketUserMap[socket.id] = { user, roomId };
    socket.join(roomId);
    socket.to(roomId).emit(ACTIONS1.ADD_PEER, { user });
    console.log(`${user._id} joined room ${roomId}`);
  });

  socket.on(ACTIONS1.LEAVE, ({ roomId, user }) => {
    socket.leave(roomId);
    socket.to(roomId).emit(ACTIONS1.REMOVE_PEER, { user });
    delete socketUserMap[socket.id];
    console.log(`${user._id} left room ${roomId}`);
  });

  socket.on('disconnect', () => {
    const socketData = socketUserMap[socket.id];
    if (socketData) {
      const { user, roomId } = socketData;
      socket.leave(roomId);
      socket.to(roomId).emit(ACTIONS1.REMOVE_PEER, { user });
      delete socketUserMap[socket.id];
      console.log(`${user._id} disconnected from room ${roomId}`);
    }
  });
});*/
/*
//my code socket rtc

io.on("connection", (socket) => {
  console.log("New connection", socket.id);
  socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
    if (!user || !user._id) {
      console.error("User data is missing or incorrect");
      return;
    }
    socketUserMap[socket.id] = user;
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.ADD_PEER, {
        peerId: socket.id,
        createOffer: false,
        user,
      });
      socket.emit(ACTIONS.ADD_PEER, {
        peerId: clientId,
        createOffer: true,
        user: socketUserMap[clientId],
      });
    });
    socket.join(roomId);
  });

  socket.on(ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) => {
    io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
      peerId: socket.id,
      icecandidate,
    });
  });

  socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
    io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
      peerId: socket.id,
      sessionDescription,
    });
  });

  socket.on(ACTIONS.MUTE, ({ roomId, userId }) => {
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.MUTE, {
        peerId: socket.id,
        userId,
      });
    });
  });

  socket.on(ACTIONS.UNMUTE, ({ roomId, userId }) => {
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.UNMUTE, {
        peerId: socket.id,
        userId,
      });
    });
  });

  socket.on(ACTIONS.MUTE_INFO, ({ userId, roomId, isMute }) => {
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      if (clientId !== socket.id) {
        console.log("mute info");
        io.to(clientId).emit(ACTIONS.MUTE_INFO, {
          userId,
          isMute,
        });
      }
    });
  });

  const leaveRoom = () => {
    const { rooms } = socket;
    Array.from(rooms).forEach((roomId) => {
      const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
      clients.forEach((clientId) => {
        io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
          peerId: socket.id,
          userId: socketUserMap[socket.id]?.id,
        });

        // socket.emit(ACTIONS.REMOVE_PEER, {
        //     peerId: clientId,
        //     userId: socketUserMap[clientId]?.id,
        // });
      });
      socket.leave(roomId);
    });
    delete socketUserMap[socket.id];
  };

  socket.on(ACTIONS.LEAVE, leaveRoom);

  socket.on("disconnecting", leaveRoom);
});

/*

// Sockets
const socketUserMap = {};

io.on("connection", (socket) => {
  console.log("New connection", socket.id);
  socket.on(ACTIONS.JOIN, ({ roomId, user }) => {
    socketUserMap[socket.id] = user;
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.ADD_PEER, {
        peerId: socket.id,
        createOffer: false,
        user,
      });
      socket.emit(ACTIONS.ADD_PEER, {
        peerId: clientId,
        createOffer: true,
        user: socketUserMap[clientId],
      });
    });
    socket.join(roomId);
  });

  socket.on(ACTIONS.RELAY_ICE, ({ peerId, icecandidate }) => {
    io.to(peerId).emit(ACTIONS.ICE_CANDIDATE, {
      peerId: socket.id,
      icecandidate,
    });
  });

  socket.on(ACTIONS.RELAY_SDP, ({ peerId, sessionDescription }) => {
    io.to(peerId).emit(ACTIONS.SESSION_DESCRIPTION, {
      peerId: socket.id,
      sessionDescription,
    });
  });

  socket.on(ACTIONS.MUTE, ({ roomId, userId }) => {
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.MUTE, {
        peerId: socket.id,
        userId,
      });
    });
  });

  socket.on(ACTIONS.UNMUTE, ({ roomId, userId }) => {
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.UNMUTE, {
        peerId: socket.id,
        userId,
      });
    });
  });

  socket.on(ACTIONS.MUTE_INFO, ({ userId, roomId, isMute }) => {
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      if (clientId !== socket.id) {
        console.log("mute info");
        io.to(clientId).emit(ACTIONS.MUTE_INFO, {
          userId,
          isMute,
        });
      }
    });
  });

  const leaveRoom = () => {
    const { rooms } = socket;
    Array.from(rooms).forEach((roomId) => {
      const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
      clients.forEach((clientId) => {
        io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
          peerId: socket.id,
          userId: socketUserMap[socket.id]?.id,
        });

        // socket.emit(ACTIONS.REMOVE_PEER, {
        //     peerId: clientId,
        //     userId: socketUserMap[clientId]?.id,
        // });
      });
      socket.leave(roomId);
    });
    delete socketUserMap[socket.id];
  };

  socket.on(ACTIONS.LEAVE, leaveRoom);

  socket.on("disconnecting", leaveRoom);
});

*/  


