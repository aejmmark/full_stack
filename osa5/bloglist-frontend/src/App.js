import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/Loginform'
import BlogForm from './components/Blogform'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const visibilityRef = useRef()

  const createBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      handleMessage(`${createdBlog.title} added`)
      setBlogs(
        blogs.concat(createdBlog)
          .sort((first, second) => second.likes - first.likes)
      )
      visibilityRef.current.toggleVisibility()
    } catch (exception) {
      handleMessage('invalid blog')
    }
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      handleMessage(`${user.username} logged in`)
    } catch (exception) {
      handleMessage('invalid credentials')
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    handleMessage('logged out')
  }

  const handleMessage = (input) => {
    setMessage(input)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLike = async (blog) => {
    try {
      const response = await blogService.update(blog.id, blog)
      const updatedBlogs = blogs.map(elem => elem.id === blog.id ? response : elem)
      setBlogs(updatedBlogs.sort((first, second) => second.likes - first.likes))
    } catch (exception) {
      console.log('like failed')
    }
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        const updatedBlogs = blogs.filter(elem => elem.id !== blog.id)
        setBlogs(updatedBlogs.sort((first, second) => second.likes - first.likes))
      } catch (exception) {
        console.log('remove failed')
      }
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      {message !== null && <Notification message={message}></Notification>}
      {user === null ?
        <LoginForm handleLogin={handleLogin}>
        </LoginForm>
        :
        <>
          <p>{user.username} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <p></p>
          <Togglable buttonLabel='new blog' ref={visibilityRef}>
            <BlogForm createBlog={createBlog} user={user}>
            </BlogForm>
          </Togglable>
        </>
      }
      <h2>blogs</h2>
      {blogs
        .sort((first, second) => second.likes - first.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog}
            handleLike={handleLike} handleRemove={handleRemove}
            user={user}/>
        )}
    </div>
  )
}

export default App