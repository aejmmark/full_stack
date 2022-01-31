import React, {useState} from 'react'
const Blog = ({blog, handleLike, user, handleRemove}) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const submitLike = () => {
    const updatedBlog = ({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    })
    handleLike(updatedBlog)
  }

  return (
    <div style={blogStyle}>
    {expanded ?
    <>
    <button onClick={() => setExpanded(false)}>collapse</button>
    <p>{blog.title}</p>
    <p>{blog.author}</p>
    <p>{blog.url}</p>
    <p>{blog.likes}</p>
    <button onClick={() => submitLike()}>like</button>
    {user !== null && user.id === blog.user ? <button onClick={() => handleRemove(blog)}>remove</button> : <></>}
    </>
    :
    <>
    <p>{blog.title}</p><button onClick={() => setExpanded(true)}>expand</button>
    </>
    }
    </div>
  )
}

export default Blog