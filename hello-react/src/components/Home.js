import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      age: this.props.initialAge,
      status: 0,
      homeLink: this.props.initialLinkName
    }

    // 局部更新, 只会更新 status 有关的 dom
    setInterval(() => {
      this.setState({
        status: this.state.status + 1
      })
    }, 1000)
  }

  handleGreet() {
    // 调用父组件传递过来的函数
    this.props.greet(this.state.age)
  }

  onMakeOlder() {
    this.setState({
      age: this.state.age + 1
    })
  }

  onChangeLink() {
    // 通过父组件里面传递的 changeLink 函数进行通信, 传递的数据即为定义在自己内部的 homeLink 属性
    this.props.changeLink(this.state.homeLink)
  }

  onHandleChange(event) {
    // input 框里获取到用户输入的数据, 并使用 setState 更新数据, 然后 onChangeLink 会将更新数据传递给父组件
    this.setState({
      homeLink: event.target.value,
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <h1>Home</h1>
            <div>your name is {this.props.name}, your age is {this.state.age}</div>
            <p>Counter: {this.state.status}</p>

            {/* 或者使用 es6 的箭头函数 {() => this.onMakeOlder()} */}
            <button onClick={this.onMakeOlder.bind(this)} className="btn btn-primary">Make me older</button>
            <hr />
            <button onClick={this.handleGreet.bind(this)} className="btn btn-success">Greet</button>
            <hr />
            {/* mvvm 的 input 框, 用户可以输入改变 view */}
            <input
              type="text"
              value={this.state.homeLink}
              onChange={(event) => this.onHandleChange(event)}
            />
            <button onClick={() => this.onChangeLink()} className="btn btn-warning">Change Header Link</button>
            <div>
              <h5>hobbies</h5>
              <ul>
                {/* 可以使用 map 进行枚举, 返回子元素 */}
                {this.props.user.hobbies.map((hobby, index) => <li key={index}>{hobby}</li>)}
              </ul>
            </div>
            {/* 使用 this.props.children 获取传递过来的子元素 */}
            <div>{this.props.children}</div>
          </div>
        </div>
      </div>
    )
  }
}

// 使用 proTypes 可以检查父组件传递给子组件的类型
Home.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  user: PropTypes.object,
  greet: PropTypes.func,
  initialLinkName: PropTypes.string,
  // 保证传递过来的子元素只包含一个元素
  children: PropTypes.element.isRequired
}

