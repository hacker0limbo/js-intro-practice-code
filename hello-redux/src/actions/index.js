import axios from 'axios'
import { 
  INCREMENT, 
  DECREMENT, 
  FETCH_USER_SUCCESS, 
  FETCH_USER_REQUEST, 
  FETCH_USER_FAILURE,
  LOAD_QUOTE,
} from '../constants'

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

export const getUser = () => {
  return dispatch => {
    // 发出一个请求
    dispatch(fetchUserRequest())

    // 请求被发出
    axios.get('https://randomuser.me/api/')
      .then(res => {
        dispatch(fetchUserSuccess(res.data.results[0]))
      }).catch(error => {
        // 请求失败
        dispatch(fetchUserFailure(error.response.data))
      })
      
  }
}

export const fetchUserSuccess = userData => {
  // user 是个对象
  return {
    type: FETCH_USER_SUCCESS,
    userData
  }
}

export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST
  }
}

export const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    error
  }
}

export const getQuote = () => {
  return {
    type: LOAD_QUOTE,
    payload: axios.get('https://api.kanye.rest')
  }
}