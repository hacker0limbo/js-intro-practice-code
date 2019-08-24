export const logger = store => next => action => {
  // 拦截 action, 开始调用该中间件
  console.log('dispatching', action)
  let result = next(action)
  // 中间件调用完毕, 转移到 reducer, 开始计算 store, 得到新的 state
  console.log('next state', store.getState())
  return result
}

export const error = store => next => action => {
  try {
    next(action)
  } catch (e) {
    console.log('error', e)
  }
}

