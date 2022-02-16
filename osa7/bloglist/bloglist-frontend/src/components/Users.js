import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  if (!users) {
    return null
  }

  return (
    <div id="users">
      <h2>Users</h2>
      Name: &emsp; &emsp; Added blogs:
      {users
        .sort((first, second) => second.blogs.length - first.blogs.length)
        .map((user) => (
          <p key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link> &emsp; &emsp;{' '}
            {user.blogs.length}
          </p>
        ))}
    </div>
  )
}

export default Users
