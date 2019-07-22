# Redux 入门

reduce 归纳

## 基本概念

- `createStore(fn)`返回 store 对象, 保存了所有的数据
- 使用 `store.getState()`可以获取某个时间段的 state
- 一个 state 对应一个 view
- 用户的操作会导致 view 变化, view 变化会导致 state 变化
- 接上条, 当 view 变化时候, 可以由 view 发出通知(action), action 可以用于通知改变 state
- 使用`store.dispatch(action)`可以让 view 发出 action 给 store
- store 收到 action 以后会计算出新的 state, 该过程叫作 reducer
- 因此 store 需要知道 reducer 函数, 做法为将 reducer 传入`createStore(reducer)`方法
- reducer 必须是一个纯函数, 不能改变 state, 需要返回一个全新的对象
- `store.subscribe(listerner)`方法设置监听函数, 可以在 state 发生变化的时候自动执行里面的函数(listener)
- 因此只要将`render()`方法或者`setState`方法传入, 就可以在 state 变化的时候自动渲染
- `combineReducers()`可以对 reducer 进行拆分, 对于不同的 action 修改不同 state 属性可以写成不同的函数, 然后通过该方法将所有的 reducer 组合成最终的大的 reducer

## 工作流程

```javascript
// 传入 reducer, 创建 store 存放数据
store = createStore(reducer)
// 用户触发了一些事件改变了 view, 导致触发 action, 传递给 store
store.dispatch(action)
// store 自动调用 reducer, 并传入两个参数: 当前 state 和 收到的 action, reducer 会返回新的 state
// 这里的 todoApp 就是一个 reducer, 返回 nextState 为新的 state, todoApp 可以传入到 createStore 
// reducer 的操作为异步操作
let nextState = todoApp(previousState, action);
// state 变化以后, 设置监听函数可以更新相应的 view
store.subscribe(listener)
// listener 一般为 render 函数, 或者 setState
// 可以通过 store.getState() 得到当前状态
function listener() {
  let new State = store.getState()
  component.setState(newState)
}
```

1. 回调通知 state => action
2. 根据回调处理(等同于父级方法) => reducer
3. 存储 state(等同于总状态) => store

## react-redux

connect 方法: 从 ui 组件生成容器组件, 将两种组件连接起来
- mapStateToProps(数据绑定): 将 state 映射到 ui 组件的参数, 传进 ui 组件
- mapDispatchToProps(事件绑定): 子组件里的回调函数, 用于将用户的 ui 操作映射成 action, 从 ui 组件里面传出去(无需手动 dispatch(action))

<Provider>组件: connect 连接以后, 需要让生成的容器组件拿到 state 对象, 有 store 属性, 会将 state 分发给所有被 connect 的组件
