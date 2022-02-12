import { useHistory } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/')
    props.handleNotification(`a new anecdote ${content.value} created!`)
  }

  const handleReset = (event) => {
    event.preventDefault()
    content.clear()
    author.clear()
    info.clear()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} clear='' />
        </div>
        <div>
          author
          <input {...author} clear='' />
        </div>
        <div>
          url for more info
          <input {...info} clear='' />
        </div>
        <button>create</button>
        <button onClick={(event) => handleReset(event)}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew