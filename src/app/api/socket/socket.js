import { Server } from 'socket.io';
import mongoose from 'mongoose';
import Message from '@/models/Message'; // Ensure this path is correct
import User from '@/models/User'; // Ensure this path is correct

export async function GET(req) {
  // Initialize Socket.io server
  if (!res.socket.server.io) {
    console.log("Initializing Socket.io");

    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

      socket.on("message", async (msg) => {
        console.log("Received message:", msg);

        try {
          await mongoose.connect(process.env.MONGODB_URI);
          const user = await User.findOne({ clerkUserId: msg.userId });

          if (user) {
            await Message.create({
              userId: user._id,
              text: msg.text,
              timestamp: new Date(),
            });
          }

          // Broadcast the message to other clients
          socket.broadcast.emit("message", msg);
        } catch (error) {
          console.error("Error handling message:", error);
        }
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  }

  return new Response(null, { status: 200 });
}