import dotenv from "dotenv";
dotenv.config(); // ✅ Load .env

import http from "http";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import logRoutes from "./routes/logRoutes.js"; //  optional but important
import { init, getIO } from "./socket.js"; //  socket logic

const app = express();
const server = http.createServer(app);
const io = init(server); //  initialize socket.io

app.set("io", io);

app.use(cors());
app.use(express.json());

//  routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/logs", logRoutes);

//  socket connection log
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

//  connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/collabtodo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    server.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
