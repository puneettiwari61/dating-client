import React from 'react';
import './App.css';
import { ThemeProvider, CSSReset} from '@chakra-ui/core'
import SignupForm from '../src/components/forms/SignupForm'
import Navbar from '../src/components/navigation/Navbar'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Home from '../src/components/home/Home'
import LoginForm from './components/forms/LoginForm'
import Main from './components/main/Main'
import axios from 'axios'
import Profile from './components/main/Profile'
// import socketIOClient from "socket.io-client";
// import io from 'socket.io-client';




import CreateT from './components/thoughts/CreateT'




class App extends React.Component {

  constructor(){
    super()
    this.state = {
      isLogged: false,
      user:null
    }
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        var lat = position.coords.latitude
        var long = position.coords.longitude
        axios.put('/api/user/location',{coordinates: [long, lat]},{headers: {"authorization":localStorage.token}})
        .then(res => console.log(res.data))
        .catch(error => console.log(error), 'post location')
      })
    } }
  // "proxy": "http://localhost:3001",
    queryLocation = () => {
      axios.get('/api/user/location',{headers: {"authorization":localStorage.token}})
      .then(res => console.log(res.data, 'query'))
      .catch(error => console.log(error))
    }

  componentDidMount(){
    // console.log(process.env.SERVER)
    this.getLocation()
    this.queryLocation()
    axios.get('/api/user', {headers: {"authorization":localStorage.token}})
    .then(res => {
      this.setState({user:res.data.user}
        )
      })
    
    .catch(error => console.log(error))
    if(localStorage.token ){
      this.setState({isLogged:true})
    }
  }

  handleLogout = () => {
    this.setState({isLogged:false})
  }
  updateImage = (url) => {
    this.setState(state => {
      return {
        user:{
          ...state.user,
          image: url
        }
      }
    })
  }

publicRoutes = () => {
  return <>
  <Route path='/' exact>
    <Home />
  </Route>
  <Route path='/signup'>
  <SignupForm />
  </Route>
  <Route path='/login'>
  <LoginForm />
  </Route>
  </>
}

protectedRoutes = () => {
  
  return <>
  <Route path='/' exact>
  <Home />
  </Route>
  <Route path='/user'>
  <Main user={this.state.user} />
  </Route>
  <Route path='/profile'>
  <Profile user={this.state.user} updateImage={this.updateImage} />
  </Route>
    <Route path='/thoughts'>
    <CreateT user={this.state.user} />
    </Route>
    </>  

}
  render(){
  return (
    <ThemeProvider>
      <CSSReset />
      <Router>
      <Navbar isLogged={this.state.isLogged} handleLog = {this.handleLogout} />
      {this.state.isLogged ? this.protectedRoutes() : this.publicRoutes()}
      </Router>
    </ThemeProvider>
  )}
}

export default App;
