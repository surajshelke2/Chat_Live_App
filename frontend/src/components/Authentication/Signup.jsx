import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast
} from "@chakra-ui/react";

import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setREpassword] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [pic, setPic] = useState("");
  const [loading, setpicLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate(); 

  const handleClick = () => setShow(!show);
  const handleClick1 = () => setShow1(!show1);

  const postDetails = async (pics) => {
    setpicLoading(true);

    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'chit-chat');
      data.append('cloud_name', 'dt5c3wwys');

      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dt5c3wwys/image/upload', {
          method: 'POST',
          body: data,
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const result = await response.json();
        setPic(result.url.toString());
        console.log(result.url.toString());
        setpicLoading(false);
      } catch (error) {
        console.error(error);
        setpicLoading(false);
        toast({
          title: 'An error occurred.',
          description: 'Unable to upload.',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'bottom',
        });
      }
    } else {
      toast({
        title: 'Invalid file format.',
        description: 'Please upload a valid JPEG or PNG image.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom',
      });
      setpicLoading(false);
      return;
    }
  };

  const handleSignUp = async () => {
    setpicLoading(true);

    if (!name || !password || !email || !repassword) {
      toast({
        title: 'Fields Should not be empty',
        description: 'Please Fill all the fields.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom',
      });
      setpicLoading(false);
      return;
    }

    if (password !== repassword) {
      toast({
        title: 'Password not Matched !!',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom',
      });
      setpicLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      };      

      const { data } = await axios.post("http://localhost:5000/api/user/register", {
        name, email, password, pic
      }, config);

      toast({
        title: 'REGISTRATION SUCCESSFUL !!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setpicLoading(false);
      navigate('/chats')

    } catch (error) {

      console.error("Error:", error);
      if (error.response) {
        console.error("Response Data:", error.response.data);
      }

      toast({
        title: 'Error Occurs',
        description: error.response.data.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom',
      });
      setpicLoading(false);
    }
  };

  return (
    <>
      <form>
        <FormControl mb={4} isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl mb={4} isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl mb={4} isRequired>
          <FormLabel>Confirm</FormLabel>
          <InputGroup>
            <Input
              type={show1 ? "text" : "password"}
              placeholder="Confirm your password"
              value={repassword}
              onChange={(e) => setREpassword(e.target.value)}
            />

            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick1}>
                {show1 ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl mb={4} isRequired>
          <FormLabel>Profile Picture</FormLabel>
          <Input type="file" accept="image/*" onChange={(e) => postDetails(e.target.files[0])} />
        </FormControl>

        <Button type="submit" colorScheme="teal" width="full" onClick={handleSignUp} isLoading={loading}>
          Sign Up
        </Button>
      </form>
    </>
  );
};

export default Signup;
