const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users.map((user) => user.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const { body } = request
  if (!body.password || body.password.length < 3) {
    return response.status(400).json({
      error: 'invalid password',
    })
  }
  if (!body.username || body.username.length < 3) {
    return response.status(400).json({
      error: 'invalid username',
    })
  }
  const usernameTaken = await User.find({ username: body.username })
  if (usernameTaken.length > 0) {
    return response.status(400).json({
      error: 'username taken',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter
