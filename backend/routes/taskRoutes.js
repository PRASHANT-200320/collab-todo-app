import express from "express";
const router = express.Router();

import auth from "../middleware/auth.js";
import {
  getTasks,
  createTask,
  updateTask,
  smartAssign,
} from "../controllers/taskController.js";

router.get("/", auth, getTasks);
router.post("/", auth, createTask);
router.put("/:id", auth, updateTask);
router.post("/:id/smart-assign", auth, smartAssign);

export default router;
