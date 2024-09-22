import { useAuth } from '@/hooks/useAuthentication'
import { Navigate, Outlet } from 'react-router-dom'

export function AuthProtectedRoutes() {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Outlet /> : <Navigate to='/' />
}
