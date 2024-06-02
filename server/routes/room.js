import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createRoom, getAllRooms, getRoom } from "../controllers/room.js";

const router = express.Router();
router.post("/createroom", isAuthenticated, createRoom);

router.get("/allrooms", isAuthenticated, getAllRooms);

router.get('/:roomId', isAuthenticated, getRoom);



export default router;
