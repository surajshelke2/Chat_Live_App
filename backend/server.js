const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./databases/database");
const {
  errorMiddleware,
  notFound,
  errorHandler,
} = require("./middleware/error");
const chats = require("./data/data");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chatRouter");
const messageRouter = require("./routes/messageRouter");
const { Connection } = require("mongoose");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/chat", chatRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

app.use("/", (req, res) => res.send("hello"));
// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => console.log("Server is connected !!"));

const io = require("socket.io")(server, {
  pinTimeout: 6000,
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    // Join the socket room using the user's ID
    socket.join("current User :" + userData._id);
    console.log(userData._id);
    // Emit a 'connected' event back to the connected client
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room " + room);
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined !!");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      console.log(newMessageRecieved);

      socket.in(user._id).emit("message reciecved", newMessageRecieved);
    });
  });
});
