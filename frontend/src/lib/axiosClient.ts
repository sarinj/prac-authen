import axios, { AxiosError } from 'axios'

const baseURL = 'http://localhost:4000'

const request = axios.create({
  withCredentials: true,
  baseURL,
})

request.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config
    if (
      error.response?.status === 401 &&
      originalRequest?.url !== '/auth/refresh'
    ) {
      await request.post('/auth/refresh').catch(error => {
        return Promise.reject(error)
      })
    }

    return Promise.reject(error)
  }
)

export { request }
