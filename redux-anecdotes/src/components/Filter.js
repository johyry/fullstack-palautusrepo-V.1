import React from 'react'
import { connect } from 'react-redux'
import { newFilter } from '../reducers/filterReducer'
const Filter = (props) => {
  const setFilter = (value) => {
    props.newFilter(value)
    console.log(value)
  }
  return (
    <form>
        Filter <input onChange={({ target }) => setFilter(target.value)}/>
    </form>
  )
}

const mapDispatchToProps = {
  newFilter
}

const ConnectedFilter = connect(
  null,
  mapDispatchToProps
)(Filter)
export default ConnectedFilter