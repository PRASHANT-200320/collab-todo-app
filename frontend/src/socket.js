// frontend/src/socket.js
import { io } from "socket.io-client";

// Read from .env or use localhost fallback
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";

const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});

export default socket;
