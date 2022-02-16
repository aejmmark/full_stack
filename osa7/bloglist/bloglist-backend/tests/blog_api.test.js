const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

let token = ''

beforeEach(async () => {
  jest.setTimeout(30000)
  await Blog.deleteMany({})
  await User.deleteMany({})

  await Blog.insertMany(helper.listWithSixBlogs)

  const passwordHash = await bcrypt.hash('password', 10)
  const user = new User({ username: 'userOne', passwordHash })
  await user.save()

  const response = await api.post('/api/login').send(helper.userOne)
  token = `bearer ${response.body.token}`
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
    expect(titles).toContain('Type wars')
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
      .set('Authorization', token)
      .send(helper.listWithOneBlog[0])
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.listWithSixBlogs.length + 1)

    const titles = blogs.map((n) => n.title)
    expect(titles).toContain('Go To Statement Considered Harmful')
  })

  test('sets likes to 0 by default', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    }

    await api.post('/api/notes').set('Authorization', token).send(newBlog)

    const blogs = await helper.blogsInDb()
    const likes = blogs.map((n) => n.likes)
    expect(likes).toContain(0)
  })

  test('fails without a title', async () => {
    const newBlog = {
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(400)
  })

  test('fails without an url', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(400)
  })

  test('fails without a token', async () => {
    await api.post('/api/blogs').send(helper.listWithOneBlog[0]).expect(401)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.listWithSixBlogs.length)
  })
})

describe('when editing an existing blog', () => {
  test('changing values succeeds with valid data', async () => {
    const newBlog = {
      title: 'Bobs Bean Blog',
      author: 'Bob',
      url: 'http://www.bobsbeanblog.html',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(helper.listWithOneBlog[0])

    const response = await api.get('/api/blogs')
    const { id } = response.body[6]

    await api
      .put(`/api/blogs/${id}`)
      .set('Authorization', token)
      .send(newBlog)
      .expect(200)

    const blogs = await helper.blogsInDb()
    const titles = blogs.map((n) => n.title)
    expect(titles).toContain('Bobs Bean Blog')
  })

  test('changing values fails with wrong user', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(helper.listWithOneBlog[0])

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'userTwo', passwordHash })
    await user.save()

    const loginResponse = await api.post('/api/login').send(helper.userTwo)
    token = `bearer ${loginResponse.body.token}`

    const newBlog = {
      title: 'Bobs Bean Blog',
      author: 'Bob',
      url: 'http://www.bobsbeanblog.html',
    }

    const blogResponse = await api.get('/api/blogs')
    const { id } = blogResponse.body[6]

    await api
      .put(`/api/blogs/${id}`)
      .set('Authorization', token)
      .send(newBlog)
      .expect(401)
  })

  test('deleting is succesful', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(helper.listWithOneBlog[0])

    const response = await api.get('/api/blogs')
    const { id } = response.body[6]

    await api.delete(`/api/blogs/${id}`).set('Authorization', token).expect(204)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.listWithSixBlogs.length)
  })

  test('deletion fails with wrong user', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(helper.listWithOneBlog[0])

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'userTwo', passwordHash })
    await user.save()

    const loginResponse = await api.post('/api/login').send(helper.userTwo)
    token = `bearer ${loginResponse.body.token}`

    const blogResponse = await api.get('/api/blogs')
    const { id } = blogResponse.body[6]

    await api.delete(`/api/blogs/${id}`).set('Authorization', token).expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
