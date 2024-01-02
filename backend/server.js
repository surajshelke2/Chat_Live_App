const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./databases/database");

const userRouter = require("./routes/user");

const app = express();
app.use(express.json());
dotenv.config();
connectDB();
const cors = require("cors");
const { errorMiddleware } = require("./middleware/error"); // Fix here

app.use(cors());



app.use("/api/chat", (req, res) => res.send(chats)); // Fix here

app.use("/api/user", userRouter);

app.use("/api/chat/:id", (req, res) => {
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});
app.use("/", (req, res) => res.send("hello")); // Fix here
app.use(errorMiddleware); // Fix here

app.listen(process.env.PORT, () => console.log("Server is connected !!")); // Fix here
