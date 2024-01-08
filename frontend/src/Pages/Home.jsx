import React, { useState } from 'react';
import {
  Container,
  Box,
  Text,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';

import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';

const Home = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <Container maxW="md" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg="white"
        borderRadius="3g"
        borderWidth="1px"
        boxShadow="lg"
        mb={4}
        width="100%"
      >
        <Text
          fontSize="4xl"
          fontWeight="bold"
          color="black"
          fontFamily="cursive"
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
          borderRadius="md"
          p={3}
        >
          CHIT-CHAT
        </Text>
      </Box>

      <Box p={8} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="white" width="100%">
        <Tabs
          isFitted
          variant="soft-rounded"
          colorScheme="teal"
          index={activeTab}
          onChange={handleTabChange}
        >
          <TabList mb="1em">
            <Tab _selected={{ color: 'white', bg: 'teal.500' }} onClick={() => handleTabChange(0)}>
              Login
            </Tab>
            <Tab _selected={{ color: 'white', bg: 'teal.500' }} onClick={() => handleTabChange(1)}>
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {activeTab === 0 ? <Login /> : null}
            </TabPanel>
            <TabPanel>
              {activeTab === 1 ? <Signup /> : null}
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Box mt={4}>
          <Text>
            {activeTab === 0 ? 'New to Chit-Chat?' : 'Already have an account?'}
          </Text>
        </Box>

        {activeTab === 0 && (
          <Box mt={4}>
            <Text>Continue as a guest user</Text>
            <Button colorScheme="red" mt={2} onClick={() => alert('Guest')}>
              Continue as Guest
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Home;
