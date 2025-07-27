import axios from 'axios'

import { baseUrl as baseURL } from 'utils/baseUrl'


const baseUserUrl =
  typeof import.meta.env.VITE_API_BASE_URL_USER === 'string' && import.meta.env.VITE_API_BASE_URL_USER.trim() !== ''
    ? import.meta.env.VITE_API_BASE_URL_USER
    : 'http://localhost:3001/api'

const baseAuthUrl =
  typeof import.meta.env.VITE_API_BASE_URL_AUTH === 'string' && import.meta.env.VITE_API_BASE_URL_AUTH.trim() !== ''
    ? import.meta.env.VITE_API_BASE_URL_AUTH
    : 'http://localhost:4000/api'

const basePostUrl =
  typeof import.meta.env.VITE_API_BASE_URL_POST === 'string' && import.meta.env.VITE_API_BASE_URL_POST.trim() !== ''
    ? import.meta.env.VITE_API_BASE_URL_POST
    : 'http://localhost:3002/api'

const baseLikeUrl =
  typeof import.meta.env.VITE_API_BASE_URL_LIKE === 'string' && import.meta.env.VITE_API_BASE_URL_LIKE.trim() !== ''
    ? import.meta.env.VITE_API_BASE_URL_LIKE
    : 'http://localhost:4002/api'



const publicUserInstance = axios.create({
  baseURL: baseUserUrl
})
const publicAuthInstance = axios.create({
  baseURL: baseAuthUrl
})
const protectedInstance = axios.create({
  baseURL: baseUserUrl
})

const protectedPostInstance = axios.create({
  baseURL: basePostUrl
})

const protectedLikeInstance = axios.create({
  baseURL: baseLikeUrl
})

protectedPostInstance.interceptors.request.use(
  function (config) {
    const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN')

    if (AUTH_TOKEN === null) {
      throw new Error('Token expired')
    }

    config.headers.Authorization = 'Bearer ' + AUTH_TOKEN

    // Haz algo antes que la petición se ha enviada
    return config
  },
  async function (error) {
    // Haz algo con el error de la petición
    return await Promise.reject(error)
  }
)

protectedInstance.interceptors.request.use(
  function (config) {
    const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN')

    if (AUTH_TOKEN === null) {
      throw new Error('Token expired')
    }

    config.headers.Authorization = 'Bearer ' + AUTH_TOKEN

    // Haz algo antes que la petición se ha enviada
    return config
  },
  async function (error) {
    // Haz algo con el error de la petición
    return await Promise.reject(error)
  }
)

protectedLikeInstance.interceptors.request.use(
  function (config) {
    const AUTH_TOKEN = localStorage.getItem('AUTH_TOKEN')

    if (AUTH_TOKEN === null) {
      throw new Error('Token expired')
    }

    config.headers.Authorization = 'Bearer ' + AUTH_TOKEN

    // Haz algo antes que la petición se ha enviada
    return config
  },
  async function (error) {
    // Haz algo con el error de la petición
    return await Promise.reject(error)
  }
)

export { publicUserInstance, protectedInstance, publicAuthInstance, protectedPostInstance, protectedLikeInstance }
