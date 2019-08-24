import { FETCH_USER_SUCCESS, FETCH_USER_REQUEST, FETCH_USER_FAILURE } from '../constants'

const initialState = {
  isFetching: false,
  error: null,
  userData: {}
}

const user = (state=initialState, action={}) => {
  switch(action.type) {
    case FETCH_USER_SUCCESS:
      return {
        isFetching: false,
        error: null,
        userData: action.userData
      }
    case FETCH_USER_REQUEST:
      return {
        isFetching: true,
        error: null,
        userData: {}
      }
    case FETCH_USER_FAILURE:
      return {
        isFetching: false,
        error: action.error,
        userData: {}
      }
    default: 
      return state
  }
}

export default user