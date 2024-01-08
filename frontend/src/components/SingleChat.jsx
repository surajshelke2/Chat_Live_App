import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModel from "./Authentication/miscellaneous/ProfileModel";
import UpdateGroupChatModel from "./Authentication/miscellaneous/UpdateGroupChatModel";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();

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
                onClick={() => setSelectedChat(" ")}
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
                <UpdateGroupChatModel
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
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
            {/* <Messages/> */}
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          bg="#E8E8E8"
          padding={4}
          borderRadius="md"
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
