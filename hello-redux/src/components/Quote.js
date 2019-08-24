import React from 'react'
import { connect } from 'react-redux'
import { getQuote } from '../actions'

const Quote = props => {
  const { getQuote } = props

  const { quoteData, error, isLoading } = props.quote

  let data
  if (error) {
    data = error
  } else if (isLoading) {
    data = 'Loading...'
  } else {
    data = quoteData
  }

  return (
    <div>
      <h1 className="jumbotron-heading text-center">{data}</h1>
      <p className="text-center">
        <button onClick={() => getQuote()} className="btn btn-info mr-2">Get Random Quote</button>
      </p>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    quote: state.quote
  }
}

export default connect(mapStateToProps, { getQuote })(Quote)