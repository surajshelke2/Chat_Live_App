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
  

    return (
        <div style={{width:"100%"}}>
            {user && <SideDrawer/>}
            <Box d="flex" justifyContent='space-between' w="100%" h="100vh" p="100px">
                {user && <Mychats/>}
                { user && <ChatBox/>}
            </Box>

          
        </div>
    );


};

export default ChatPage;
