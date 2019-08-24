import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { increment, decrement } from './actions'
import User from './components/User'
import Quote from './components/Quote'

class App extends Component {

  render() {
    const { counter, increment, decrement } = this.props

    return (
      <div className="containter">
        <h1 className="jumbotron-heading text-center">{counter}</h1>
        <p className="text-center">
          <button onClick={() => increment()} className="btn btn-primary mr-2">Increase</button>
          <button onClick={() => decrement()} className="btn btn-danger my-2">Decrease</button>
        </p>
        <User />
        <Quote />
      </div> 
    )
  }
}

// 将 store 里面的 state 映射成 props, 传递到组件里
const mapStateToProps = state => {
  return {
    counter: state.counter
  }
}

// 验证
App.propTypes = {
  counter: PropTypes.number.isRequired,
}

// 使用 connect 连接到 store, 将 app 变成容器组件
export default connect(mapStateToProps, { increment, decrement })(App)