import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'testblog',
    author: 'tester',
    url: 'http://test.com',
    likes: 0,
  }

  test('renders title and author by default', () => {
    const component = render(<Blog blog={blog} />)

    expect(component.container).toHaveTextContent('testblog by tester')
  })

  test('renders all data when expand button is pressed', () => {
    const component = render(<Blog blog={blog} user={null} />)
    const button = component.getByText('expand')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('http://test.com')
    expect(component.container).toHaveTextContent('likes: 0')
  })

  test('calls event handler when like button is pressed', () => {
    const mockHandler = jest.fn()

    const component = render(
      <Blog user={null} blog={blog} handleLike={mockHandler} />
    )

    const expandButton = component.getByText('expand')
    fireEvent.click(expandButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
