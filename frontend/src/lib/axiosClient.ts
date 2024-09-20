import axios, { AxiosError } from 'axios'

const baseURL = 'http://localhost:4000'

const request = axios.create({
  withCredentials: true,
  baseURL,
})

request.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      await request.get('/auth/refreshtoken').catch(error => {
        return Promise.reject(error)
      })
    }

    return Promise.reject(error)
  }
)

export { request }
