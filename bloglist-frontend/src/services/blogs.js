import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async (newObject) => {
  const response = await axios.put(baseUrl.concat('/', newObject.id), newObject)
  return response.data
}

const remove = async (object) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(baseUrl.concat('/', object.id), config)
  return response.data
}

const comment = async (id, comment) => {
  const comment1 = { comment }
  const response = await axios.post(baseUrl.concat('/', id, '/comments'), comment1)
  return response.data
}

export default { getAll, create, setToken, like, remove, comment }
