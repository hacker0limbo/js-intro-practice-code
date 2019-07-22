import React from "react"
import { Redirect } from "react-router-dom";

const User = (props) => {
  const params = new URLSearchParams(props.location.search)
  console.log(params.get("name"))
  return (
    props.match.params.name === '1' ?
    <Redirect to="/" /> :
    <div>User Page {props.match.params.name}</div>
  )
}

export default User