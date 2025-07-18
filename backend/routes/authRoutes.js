import express from "express";
const router = express.Router();

import auth from "../middleware/auth.js";
import User from "../models/User.js";
import { loginUser, register } from "../controllers/authController.js";

router.post("/login", loginUser);
router.post("/register", register);


router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find({}, "_id fullName");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

export default router;
