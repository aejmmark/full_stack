const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const { body } = request
  const { user } = request

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request
  const { user } = request

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const blogToBeEdited = await Blog.findById(request.params.id)
  if (user._id.toString() !== blogToBeEdited.user.toString()) {
    return response.status(401).json({ error: 'blog does not belong to this user' })
  }

  const updated = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
  response.status(200).json(updated.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const { user } = request

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blogToBeEdited = await Blog.findById(request.params.id)
  if (user._id.toString() !== blogToBeEdited.user.toString()) {
    return response.status(401).json({ error: 'blog does not belong to this user' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter
