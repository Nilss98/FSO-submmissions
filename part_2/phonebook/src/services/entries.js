import axios from 'axios'
const baseUrl = 'http://localhost:3003/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newEntry) => {
    const request = axios.post(baseUrl, newEntry)
    return request.then(response => response.data)
}

const delEntry = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
} 

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const functions = { getAll, create, delEntry, update }

export default functions
