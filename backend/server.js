const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./databases/database");
const { errorMiddleware, notFound, errorHandler } = require("./middleware/error");
const chats = require("./data/data");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chatRouter");
const messageRouter = require('./routes/messageRouter')

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/chat", chatRouter);
app.use("/api/user", userRouter);
app.use("/api/message",messageRouter);


app.use("/", (req, res) => res.send("hello"));
// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log("Server is connected !!"));
