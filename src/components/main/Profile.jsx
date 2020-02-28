import  React from 'react'
import Update from './Update'
import { Box, Image } from '@chakra-ui/core'
import axios from 'axios'

class Profile extends React.Component{
  constructor(){
    super()
    this.state ={
      src: 'https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    }
  }
  // componentDidMount(){
  //   axios.get('/api/user', {headers: {"authorization":localStorage.token}})
  //   .then(res => {
  //     this.setState({user:res.data.user}
  //       )
  //     })
  //   .catch(error => console.log(error))
  // }



  render(){
    return(
      <>
      <h1>This is profile</h1>
      <Box d='flex' justifyContent='center' alignItems='center' flexDirection='column'>
      <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden" p='6' d='flex' justifyContent='center' alignItems="center" flexDirection='column' >
      <Update user={this.props.user && this.props.user} updateImage={this.props.updateImage} />
      {/* <Image src={this.state.src} /> */}
      </Box>
      </Box>
      </>
    )
  }
}


export default Profile

