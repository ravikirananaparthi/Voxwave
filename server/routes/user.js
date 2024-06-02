import express from "express";

import {
  getMyprofile,
  login,
  logout,
  register,
} from "../controllers/user.js";


import { User } from "../models/user.js";
import { isAuthenticated } from "../middlewares/auth.js";



const router = express.Router();




router.post("/new", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyprofile);


router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json({ name: user.name });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Export the router
export default router;
