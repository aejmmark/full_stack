import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notification'
import blogsReducer from './reducers/blogs'
import loginReducer from './reducers/login'
import usersReducer from './reducers/users'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    login: loginReducer,
    users: usersReducer,
  },
})

export default store
