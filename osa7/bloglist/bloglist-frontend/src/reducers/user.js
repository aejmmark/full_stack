import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'REMOVE_USER':
      return null
    default:
      return state
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password,
    })
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      type: 'SET_USER',
      data: user,
    })
  }
}
export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'REMOVE_USER',
    })
  }
}

export const returningUser = (userJSON) => {
  return async (dispatch) => {
    if (userJSON) {
      const user = JSON.parse(userJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        data: user,
      })
    }
  }
}

export default userReducer
