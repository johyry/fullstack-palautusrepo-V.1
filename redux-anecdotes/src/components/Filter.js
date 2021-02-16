import React from 'react'
import { useDispatch } from 'react-redux'
import { newFilter } from '../reducers/filterReducer'
const Filter = () => {
  const dispatch = useDispatch()
  const setFilter = (value) => {
    dispatch(newFilter(value))
    console.log(value)
  }
  return (
    <form>
        Filter <input onChange={({ target }) => setFilter(target.value)}/>
    </form>
  )
}

export default Filter