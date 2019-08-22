import { combineReducers } from 'redux'
import counter from './counter'
import user from './user'

// 使用 combineReducers 可以连接所有的 reducer
const rootReducer = combineReducers({
  counter,
  user,
})

export default rootReducer