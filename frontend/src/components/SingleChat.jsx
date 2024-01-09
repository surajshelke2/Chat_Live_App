import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModel from "./Authentication/miscellaneous/ProfileModel";
import UpdateGroupChatModel from "./Authentication/miscellaneous/UpdateGroupChatModel";
import axios from "axios";
import "./style.css";
import ScrollableChat from "./ScrollableChat";

const SingleChat = () => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const toast = useToast();

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          `http://localhost:5000/api/message`,
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );

        setMessage([...message, data]);
      } catch (error) {
        toast({
          title: "Error Occures !!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const response = await axios.get(
        `http://localhost:5000/api/message/${selectedChat._id}`,
        config
      );

      const { data } = response;
      console.log("Fetched Messages:", data);

      setMessage(data);
    } catch (error) {
      console.error("Error fetching messages:", error);

      toast({
        title: "Error Occurred!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    console.log(newMessage);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "xl", md: "3xl", lg: "2xl" }}
            fontFamily="sans-serif"
            pb={3}
            px={2}
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
            padding={4}
          >
            {!selectedChat.isGroupChat && window.innerWidth <= 768 && (
              <IconButton
                display={{ base: "flex", md: "none" }}
                icon={<ArrowBackIcon />}
                onClick={() => setSelectedChat("")}
                color="teal.500"
                _hover={{ color: "teal.700" }}
              ></IconButton>
            )}

            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModel user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModel fetchMessages={fetchMessages} />
              </>
            )}
          </Text>

          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={2}
            bg="#E8E8E8"
            w="100%"
            h="90%"
            borderRadius="md"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="message">
                <ScrollableChat messages={message}></ScrollableChat>
              </div>
            )}

            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter the message ..."
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          height="100%"
          bg="#E8E8E8"
          w="100%"
          alignItems="center"
          padding={1}
          borderRadius="md"
          overflow="hidden"
        >
          <Text fontSize="3xl" color="GrayText" fontFamily="sans-serif">
            Click on a User to Start Chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
