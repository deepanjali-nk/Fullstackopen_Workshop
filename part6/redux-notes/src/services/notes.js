import axios from 'axios'

const baseUrl = 'http://localhost:3002/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (newNote) => {
  const response = await axios.post(baseUrl, newNote)
  return response.data
} 

export default{ getAll, createNew }