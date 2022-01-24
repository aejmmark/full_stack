const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

test('dummy returns one', () => {
  const result = listHelper.dummy(helper.emptyList)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(helper.emptyList)
    expect(result).toBe(0)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(helper.listWithSixBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('returns blog with most likes', () => {
    const result = listHelper.favoriteBlog(helper.listWithSixBlogs)
    expect(result).toEqual(helper.listWithSixBlogs[2])
  })

  test('returns first blog if only one element', () => {
    const result = listHelper.favoriteBlog(helper.listWithOneBlog)
    expect(result).toEqual(helper.listWithOneBlog[0])
  })

  test('returns undefined if empty', () => {
    const result = listHelper.favoriteBlog(helper.emptyList)
    expect(result).toEqual(undefined)
  })
})

describe('most blogs', () => {
  const authorWithMostBlogs = {
    author: 'Robert C. Martin',
    blogs: 3,
  }
  const firstAuthor = {
    author: 'Edsger W. Dijkstra',
    blogs: 1,
  }
  test('returns author with most blogs', () => {
    const result = listHelper.mostBlogs(helper.listWithSixBlogs)
    expect(result).toEqual(authorWithMostBlogs)
  })

  test('returns first blog if only one element', () => {
    const result = listHelper.mostBlogs(helper.listWithOneBlog)
    expect(result).toEqual(firstAuthor)
  })

  test('returns undefined if empty', () => {
    const result = listHelper.mostBlogs(helper.emptyList)
    expect(result).toEqual(undefined)
  })
})

describe('most likes', () => {
  const authorWithMostLikes = {
    author: 'Edsger W. Dijkstra',
    likes: 17,
  }
  const firstAuthor = {
    author: 'Edsger W. Dijkstra',
    likes: 5,
  }
  test('returns author with most likes', () => {
    const result = listHelper.mostLikes(helper.listWithSixBlogs)
    expect(result).toEqual(authorWithMostLikes)
  })

  test('returns first blog if only one element', () => {
    const result = listHelper.mostLikes(helper.listWithOneBlog)
    expect(result).toEqual(firstAuthor)
  })

  test('returns undefined if empty', () => {
    const result = listHelper.mostLikes(helper.emptyList)
    expect(result).toEqual(undefined)
  })
})
