import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Show,
} from "@chakra-ui/react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setREpassword] = useState("");
  const [show, setShow] = React.useState(false);
  const [show1, setShow1] = React.useState(false);
  const [pic, setPic] = useState(second)

  const handleClick = () => setShow(!show);
  const handleClick1 = () => setShow(!show1);

  const postDetails =(pics)=>{
    
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    // Add logic for form submission or API call
  };

  return (
    <>
      <form onSubmit={handleSignUp}>
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
              placeholder="Confrim your password"
              value={repassword}
              // onChange={(e) => setPassword(e.target.value)}
            />

            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick1}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl mb={4} isRequired>
          <FormLabel>Profile Picture</FormLabel>
          <Input type="file" accept="image/*"
          onChange={(e)=>posProfile(e.target.value)}
           />
        </FormControl>


        <Button type="submit" colorScheme="teal" width="full">
          Sign Up
        </Button>
      </form>
    </>
  );
};

export default Signup;
