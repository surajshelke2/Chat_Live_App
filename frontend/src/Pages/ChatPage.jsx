import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatPage = () => {
    const [chats, setChats] = useState([]);
  
    const fetchChats = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/chat');
            setChats(data);
            console.log(data)
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchChats();
    }, []);

  

    return (
        <div>
            {chats.map((person)=><h1>{person.chatName}</h1>)}
        </div>
    );
};

export default ChatPage;
