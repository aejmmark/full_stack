const lodash = require('lodash')

const dummy = () => 1

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const findFavorite = (blogs) => blogs.reduce((favorite, current) => (favorite.likes > current.likes
  ? favorite : current))

const favoriteBlog = (blogs) => {
  if (blogs.length !== 0) {
    return findFavorite(blogs)
  }
  return undefined
}

const getAuthor = (blog) => blog.author

const sortByBlogs = (blogs) => blogs.sort((first, second) => ((first.blogs > second.blogs)
  ? -1 : 1))

const blogCount = (blogs) => {
  const groupedBlogs = lodash.groupBy(blogs, getAuthor)
  let authors = []
  Object.entries(groupedBlogs).forEach(([key, value]) => {
    const author = {
      author: key,
      blogs: value.length,
    }
    authors = authors.concat(author)
  })
  return authors
}

const mostBlogs = (blogs) => {
  if (blogs.length !== 0) {
    const countedBlogs = blogCount(blogs)
    const sortedBlogs = sortByBlogs(countedBlogs)
    return sortedBlogs[0]
  }
  return undefined
}

const sortByLikes = (blogs) => blogs.sort((first, second) => ((first.likes > second.likes)
  ? -1 : 1))

const likeCount = (blogs) => {
  const groupedBlogs = lodash.groupBy(blogs, getAuthor)
  let authors = []
  Object.entries(groupedBlogs).forEach(([key, value]) => {
    const author = {
      author: key,
      likes: value.reduce((sum, current) => sum + current.likes, 0),
    }
    authors = authors.concat(author)
  })
  return authors
}

const mostLikes = (blogs) => {
  if (blogs.length !== 0) {
    const countedBlogs = likeCount(blogs)
    const sortedBlogs = sortByLikes(countedBlogs)
    return sortedBlogs[0]
  }
  return undefined
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
