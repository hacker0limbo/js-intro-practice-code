const counter = (state=0, action={}) => {
  // counter 是一个 reducer, 参数为当前的 state 和 接受的 action, 产生一个新的 state(保持纯)
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default: return state
  }
}

export default counter