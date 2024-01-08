import { Avatar, Box, Text, Divider } from '@chakra-ui/react';
import React from 'react';

const UserListItem = ({ user, handleFunction }) => {
  return (
    <>
      <Box
        onClick={handleFunction}
        cursor="pointer"
        bg="gray.100"
        _hover={{
          background: "gray.200",
          transition: "0.3s ease-in-out"
        }}
        w="100%"
        display="flex"
        alignItems="center"
        color="black"
        px={2}
        py={1}
        borderRadius="md"
      >
        <Avatar
          size="xs"
          cursor="pointer"
          name={user.name}
          src={user.pic}
          transition="0.3s ease-in-out"
          _hover={{
            transform: "scale(1.2)",
          }}
        />

        <Box ml={2}>
          <Text fontWeight="bold" fontSize="md">
            {user.name}
          </Text>
          <Text fontSize="sm">
            <b>Email:</b> {user.email}
          </Text>
        </Box>
      </Box>
      <Divider mt={1} mb={1} borderColor="gray.400" />
    </>
  );
};

export default UserListItem;
