import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Box,
  } from '@chakra-ui/react';
import SideDrawer from '../components/Authentication/miscellaneous/SideDrawer';
import Mychats from '../components/Authentication/miscellaneous/Mychats';
import ChatBox from '../components/Authentication/miscellaneous/ChatBox';
import { ChatState } from '../Context/ChatProvider';

const ChatPage = () => {

    const {user} =ChatState();
    const [fetchAgain, setFetchAgain] = useState(false)  

    return (
        <div style={{width:"100%"}}>
            {user && <SideDrawer/>}
            <Box display="flex"flexDirection="row" justifyContent="space-between"  w="100%" h="91.5vh" p="10px">
                {user && <Mychats  fetchAgain={fetchAgain}/>}
                { user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
            </Box>

          
        </div>
    );


};

export default ChatPage;
