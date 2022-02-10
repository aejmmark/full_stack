const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    default:
      return state
  }
}

export const addNotification = (message, timer) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message: message
    })
    const timeout = timer * 1000
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        message: ''
      })
    }, timeout)
  }
}

export default notificationReducer
