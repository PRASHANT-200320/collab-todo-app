import dotenv from "dotenv";
dotenv.config(); 

import http from "http";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import { init, getIO } from "./socket.js";

const app = express();
const server = http.createServer(app);
const io = init(server);


io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
});

app.set("io", io);

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/logs", logRoutes);





io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    server.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
