import { useToken } from '@/store/client'
import ENV from '@/utils/lib/environment'
import axios from 'axios'
import { toast } from 'react-toastify'

const api = axios.create({
  baseURL: ENV.apiUrl,
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
      toast.info('Your session has expired, login again')
      useToken.getState().removeToken()
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

export default api
