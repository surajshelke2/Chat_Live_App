const express = require('express');
const chats = require('./data/data');
const dotenv = require('dotenv')
const connectDB = require('./databases/database')

const userRouter = require('./routes/user')

const app = express();

dotenv.config()
connectDB()
const cors = require('cors');
const errorHandler = require('./middleware/error');
app.use(cors());


app.get('/',(req,res)=>[
    res.send("hello")
])

app.get('/api/chat',(req,res)=>[
    res.send(chats)
])

app.use('/api/user',userRouter)

app.get("/api/chat/:id",(req,res)=>{
    const singleChat = chats.find((c)=>c._id===req.params.id);
    res.send(singleChat)
})

app.use(errorHandler);

app.listen(process.env.PORT,console.log("Server is connected !!"))