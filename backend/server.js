const express = require('express');
const chats = require('./data/data');
const dotenv = require('dotenv')

const app = express();

dotenv.config()
const cors = require('cors');
app.use(cors());


app.get('/',(req,res)=>[
    res.send("hello")
])

app.get('/api/chat',(req,res)=>[
    res.send(chats)
])

app.get("/api/chat/:id",(req,res)=>{
    const singleChat = chats.find((c)=>c._id===req.params.id);
    res.send(singleChat)
})



app.listen(process.env.PORT,console.log("Server is connected !!"))