import express from "express";
import "dotenv/config";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./userRoutes";
import {Server} from "socket.io";
import {User} from "./userModel";
import jwt from "jsonwebtoken";

const app = express();
const server = http.createServer(app);
const {PORT} = process.env || 4000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL!);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to mongodb");
  server.listen(PORT, () => {
    console.log("http://localhost:4000");
  });
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("joined", () => {
    io.sockets.emit("new-user", "new user joined");
  });

  socket.on("private message", async (to, message, mySelf) => {
    const user = await User.find({email: to});
    const decoded = jwt.verify(mySelf, process.env.ACCESS_TOKEN_SECRET!);
    const sender = await User.findById(decoded);
    io.sockets.emit("refresh", {
      reciver: user[0].email,
      message,
      sender: sender?.email,
      time: new Date(),
    });
    console.log("message received", {
      reciver: user[0].email,
      message,
      sender: sender?.email,
      time: new Date(),
    });

    // io.to(to).emit("message received", {from: mySelf, content: message});
    // socket.emit("message sent", {to, content: message});

    if (user) {
      user[0].messages.push({
        reciver: user[0].email,
        message,
        sender: sender?.email,
        time: new Date(),
      });
      sender?.messages.push({
        reciver: user[0].email,
        message,
        sender: sender?.email,
        time: new Date(),
      });
      user[0].save();
      sender?.save();
    }
  });
});

app.use("/", userRouter);
