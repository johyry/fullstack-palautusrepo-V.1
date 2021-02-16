import blogService from '../services/blogs'
import { handleErrorMessages } from './notificationReducer'

const blogReducer = (state = [], action) => {

  switch(action.type) {
  case 'INITIALIZE_BLOGS':
    return action.data.blogs
  case 'CREATEBLOG':
    return [...state, action.data.blogObject]
  case 'MODIFIEDBLOG':
    var blogs = state.map(a => a.id === action.data.id ? action.data : a)
    return blogs
  case 'DELETEBLOG':
    return state.filter(a => a.id !== action.data.id)
  default:
    return state
  }
}



export const createBlog = (blogObject) => {
  return async dispatch => {
    try {
      const blog = await blogService.create(blogObject)
      dispatch({
        type: 'CREATEBLOG',
        data: {
          blog
        }
      })
    } catch (exception) {
      handleErrorMessages('Creating blog failed')
    }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      dispatch ({
        type: 'INITIALIZE_BLOGS',
        data: {
          blogs
        }
      })
    } catch (exception) {
      handleErrorMessages('Fetching all blogs failed')
    }
  }
}

export const likeBlog = (blogObject) => {
  return async dispatch => {
    let newBlog = { ...blogObject, likes: blogObject.likes + 1 }
    try {
      newBlog = await blogService.like(newBlog)
      dispatch ({
        type: 'MODIFIEDBLOG',
        data: newBlog
      })
    } catch (exception) {
      handleErrorMessages('Liking blog failed')
    }
  }
}

export const deleteBlog = (blogObject) => {
  return async dispatch => {
    try {
      await blogService.remove(blogObject)
      dispatch ({
        type: 'DELETEBLOG',
        data: blogObject
      })
    } catch (exception) {
      handleErrorMessages('Deleting blog failed')
    }
  }
}

export const addComment = (blogObject, comment) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.comment(blogObject.id, comment)
      dispatch ({
        type: 'MODIFIEDBLOG',
        data: newBlog
      })
    } catch (exception) {
      handleErrorMessages('Commenting blog failed')
    }
  }
}

export default blogReducer