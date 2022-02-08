const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      return state.map(anecdote => anecdote.id === action.data.id
      ? {content: anecdote.content, id: anecdote.id, votes: anecdote.votes + 1}
      : anecdote
      )
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    default:
      return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export const handleVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export default anecdoteReducer