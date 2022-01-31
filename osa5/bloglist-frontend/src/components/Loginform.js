import React, {useState} from 'react'

const LoginForm = ({handleLogin}) => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  
  const submitLogin = (event) => {
    event.preventDefault()
    handleLogin({
      username: username,
      password: password
    })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={submitLogin}>
      <div>
        username
          <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm