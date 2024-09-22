import { request } from '@/lib/axiosClient'
import { UserType } from '@/models/UserType'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createContext, ReactNode, useContext, useEffect } from 'react'

export type CredentialType = {
  username: string
  password: string
}

interface AuthContextType {
  currentUser: UserType | undefined
  isAuthenticated: boolean
  signIn: (credential: CredentialType) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  currentUser: undefined,
  isAuthenticated: false,
  signIn: async () => {},
  signOut: async () => {},
})

export function AuthenticationProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()

  const { data: currentUser, refetch } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const resp = await request.get('/auth/me')
      return resp.data
    },
    enabled: false,
  })

  async function signIn(credential: CredentialType) {
    const resp = await request.post('/auth/login', credential)
    if (resp.status === 200) {
      await refetch()
    }
    return resp.data
  }

  async function signOut() {
    const resp = await request.post('/auth/logout')
    if (resp.status === 200) {
      await clearUserData()
      await refetch()
    }
    return resp.data
  }

  async function clearUserData() {
    queryClient.removeQueries({ queryKey: ['currentUser'] })
    queryClient.clear()
  }

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
  return useContext(AuthContext)
}

export { useAuth }
