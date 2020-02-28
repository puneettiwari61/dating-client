import React from 'react'
import { Flex, Box, Text } from '@chakra-ui/core'
import { NavLink } from 'react-router-dom'
// import { color } from 'styled-system'

const handleLogout = (logout) => {
  logout()
  localStorage.removeItem('token');
  window.location.href = '/login'
}

function Navbar(props) {
  return (
    <Flex align="center" justify="space-between" bg="pink.200">
      <Flex>
        <Text p='6' fontSize='3xl'>
          <NavLink to='/' exact activeStyle={{ textDecoration: "underline" }}>Home</NavLink>
        </Text>
      </Flex>
      <Box d="flex" justifyContent="space-around" width='30%'>
        <Flex>
          <Text fontSize='3xl'>
            {!props.isLogged? <NavLink to='/signup' exact activeStyle={{ textDecoration: "underline" }}>Register</NavLink> : <NavLink to='/profile' exact activeStyle={{ textDecoration: "underline" }}>Profile</NavLink>} 
          </Text>
        </Flex>
        <Flex>
          <Text fontSize='3xl'>
            {!props.isLogged ? <NavLink to='/login' activeStyle={{ textDecoration: "underline" }}>Login</NavLink> : <NavLink to="/logout" activeStyle={{ textDecoration: "underline" }} onClick={()=> handleLogout(props.handleLog)}>Logout</NavLink>}
          </Text>
        </Flex>
      </Box>
    </Flex>
  )
}


export default Navbar