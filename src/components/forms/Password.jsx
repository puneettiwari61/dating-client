import React from 'react'
import {
  Input,
  Button,
  InputGroup,
  InputRightElement
} from "@chakra-ui/core";


function PasswordInput(props) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        type={show ? "text" : "password"}
        placeholder="Enter password"
        id="password"
        value= {props.value}
        onChange = {props.onChange}
        autoComplete="current-password"
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default PasswordInput