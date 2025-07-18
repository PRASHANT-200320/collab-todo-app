
import { Server } from "socket.io";

export let io;

export const init = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL, 
      methods: ["GET", "POST"],
    },
  });
  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
};
