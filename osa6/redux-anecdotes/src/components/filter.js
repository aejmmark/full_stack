import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const filterAnecdotes = (event) => {
    event.preventDefault()
    const filter = event.target.value
    props.setFilter(filter)
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

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = {
  setFilter
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Filter)