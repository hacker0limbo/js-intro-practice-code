import React from 'react'
import { Prompt } from "react-router-dom"

class About extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  render() {
    return (
      <div>
        <p>About Page</p>
        <input 
          value={this.state.name} 
          type="text" 
          onChange={e => this.setState({ name: e.target.value })} 
        />
      </div>
    )
  }
}

export default About
