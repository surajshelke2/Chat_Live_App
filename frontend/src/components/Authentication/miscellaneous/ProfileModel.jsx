import { ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Image,
  Center,
  Text,
} from "@chakra-ui/react";
import { m } from "framer-motion";
import React from "react";

const ProfileModel = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}

      <Modal
        size="lg"
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize={{ base: "2xl", md: "3xl" }}
            textAlign="center"
            borderBottom="1px solid #E2E8F0"
            pb="4"
            fontWeight="bold"
            textTransform="uppercase"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center mb="4">
              <Image
                src={user.pic}
                alt={user.name}
                borderRadius="full"
                boxSize="150px"
                objectFit="cover"
                boxShadow="0 0 20px #00BFFF, 0 0 40px #00BFFF, 0 0 60px #00BFFF"
              />
            </Center>
            <Center>
              <Text fontSize={{ base: "18px", md: "20px" }} m="px">
                Email: {user.email}
              </Text>
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModel;
