import React, { Component } from 'react'
import loading from './loading.gif'
export class spinner extends Component {
  render() {
    return (
      <div className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
        <img src={loading} alt="loading"></img>
      </div>
    )
  }
}

export default spinner
