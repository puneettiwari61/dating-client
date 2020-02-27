import React from 'react'


class Main extends React.Component{
  
  render(){
    return(
      <>
  <h1>Welcome {this.props.user && this.props.user.name}</h1>
        </>
    )
  }

} 


export default Main