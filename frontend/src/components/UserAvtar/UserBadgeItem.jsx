import React from "react";
import { Box } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      px={4}
      py={2}
      borderRadius="md"
      m={2}
      mb={2}
      variant="solid"
      fontSize={13}
      backgroundColor="purple"
      color="white"
      cursor="pointer"
      onClick={handleFunction}
      width="fit-content"
    >
      {user.name}
      <CloseIcon pl={1} />
    </Box>
  );
};

export default UserBadgeItem;
