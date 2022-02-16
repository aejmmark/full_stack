import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'ADD_BLOG':
      return state.concat(action.data)
    case 'ADD_LIKE':
      return state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      )
    case 'REMOVE_BLOG':
      return state.filter((blog) => blog.id !== action.data)
    case 'SORT_BLOGS':
      return state.sort((first, second) => second.likes - first.likes)
    default:
      return state
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
    dispatch({
      type: 'SORT_BLOGS',
    })
  }
}

export const addBlog = (newBlog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(newBlog)
    dispatch({
      type: 'ADD_BLOG',
      data: createdBlog,
    })
    dispatch({
      type: 'SORT_BLOGS',
    })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update(blog.id, blog)
    dispatch({
      type: 'ADD_LIKE',
      data: likedBlog,
    })
    dispatch({
      type: 'SORT_BLOGS',
    })
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog.id,
    })
  }
}

export default blogsReducer
