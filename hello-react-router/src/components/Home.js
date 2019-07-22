import React from "react"
import { withRouter } from "react-router-dom"

const Hello = (props) => {
  // 如果单纯使用的是函数组件, 由于没有在 route 里面被传递参数, props 属性为空
  // 因此需要使用 withRouter 来包装
  return (
    <div><button onClick={() => props.history.push('/about')}>Hello push me</button></div>
  )
}

const WithRouterHello = withRouter(Hello)

const Home = (props) => {
  console.log(props)
  return (
    <div>
      <button onClick={() => props.history.push('/about')}>Click me</button>
      <p>Home Page</p>
      <WithRouterHello />
    </div>
  )
}

export default Home