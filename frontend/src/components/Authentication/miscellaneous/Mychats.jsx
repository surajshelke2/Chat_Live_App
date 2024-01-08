import React, { useEffect, useState } from "react";
import { ChatState } from "../../../Context/ChatProvider";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";

import ChatLoading from "../../ChatLoading";
import { getSender } from "../../../config/ChatLogics";
import GroupChatModel from "./GroupChatModel";

const Mychats = ({fetchAgain}) => {
  const [loggedUser, setloggedUser] = useState();

  const { user, chats, setchats, selectedChat, setSelectedChat } = ChatState();
  const toast = useToast();

  const featchChat = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/chat`,
        config
      );
      console.log("Hill");
      setchats(data);

      console.log(data);
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setloggedUser(JSON.parse(localStorage.getItem("userInfo")));
    featchChat();
    
  },[fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      h="100%"
      alignItems="center"
      p={3}
      bg="white"
      justifyContent="space-between"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "28px", md: "20px" }}
          fontFamily="revert"
          mt={2}
        >
          MyChats
        </Box>
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "28px", md: "20px" }}
          fontFamily="revert"
          mt={2}
        >

          <GroupChatModel>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "16px", lg: "15px" }}
            rightIcon={<AddIcon />}
            onClick={() => {
              console.log("Add button clicked!");
            }}
            size="sm"
          >
            My Group Chat
          </Button>
          </GroupChatModel>
        </Box>
      </Box>

      <Box 
  display="flex"
  flexDir="column"
  p={3}
  bg="gray.200"  // Set your background color here
  w="100%"
  h="90%"
  borderRadius="lg"
  overflowY="scroll"
  
>
  {chats ? (
    <Stack overflowY="scroll">
      {chats.map((chat) => (
        <Box
          onClick={() => setSelectedChat(chat)}
          cursor="pointer"
          bg={selectedChat === chat ? "teal.500" : "white"}  
          color={selectedChat === chat ? "white" : "black"}
          px={3}
          py={2}
          borderRadius="lg"
          key={chat._id}
          transition="background-color 0.3s, color 0.3s"
        >

         { console.log("CHATS :",chats)}

          <Text>
            {!chat.isGroupChat?

              getSender(loggedUser,chat.users):chat.chatName}
          </Text>
        
        </Box>
      ))}
    </Stack>
  ) : (
    <ChatLoading />
  )}
</Box>
    </Box>
  );
};

export default Mychats;
