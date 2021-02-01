const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach( async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})


test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  console.log(response.body)
  expect(response.body.length).toBe(6)
})

test('field id is defined', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a single blog can be added to db', async () => {
  const blog = {
    title: 'Test',
    author: 'Tester',
    url: 'Url123',
    likes: 5
  }
  console.log('blog ', blog)
  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
})

test('a blog with undefined likes will have 0 likes', async () => {
  const blog = {
    title: 'Test',
    author: 'Tester',
    url: 'Url123'
  }
  console.log('blog ', blog)
  await api
    .post('/api/blogs')
    .send(blog)

  const response = await api.get('/api/blogs')
  const blogWith0Likes = response.body.find(blog => blog.title === 'Test')
  expect(blogWith0Likes.likes).toBe(0)
})

test('a blog with undefined title will result in 400', async () => {
  const blog = {
    author: 'Tester',
    url: 'Url123',
    likes: 5
  }
  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)
})

test('a blog with undefined title will result in 400', async () => {
  const blog = {
    title: 'Test',
    author: 'Tester',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)
})


afterAll(() => {
  mongoose.connection.close()
})