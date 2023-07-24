import express from 'express'
import connection from "./config.js";
import cors from 'cors';
import * as dotenv from 'dotenv';
import userRoutes from './Router/UserRoutes.js';
import chatRoutes from './Router/ChatRoutes.js';
import messageRoutes from './Router/MessageRoutes.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import { Socket } from 'socket.io';
import { Server } from "socket.io";

dotenv.config({path:'./.env'});
connection();

const app = express()
const port = process.env.PORT || 5001

app.use(cors())

app.use(express.json());

app.use('/api/',userRoutes)
app.use('/api/chats',chatRoutes)
app.use('/api/message',messageRoutes)
app.use(notFound)
app.use(errorHandler)

const server=app.listen(port, () => {
  console.log(`chatapp listening on port ${port}`)
})

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection",(socket)=>{
  console.log("Connected to socket.io");
  socket.on("setup",(userData)=>{
    socket.join(userData._id);
    console.log(userData._id)
    socket.emit("connected");
  })
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });

})

