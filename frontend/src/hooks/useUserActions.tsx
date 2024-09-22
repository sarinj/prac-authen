import { request } from '@/lib/axiosClient'

type SignUpData = {
  name: string
  email: string
  password: string
}

export function useUserActions() {
  async function signUp(userData: SignUpData) {
    const resp = await request.post('/auth/register', userData)
    console.log(resp)
    return resp.data
  }

  async function searchUsers() {}

  return { signUp, searchUsers }
}
