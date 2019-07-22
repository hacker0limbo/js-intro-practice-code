# 学习 react-router

## 基本概念
- Router 作为顶级组件, 里面的`<route />`可以根据给定的组件访问不同的页面
- `<Link>`为一个 a 标签, 可以点击访问到对应的路由

匹配规则:
```javascript
<Route path="/" component={Home} /> 
<Route path="/about" component={About} /> 
<Route path="/about/new" component={About} /> 
```
如上, 那么访问 `/about` 页面的时候会渲染 About 组件和 Home 组件, 这是由于 `/about` 包含`/`, 同理访问`/about/new`会渲染 Home, About, About 组件

使用 Route 里面的 `exact` 属性可以精确匹配, 一般在短的路由前面加上

404 页面可以不添加路径, 作为最后的默认匹配, 所有的 route 要放在 <Switch> 组件里面

<Route> 里面的 render 属性可以直接在行内渲染一个组件, 并且支持将该组件内的 props 传递下去

<Link> 的 props 可以传递一个对象, 进行更加精确的路径的定向

<NavLink> 是 <Link> 的特殊版本, 可以添加样式等其他的 props

有些组件不在 <Route> 里面调用因此无法获得传递的 props 参数, 此时使用 withRouter 可以将没有 props 属性的组件包装一下, 传递进 props 属性