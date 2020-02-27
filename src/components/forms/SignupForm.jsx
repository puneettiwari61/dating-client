import React from 'react'
import Password from './Password'
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Box,
  Button,
  Text
} from "@chakra-ui/core";

import axios from 'axios'



 class SignupForm extends React.Component {
  constructor(){
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      error: ''
    }
  }

 handleClick = (event) => {
   event.preventDefault()
   let {name, email, password} = this.state
  axios.post("/api/signup",
  {name, email, password}
  ).then(res => {
    if(res.data.success){
      console.log(res.data,'success')
    }
    else if(res.data.success===false){
      this.setState({error:res.data.error.message|| res.data.error.errmsg})
    }
  }).catch(error => console.error(error))
  this.setState({name:'', email:'', password:''})
}


  render() {
  return (
    <>
    <form action="">
      <Box d='flex' justifyContent='center' alignItems="center" mt='20' >
        <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden" p='6'd='flex' justifyContent='center' alignItems="center" flexDirection='column' >
        <Text fontSize="30px" color="pink.400" mb='10'>Registration Form</Text>
          <FormControl isRequired mt='5'>
            <FormLabel htmlFor="fname">Full Name</FormLabel>
            <Input id="fname" aria-describedby="fname helper text" value={this.state.name} onChange={(event) => this.setState({name:event.target.value})} />
            <FormHelperText id="fname helper text" >
              Let all of us know your sweet name
  </FormHelperText>
          </FormControl>
          <FormControl isRequired mt='5'>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input type="email" id="email" aria-describedby="email-helper-text" value={this.state.email} onChange={(event) => this.setState({email :event.target.value})}  autoComplete="false" />
            <FormHelperText id="email-helper-text">
              We'll never share your email.
  </FormHelperText>
          </FormControl>
          <FormControl isRequired mt='5'>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Password value={this.state.password} onChange={(event) => this.setState({password:event.target.value})}  />
            <FormHelperText id="password helper text" >
              Minimum six characters
  </FormHelperText>
          </FormControl>
          <Button mt={4} variantColor="teal" type="submit" bg="pink.500" onClick={this.handleClick}>
            Submit
          </Button>
          <Text color='red.400' textAlign="center">{this.state.error}</Text>
        </Box>
      </Box>
      </form>
    </>
  )}
}

export default SignupForm