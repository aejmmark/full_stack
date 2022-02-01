import React from 'react'

const Notification = ({ message }) => {
  const success = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const error = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (message.includes('invalid')) {
    return (
      <div style={error}>
        {message}
      </div>
    )
  } else {
    return (
      <div style={success}>
        {message}
      </div>
    )
  }
}

export default Notification
