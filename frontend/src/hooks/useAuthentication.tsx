import { request } from '@/lib/axiosClient'
import { UserType } from '@/models/UserType'
import { useQuery } from '@tanstack/react-query'
import { createContext, ReactNode, useContext } from 'react'

export type CredentialType = {
  username: string
  password: string
}

interface AuthContextType {
  currentUser: UserType | undefined
  signIn: (credential: CredentialType) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType>({
  currentUser: undefined,
  signIn: async () => {},
  signOut: async () => {},
})

export function AuthenticationProvider({ children }: { children: ReactNode }) {
  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const resp = await request.get('/auth/me')
      return resp.data
    },
  })

  async function signIn(credential: CredentialType) {
    const resp = await request.post('/auth/login', credential)
    return resp.data
  }

  async function signOut() {
    const resp = await request.post('/auth/logout')
    return resp.data
  }

  const value = {
    currentUser,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
  return useContext(AuthContext)
}

export { useAuth }
