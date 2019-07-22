// actions 目录用于放置所有需要 dipatch 的 action, 均为 函数形式, 返回的是一个对象
import { INCREMENT, DECREMENT } from '../constants/index'

export const increment = () => {
  return {
    type: INCREMENT
  }
}

export const decrement = () => {
  return {
    type: DECREMENT
  }
}