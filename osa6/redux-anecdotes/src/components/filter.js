import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const filterAnecdotes = (event) => {
    event.preventDefault()
    const filter = event.target.value
    dispatch(setFilter(filter))
  }

  return (
    <div>
      <h2>filter</h2>
      <form>
        <div><input name='filter' onChange={filterAnecdotes}/></div>
      </form>
      <p></p>
    </div>
  )
}

export default Filter