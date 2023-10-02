import { useToken } from '@/store/client'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true
})

api.defaults.headers.post['Content-Type'] = 'application/json'

api.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('access-token') || '""')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      useToken.getState().removeToken()
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

export default api
