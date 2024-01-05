import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

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



app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.listen(8000, () => {
  console.log("Backend is Running");
});
