import React from 'react'
import { BrowserRouter as Router, Route, NavLink, Switch, Link, Redirect } from 'react-router-dom'
import About from './components/About'
import Home from './components/Home'
import NoMatch from './components/Error'
import User from './components/User'

class App extends React.Component {

  handleClick() {

  }

  render() {
    return (
      <Router>
        <div className="App">
          <div>
            <ul>
              <li>
                <NavLink
                  to="/"
                  activeStyle={{
                    fontWeight: 'bold',
                    color: 'green'
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/user/js">js</NavLink>
              </li>
              <li>
                <Link
                  to={{
                    pathname: '/courses',
                    search: '?sort=name',
                    hash: '#the-hash',
                    state: { fromDashboard: true }
                  }}
                >
                  pro
                </Link>
              </li>
            </ul>
            <div>
              <button onClick={() => this.handleClick()}>push state</button>
            </div>
  
            <Switch>
              {/* 上面的内容在所有的路由里面均显示, 然后根据不同的 component 渲染不同的内容 */}
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route
                path="/new_home"
                render={props => (
                  <h1>
                    <Home {...props} />
                  </h1>
                )}
              />
              {/* 最后的默认路由, 当无法找到匹配的时候匹配该路径 */}
              <Route path="/user/profile/:name" component={User} />
              <Redirect from="/user/:name" to="/user/profile/:name" />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  
  }
}

export default App
