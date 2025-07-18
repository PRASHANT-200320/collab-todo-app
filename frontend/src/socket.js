// socket.js
import { io } from "socket.io-client";

// Fallback to localhost if .env doesn't have REACT_APP_SOCKET_URL
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";

const socket = io(SOCKET_URL, {
  transports: ["websocket"], // Optional, to avoid polling
});

export default socket;
