import React from 'react'
import { connect } from 'react-redux'
import { getUser } from '../actions'

const User = props => {
  const { getUser } = props
  const { userData, error, isFetching } = props.user

  let data
  if (error) {
    data = error
  } else if (isFetching) {
    data = 'Loading...'
  } else {
    data = userData.email
  }
  
  return (
    <div>
      <h1 className="jumbotron-heading text-center">{data}</h1>
      <p className="text-center">
        <button onClick={() => getUser()} className="btn btn-success mr-2">Get Random User</button>
      </p>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { getUser })(User)

