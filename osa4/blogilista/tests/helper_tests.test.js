const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
]

const listWithSixBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
]

const emptyList = []

test('dummy returns one', () => {
  const result = listHelper.dummy(emptyList)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithSixBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('returns blog with most likes', () => {
    const result = listHelper.favoriteBlog(listWithSixBlogs)
    expect(result).toEqual(listWithSixBlogs[2])
  })

  test('returns first blog if only one element', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('returns undefined if empty', () => {
    const result = listHelper.favoriteBlog(emptyList)
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
    const result = listHelper.mostBlogs(listWithSixBlogs)
    expect(result).toEqual(authorWithMostBlogs)
  })

  test('returns first blog if only one element', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(firstAuthor)
  })

  test('returns undefined if empty', () => {
    const result = listHelper.mostBlogs(emptyList)
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
    const result = listHelper.mostLikes(listWithSixBlogs)
    expect(result).toEqual(authorWithMostLikes)
  })

  test('returns first blog if only one element', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(firstAuthor)
  })

  test('returns undefined if empty', () => {
    const result = listHelper.mostLikes(emptyList)
    expect(result).toEqual(undefined)
  })
})
