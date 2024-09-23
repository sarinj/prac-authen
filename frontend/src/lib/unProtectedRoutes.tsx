import { useAuth } from '@/hooks/useAuthentication'
import LoadingPage from '@/pages/loadingPage'
import { Navigate, Outlet } from 'react-router-dom'

export function UnProtectedRoutes() {
  const { isAuthenticated, isLoadingUser } = useAuth()

  if (isLoadingUser) {
    return <LoadingPage />
  }

  return isAuthenticated ? <Navigate to='/' /> : <Outlet />
}
