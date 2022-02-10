import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const newAnecdote = { content, votes: 0 }
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const addVote = async (id) => {
  const url = baseUrl + `/${id}`
  const anecdote = await axios.get(url)
  const editedAnecdote = {
    content: anecdote.data.content,
    id: anecdote.data.id,
    votes: anecdote.data.votes + 1,
  }
  const response = await axios.put(url, editedAnecdote)
  return response.data
}

export default { getAll, createNew, addVote }
