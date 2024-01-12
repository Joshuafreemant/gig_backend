import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// import { Server } from "socket.io";

// const io = new Server({
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

const app = express();


dotenv.config();

mongoose.set("strictQuery", true);

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected successfully");
} catch (error) {
  console.log(error);
}
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); // Adjust the origin as needed


// let users = [];

// const addUser = (userId, socketId) => {
//   !users.some((user) => user.userId === userId) &&
//     users.push({ userId, socketId });
// };

// const removeUser = (socketId) => {
//   users = users.filter((user) => user.socketId !== socketId);
// };

// const getUser = (userId) => {
//   return users.find((user) => user.userId === userId);
// };

// io.on("connection", (socket) => {
//   //when ceonnect
//   console.log("a user connected.");

//   //take userId and socketId from user
//   socket.on("addUser", (userId) => {
//     addUser(userId, socket.id);
//     io.emit("getUsers", users);
//   });

//   //send and get message
//   socket.on("sendMessage", ({ senderId, receiverId, text }) => {
//     const user = getUser(receiverId);
//     io.to(user.socketId).emit("getMessage", {
//       senderId,
//       text,
//     });
//   });

//   //when disconnect
//   socket.on("disconnect", () => {
//     console.log("a user disconnected!");
//     removeUser(socket.id);
//     io.emit("getUsers", users);
//   });
// });
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);


// io.listen(8900);
app.listen(8000, () => {
  console.log("Backend is Running");
});
