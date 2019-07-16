import React, { Component } from 'react'
import Header from './components/Header'
import Home from './components/Home'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      homeLink: "Header Home"
    }
  }

  onGreet(age) {
    alert(age)
  }

  onChangeHomeLink(newHomeLink) {
    // newHomeLink 即为子组件里面传递过来的数据, 使用 setState 更新保存在父组件里面的数据
    // 再使用 props 传递到同一个组件
    this.setState({
      homeLink: newHomeLink,
    })
  }

  render() {
    const user = {
      name: 'Anna',
      hobbies: ['Sports', 'Reading']
    }
    return (
      <div className="container">
        <Header homeLink={this.state.homeLink} />
        <hr />

        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <p>Hello</p>
          </div>
        </div>
        <hr />

        <Home 
          name={"Max"} 
          initialAge={12} 
          user={user}
          greet={this.onGreet}
          changeLink={this.onChangeHomeLink.bind(this)}
          initialLinkName={this.state.homeLink}
        >
          {/* 也可以传入一个子节点, 这里注意如果添加了类型限制那么传递过来的只能是一个元素 */}
          <div>
            <p>I am child1</p>
            <p>I am child2</p>
          </div>
        </Home>
      </div>
    )
  }
}
