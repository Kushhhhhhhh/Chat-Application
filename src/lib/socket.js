import { io } from "socket.io-client";
let socket;

export const initiateSocket = () => {
  socket = io();
  console.log("Socket initialized:", socket.id);
};

export const sendMessage = (message) => {
  if (socket) socket.emit("message", message);
};

export const subscribeToMessages = (cb) => {
  if (!socket) return;
  socket.on("message", (msg) => {
    console.log("Message received:", msg);
    cb(msg);
  });
};

export default socket;