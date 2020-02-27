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

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      isLogged: false,
      user:null
    }
  }

  componentDidMount(){
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
</Route><Route path='/user'>
  <Main user={this.state.user} />
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
