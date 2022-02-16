let timeoutId = 0

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      clearTimeout(timeoutId)
      return action.data
    case 'REMOVE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (message, timer) => async (dispatch) => {
  dispatch({
    type: 'SET_NOTIFICATION',
    data: message,
  })
  const timeout = timer * 1000
  timeoutId = setTimeout(() => {
    dispatch({
      type: 'REMOVE_NOTIFICATION',
    })
  }, timeout)
}

export default notificationReducer
