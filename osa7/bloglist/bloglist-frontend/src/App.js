import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notification'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/Loginform'
import BlogForm from './components/Blogform'
import Notification from './components/Notification'
import { initBlogs, likeBlog, removeBlog, addBlog } from './reducers/blogs'
import { loginUser, logoutUser, returningUser } from './reducers/user'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
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
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    dispatch(returningUser(loggedUserJSON))
  }, [])

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm handleLogin={handleLogin}></LoginForm>
      ) : (
        <>
          <p>{user.username} logged in</p>
          <button id="logout-button" onClick={handleLogout}>
            logout
          </button>
          <p></p>
          <Togglable buttonLabel="new blog" ref={visibilityRef}>
            <BlogForm createBlog={createBlog} user={user}></BlogForm>
          </Togglable>
        </>
      )}
      <h2>blogs</h2>
      <div id="blogs">
        {blogs
          .sort((first, second) => second.likes - first.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleRemove={handleRemove}
              user={user}
            />
          ))}
      </div>
    </div>
  )
}

export default App
