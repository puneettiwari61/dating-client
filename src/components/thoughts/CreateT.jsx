import React, { Component } from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Flex,
  Input,
  Button,
  Textarea,
  Text,
  Box,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionIcon,
  AccordionPanel
} from "@chakra-ui/core";
import axios from 'axios';

class CreateT extends Component {
  constructor() {
    super()
    this.state = {
      topic : '',
      desc: '',
      thoughts: null
    }
  }

  componentDidMount(){
    axios.get('/api/user/thoughts')
    .then(res => {
      this.setState({
        thoughts: res.data.thoughts
      })})
    .catch(err => console.log(err))
  }

  submitThought = (e) => {
    e.preventDefault();
    
   let  {topic, desc} = this.state
    axios.post('/api/user/thoughts', {topic,desc},{headers: {"authorization":localStorage.token}})
    .then(res => console.log(res.data))
    .catch(err => console.log(err))

    axios.get('/api/user/thoughts')
    .then(res => {
      this.setState({
        thoughts: res.data.thoughts
      })})
    .catch(err => console.log(err))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {
    return (
      <>
      <Flex justify='flex-end' align='flex-start' pl={20}>
      <Flex justify='center' mt='20' direction='column' align='center' position='fixed' left='20'>
             <Box> <Text fontSize='30px' >Welcome {this.props.user && this.props.user.name}</Text></Box>
        <form action="">
          <FormControl mt='6' isRequired>
            <FormLabel htmlFor="thoughts">Topic</FormLabel>
            <Input name='topic'  type="text" id="thoughts" aria-describedby="thoughts-helper-text" onChange={this.handleChange} />
            <FormHelperText id="thoughts-helper-text">
              What are you wondering about?
          </FormHelperText>
          </FormControl>
          <FormControl mt='6' isRequired>
            <FormLabel htmlFor="desc">Your thoughts</FormLabel>
            <Textarea name='desc' type="text" id="desc" aria-describedby="desc-helper-text" width='500px' height='100px' resize='none' onChange={this.handleChange}  />
            <FormHelperText id="desc-helper-text">
              Let all of us know your thoughts
          </FormHelperText>
          </FormControl>
          <Button type="submit" size="md" height="48px" width="200px" border="2px" borderColor="pink.500" onClick={this.submitThought} >
            Button
          </Button>
        </form>
      </Flex>
      <Flex justify='center' align='center'>
      <Accordion>
      {this.state.thoughts && this.state.thoughts.map(t => {
        return(
        <AccordionItem mt='10' pb='5'>
          <AccordionHeader>
            <Box flex="1" textAlign="left" width='600px' fontSize='30px'>
              {t.topic}
            </Box>
            <Box flex="1" textAlign="left" fontSize='20px'>
              {t.author.name}
            </Box>
            <AccordionIcon />
          </AccordionHeader>
          <AccordionPanel pb={4}>
          {t.desc}
          </AccordionPanel>
        </AccordionItem>)
      })}
      </Accordion>
      </Flex>
      </Flex> 
      </>
    )
  }

}


export default CreateT