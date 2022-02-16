import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notification'
import { Routes, Route, useMatch } from 'react-router-dom'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/Loginform'
import BlogForm from './components/Blogform'
import Notification from './components/Notification'
import { initBlogs, likeBlog, removeBlog, addBlog } from './reducers/blogs'
import { loginUser, logoutUser, returningUser } from './reducers/login'
import { initUsers } from './reducers/users'
import Users from './components/Users'
import Menu from './components/Menu'
import User from './components/User'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const logged = useSelector((state) => state.login)
  const users = useSelector((state) => state.users)
  const visibilityRef = useRef()
  const dispatch = useDispatch()

  const createBlog = async (newBlog) => {
    try {
      dispatch(addBlog(newBlog))
      dispatch(setNotification(`${newBlog.title} added`, 5))
      visibilityRef.current.toggleVisibility()
    } catch (exception) {
      dispatch(setNotification('invalid blog', 5))
    }
  }

  const handleLogin = async ({ username, password }) => {
    try {
      dispatch(loginUser(username, password))
      dispatch(setNotification(`${username} logged in`, 5))
    } catch (exception) {
      dispatch(setNotification('invalid credentials', 5))
    }
  }

  const handleLogout = async () => {
    dispatch(logoutUser())
    dispatch(setNotification('logged out', 5))
  }

  const handleLike = async (blog) => {
    try {
      dispatch(likeBlog(blog))
    } catch (exception) {
      console.log('like failed')
    }
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(removeBlog(blog))
      } catch (exception) {
        console.log('remove failed')
      }
    }
  }

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    dispatch(returningUser(loggedUserJSON))
  }, [])

  const match = useMatch('/users/:id')
  const user = match ? users.find((user) => user.id === match.params.id) : null

  return (
    <div>
      <Menu />
      <Notification />
      {logged === null ? (
        <LoginForm handleLogin={handleLogin}></LoginForm>
      ) : (
        <>
          <p>{logged.username} logged in</p>
          <button id="logout-button" onClick={handleLogout}>
            logout
          </button>
          <p></p>
          <Togglable buttonLabel="new blog" ref={visibilityRef}>
            <BlogForm createBlog={createBlog} user={logged}></BlogForm>
          </Togglable>
        </>
      )}
      <Routes>
        <Route path="/users/:id" element={<User user={user} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route
          path="/"
          element={
            <div id="blogs">
              <h2>blogs</h2>
              {blogs
                .sort((first, second) => second.likes - first.likes)
                .map((blog) => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    handleLike={handleLike}
                    handleRemove={handleRemove}
                    user={logged}
                  />
                ))}
            </div>
          }
        />
      </Routes>
    </div>
  )
}

export default App
