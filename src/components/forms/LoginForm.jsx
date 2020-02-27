import React from 'react'
import Login from './Login'
import { Flex, Box, Text } from '@chakra-ui/core'

class LoginForm extends React.Component{

  render(){
  return (
    <>
    <Flex justify='center' align='center' mt='20'>
      <Box  maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden" p='6'd='flex' justifyContent='center' alignItems="center" flexDirection='column'>
      <Text fontSize="30px" color="pink.400" mb='10'>Login Form</Text>
    <Login />
    </Box>
    </Flex>
    </>
    )}
}

export default LoginForm