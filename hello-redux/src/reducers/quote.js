import { LOAD_QUOTE_FULFILLED, LOAD_QUOTE_PENDING, LOAD_QUOTE_REJECTED } from '../constants'

const initialState = {
  isLoading: false,
  error: null,
  quoteData: ''
}

const quote = (state=initialState, action={}) => {
  switch(action.type) {
    case LOAD_QUOTE_FULFILLED:
      return {
        isLoading: false,
        error: null,
        quoteData: action.payload.data.quote
      }
    case LOAD_QUOTE_PENDING:
      return {
        isLoading: true,
        error: null,
        quoteData: ''
      }
    case LOAD_QUOTE_REJECTED:
      return {
        isLoading: false,
        error: action.payload.message,
        quoteData: ''
      }
    default: 
      return state
  }
}

export default quote