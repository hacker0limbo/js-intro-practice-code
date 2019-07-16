# react 入门笔记

## this 绑定问题

当传递事件处理器, 或方法作为回调时, 上下文会丢失, 原因如下:

JSX 中的 HTML 标签本质上对应 React 中创建该标签的一个函数。比如你写的 div 编译会其实是 `React.createElement(‘div’)`. 所以当你书写 `<Input>` 时其实是调用了 `React.createElement` 来创建一个 `<Input>` 标签

```javascript
React.createElement(
  type,
  [props],
  [...children]
)
```

标签上的属性会作为 `props` 参数传递给 `createElement` 函数

`<Input onChange={this.toggleCheck}>` 表示将组件中的 `toggleCheck` 方法赋值给 `createElement` 的入参 `props`（`props` **是个对象，接收所有书写在标签上的属性**，），实际调用的时候一如上面所说的，调用的已经不是组件中的 `toggleCheck` 方法了

```javascript
React.createElement(type, props){
  // 让我们创建一个 <type> 并在 <type> 的值发生变化的时候调用一下 `props.onChange`
  ...
  props.onChange() // 上下文缺失
  ...
}
```

## 函数式组件

什么时候使用函数式(无状态组件)?
- 无需 state, 即不处理用户的输入, 组件的所有的数据都是依赖 props 传入
- 不需要用到生命周期函数

## 组件之间的通信

单向数据流: 数据的流向只能由父组件通过 props 将数据传递给子组件, 不能由子组件向父组件传递数据, 要想实现数据的双向绑定, 只能由子组件接收父组件 props 传过来的方法取改变父组件的数据, 而不能是直接将子组件的数据传递给父组件

### 父组件传递给子组件
使用 props

### 子组件传递给父组件
1. 父组件传递给子组件一个回调函数, 作为两个组件之间的通信
2. 传递过来的回调函数的参数即为子组件传递给父组件的数据

### 兄弟组件之间的传值
数据存储在父组件里面, 子组件1通过回调函数传递新数据给父组件(更新父组件里面原来保存的数据), 父组件使用 props 再将更新的数据传递给子组件2

## mvvm
- 单向绑定: model 绑定到 view 上, 当更新 model 时, view 自动更新
- 双向绑定: 更新了 view, model 上的数据也被更新了, 典型的例子是 表单

具体做法:
- 数据定义在父组件上, 使用 props 将数据传递给子组件, 同时传递一个回调函数作为组件之间的通信
- 子组件获取到父组件的数据后, 在传递过来的回调函数里使用`setState`更新传递过来的数据