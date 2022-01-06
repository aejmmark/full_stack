const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.listWithSixBlogs)
})

describe('when initial blogs exist', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.listWithSixBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map((r) => r.title)
    expect(titles).toContain(
      'Type wars',
    )
  })

  test('the blogs contain an id field', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    await api
      .post('/api/blogs')
      .send(helper.listWithOneBlog[0])
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.listWithSixBlogs.length + 1)

    const titles = blogsAtEnd.map((n) => n.title)
    expect(titles).toContain(
      'Go To Statement Considered Harmful',
    )
  })

  test('sets likes to 0 by default', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    }

    await api
      .post('/api/notes')
      .send(newBlog)

    const blogsAtEnd = await helper.blogsInDb()
    const likes = blogsAtEnd.map((n) => n.likes)
    expect(likes).toContain(
      0,
    )
  })

  test('fails without a title or an url', async () => {
    const newBlog = {
      author: 'Edsger W. Dijkstra',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('when editing an existing blog', () => {
  test('changing values succeeds with valid data', async () => {
    const newBlog = {
      title: 'Bobs Bean Blog',
      author: 'Bob',
      url: 'http://www.bobsbeanblog.html',
    }
    const response = await api.get('/api/blogs')
    const { id } = response.body[0]

    await api
      .put(`/api/blogs/${id}`)
      .send(newBlog)
      .expect(200)
  })

  test('deleting is succesful', async () => {
    const response = await api.get('/api/blogs')
    const { id } = response.body[0]

    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
