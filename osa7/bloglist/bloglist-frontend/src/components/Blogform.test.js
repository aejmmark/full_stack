import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './Blogform'

describe('<BlogForm />', () => {
  test('submits blog with correct data', () => {
    const user = {
      username: 'username',
      password: 'password',
      _id: 'id',
    }
    const mockCreateBlog = jest.fn()

    const component = render(
      <BlogForm user={user} createBlog={mockCreateBlog} />
    )

    const form = component.container.querySelector('#form')
    const title = component.container.querySelector('#title')
    fireEvent.change(title, {
      target: { value: 'testblog' },
    })
    const author = component.container.querySelector('#author')
    fireEvent.change(author, {
      target: { value: 'tester' },
    })
    const url = component.container.querySelector('#url')
    fireEvent.change(url, {
      target: { value: 'http://test.com' },
    })
    fireEvent.submit(form)

    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0].title).toBe('testblog')
    expect(mockCreateBlog.mock.calls[0][0].author).toBe('tester')
    expect(mockCreateBlog.mock.calls[0][0].url).toBe('http://test.com')
  })
})
