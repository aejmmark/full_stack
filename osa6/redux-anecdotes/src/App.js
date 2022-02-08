import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'
import AnecdoteForm from './components/anecdoteForm'
import AnecdoteList from './components/anecdoteList'
import Notification from './components/notification'
import Filter from './components/filter'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAll().then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
    }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App